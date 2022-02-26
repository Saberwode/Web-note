## 封装axios拦截器

创建`service`文件夹，创建入口文件`index.ts`

```ts
// service统一出口

import XRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const xRequest = new XRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('请求成功拦截')

      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败拦截')
      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败拦截')
      return err
    }
  }
})

export default xRequest
```

创建`request`文件夹，创建入口文件`index.ts`

```ts
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
interface XRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}
// 希望在xRequest实例中传入的config可以传入拦截器
interface XRequestConfig extends AxiosRequestConfig {
  interceptors?: XRequestInterceptors
}
class XRequest {
  // 创建一个axios实例
  instance: AxiosInstance
  interceptors?: XRequestInterceptors
  // 自定义的接口类型，除了AxiosRequestConfig，还有额外的可选拦截器属性
  constructor(config: XRequestConfig) {
    // 在创建xRequest实例的时候，传入config，之后赋值给该实例的instacne
    // 这样就可以保证每个xRequest实例保持独立，当BASE_URL不同的时候，每个xRequest实例发送请求时互不干扰
    this.instance = axios.create(config)

    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }
  request(config: AxiosRequestConfig): void {
    // 这里的instance就相当于一个axios实例，他有axios实例可以拥有的所有方法
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}
export default XRequest
```

可选，在`/request`创建`config.ts`文件

```ts
let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL =
    'https://backup.fastmock.site/mock/3e6d55f607e287c78c97f316f7dd6ff8/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:5000'
} else if (process.env.NODE_ENV === 'test') {
  BASE_URL = 'eawefa'
}
export { BASE_URL, TIME_OUT }
```

