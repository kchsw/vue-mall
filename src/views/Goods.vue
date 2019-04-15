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
		<div v-html="goodsInfo.DETAIL" class="detail-img">
		</div>
	</div>
</template>

<script>
	import URL from "../api/serviceAPI"
	import { Toast } from 'vant';
	export default {
		data() {
			return {
				goodsId: '',
				goodsInfo: {}			}
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
			}
		},
		created() {
			this.goodsId = this.$route.query.goodsId
			this.getGoodsInfo()
		}
	}
</script>

<style lang="scss" scoped>
.goods{
	.nav-bar{
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
}	
</style>