<template>
	<div class="cart">
		<van-nav-bar
		  class="nav-bar"
		  title="购物车"
		  left-text="返回"
		  left-arrow
		  @click-left="goBack"
		  fixed
		/>
		<div class="car-list">
			<div class="car-item" v-for="item in cartList" :key="item.goodsId">
				<div class="car-img">
					<img :src="item.image" alt="">
				</div>
				<div class="car-content">
					<p class="car-name">{{item.name}}</p>
					<p class="car-price">￥{{item.price | formatMoney }}<span class="count">x{{item.count}}</span></p>
					<div class="item-control">
						<van-stepper v-model="item.count" min="0" @change="saveToLocal" @minus="removeItem(item)"/>
						<span class="item-total">总计:<span class="total">￥{{item.price*item.count | formatMoney}}</span></span>
					</div>
				</div>
			</div>
			<div class="car-control">
				合计: <span class="total">￥{{totalMoney | formatMoney}}</span>
				<van-button type="danger">提交订单</van-button>				
				<van-button type="danger" @click="clearCart">清空购物车</van-button>				
			</div>	
		</div>
	</div>
</template>

<script>
	export default {
		name: 'cart',
		data(){
			return {
				cartList: [],
				isEmpty: false,
			}
		},
		computed: {
			totalMoney(){
				return this.cartList.reduce((num, item) => { return num + item.count * item.price }, 0)
			}
		},
		methods: {
			goBack(){
				this.$router.go(-1)
			},
			getCartList(){
				if(localStorage.getItem('CARTLIST')){
					this.cartList = JSON.parse(localStorage.getItem('CARTLIST'))
				}
				this.isEmpty = this.cartList.length ? false : true
			},
			clearCart(){
				this.cartList = []
				this.isEmpty = true
				localStorage.removeItem('CARTLIST')
			},
			saveToLocal(){
				localStorage.setItem('CARTLIST',JSON.stringify(this.cartList))
				// this.cartList = JSON.parse(localStorage.getItem('CARTLIST'))
			},
			removeItem(item){
				let index = this.cartList.findIndex(v => v.goodsId === item.goodsId)
				if(item.count == 1){
					this.cartList.splice(index,1)
					this.saveToLocal()
				}
			}
		},
		created(){
			this.getCartList()
			// this.$dialog.alert({
		 //      message: '弹窗内容'
		 //    }).then(() => {
		 //    	console.log("1")
		 //    })
		}
	}
</script>

<style lang="scss" scoped>
.cart{
	margin: 60px 0 160px 0;
	.nav-bar{
		height: 50px;
		line-height: 50px;
		/deep/ .van-nav-bar__title{
			font-size: 24px;
		}
		/deep/ .van-nav-bar__left{
			font-size: 22px;
		}
	}
	.car-list{
		margin-top: 10px;
		.car-item{
			padding: 10px;
			margin-bottom: 10px;
			background-color: #fff;
			display: flex;		
			.car-img{
				flex: 2;
				box-sizing: border-box;
				border: 2px solid #ddd;
				img{
					display: block;
					width: 100%;
				}
			}
			.car-content{
				flex: 4;
				padding: 10px 0 0 20px;
				/deep/ .van-stepper__minus,/deep/ .van-stepper__plus{
					width: 50px;
					height: 50px;
					
				}
				/deep/ .van-stepper__input{
					width: 48px;
					height: 48px;
					font-size: 22px;
				}
				p{
					margin: 0 0 10px 0;
					font-size: 26px;
					font-weight: bold;
				}
				.car-price{
					color: red;
					font-size: 22px;
					.count{
						float: right;
						font-size: 20px;
					}
				}
				.item-control{
					display: flex;
					align-items: center;
    				justify-content: space-between;
					.item-total{
						font-size: 20px;
						color: #666;
						.total{
							font-size: 22px;
							color: red;
							font-weight: bold;
						}
					}
				}
			}
		}
		.car-control{
			width: 100%;
			line-height: 60px;
			font-size: 22px;
			box-sizing: border-box;		
			padding: 10px 10px 10px 30px;
			background-color: #fff;
			overflow: hidden;
			position: fixed;
			left: 0;
			bottom: 70px;
			.van-button{
				float: right;
				height: 60px;
				font-size: 22px;
				margin-left: 10px;
			}
			.total{
				color: red;
				font-size: 30px;
				font-weight: bold;
			}
		}
	}
}
</style>