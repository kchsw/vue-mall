<template>
	<div class="category">
		<van-nav-bar
		  class="nav-bar"
		  title="商品分类"
		  left-text="返回"
		  left-arrow
		  @click-left="goBack"
		  fixed
		/>
		<van-tabs class="category-tab" v-model="active" :animated="true" 
		>
		    <van-tab v-for="item in category" :key="item.ID">
		    	<div slot="title" @click="getCategorySub(item.ID)">
		    		{{item.MALL_CATEGORY_NAME}}
		    	</div>
		    	<van-row class="category-row">
				   <van-col span="6" class="col-panel">
					   	<ul class="category-list">
					   		<li class="category-item" v-for="(item,index) in categorySub" :key="item.ID"
					   		:class="{'active': currentIndex == index}" @click="selectCategorySub(index, item.ID)"
					   		>
					   			{{item.MALL_SUB_NAME}}
					   		</li>
					   	</ul>
				   </van-col>
				   <van-col class="col-panel col-right" span="18">
				   		<!-- <van-loading color="white" /> -->
				   		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
					   		<van-list
							  v-model="loading"
							  :finished="finished"
							  finished-text="没有更多了"
							  @load="onLoad"
							>
								<van-row gutter="10">
									<van-col span="12" v-for="item in goodsList" :key="item.goodsId">
										<goods-info :goods="item"></goods-info>
									</van-col>
								</van-row>
							</van-list>
						</van-pull-refresh>
				   </van-col>			
				</van-row>
		    </van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	import URL from "../api/serviceAPI"
	import GoodsInfo from "../components/GoodsInfo"
	import { formatGoodsList } from "../api/goods.js"
	export default {
		name: 'category',
		data() {
			return {
				active: undefined,
				currentIndex: 0,
				category: [],
				categorySub: [],
				goodsList: [],
				loading: false,
      			finished: true,
      			page: 1,
      			categorySubId: '',
      			isLoading: false,
      			
			}
		},
		components: {
			GoodsInfo
		},
		methods: {
			goBack(){
				this.$router.go(-1)
			},
			async getCategory(id){
				try{
					const result = await this.$http.get(URL.getCategory)
					if(result.data.code == 200 && result.data.message){
						this.category = result.data.message
						this.getCategorySub(id || this.category[0].ID)
				    }else{
				    	Toast.success("服务器错误，获取数据失败")
				    }
				}catch(error){
					console.log(error)
				}
			},
			async getCategorySub(id){
				try{
					const result = await this.$http.get(URL.getCategorySub, { params: { categoryId: id }})
					if(result.data.code == 200 && result.data.message){
						this.categorySub = result.data.message
						this.currentIndex = 0
						// this.page = 1
						// this.goodsList = []
						// this.finished = false
						this.categorySubId = this.categorySub[0].ID
						this.getGoodsBySubId(this.categorySub[0].ID)
				    }else{
				    	Toast.success("服务器错误，获取数据失败")
				    }
				}catch(error){
					console.log(error)
				}
			},
			async getGoodsBySubId(id){
				try{
					const result = await this.$http.get(URL.getGoodsList, { params: { categorySubId: id}})
					if(result.data.code == 200 && result.data.message){
						// this.goodsList = result.data.message
						this.goodsList = formatGoodsList(result.data.message)		
				    }else{		
				    	// this.finished = true
				    	Toast.success("服务器错误，获取数据失败")
				    }
				    // this.loading = false	
				}catch(error){
					console.log(error)
				}
			},
			selectCategorySub(index, id){
				this.currentIndex = index
				this.categorySubId = id
				// this.page = 1
				// this.goodsList = []
				// this.finished = false
				this.getGoodsBySubId(id)
			},
			onLoad(){
				// this.loading = false
				// setTimeout(() => {
				// 	this.loading = false
				// 	this.page++
				// 	this.finished = true
				// }, 1000)
				
				// this.getGoodsBySubId(this.categorySubId)
				// this.page++	
				// this.loading = false		
				// console.log('11')

			},
			onRefresh(){
				this.goodsList = []
				setTimeout(() => {
			        this.$toast('刷新成功')
			        this.getGoodsBySubId(this.categorySubId)
			        this.isLoading = false
			    }, 500);
			}

		},
		created(){
			this.active = this.$route.query.index || 0
			this.getCategory(this.$route.query.categoryId)
		},
		watch: {
			$route(){
				this.active = this.$route.query.index || 0
				this.getCategory(this.$route.query.categoryId)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category{
		margin-top: 50px;
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
		.category-tab{
			/deep/ .van-tabs__wrap{
				height: 46px;
			}
			/deep/ .van-tab{
				font-size: 24px;
			}
			.category-row{
				// background: red;
				.col-panel{
					height: calc(100vh - 166px);
					overflow: auto;
					&::-webkit-scrollbar{
						display:none;
					}
					.category-list{
						height: 100%;
						box-sizing: border-box;
						border-right: 1px solid #ddd;
						font-size: 0;
						.category-item{
							font-size: 24px;
							text-align: center;
							padding: 22px 0;
							background: #fff;
							box-sizing: border-box;
							border-bottom: 1px solid #eee;
							&.active{
								background: #eee;
								color: red;
								border-bottom: 1px solid #fff;
							}
						}
					}  
				}
				.col-right{
					padding: 10px;
				}				
			}		
		}
	}
</style>