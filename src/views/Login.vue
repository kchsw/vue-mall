<template>
	<div>
		<van-nav-bar
		  class="nav-bar"
		  title="用户登陆"
		  left-text="返回"
		  left-arrow
		  @click-left="goBack"
		/>
		<div class="register-wrapper">
			<van-cell-group>
				<van-field
				    v-model="userInfo.userName"
				    required
				    label="用户名:"
				    placeholder="请输入用户名"
				    clearable='clearable'
				    :error-message="userNameErrorMsg"
				/>
				<van-field
				    v-model="userInfo.password"
				    type="password"
				    label="密码:"
				    placeholder="请输入密码"
				    required
				    clearable='clearable'
				    :error-message="passWordErrorMsg"
				/>
			</van-cell-group>
			<div class="register-button">
	            <van-button type="primary" size="large" :loading="openLoading" @click="loginAction">登陆</van-button>
	        </div>
		</div>
	</div>
</template>

<script>
	import URL from "../api/serviceAPI"
	import { Toast } from 'vant';
	export default {
		name: 'login',
		data() {
			return {
				userInfo: {
					userName: 'kchsw',
                	password: '123456'
				},
				repassword: '',				
                clearable: true,
                openLoading: false,
                userNameErrorMsg:'',   
        		passWordErrorMsg:'',
			}
		},
		name: 'register',
		methods: {
			goBack(){
				this.$router.go(-1)
			},
			async loginUser(){
				this.openLoading = true
				try{
					const result = await this.$http.post(URL.loginUser, this.userInfo)
					if(result.data.code == 200){
						
						new Promise((resolve, reject) => {
							sessionStorage.setItem('USER', JSON.stringify(this.userInfo))
							setTimeout(() => {
								resolve()
							},200)
						}).then(() => {
							Toast.success(result.data.message)
							this.openLoading = false
							this.$router.push('/')
						}).catch(err => {
							Toast.success('登陆异常')
						})
						
					}else{
						console.log(result.data.message)
						Toast.fail(result.data.message)
						this.openLoading = false
					}
					console.log(result)
				}catch(err){
					console.log(err)
					Toast.fail('登陆失败')
					this.openLoading = false
				}
			},
			checkForm(){
				let isOk = true
				if(this.userInfo.userName.length < 5 || !this.userInfo.userName){
				    this.userNameErrorMsg="用户名不能为空或者小于5位"
				    isOk = false
				}else{
				    this.userNameErrorMsg=''
				}
				if(this.userInfo.password.length < 6 || !this.userInfo.userName){
				    this.passWordErrorMsg="密码不能为空或者少于6位"
				    isOk = false
				}else{
				    this.passwordErrorMsg=''
				}			
				return isOk	
			},
			loginAction(){
				this.checkForm() && this.loginUser()
			}
		},
		created() {
			if(sessionStorage.getItem('USER')){
				Toast.success('您已经登录')
            	this.$router.push('/')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-bar{
		/deep/ .van-nav-bar__title{
			font-size: 24px;
		}
		/deep/ .van-nav-bar__left{
			font-size: 22px;
		}
	}
	.register-wrapper{
		width: 80%;
		margin: 55% auto;
		padding: 20px;
		background: #fff;
		border-radius: 10px;
		/deep/ .van-cell{
			line-height: 60px;
			font-size: 22px;
			.van-field__body{
				height: 60px;
			}
			.van-field__error-message{
				font-size: 20px;
			}
		}
		.register-button{
			/deep/ .van-button{
				font-size: 22px;
			}
		}
	}
</style>