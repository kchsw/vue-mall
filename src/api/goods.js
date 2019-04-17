class Goods{
	constructor({ ID, IMAGE1, NAME, PRESENT_PRICE, ORI_PRICE }){
		this.goodsId = ID
		this.image = IMAGE1
		this.name = NAME
		this.price = PRESENT_PRICE
		this.oriprice = ORI_PRICE
		this.count = 0
	}
}

export const formatGoodsList = data => {
	const newData = []
	data.map(item => {
		newData.push(new Goods(item))
	})
	return newData
}

export const formatGoods = data => {
	return new Goods(data)
}