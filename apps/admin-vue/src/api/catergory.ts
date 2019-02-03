import request from '@/utils/request';

export function categories() {
  return request({
    url: '/api/v1/categories',
    method: 'get',
    baseURL: '',
  });
}
