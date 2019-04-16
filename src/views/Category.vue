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
		<van-tabs class="category-tab" v-model="active" sticky swipeable :animated="true" :offset-top="50"
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
				   		<van-list
						  v-model="loading"
						  :finished="finished"
						  finished-text="没有更多了"
						>
							<van-row gutter="10">
								<van-col span="12" v-for="item in goodsList" :key="item.goodsId">
									<goods-info :goods="item"></goods-info>
								</van-col>
							</van-row>
						</van-list>
				   </van-col>			
				</van-row>
		    </van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import URL from "../api/serviceAPI"
	import GoodsInfo from "../components/GoodsInfo"
	import formatGoods from "../api/goods.js"
	export default {
		name: 'category',
		data() {
			return {
				active: 0,
				currentIndex: 0,
				category: [],
				categorySub: [],
				goodsList: [],
				loading: false,
      			finished: false,
      			page: 1,
      			categorySubId: ''
			}
		},
		components: {
			GoodsInfo
		},
		methods: {
			goBack(){
				this.$router.go(-1)
			},
			async getCategory(){
				try{
					const result = await this.$http.get(URL.getCategory)
					if(result.data.code == 200 && result.data.message){
						this.category = result.data.message
						this.getCategorySub(this.category[0].ID)
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
						this.page = 1
						this.goodsList = []
						this.finished = false
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
					const result = await this.$http.get(URL.getGoodsList, { params: { categorySubId: id, page: this.page}})
					if(result.data.code == 200 && result.data.message){
						// this.goodsList = result.data.message
						this.goodsList = this.goodsList.concat(formatGoods(result.data.message))
						console.log('11')
						
				    }else{
				    	this.finished = true
				    	Toast.success("服务器错误，获取数据失败")
				    }
				}catch(error){
					console.log(error)
				}
			},
			selectCategorySub(index, id){
				this.currentIndex = index
				this.categorySubId = id
				this.page = 1
				this.goodsList = []
				this.finished = false
				// this.getGoodsBySubId(id)
			},
			onLoad(){
				this.loading = false
				// setTimeout(() => {
				// 	this.loading = false
				// 	this.page++
				// 	this.finished = true
				// }, 1000)
				
				// this.getGoodsBySubId(this.categorySubId)
				// this.page++	
				// this.loading = false		
				// console.log('11')

			}

		},
		created(){
			this.getCategory()
			// this.getCategorySub(1)
		},
		// watch: {
		// 	categorySub(){
		// 		this.getGoodsBySubId(this.categorySub[0].ID)
		// 	}
		// }
	}
</script>

<style lang="scss" scoped>
	.category{
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
			margin-top: 50px;
			/deep/ .van-tabs__wrap{
				height: 46px;
			}
			/deep/ .van-tab{
				font-size: 24px;
			}
			.category-row{
				// background: red;
				.col-panel{
					height: calc(100vh - 96px);
					overflow: auto;
					&::-webkit-scrollbar{
						display:none;
					}
					.category-list{
						height: 100%;
						box-sizing: border-box;
						border-right: 1px solid #fff;
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