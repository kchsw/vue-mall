<template>
	<div class="goods-info" @click="goGoodsPage">
        <div class="goods-image">
            <img v-lazy="goods.image" width="90%" />
        </div>
        <div class="goods-name">{{goods.name}}</div>
        <div class="goods-price">￥{{ goods.price | formatMoney }}</div>
	</div>
</template>

<script>
	export default {
		name: 'goodsInfo',
		props: {
			goods: {
				type: Object,
				default: () => ({})
			}
		},
		methods: {
			goGoodsPage(){
				this.$router.push({ name: 'goods', query: { goodsId: this.goods.goodsId } })
			}
		}
		// filters: {
	 //  		formatMoney(money = 0){
	 //  			return money.toFixed(2)
	 //  		}
	 //  	}	

	}
</script>

<style lang="scss" scoped>
	.goods-info{
		margin-bottom: 10px;
		text-align: center;
		font-size: 20px;
		background-color: #fff;
		padding: 10px;
		.goods-name{

			overflow: hidden;
	        text-overflow: ellipsis;
	        white-space:nowrap; 
		}
	}
</style>