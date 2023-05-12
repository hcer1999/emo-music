<template>
	<view class="playlist">
		<!-- #ifdef APP-PLUS -->
		<StatusBar></StatusBar>
		<!-- #endif -->
		<!-- 歌单列表 -->
		<TopTabbar name="歌单"></TopTabbar>
		<!-- 		<i class="iconfont icon-sousuo navbarIcon"></i>
		<i class="iconfont icon-gengduo navbarIcon"></i> -->
		<scroll-view ref="scorll" style="height: 100%;" scroll-y @scrolltolower="scrollToLower()">
			<view class="play-list-info">
				<u-row gutter="20" class="head">
					<u-col span="4" class="pic">
						<u--image :showLoading="true" :src="playListInfo.coverImgUrl" width="100px" height="100px"
							radius="4px"></u--image>
					</u-col>
					<u-col span="8" class="info">
						<text>{{playListInfo.name}}</text>
						<view class="up">
							<u-avatar class="up-pic" :src="creater.url" shape="circle" size="24"></u-avatar>
							<text class="up-name">{{creater.nickname}}</text>
							<u-button class="follow" type="error" shape="circle" size="mini" text="关注"></u-button>
						</view>
						<view class="tags">
							<u-tag class="tag" v-for="(tag,index) in playListInfo.tags" :key="index" :text="tag" plain
								size="mini" type="error"></u-tag>
						</view>
					</u-col>
				</u-row>
				<!-- <view class="desc">{{playListInfo.description}}</view> -->
				<u--text :lines="descLine" class="desc" @click="descLine == 0 ? descLine = 2 : descLine = 0"
					:text="playListInfo.description"></u--text>
				<view class="btns">
					<u-button class="btn" type="error" shape="circle">
						<i class="iconfont icon-zhuanfa btn_icon"></i><text
							class="btn_text">{{playListInfo.shareCount}}</text>
					</u-button>
					<u-button class="btn" type="error" shape="circle">
						<i class="iconfont icon-xiaoxi btn_icon"></i><text
							class="btn_text">{{playListInfo.commentCount}}</text>
					</u-button>
					<u-button class="btn" type="error" shape="circle">
						<i class="iconfont icon-shoucanghover btn_icon"></i><text
							class="btn_text">{{playListInfo.subscribedCount | subScribedCount}}</text>
					</u-button>
				</view>
			</view>
			<view class="ad">
				<!-- <text>'这是一个高仿的网易云音乐11111111'</text> -->
				<u-notice-bar :text="'这是一个高仿的网易云音乐'" fontSize="40rpx" bgColor="#ecf0f1" width="600rpx"
					color="#000"></u-notice-bar>
			</view>
			<MusicList :listData="playListData" :songCount="playListInfo.trackCount" />
			<u-loadmore :status="loadStatus" />
			<!-- #ifdef APP-PLUS -->
			<BottomBar></BottomBar>
			<!-- #endif -->
		</scroll-view>
		<MiniPlay></MiniPlay>
	</view>
</template>

<script>
	import MiniPlay from "@/components/MiniPlay.vue"
	import TopTabbar from "@/components/TopTabbar.vue"
	import http from "@/utils/request/index.js"
	// 导入空出状态栏位置的组件
	import StatusBar from "@/components/StatusBar.vue"
	import MusicList from "@/components/MusicList.vue"
	import BottomBar from "@/components/BottomBar.vue"


	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				// 当前歌单的id
				playListId: "",
				// 歌单信息
				playListInfo: {},
				// 歌单列表数据
				playListData: [],
				// 上传者数据,组件内貌似获取不到嵌套对象中的数据，单独保存一份
				creater: {
					url: '',
					nickname: ''
				},
				// 获取歌单列表时的偏移量
				offset: 0,
				// 获取歌单列表的限制量
				limit: 50,
				playUrl: '',
				musicInfo: {},
				playInfo: {
					name: '',
					author: ',',
					poster: ''
				},
				// 歌单描述显示的行数
				descLine: 2,
				//加载前值为loadmore，加载中为loading，没有数据为nomore
				loadStatus: "loadmore",

			};
		},
		methods: {
			// 获取歌单列表
			async getPlayListById(id) {
				//搜索单曲
				this.loadStatus = "loading"
				const res = await http('common.PlayList', {
					id: id,
					limit: this.limit,
					offset: this.offset
				})

				if (res.code !== 200) {
					uni.showToast({
						icon: 'error',
						title: '获取歌单列表失败！',
						duration: 1500
					})
					uni.hideLoading()
					return
				}
				this.playListData.push(...res.songs)
				uni.hideLoading()
				// this.playListData = res.songs
				console.log(this.playListData);
			},
			// 获取歌单信息
			async getPlayListInfoById(id) {
				uni.showLoading({
					title: '加载中...'
				});

				const res = await http('common.PlayListInfo', {
					id: id
				})

				if (res.code !== 200) {
					uni.hideLoading()
					uni.showToast({
						icon: 'error',
						title: '获取歌单信息失败！',
						duration: 1500
					})
					return
				}
				this.playListInfo = res.playlist
				this.creater = {
					url: this.playListInfo.creator.avatarUrl,
					nickname: this.playListInfo.creator.nickname
				}
				this.getPlayListById(id)
				// console.log(this.playListInfo);
			},
			// 当滚动到底部
			scrollToLower() {
				// 需要先判断偏移量加上当前偏移量（50）是否大于歌曲总数
				console.log(this.offset);
				console.log(this.playListInfo.trackCount);
				if (this.offset + this.limit >= this.playListInfo.trackCount) {
					// 如果小于等于总数,则已获取全部歌曲
					//搜索单曲
					this.loadStatus = "nomore"
					return
				}
				// 获取歌曲
				// 偏移量要加上limit
				this.offset += this.limit
				this.getPlayListById(this.playListId)
			},
			async play(id) {
				this.$store.dispatch("playMusic", id)
			},
			playAll() {
				uni.showToast({
					icon: "none",
					title: '敬请期待',
					duration: 1500
				})
			}
		},
		mounted() {
			// console.log(this.$refs.scorll.$el.style.height);
			// this.$refs.scorll.$el.style.height = '100%'
		},
		filters: {
			// 将作者以文本形式返回  d为数组
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
			},
			// 将数据以万的单位返回
			subScribedCount(count) {
				if (count < 10000) {
					return count
				}
				return Math.floor(count / 10000) + '万'
			}
		},
		components: {
			MiniPlay,
			TopTabbar,
			StatusBar,
			MusicList,
			BottomBar
		},
		computed: {
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters([
				'getPlayMusic',
				'getPlayUrl', 'getIsPlay', 'setIsPlay'
				// ...
			]),
			// 获取专辑名,没有返回空
			getAlbumName(t) {

			}
		},
		onLoad(data) {
			console.log(data.id);
			// this.getPlayListById(data.id)
			this.playListId = data.id
			this.getPlayListInfoById(this.playListId)
		}
	}
</script>

<style lang="scss" scoped>
	.playlist {
		width: 100vw;
		height: 92vh;
		// margin-bottom: 120rpx;
		// .scorll {
		// 	height: 100vh;
		// }
	}

	.navbarIcon {
		color: #4d4c5a;
		font-size: 50rpx;
		position: absolute;
		z-index: 99;
		top: 22rpx;
	}

	.icon-sousuo {
		right: 120rpx;
	}

	.icon-gengduo {
		right: 20rpx;
	}

	.play-list-info {
		margin-top: 100rpx;
		padding: 0rpx 30rpx 30rpx 30rpx;

		.head {
			.info {
				// margin-left: 20rpx;
				padding: 20rpx 0rpx !important;

				.up {
					display: flex;
					align-items: center;
					font-size: 24rpx;
					margin: 10rpx 0;

					.up-name {
						margin: 0 10rpx
					}

					.follow {
						width: 20rpx;
						margin: 0;
					}
				}

				.tags {
					margin: 10rpx 0;
					display: flex;

					.tag {
						margin-right: 20rpx;
					}
				}
			}
		}

		.desc {
			font-size: 28rpx;
			margin: 20rpx 0 !important;
		}

		.btns {
			display: flex;
			justify-content: space-between;

			.btn {
				margin: 0 10rpx;

				.btn_icon {
					margin: 0 10rpx;
					font-size: 45rpx;
				}

				.btn_text {
					font-size: 28rpx;
				}
			}

		}
	}

	.ad {
		width: 750rpx;
		background-color: #ecf0f1;
		height: 100rpx;
		border-radius: 15px 15px 0 0;
		position: relative;

		.u-notice-bar {
			padding: 0 20rpx;
			height: 100rpx;
			line-height: 100rpx;
			position: absolute;
			bottom: 0;
			border-radius: 15px 15px 0 0;
			width: 700rpx;
		}

	}

	.play-list {
		padding: 20rpx;

		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0;
			position: sticky;
			top: 100rpx;
			background-color: #fff;
			height: 100rpx;

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
							font-size: 12rpx !important;
							color: red;
							border: 1px solid red;
							padding: 0 1px;
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

	.bottom-line {
		text-align: center;
		height: 200rpx;
	}
</style>