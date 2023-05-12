<template>
	<view>
		<view ref="miniPlay" class="mini-play">
			<u-row justify="space-between" gutter="5">
				<u-col span="2" class="pic">
					<!-- <div ref="poster" class="black" :class="playState ? 'rotate' : ''"> -->
					<div ref="poster" class="black">
						<image :src="getPlayMusic.poster" mode=""></image>
					</div>
				</u-col>
				<u-col span="6" class="music-name">
					<view class="title">
						<u--text :lines="1" :text="playTitle"></u--text>
					</view>
				</u-col>
				<u-col span="4">
					<view class="btns">
						<i class="iconfont " :class="playState ? 'icon-bofangzanting' : 'icon-bofang1'"
							@click="playBtnClick"></i>
						<i class="iconfont icon-playlist"></i>
					</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: "MiniPlay",
		data() {
			return {
				t_musicInfo: {},
				playTitle: '等待播放....',
				playState: false,
				// 用来控制图片旋转的定时器
				timer: 0,
				// 旋转图片实例
				el: null

			};
		},
		props: [],
		computed: {
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters([
				'getPlayMusic',
				'getPlayUrl',
				'getIsPlay',
				'getRotateDeg',
				'getPlaySongTitle'
				// ...
			]),


		},
		created() {

		},
		mounted() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				// 判断是否在播放
				if (this.getIsPlay === 1) {
					this.playState = true
					this.playTitle = this.getPlaySongTitle
					this.play()
				} else {
					this.playState = false
				}

				// console.log(this.getRotateDeg);
				// 获取旋转唱片的实例
				// app端就不获取了  获取了也没用
				// #ifndef APP-PLUS
				this.el = this.$refs.poster
				// console.log(this.el.style);
				// 先把transion关闭,再设置角度
				// console.log(this.el.style.transition);
				this.el.style.transition = ""
				if (this.getIsPlay === 0) {
					// 0 为未在播放
					this.el.style.rotate = "0deg"
				} else if (this.getIsPlay === 1) {
					// 1为播放状态
					this.el.style.rotate = this.getRotateDeg + "deg" // 从Vuex中读取上次旋转角度并设置
					// this.play()
				} else if (this.getIsPlay === 2) {
					// 2为暂停播放
					this.el.style.rotate = this.getRotateDeg + "deg" // 从Vuex中读取上次旋转角度并设置
				}

				// 再把transion开启,使唱片旋转
				setTimeout(() => {
					this.el.style.transition = "all 0.3s linear"
				}, 200)
				// #endif

			},
			// 点击播放或者暂停图标
			playBtnClick() {
				if (this.getIsPlay === 1) {
					// 如果是播放状态那就改为暂停,如果是暂停状态就改为播放
					this.$store.commit("setIsPlay", 2)
				} else if (this.getIsPlay === 2) {
					this.$store.commit("setIsPlay", 1)
				}
			},
			rotateOff() {
				clearInterval(this.timer)
			},
			rotateOn() {
				// 用定时器js控制旋转
				let jd = 0
				this.timer = setInterval(() => {
					jd = Number(this.el.style.rotate.replace("deg", ""))
					jd = jd + 5
					this.el.style.rotate = jd + "deg"
					// 再把当前角度保存至Vuex中
					this.$store.commit('setRotateDeg', jd)
					// console.log(this.el.style.rotate);
				}, 250)
			},
			// 播放事件
			play() {
				console.log('开始播放');
				this.playState = true
				this.$store.commit("play")
				// #ifndef APP-PLUS
				this.rotateOn()
				// #endif
			},
			// 播放结束事件
			stop() {
				this.playState = false
				this.$store.commit("stop")
				console.log('结束播放');
				// #ifndef APP-PLUS
				this.rotateOff()
				// #endif
			},
			// 播放暂停事件
			pause() {
				this.playState = false
				this.$store.commit("pause")
				// #ifndef APP-PLUS
				this.rotateOff()
				// #endif
			},
		},
		watch: {
			getIsPlay() {
				// console.log("播放状态" + this.getIsPlay);
				// console.log(this.getPlayMusic);
				this.t_musicInfo = this.getPlayMusic
				this.playTitle = `${this.t_musicInfo.name} - ${this.t_musicInfo.author}`
				if (this.getIsPlay === 1) {
					// 1为播放状态
					this.play()
				} else if (this.getIsPlay === 0) {
					// 0为结束播放
					this.stop()
				} else if (this.getIsPlay === 2) {
					// 2为暂停播放
					this.pause()
				} else {
					console.log('未知错误');
				}
			},
			getPlayUrl(newUrl) {
				console.log(newUrl);
				// #ifndef APP-PLUS
				this.el.style.transition = ""
				this.el.style.rotate = "0deg"
				setTimeout(() => {
					this.el.style.transition = "all 0.3s linear"
				}, 200)
				// #endif

			}

		},
		components: {
			// CircleProgress
		}
	}
</script>

<style lang="scss" scoped>
	.mini-play {
		height: 120rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		width: 750rpx;
		bottom: var(--window-bottom);
		border-bottom: 2rpx;
		padding: 4rpx 20rpx;

		.pic {
			.black {
				background-color: #000;
				// background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
				border-radius: 50%;
				width: 100rpx;
				height: 100rpx;
				position: relative;
				// transition: all 0.3s linear;

				uni-image {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			}

			.rotate {
				animation: rotate 10s linear infinite;
			}


		}

		.title {
			// background-color: pink;
			font-size: 40rpx;
		}

		.btns {
			margin-left: 20rpx;

			i {
				font-size: 50rpx;
				margin: 20rpx;
				color: #3f4655;
			}
		}
	}
</style>