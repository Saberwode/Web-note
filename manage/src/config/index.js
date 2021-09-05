/***
 * 环境变量配置
 */
const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
  dev: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/3e6d55f607e287c78c97f316f7dd6ff8/api'
  },
  test: {
    baseApi: '//test.futurefe.com/api',
    mockApi: 'https://www.fastmock.site/mock/3e6d55f607e287c78c97f316f7dd6ff8/api'
  },
  prod: {
    baseApi: '//localhost:3000/api',
    mockApi: 'https://www.fastmock.site/mock/3e6d55f607e287c78c97f316f7dd6ff8/api'
  },
}

export default {
  env,
  mock: false,
  namespace: 'manager',
  ...EnvConfig[env]
}