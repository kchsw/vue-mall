<template>
	<div>
		<van-nav-bar
		  class="nav-bar"
		  title="用户注册"
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
				<van-field
					v-model="repassword"
				    type="password"
				    label="密码:"
				    placeholder="重复输入密码"
				    clearable='clearable'
				    :error-message="repassWordErrorMsg"
				    required
				/>
			</van-cell-group>
			<div class="register-button">
	            <van-button type="primary" size="large" :loading="openLoading" @click="registerAction">马上注册</van-button>
	        </div>
		</div>
	</div>
</template>

<script>
	import URL from "../api/serviceAPI"
	import { Toast } from 'vant';
	export default {
		name: 'regidter',
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
        		repassWordErrorMsg: ''
			}
		},
		name: 'register',
		methods: {
			goBack(){
				this.$router.go(-1)
			},
			async registerUser(){
				this.openLoading = true
				try{
					const result = await this.$http.post(URL.registerUser, this.userInfo)
					if(result.data.code == 200){
						Toast.success('注册成功')
						this.openLoading = false
						sessionStorage.setItem('USER', JSON.stringify(this.userInfo))
						this.$router.push('/')
					}else{
						console.log(result.data.message)
						Toast.fail('注册失败')
						this.openLoading = false
					}
					console.log(result)
				}catch(err){
					console.log(err)
					Toast.fail('注册失败')
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
				if(this.repassword !== this.userInfo.password){
					this.repassWordErrorMsg = "两次输入密码不一致"
					isOk = false
				}else{
					this.repassWordErrorMsg = ""
				}
				return isOk	
			},
			registerAction(){
				this.checkForm() && this.registerUser()
			}
		},
		mounted() {
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