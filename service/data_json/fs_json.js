const fs = require('fs')

fs.readFile('./goods.json', 'utf8', (err, data) => {
	const newData = JSON.parse(data)
	let i = 0
	let pureData = []
	newData.RECORDS.map((value, index) => {
		if(value.IMAGE1){
			i++
			pureData.push(value)
		}
	})
	console.log(i)
	// console.log(pureData)
	fs.writeFile('./newGoods.json', JSON.stringify(pureData), err => {
		if(err) console.log('写入文件操作失败')
		else console.log('写入文件操作成功')
	})
})

// fs.writeFile('./Goods.json', JSON.stringify(pureData), err => {
// 	if(err) console.log('写入文件操作失败')
// 	else console.log('写入文件操作成功')
// })