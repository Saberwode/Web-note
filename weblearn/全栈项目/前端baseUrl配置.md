vite.config

```js
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      "/api": {
        target: "http://120.79.97.234:3000/api"
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [vue()]
})
```

config/index.js

```js
const env = import.meta.env.MODE || 'production';
const EnvConfig = {
  dev: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/3e6d55f607e287c78c97f316f7dd6ff8/api'
  },
  test: {
    baseApi: 'awef/api',
    mockApi: 'https://www.fastmock.site/mock/3e6d55f607e287c78c97f316f7dd6ff8/api'
  },
  production: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/3e6d55f607e287c78c97f316f7dd6ff8/api'
  },
}
```

