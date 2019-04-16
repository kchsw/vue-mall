class Goods{
	constructor({ ID, IMAGE1, NAME, PRESENT_PRICE }){
		this.goodsId = ID
		this.image = IMAGE1
		this.name = NAME
		this.price = PRESENT_PRICE
	}
}

const formatGoods = data => {
	const newData = []
	data.map(item => {
		newData.push(new Goods(item))
	})
	return newData
}

export default formatGoods