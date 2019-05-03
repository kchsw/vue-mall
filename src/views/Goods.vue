<template>
	<div class="goods">
		<van-nav-bar
		  class="nav-bar"
		  title="商品详情"
		  left-text="返回"
		  left-arrow
		  @click-left="goBack"
		  fixed
		/>
		<div class="goods-info">
			<div class="goods-banner">
				<img :src="goodsInfo.IMAGE1" alt="" width="100%">
			</div>
			<div class="goods-desc">
				<p><span class="goods-price">￥{{goodsInfo.PRESENT_PRICE | formatMoney}}</span>&nbsp<span class="line">(￥{{goodsInfo.ORI_PRICE | formatMoney}})</span></p>
				<p>{{goodsInfo.NAME}}</p>
				<div class="goods-msg"><span>快递: 免运费</span><span>月销: 232</span><span>产地:上海</span></div>
			</div>
			<!-- <div class="goods-tab">
				
			</div> -->
			<van-tabs v-model="active" sticky swipeable class="goods-tab" :animated="true"> 
			    <van-tab title="详情">
			    	<div v-html="goodsInfo.DETAIL" class="detail-img">
					</div>
			    </van-tab>
			    <van-tab title="评价">暂无评价</van-tab>
			</van-tabs>
			
		</div>
		<van-goods-action class="goods-action">
			<van-goods-action-mini-btn
			  icon="chat-o"
			  text="客服"			    
			/>
			<van-goods-action-mini-btn
			  icon="cart-o"
			  text="购物车"
			  @click="toCart"			    
			/>
			<van-goods-action-big-btn
			  text="加入购物车"
			  @click="addToCart"			   
			/>
			<van-goods-action-big-btn
			  primary
			  text="立即购买"			    
			/>
	    </van-goods-action>
	</div>
</template>

<script>
	import { formatGoods } from "../api/goods.js"
	import URL from "../api/serviceAPI"
	import { Toast } from 'vant'
	export default {
		data() {
			return {
				goodsId: '',
				goodsInfo: {},
				active: 0,
			}
		},
		methods: {
			goBack(){
				this.$router.go(-1)
			},
			async getGoodsInfo(){
				try{
					const result = await this.$http.get(URL.getGoodsInfo, { params: { goodsId: this.goodsId }})
					if(result.data.code == 200 && result.data.message){
						this.goodsInfo = result.data.message
				    }else{
				    	Toast.success("服务器错误，获取数据失败")
				    }
				}catch(error){

				}
			},
			addToCart(){
				let cartList = localStorage.getItem('CARTLIST') ? JSON.parse(localStorage.getItem('CARTLIST')) : []
				let goods = cartList.find(item => item.goodsId == this.goodsInfo.ID)
				if(goods){
					goods.count += 1
					Toast.success('添加成功');
				}else{
				let goods = formatGoods(this.goodsInfo)	
					goods.count = 1
					cartList.push(goods)
					Toast.success('添加成功');
				}
				localStorage.setItem('CARTLIST', JSON.stringify(cartList))
				
			},
			toCart(){
				this.$router.push({ name: 'cart' })
			} 
		},
		created() {
			this.goodsId = this.$route.query.goodsId
			this.getGoodsInfo()
		},
		
	}
</script>

<style lang="scss" scoped>
.goods{
	margin: 50px 0 70px 0;
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
	.detail-img{
		font-size: 0;
	}
	.goods-info{
		.goods-banner{
			img{
				display: block;
			}
		}
		.goods-desc{
			background: #fff;
			margin-bottom: 10px;
			padding: 10px;
			p{
				margin: 5px 0 0 0;
				font-size: 26px;
				.goods-price{
					color: red;
					font-size: 30px;
				}
				.line{
					text-decoration-line: line-through;
					color: #ccc;
					vertical-align: top;
				}
			}
			.goods-msg{
				font-size: 20px;
				color: #666;
				margin-top: 10px;
				display: flex;
    			justify-content: space-between;
		    }
		}
		.goods-tab{
			/deep/ .van-tabs__wrap{
				height: 50px;
    			// line-height: 60px;
			}
			/deep/ .van-tab{
				font-size: 24px;
			}
		}
	}
	.goods-action{
		.van-goods-action-mini-btn{
			height: 70px;
			font-size: 20px;
			.van-icon{
				font-size: 30px;
			}
		}
		.van-button{
			height: 70px;
			line-height: 70px;
			font-size: 20px;
		}
	}
}	
</style>