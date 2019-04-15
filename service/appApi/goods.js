const Koa = require('koa')
const app = new Koa()
const Router = require ('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllGoodsInfo', async (ctx) => {
	fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
		//坑 相对与index.js的路径
		data = JSON.parse(data)
		
		let saveCount = 0
		const Goods = mongoose.model('Goods')
		data.map((value, index) => {
			let newGoods = new Goods(value)
			newGoods.save().then(() => {
				saveCount++
				console.log(`成功插入${saveCount}条数据`)
			}).catch(error => {
				console.log('插入失败' + error)
			})
		})
	})
	ctx.body = "开始导入数据"
})

router.get('/insertAllCategory', async (ctx) => {
	fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
		//坑 相对与index.js的路径
		data = JSON.parse(data)
		
		let saveCount = 0
		const Category = mongoose.model('Category')
		data.RECORDS.map((value, index) => {
			let newCategory = new Category(value)
			newCategory.save().then(() => {
				saveCount++
				console.log(`成功插入${saveCount}条数据`)
			}).catch(error => {
				console.log('插入失败' + error)
			})
		})
	})
	ctx.body = "开始导入数据"
})

router.get('/insertAllCategorySub', async (ctx) => {
	fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
		//坑 相对与index.js的路径
		data = JSON.parse(data)
		
		let saveCount = 0
		const CategorySub = mongoose.model('CategorySub')
		data.RECORDS.map((value, index) => {
			let newCategorySub = new CategorySub(value)
			newCategorySub.save().then(() => {
				saveCount++
				console.log(`成功插入${saveCount}条数据`)
			}).catch(error => {
				console.log('插入失败' + error)
			})
		})
	})
	ctx.body = "开始导入数据"
})

router.get('/getGoodsDetailInfo', async (ctx) => {
	// let { goodsId } = ctx.request.body
	// ctx.body = {
	// 	code: 200,
	// 	message: goodsId
	// }
	
	try{
		let { goodsId } = ctx.request.query
		const Goods = mongoose.model('Goods')
		let result = await Goods.findOne({ ID: goodsId }).exec()
		ctx.body = {
			code: 200,
			message: result
		}
	}catch(error){
		ctx.body = {
			code: 500,
			message: error
		}
	}	
})

module.exports = router