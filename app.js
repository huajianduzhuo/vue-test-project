const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const Router = require('koa-router')
const fs = require('fs')
const app = new Koa()
let router = new Router()

const main = serve(path.join(__dirname, './dist'))
app.use(main)

router.get('/api/getUser', (ctx, next) => {
  ctx.type = 'json'
  ctx.body = {
    name: '白宇',
    role: '赵云澜'
  }
})

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