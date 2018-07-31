const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const app = new Koa()

const main = serve(path.join(__dirname, './dist'))
app.use(main)

app.listen(3003, () => {
  console.log('app listened on port 3003')
})