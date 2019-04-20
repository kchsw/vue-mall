<template>
	<div class="main">
		<keep-alive>
			<router-view/>
		</keep-alive>
		<van-tabbar v-model="active" active-color="#e5017d">
		   <van-tabbar-item icon="home-o" :to="{ name: 'home' }">首页</van-tabbar-item>
		   <van-tabbar-item icon="apps-o" :to="{ name: 'category' }">分类</van-tabbar-item>
		   <van-tabbar-item icon="cart-o" :to="{ name: 'cart' }">购物车</van-tabbar-item>
		   <van-tabbar-item icon="user-circle-o" :to="{ name: 'mine' }">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default {
		name: 'mainpage',
		data(){
			return {
				active: 0
			}
		},
		methods: {
			isActive(){
				const pathList = {
					"home": 0,
					"category": 1,
					"cart": 2,
					"mine": 3
				}
				this.active = pathList[this.$route.name]
			}
		},
		created(){
			this.isActive()
		},
		watch: {
			$route(){
				this.isActive()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		margin-bottom: 70px;
		.van-tabbar{
			height: 70px;
			.van-tabbar-item{
				font-size: 24px;
				/deep/.van-tabbar-item__icon{
					margin-bottom: 0;
					/deep/.van-icon{
						font-size: 28px;
					}
				}
			}
		}
	}
</style>