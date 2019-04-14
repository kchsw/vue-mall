<template>
	<section>
		<swiper :options="options" :not-next-tick="options.notNextTick">
			<swiper-slide class="swiper-slide" v-for="item in items" :key="item.goodsId">
				<div class="recommend-item">
					<img :src="item.image" width="100%" />
	                <p>{{item.goodsName}}</p>
	                <p>￥{{item.price | formatMoney}} <span class="line">(￥{{item.mallPrice | formatMoney}})</span></p>
	                <span class="re-icon">推荐</span>
				</div>
			</swiper-slide>
		</swiper>
	</section>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
	name: 'slider',
	components: {
		swiper,
    	swiperSlide
	},
	props: {
		options: {
			type: Object,
			default(){
				return{
					autoplay: true,
					loop: true,
					pagination: {
	                    el: ".swiper-pagination",
	                },
	                notNextTick: false,
				}
			}
		},
		items: {
			type: Array,
			default: []
		}
	},
}
</script>

<style lang="scss" scoped>
 @import "~swiper/dist/css/swiper.css";
.swiper-slide{
	padding-bottom: 2px;
	.recommend-item{
		position: relative;
		height: 300px;
		box-sizing: border-box;
		padding: 0 5px;
		border-right: 1px solid #eee;
		text-align: center;
		p{
			font-size: 20px;
			margin: 0;
			.line{
				text-decoration-line: line-through;
				color: #ccc;
			}
		}
		.re-icon{
			display: inline-block;
			height: 24px;
			font-size: 18px;
			color: #fff;
			position: absolute;
			padding: 0 10px 0 20px;
			border-radius: 12px 0 0 12px;
			background: red;
			top: 160px;
    		right: 5px;
		}
	}
}
</style>

	