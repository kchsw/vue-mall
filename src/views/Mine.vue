<template>
	<div class="mine">
		<van-nav-bar
		  class="nav-bar"
		  title="会员中心"
		  left-text="返回"
		  left-arrow
		  @click-left="goBack"
		  fixed
		/>
		<div class="user-info">
			<div class="user-avatar">
				<img :src="avatar" alt="">
				<p class="user-name" v-if="!userinfo">未登录,请登陆或注册</p>
				<p class="user-name" v-else>{{userinfo.userName}}</p>
				<div class="user-login" v-if="!userinfo">
					<router-link to="/login" tag="div" class="user-link">登陆</router-link>
					<router-link to="/register" tag="div" class="user-link">注册</router-link>
				</div>
			</div>		
		</div>
		<div class="user-cell">
			<van-cell-group>
			  	<van-cell title="会员卡" is-link />
			  	<van-cell title="地址管理" is-link />
			  	<van-cell title="我的订单" is-link />
			  	<van-cell title="会员权益" is-link />
			  	<van-cell title="联系我们" is-link />
			  	<van-cell title="退出登陆" is-link @click="loginOut"/>
			</van-cell-group>
		</div>
		<v-right/>
		
	</div>
</template>

<script>
	const avatar = require('../assets/timg.jpg')
	import VRight from "@/components/VRight"
	export default {
		data(){
			return {
				avatar: avatar,
				userinfo: {}
			}
		},
		components: {
			VRight
		},
		methods: {
			goBack(){
				this.$router.go(-1)
			},
			loginOut(){
				sessionStorage.removeItem('USER')
				this.$router.push('/login')
			}
		},
		created(){
			this.userinfo = JSON.parse(sessionStorage.getItem('USER'))
		}
	}
</script>

<style lang="scss" scoped>
	.mine{
		margin-top: 70px;
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
		.user-info{
			.user-avatar{
				text-align: center;
				font-size: 0;
				padding: 50px 0 20px;
				background: #fff;
				img{
					width: 100px;
				}
				.user-name{
					margin: 5px 0;
					font-size: 22px;
				}
				.user-login{
					font-size: 0;
					text-align: center;
					.user-link{
						display: inline-block;
						width: 100px;
						padding: 10px;
						color: #fff;
	    				background-color: #f44;
	    				border: 1px solid #f44;
	    				font-size: 26px;
	    				text-align: center;
	    				border-radius: 5px;
	    				margin-left: 10px;
					}
				}
			}	
		}
		.user-cell{
			margin-top: 20px;
			.van-cell{
				align-items: center;
	    		border-top: 1px solid #eee;
				align-items: center;
				font-size: 24px;
				line-height: 50px;;
			}
		}
	}
</style>