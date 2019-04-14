const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get('/', async (ctx) => {
	ctx.body = '这是用户操作首页'
})

//注册接口
router.post('/register', async (ctx) => {
	const User = mongoose.model('User')
	let oneUser = new User(ctx.request.body)
	// ctx.body= ctx.request.body
	await oneUser.save().then(() => {
		ctx.body = {
			code: 200,
			message: '注册成功'
		}
	}).catch(error => {
		ctx.body = {
			code: 500,
			message: 'error'
		}
	})
})

router.post('/login', async (ctx) => {
	const loginUser = ctx.request.body
	const { userName, password } = loginUser
	const User = mongoose.model('User')
	await User.findOne({userName: userName}).exec().then(async (result) =>{
		if(result){
			// ctx.body = {
			// 	code: 200,
			// 	message: result
			// }
			let newUser = new User()
			await newUser.comparePassword(password, result.password).then(isMatch => {
				if(isMatch){
					ctx.body = {
						code: 200,
						message: '登陆成功'
					}
				}else{
					ctx.body = {
						code: 500,
						message: '密码错误'
					}
				}
				
			}).catch(error => {
				console.log(error)
				ctx.body = {
					code: 500,
					message: error
				}
			})
		}else{
			ctx.body = {
				code: 500,
				message: '用户名不存在'
			}
		}
	}).catch(error => {
		ctx.body = {
			code: 500,
			message: error
		}
	})
})

module.exports = router