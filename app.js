const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const Router = require('koa-router')
const proxy = require('http-proxy-middleware')
const fs = require('fs')
const app = new Koa()
let router = new Router()

const main = serve(path.join(__dirname, './dist'))
app.use(main)

/** 
 * 使用 http-proxy-middleware 实现代理中间件
 */
app.use(async (ctx, next) => {
  if (ctx.url.startsWith('/api')) {
    ctx.respond = false
    return proxy({
      target: '', // 服务器地址
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '/cicd/api'
      }
    })(ctx.req, ctx.res, next)
  }
  return next()
})

router.get('/api/getUser', (ctx, next) => {
  ctx.type = 'json'
  ctx.body = {
    name: '白宇',
    role: '赵云澜'
  }
})

/**
 * vue-router 使用 history 模式，配置返回 index 页面
 */
router.get('*', (ctx, next) => {
  ctx.type = 'html'
  ctx.body = fs.createReadStream(path.join(__dirname, './dist', 'index.html'))
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3004, () => {
  console.log('app listened on port 3004, open "http://localhost:3004"')
})
