const Koa = require('koa')
const app = new Koa()
const { connect, initSchemas } = require('./database/init.js') 
const mongoose = require('mongoose')
const Router = require('koa-router')
let user = require('./appApi/user.js')
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
const cors = require('koa2-cors')
app.use(cors())

//装载路由 
let router = new Router
router.use('/user', user.routes())

app.use(router.routes())
app.use(router.allowedMethods())

;(async () => {
	await connect()
	initSchemas()
	// const User = mongoose.model('User')
	// let oneUser = new User({ userName: 'kchsw03', password: '123456' })
	// oneUser.save().then(() => {
	// 	console.log('插入成功')
	// })
	// let users = await User.findOne({}).exec()

	// console.log('------------------')
	// console.log(users)
	// console.log('------------------')  
})()



app.use(async ctx => {
	ctx.body = '<h1>Hello Koa2</h1>'
})

app.listen(3000, () => {
	console.log('[server] starting at port 3000')
})