<template>
  	<div class="home">
    	<div class="search-bar">
    		<van-row>
			    <van-col span="3">
			    	<van-icon class="icon" name="location"/>
			    </van-col>
			    <van-col span="16" class="search-input">
			    	<input type="text" placeholder="输入商品名称">
			    </van-col>
			    <van-col span="5">
			    	<van-button type="default" class="search-btn">查找</van-button>
			    </van-col>
			</van-row>
    	</div>
    	<div class="swipe-wrapper">
    		<van-swipe :autoplay="2000" indicator-color="#e5017d">
			  	<van-swipe-item v-for="item in homeData.slides" :key="item.goodsId">
			    	<img v-lazy="item.image" width="100%" />
			  	</van-swipe-item>
			</van-swipe>
    	</div>
    	<div class="class-bar">
    		<div v-for="(item, index) in category" class="category-item" @click="selectCategory(index, item.mallCategoryId)">
    			<img :src="item.image" alt="">
    			<span>{{item.mallCategoryName}}</span>
    		</div>
    	</div>	
    	<div class="advertbanner">
    		<img v-lazy="advertPic" width="100%" />
    	</div>
    	<div class="recommend">
    		<div class="recommend-title">
    			商品推荐
    		</div>
    		<div class="recommend-wrapper">
    			<slider :options="options" :items="recommend"></slider>
    		</div>
    	</div>
    	<template v-for="(floor,index) in floors">
    		<floor :floorData="floor">{{index+1}}</floor>
    	</template>	
    	<!-- <floor :floorData="floor2" :floorTitle="floorName.floor2"></floor>
    	<floor :floorData="floor3" :floorTitle="floorName.floor3"></floor> -->
    	<div class="hot-wrapper">
    		<div class="hot-title">热卖商品</div>
			<div class="hot-goods">
			    <van-list
				  v-model="loading"
				  :finished="finished"
				  finished-text="没有更多了"
				>
					<van-row gutter="20">
						<van-col span="12" v-for="item in hotGoods" :key="item.goodsId">
							<goods-info :goods="item"></goods-info>
						</van-col>
					</van-row>
				</van-list>
			</div>
		</div>
	</div>
</template>

<script>
import URL from "../api/serviceAPI"
import Slider from "../components/Slider"
import Floor from "../components/Floor"
import GoodsInfo from "../components/GoodsInfo"
export default {
  	name: 'home',
  	components: {
  		Slider,
  		Floor,
  		GoodsInfo
  	},
  	data() {
  		return {
  			// homeDataUrl: 'https://www.easy-mock.com/mock/5cb161a97aab7f78650d206c/shopmall/',
  			homeData: {},
  			category: [],
  			advertPic: '',
  			recommend: [],
  			options: {
  				slidesPerView: 3,
                spaceBetween: 0,
  			},
  			// floor1: [],
  			// floor2: [],
  			// floor3: [],
  			// floorName: {},
  			floors: {},
  			hotGoods: {},
  			loading: false,
      		finished: true
  		}
  	},
  	methods: {
  		async getHomeData(){
  			try{
  				const result = await this.$http.get(URL.getHomeData)
  				if(result.status == 200) this.homeData = result.data.data
  				this.category = this.homeData.category
  				this.advertPic = this.homeData.advertesPicture.PICTURE_ADDRESS
  				this.recommend = this.homeData.recommend
  				this.floors = this.homeData.floors
  				this.hotGoods = this.homeData.hotGoods
  				// const { data: { data: homeData } } = result
  				// console.log(homeData)
  			}catch(error){
  				console.log(error)
  			}
  		},
  		selectCategory(index, id){
  			this.$router.push({ name: 'category', query: { index, categoryId: id } })
  		}
  	},
  	created(){
  		this.getHomeData()
  	},
}
</script>

<style lang="scss" scoped>
.home{
	.search-bar{
		height: 64px;
		line-height: 64px;
		font-size: 28px;
		background-color: #e5017d;
		text-align: center;
		box-sizing: border-box;
		.icon{
			color: #fff;
			vertical-align: middle;
			font-size: 40px;
		}
		.search-input{
			input{
				width: 90%;
				height: 40px;
				padding: 0 10px;
				background-color: #e5017d;
				appearance: none;
				border: none;
				border-bottom: 1px solid #fff;
				color: #fff;
				font-size: 22px;
				&::-webkit-input-placeholder{
					color: #fff;
					font-size: 22px;
				}
			}
		}
		.search-btn{
			font-size: 24px;
		}
	}
	.swipe-wrapper{
		overflow: hidden;
		width: 100%;
		height: 0;
		padding-bottom: 44.38%;
		/deep/ .van-swipe__indicators{
			bottom: 25px;
		}
	}
	.class-bar{
		display: flex;
		justify-content: space-around;
		margin: 10px 5px;
		background-color: #fff;
		border-radius: 10px;
		.category-item{
			width: 16%;
			font-size: 20px;
			color:#666;
			text-align: center;
			box-sizing: border-box;
			padding: 10px 0;
			img{
				width: 100%;
			}
			span{

			}
		}
	}
	.advertbanner{
		margin: 10px 0;
		height: 50px;
		overflow: hidden;
		img{
			display: block;
		}
	}
	.recommend{
		background-color: #fff;
		.recommend-title{
			height: 45px;
			line-height: 45px;
			font-size: 24px;
			padding: 0 0 10px 10px;
			color:#e5017d;
			border-bottom: 1px solid #eee;
		}
	}
	.hot-wrapper{
		.hot-title{
			height: 45px;
			line-height: 45px;
			text-align: center;
			font-size: 26px;
			color: #c84d2c;
			margin-top: 10px;
		}
		.hot-goods{
			margin-top: 10px;
		}
	}
}	
</style>
