<template>
	<view>
		<!-- <scroll-view scroll-x class="scroll-list">
			<view v-for="item in list" :key="item.id" class="scroll-item">
				<image :src="item.iconUrl"></image>
				<text style="color: #fff;">{{item.name}}</text>
			</view>
		</scroll-view> -->
		<scroll-view scroll-x class="scroll-list">
			<view v-for="item in list" :key="item.id" class="scroll-item" @click="btnsClick(item.id)">

				<i class="iconfont icon" :class="item.icon">
					<text class="day" v-if="item.id === 0"> {{getDay}}</text>
				</i>
				<text style="color: #000;">{{item.name}}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "ScrollList",
		data() {
			return {
				list: [{
					id: 0,
					icon: 'icon-meirituijian',
					name: '每日推荐'
				}, {
					id: 1,
					icon: 'icon-sirenFM',
					name: '私人FM'
				}, {
					id: 2,
					icon: 'icon-zuixingedan',
					name: '歌单'
				}, {
					id: 3,
					icon: 'icon-paihangbang',
					name: '排行榜'
				}, {
					id: 4,
					icon: 'icon-zhibo',
					name: '直播'
				}, {
					id: 5,
					icon: 'icon-zhuanji',
					name: '数字专辑'
				}, {
					id: 6,
					icon: 'icon-youshengshu',
					name: '有声书'
				}, {
					id: 7,
					icon: 'icon-guanzhuxinge',
					name: '关注新歌'
				}, ]
			};
		},
		created() {
			// console.log(123);
			// this.getIndexEntrance()
		},
		methods: {
			// 获取首页圆形图标入口图片
			// async getIndexEntrance() {
			// 	const {
			// 		data: res
			// 	} = await this.$axios.get('/homepage/dragon/ball')
			// 	if (res.code !== 200) return
			// 	this.list = res.data
			// 	console.log(res);
			// }
			btnsClick(id) {
				if (id !== 3) {
					uni.showToast({
						title: '正在开发中...',
						icon: 'none',
						duration: 1000
					});
					return
				}
				uni.navigateTo({
					url: '/pages/toplist/toplist'
				})

			}
		},
		computed: {
			// 返回当天的日期
			getDay() {
				return new Date().getDate()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-list {
		// background-color: #1989fa;
		height: 180rpx;

		/deep/ .uni-scroll-view-content {
			display: flex;
			align-items: center;

			.scroll-item {
				width: 200rpx;
				height: 200rpx;
				text-align: center;
				display: flex;
				flex-direction: column;
				justify-content: center;

				.icon {
					display: inline-block;
					width: 150rpx;
					height: 100rpx;
					font-size: 90rpx;
					color: #ea4335;
					position: relative;

					.day {
						color: #fff;
						position: absolute;
						width: 150rpx;
						height: 100rpx;
						line-height: 100rpx;
						left: 0rpx;
						top: 5rpx;
						font-size: 40rpx;
						// margin-top: 15rpx;
						z-index: 999;
					}
				}
			}
		}

	}
</style>