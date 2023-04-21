<template>
	<view class="mini-play">
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
					<!-- 					<circle-progress :id="1" :width="50" :radius="20" :progress="100" :delay="200" :duration="10000"
						:barColor="'#F2AE57'" :backgroundColor="'#FFE8CC'" :isAnimation="true"
						:timeFunction="'cubic-bezier(0.99, 0.01, 0.22, 0.94)'"></circle-progress> -->
					<i class="iconfont " :class="playState ? 'icon-bofangzanting' : 'icon-bofang1'"
						@click="playBtnClick"></i>
					<i class="iconfont icon-playlist"></i>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	// import CircleProgress from "@/components/CircleProgress.vue"
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
		computed: {
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters([
				'getPlayMusic',
				'getPlayUrl',
				'getIsPlay'
				// ...
			]),


		},
		mounted() {
			this.$AudioContext.onPlay(() => {
				// console.log('开始播放');
				// this.toastInfo.type = "success"
				// this.toastInfo.message = `正在播放：${this.playInfo.name}`
			});
			this.$AudioContext.onPause(() => {
				// console.log('暂停播放');
				
			})
			this.$AudioContext.onError((res) => {
				console.log(res);
				console.log(res);
			});
		},
		methods: {
			// 点击播放或者暂停图标
			playBtnClick() {
				if (this.getIsPlay === 1) {
					this.$store.commit("setIsPlay", 2)
				} else if (this.getIsPlay === 2) {
					this.$store.commit("setIsPlay", 1)
				}
			},
			rotateOn() {
				this.imgRotate()
			},
			rotateOff() {
				clearInterval(this.timer)
			},
			imgRotate() {
				// 用定时器js控制旋转
				let jd = 0
				this.timer = setInterval(() => {
					this.el = this.$refs.poster
					
					jd = Number(this.el.style.rotate.replace("deg", ""))
					// if (jd === 360) {
					// 	jd = 0
					// }
					jd = jd + 5
					// console.log(jd);
					this.el.style.rotate = jd + "deg"
					// console.log(this.el.style.rotate);
				}, 250)
			}
		},
		watch: {
			getIsPlay() {
				console.log("播放状态" + this.getIsPlay);
				console.log(this.getPlayMusic);
				this.t_musicInfo = this.getPlayMusic
				this.playTitle = `${this.t_musicInfo.name} - ${this.t_musicInfo.author}`
				if (this.getIsPlay === 1) {
					console.log('开始播放');
					this.rotateOn()
					this.playState = true
					this.$AudioContext.play()
				} else if (this.getIsPlay === 0) {
					this.playState = false
					this.$AudioContext.stop()
					console.log('结束播放');
					this.rotateOff()
				} else if (this.getIsPlay === 2) {
					this.playState = false
					this.$AudioContext.pause()
					console.log('暂停播放');
					this.rotateOff()
				} else {
					console.log('未知');
				}
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
		bottom: 120rpx;
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
				transition: all 0.3s linear;

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