import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import router from '@/router';
import store from '@/store';
import { getToken } from '@/utils/auth';
import { getRawType } from '@/utils/index';

const timeout = 3 * 1000; // 超时时间
const duration = 5 * 1000; // 错误弹窗显示时间

// 创建 axios 实例
export const service = axios.create({
  baseURL: import.meta.env.VITE_API_PATH,
  // withCredentials: true,
  timeout,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers['token'] = token;
    }

    // 是否开启过滤请求参数中的空字符串，null和undefined值，默认开启
    if (!config.noFilter) {
      ['data', 'params'].forEach((item) => {
        if (config[item]) {
          const keys = Object.keys(config[item]);

          if (keys.length) {
            keys.forEach((key) => {
              const rawType = getRawType(config[item]);

              if (
                ['', undefined, null].includes(config[item][key]) &&
                ['Object'].includes(rawType)
              ) {
                delete config[item][key];
              }
            });
          }
        }
      });
    }

    return config;
  },
  (error) => {
    // for debug
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const {
      data,
      status,
      request: { responseType },
    } = response;
    const { code, msg } = data;

    if (code === 'I000000' || (responseType === 'blob' && status === 200)) {
      return data;
    } else {
      Message.closeAll();
      Message({
        message: msg || 'Error',
        type: 'error',
        duration,
      });

      /**
       * I000001：'未登录';
       * I000002：'访问无权限';
       * I000003：'超时未操作，请重新登录';
       * I000004：'用户没有任何授权，请联系系统管理员';
       */
      if (code === 'I000001' || code === 'I000003') {
        // to re-login
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload();
          });
        });
      } else if (code === 'I000002' || code === 'I000004') {
        router.push('/403');
      }

      return Promise.reject(data);
    }
  },
  (error) => {
    Message.closeAll();

    if (!window.navigator.onLine) {
      Message({
        message: '网络异常，请检查网络是否正常连接',
        type: 'error',
        duration,
      });
    } else if (error.code === 'ECONNABORTED') {
      Message({
        message: '请求超时，请排查网络或者联系服务端人员',
        type: 'error',
        duration,
      });
    } else {
      Message({
        message: error.msg || '服务器异常，请联系管理员',
        type: 'error',
        duration,
      });
    }

    return Promise.reject(error);
  }
);

/**
 * @description 统一封装 get 请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [请求时配置]
 */
export const get = (url, params, config = {}) => {
  return service({
    method: 'GET',
    url,
    params,
    ...config,
  });
};

/**
 * @description 统一封装post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [请求时配置]
 */
export const post = (url, data, config = {}) => {
  return service({
    method: 'POST',
    url,
    data,
    ...config,
  });
};
