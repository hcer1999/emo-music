<template>
	<view class="top-podcasts">
		<view class="title">
			<view class="left">
				<text class="top-podcasts-title">热门歌曲 <i class="iconfont icon-youjiantou"></i></text>
			</view>
			<view class="right">
				<i class="iconfont icon-androidgengduo"></i>
			</view>
		</view>
		<scroll-view scroll-x class="scroll-list">
			<!-- 外层4列数据 -->
			<view v-for="(item,index) in data" class="row" :key="index">
				<view v-for="item1 in item.resources" class="col" :key="item1.resourceId"
					@click="play(item1.resourceId)">
					<image class="pic" :src="item1.uiElement.image.imageUrl" mode=""></image>
					<view class="list-right">
						<u--text :lines="1" size="18" bold :text="item1.uiElement.mainTitle.title"></u--text>
						<view class="sub-title">
							<text v-if="item1.uiElement.subTitle !== undefined && getTag(item1.uiElement).length <= 7"
								class="tag">{{ getTag(item1.uiElement)}}</text>
							<!-- 					<u--text class="tag" :lines="1"
								v-if="item1.uiElement.subTitle !== undefined && getTag(item1.uiElement).length <= 7"
								size="12" :text="getTag(item1.uiElement)"></u--text> -->
							<u--text :lines="1" size="12" :text="item1.resourceExtInfo.artists | author"></u--text>
						</view>


					</view>

				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'TopPodcasts',
		data() {
			return {
				notifyInfo: {
					show: false,
					message: '',
					type: 'primary'
				},
				toastInfo: {
					type: 'primary',
					message: ''
				},
				playUrl: '',
				musicInfo: {},
				playInfo: {
					name: '',
					author: ',',
					poster: ''
				},
			}
		},
		created() {
			// console.log(uni.$store);

		},
		methods: {
			// 获取歌曲副标题
			getTag(data) {
				// console.log(data.subTitle);
				if (data.subTitle !== undefined) {
					// 存在tag
					return data.subTitle.title
				} else {
					return ''
				}
			},
			// 点击播放歌曲
			async play(id) {
				this.$store.dispatch("playMusic", id)
			},
			// 
			// showToast() {
			// 	this.$refs.uToast.show({
			// 		type: 'success',
			// 		message: `正在播放：${this.playInfo.name}`,
			// 	})
			// }
		},
		props: {
			data: {
				type: Array,
				default: []
			}
		},
		filters: {
			// 将作者以文本形式返回  d为数组
			author(d) {
				// console.log(d);
				let t = ''
				d.forEach(item => {
					t = t + '/' + item.name
				})
				return t.replace('/', '')
			}
		},
		components: {},
		computed: {
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters([
				'getPlayMusic',
				'getPlayUrl', 'getIsPlay', 'setIsPlay'
				// ...
			])
		}
	}
</script>

<style lang="scss" scoped>
	.top-podcasts {
		margin-top: 20rpx;

		// margin: 20rpx;
		.title {
			margin-bottom: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 40rpx;

			i {
				font-size: 40rpx;
			}

			.left {
				.top-podcasts-title {
					margin-left: 20rpx;
					font-size: 40rpx;
					font-weight: 200px;

				}
			}

			.right {
				margin-right: 20rpx;
			}
		}

		.scroll-list {
			/deep/.uni-scroll-view-content {
				display: flex;

				.row {
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;

					.col {
						display: flex;
						margin-top: 20rpx;

						// justify-content: space-around;
						.pic {
							max-height: 140rpx;
							max-width: 140rpx;
							border-radius: 20rpx;
						}

						.list-right {
							margin: 20rpx 40rpx;
							width: 450rpx;
							// display: flex;
							// flex-direction: column;
							// justify-content: center;

							.music-name {
								display: block;
								// max-width: 450rpx;
							}



							.sub-title {
								font-size: 30rpx;
								color: #b2bec3;
								margin-top: 10rpx;
								display: flex;
								align-items: center;
								justify-content: flex-start;

								.tag {
									// box-sizing: border-box;
									flex-shrink: 0;
									padding: 7rpx;
									margin-right: 15rpx;
									background-color: #f5e6e6;
									color: #d63031;
									border-radius: 10rpx;
									font-weight: bold;
									font-size: 20rpx;
									line-height: 40rpx;
									flex-wrap: nowrap;
								}

								.author {
									// max-width: 200rpx;
									overflow: hidden;
									// （文字长度超出限定宽度，则隐藏超出的内容）
									white-space: nowrap;
									// （设置文字在一行显示，不能换行）
									text-overflow: ellipsis;
									// （规定当文本溢出时，显示省略符号来代表被修剪的文本）
								}
							}
						}
					}
				}
			}

		}
	}
</style>