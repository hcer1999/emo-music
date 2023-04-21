<template>
	<view class="top-podcasts">
		<Toast :type='toastInfo.type' :message='toastInfo.message'></Toast>
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
					<div class="list-right">
						<text class="music-name">{{item1.uiElement.mainTitle.title}}</text>
						<view class="sub-title">
							<text v-if="item1.uiElement.subTitle !== undefined"
								class="tag">{{ getTag(item1.uiElement)}}</text>
							<text class="author">{{item1.resourceExtInfo.artists | author}}</text>
						</view>

					</div>

				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// import store from '@/store/index.js'; //需要引入store
	import Toast from '@/components/Toast.vue'
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
				// 判断是否正在播放
				if (this.getIsPlay) {
					this.$store.commit("setIsPlay", 0)
					console.log('成功关闭当前播放事件');
				}
				// 先获取歌曲信息
				// const {
				// 	data: res
				// } = await this.$axios.get(`/song/detail?ids=${id}`)

				const {
					data: res
				} = await this.$http({
					url: `/song/detail?ids=${id}`,
					methods: "GET"
				})
				if (res.code !== 200) {
					this.notifyInfo = {
						type: 'error',
						message: '获取歌曲信息失败!',
						show: true
					}
					return
				}
				this.musicInfo = res
				console.log(this.musicInfo);
				// uni.$store.state.palyMusic = res
				// 获取信息成功,再获取播放地址
				// const {
				// 	data: res1
				// } = await this.$axios.get(`/song/url?id=${id}`)
				const {
					data: res1
				} = await this.$http({
					url: `/song/url?id=${id}`,
					methods: "GET"
				})
				if (res1.code !== 200) {
					this.notifyInfo = {
						type: 'error',
						message: '获取歌曲播放地址失败!',
						show: true
					}
					return
				}
				// this.notifyInfo = {
				// 	type: 'success',
				// 	message: `开始播放:${res.name}`,
				// 	show: true
				// }



				this.playUrl = res1.data[0].url
				this.playInfo.name = this.musicInfo.songs[0].name
				this.playInfo.author = this.musicInfo.songs[0].ar[0].name
				this.playInfo.poster = this.musicInfo.songs[0].al.picUrl

				// 将当前播放歌曲的信息存入Vuex
				this.$store.commit("setPlayMusic", this.playInfo)
				this.$store.commit("setPlayUrl", res1.data[0].url)
				this.$store.commit("setIsPlay", 1)
				console.log('成功将歌曲压入VUEX');
				this.$AudioContext.src = this.getPlayUrl
				// 将图片的旋转角度变回0度


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
		components: {
			Toast
		},
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
					margin-left: 30rpx;
					font-size: 40rpx;
					font-weight: 200px;

				}
			}

			.right {
				margin-right: 20rpx;
			}
		}

		.scroll-list {
			padding: 0 20rpx;

			/deep/.uni-scroll-view-content {
				display: flex;

				.row {
					display: flex;
					flex-direction: column;

					.col {
						display: flex;
						margin-top: 20rpx;

						// justify-content: space-around;
						.pic {
							max-height: 170rpx;
							max-width: 170rpx;
							border-radius: 20rpx;
						}

						.list-right {
							margin-left: 20rpx;
							width: 520rpx;
							display: flex;
							flex-direction: column;
							justify-content: center;

							.music-name {
								// display: block;
								font-size: 40rpx;
								font-weight: bold;
							}

							.sub-title {
								font-size: 30rpx;
								color: #b2bec3;
								margin-top: 10rpx;
								display: flex;
								flex-wrap: nowrap;
								align-items: center;

								.tag {
									box-sizing: border-box;
									padding: 7rpx;
									margin-right: 15rpx;
									background-color: #f5e6e6;
									color: #d63031;
									border-radius: 10rpx;
									font-weight: bold;
									font-size: 20rpx;
									line-height: 40rpx;
								}

								.author {
									max-width: 200rpx;
									overflow: hidden;
								}
							}
						}
					}
				}
			}

		}
	}
</style>