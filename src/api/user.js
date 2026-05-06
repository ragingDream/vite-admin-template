import request from '@/utils/request';

// 获取当前登录用户信息
export function getUserInfo() {
  return request({
    url: '/user/info', // 这里改成你后端的真实接口地址
    method: 'get'
  });
}

// 退出登录 (可选，放在这里一起)
export function logoutApi() {
  return request({
    url: '/user/logout',
    method: 'post'
  });
}
