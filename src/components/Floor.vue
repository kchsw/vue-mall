<template>
	<div class="floor">
		<div class="floor-title"><span class="floor-number"></span>{{floorTitle}}</div>
		<div class="floor-image">
			<div class="floor-anomaly">
                <div class="floor-left"><img :src="floorData_0.image" width="100%" /></div>
                <div class="floor-right">
                    <div class="floor-right-item" v-for="item in floorData_1" :key="item.image"><img :src="item.image" width="100%" />
                    </div>
                </div>
            </div>
            <div class="floor-rule">
                <div class="floor-rule-item" v-for="item in floorData_2" :key="item.image">
                    <img :src="item.image" width="100%"/>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'floor',
		data() {
			return {
				floorData_0: {},
				floorData_1: [],
				floorData_2: [],
			}
		},
		props: {
			floorTitle: {
				type: String,
				default: '商品'
			},
			floorData: {
				type: Array,
				default: () => []
			}
		},
		watch: {
			floorData(){
				this.floorData_0 = this.floorData[0]
				this.floorData_1 = this.floorData.slice(1,3)
				this.floorData_2 = this.floorData.slice(3)
			}
		}
	}
</script>

<style lang="scss" scoped>
.floor{
	margin-top: 10px;
	.floor-title{
		height: 45px;
		line-height: 45px;
		text-align: center;
		font-size: 26px;
		color: #c84d2c;
	}
	.floor-image{
		margin-top: 10px;
		div{
			box-sizing: border-box;
		}
		img{
			display: block;
		}
		.floor-anomaly{
			display: flex;
			border-bottom:1px solid #eee;
			.floor-left{
				flex: 1;
				border-right:1px solid #eee;
			}
			.floor-right{
				flex: 1;
				display: flex;
				flex-direction: column;
			}
			.floor-right-item{
				&:first-child{
					border-bottom:1px solid #eee;
				}
			}
		}
		.floor-rule{
			display: flex;
			flex-wrap: wrap;
			.floor-rule-item{
				flex: 1;
				&:nth-child(odd){
					border-right: 1px solid #eee;
				}
			}
		}
	}
}
</style>

<!-- <script>
	var floors = [
	]
	var obj = {
		floorTitle: '',
		floor: []
	}
	var floor = [floor1, floor2, floor3]
	var arr = []
	for ( var key in obj){
		arr.push(obj[key])
	}
	floor.forEach((itm, idx) => {
		
	} )
</script> -->