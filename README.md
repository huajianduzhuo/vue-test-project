# vueapp

> vue test project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 查看 service worker

```bash
npm install

npm run build

node app.js
```

打开 http://localhost:3002/#/，在 application -> service wokers 中可看到本页面的 service worker。

# 测试

## e2e 测试

使用 `cypress` 进行 e2e 测试

启动测试 `npm run e2e:open` 或 `npm run e2e:run`
