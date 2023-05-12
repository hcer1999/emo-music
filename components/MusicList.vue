<template>
	<view class="music-list">
		<view class="head" @click="playAll()">
			<view class="left">
				<i class="iconfont icon-bofang1 play-icon"></i>
				<text class="play-all">播放全部</text>
				<text class="list-count">({{songCount}})</text>
			</view>
			<view class="right">
				<i class="iconfont icon-xiazai i-down"></i>
				<i class="iconfont icon-duoxuan i-check"></i>
			</view>
		</view>
		<view class="list">
			<view v-for="(item,index) in listData" :key="item.id" class="item">
				<u-row @click="play(item)">
					<u-col span="1">
						<text class="index">{{index + 1}}</text>
					</u-col>
					<u-col span="9" class="music-info">
						<u--text class="music-name" :lines="1" :text="item.name" size="18"></u--text>
						<view class="desc">
							<text v-if="item.fee === 1" class="tag">VIP</text>
							<text v-if="item.hr !== null" class="tag">Hi-Res</text>
							<text v-if="item.hr === null &&item.sq !== null" class="tag">SQ</text>
							<u--text class="music-author" :lines="1" size="12" :text="item | authorAndAlbum"></u--text>
						</view>

					</u-col>
					<u-col span="1">
						<i v-if="item.mv" class="iconfont icon-bofang2"></i>
					</u-col>
					<u-col span="1">
						<i class="iconfont icon-gengduo"></i>
					</u-col>
				</u-row>
			</view>
		</view>


	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		props: ["listData", "songCount"],
		methods: {
			async play(item) {
				this.$store.dispatch("playMusic", item.id)
			},
			playAll() {
				uni.showToast({
					icon: "none",
					title: '敬请期待',
					duration: 1500
				})
			}
		},
		filters: {
			// 将作者以及专辑名文本形式返回  d为数组
			authorAndAlbum(d) {
				// console.log(d);
				let t = ''
				d.ar.forEach(item => {
					t = t + '/' + item.name
				})
				// t 就是作者名
				t = t.replace('/', '')
				// a 为专辑名
				let a = d.al.name

				return a === undefined ? t : t + ' - ' + a
			}
		},
		computed: {
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters([
				'getPlayMusic',
				'getPlayUrl', 'getIsPlay', 'setIsPlay'
				// ...
			]),
		},

	}
</script>

<style lang="scss" scoped>
	.music-list {
		padding: 20rpx;

		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0;
			// position: sticky;
			background-color: #fff;
			height: 90rpx;

			.left {
				.play-icon {
					color: #f56c6c;
					font-size: 45rpx;
				}

				.play-all {
					font-size: 40rpx;
					margin: 0 20rpx;
				}

				.list-count {
					font-size: 24rpx;
					color: #95a5a6;
				}
			}

			.right {
				.iconfont {
					font-size: 45rpx !important;
					padding: 20rpx;
				}
			}
		}

		.list {
			.item {

				// border-bottom: 3rpx solid #ccc;
				.index {
					padding: 20rpx;
				}

				.music-info {
					padding: 18rpx 0rpx 18rpx 40rpx !important;

					.music-name {
						font-size: 36rpx;
						margin-bottom: 5rpx;
					}

					.desc {
						display: flex;
						align-items: center;

						.tag {
							display: inline-block;
							font-size: 20rpx !important;
							color: red;
							border: 1px solid red;
							padding: 2rpx 6rpx;
							margin: 0 10rpx 0 0;
							border-radius: 6rpx;

						}

						.music-author {
							font-size: 24rpx;
							color: #95a5a6;

						}
					}

				}

				.iconfont {
					font-size: 50rpx;
					color: #95a5a6;
				}

				.icon-bofang2 {
					font-size: 70rpx;
				}

				.icon-gengduo {
					// margin: 0 20rpx;
					margin-left: 10rpx;
				}
			}

		}
	}
</style>