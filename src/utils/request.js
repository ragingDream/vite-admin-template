import router from '@/router';
import { useUserStore } from '@/stores/user';
import { getRawType, simpleDeepClone } from '@/utils';
import axios from 'axios';
import { ElMessage } from 'element-plus';

// ==========================================
// 1. 初始化配置
// ==========================================
const recentErrors = new Set();
const ERROR_CACHE_TIME = 5000;
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || '/api',
  timeout: 15000
  // 👇 可选：全局默认开启/关闭空值过滤 (默认 false，按需开启更灵活)
  // isFilterEmpty: true
});

// ==========================================
// 2. 基础工具函数
// ==========================================
/**
 * 智能显示错误消息，防止短时间内重复弹出相同提示
 * @param {string} [message] - 具体的错误文案，不传则显示默认文案
 */
function smartShowError(message) {
  const msg = message || '请求失败，请稍后再试';
  if (recentErrors.has(msg)) return;
  recentErrors.add(msg);
  ElMessage.error(msg);
  setTimeout(() => recentErrors.delete(msg), ERROR_CACHE_TIME);
}

/**
 * 执行用户登出逻辑：清除 Store 数据并跳转到登录页
 */
function handleLogout() {
  const userStore = useUserStore();
  userStore.logout();
  if (router.currentRoute.value.path !== '/login') {
    router.push(`/login?redirect=${router.currentRoute.value.fullPath}`);
  }
}

/**
 * 将 Blob 二进制数据尝试解析为 JSON 对象（用于处理文件下载接口报错的情况）
 * @param {Blob} blob - 接口返回的 Blob 原始数据
 * @returns {Promise<any>} 解析完成的 JSON 对象
 */
function parseBlobToJson(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        resolve(JSON.parse(reader.result));
      } catch (e) {
        reject(new Error('解析错误格式失败'));
      }
    };
    reader.onerror = () => reject(new Error('读取 Blob 失败'));
    reader.readAsText(blob);
  });
}

/**
 * 递归过滤请求参数中的 ''、null、undefined
 * @param {import('axios').AxiosRequestConfig} config - axios 请求配置对象
 * @param {Boolean} [config.isFilterEmpty] - 开关：是否开启过滤 (默认 false)
 * @param {Boolean} [config.removeEmptyRoot] - 可选：过滤后若 data/params 为空对象/数组，是否删除该字段 (默认 false)
 */
function clearEmptyParam(config) {
  if (!config) return;

  // 内部递归处理函数
  const processValue = val => {
    // 1. 基础空值直接返回 undefined (用于后续删除/过滤)
    if (val === '' || val === null || val === undefined) {
      return undefined;
    }

    const rawType = getRawType(val);

    // 2. 处理数组：递归处理每个元素，过滤掉 undefined
    if (rawType === 'Array') {
      return val.map(processValue).filter(item => item !== undefined);
    }

    // 3. 处理普通对象：递归处理每个属性，只保留非 undefined 的
    if (rawType === 'Object') {
      const newObj = {};
      for (const key in val) {
        if (Object.prototype.hasOwnProperty.call(val, key)) {
          const processedVal = processValue(val[key]);
          if (processedVal !== undefined) {
            newObj[key] = processedVal;
          }
        }
      }
      return newObj;
    }

    // 4. 其他类型 (Date/RegExp/Number/Boolean 等) 直接返回
    return val;
  };

  // 遍历处理 data 和 params
  ['data', 'params'].forEach(key => {
    if (config[key]) {
      // 先深拷贝一份，避免修改原对象
      const cloned = simpleDeepClone(config[key]);
      // 递归处理
      const processed = processValue(cloned);

      // 赋值回 config
      if (config.removeEmptyRoot) {
        // 可选：如果处理后是空对象/空数组，直接删除该字段
        const isEmpty =
          (getRawType(processed) === 'Object' && Object.keys(processed).length === 0) ||
          (getRawType(processed) === 'Array' && processed.length === 0);
        if (isEmpty) {
          delete config[key];
        } else {
          config[key] = processed;
        }
      } else {
        config[key] = processed;
      }
    }
  });
}

// ==========================================
// 4. 统一错误处理中心
// ==========================================
/**
 * @param {Object} options - 错误处理配置项
 * @param {number|string} [options.code] - 业务错误码 (如 200, 500)
 * @param {number} [options.status] - HTTP 状态码 (如 401, 404)
 * @param {string} [options.message] - 错误提示文案
 * @param {string} [options.url] - 请求的接口地址 (用于日志记录)
 * @param {boolean} [options.isBusinessError] - 标记是否为业务逻辑抛出的错误
 */
function handleUnifiedError({ code, status, message, url, isBusinessError }) {
  const errorCode = code || status;
  switch (errorCode) {
    case 401:
      handleLogout();
      break;
    case 403:
      smartShowError('抱歉，您没有权限进行此操作');
      break;
    case 404:
      console.warn(`[404] 资源不存在: ${url}`);
      break;
    case 500:
      smartShowError('服务器开小差了，请稍后再试');
      break;
    default:
      smartShowError(isBusinessError ? message : message || '请求失败');
  }
}

// ==========================================
// 5. 专门处理 Blob 类型的错误
// ==========================================
/**
 * @param {Blob} blobData - 接口返回的 Blob 数据
 * @param {import('axios').AxiosRequestConfig} config - Axios 原请求配置
 * @param {number} [status] - HTTP 状态码
 * @returns {Promise<never>} 始终返回 reject 状态的 Promise
 */
async function handleBlobError(blobData, config, status = null) {
  try {
    const jsonData = await parseBlobToJson(blobData);
    handleUnifiedError({
      status: status,
      code: jsonData.code,
      message: jsonData.message || '请求失败',
      url: config.url,
      isBusinessError: true
    });
    return Promise.reject(new Error(jsonData.message));
  } catch (e) {
    return Promise.reject(e);
  }
}

// ==========================================
// 6. 请求拦截器
// ==========================================
service.interceptors.request.use(
  config => {
    const userStore = useUserStore();
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`;
    }

    // 按需开启空值过滤
    if (config.isFilterEmpty) {
      clearEmptyParam(config);
    }

    return config;
  },
  error => Promise.reject(error)
);

// ==========================================
// 7. 响应拦截器
// ==========================================
service.interceptors.response.use(
  async response => {
    const { data, headers, config, status } = response;
    const { responseType, useResponseFileName } = config;

    // --- Blob 类型处理 ---
    if (responseType === 'blob' && status === 200) {
      const contentType = headers['content-type'] || '';
      if (contentType.includes('application/json')) {
        return handleBlobError(data, config, status);
      }

      if (useResponseFileName) {
        const contentDisposition = headers['content-disposition'] || '';
        let fileName = '未知文件';
        if (contentDisposition.includes('filename=')) {
          const match = contentDisposition.match(/filename=([^;]+)/);
          if (match && match[1]) {
            fileName = decodeURIComponent(match[1].replace(/['"]/g, ''));
          }
        }
        return { data, fileName };
      } else {
        return data;
      }
    }

    // --- 普通 JSON 处理 ---
    if (data.code === 200) {
      return data;
    }

    handleUnifiedError({
      code: data.code,
      message: data.message,
      url: config.url,
      isBusinessError: true
    });

    return Promise.reject(new Error(data.message || 'Error'));
  },
  async error => {
    const { config, response, message } = error;

    if (config?.responseType === 'blob' && response?.data) {
      return handleBlobError(response.data, config, response.status);
    }

    let errorMsg = '请求失败，请稍后再试';
    let status = null;

    if (message.includes('timeout')) {
      errorMsg = '请求超时，请检查网络';
    } else if (message.includes('Network')) {
      errorMsg = '网络连接失败，请检查网络';
    } else if (response) {
      status = response.status;
    }

    handleUnifiedError({ status, message: errorMsg, url: config?.url, isBusinessError: false });
    return Promise.reject(error);
  }
);

export default service;
