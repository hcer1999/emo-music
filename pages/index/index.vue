<template>
	<view class="main">
		<!-- #ifdef APP-PLUS -->
		<StatusBar></StatusBar>
		<!-- #endif -->
		<!-- 搜索部分 -->
		<view class="search">
			<i style="font-size:60rpx;" class="iconfont icon-list"></i>
			<u--input placeholder="从这里发起搜索" prefixIcon="search" suffixIcon="scan"
				prefixIconStyle="font-size: 25px;color: #909399" @focus="toSearch()"></u--input>
			<i style="font-size: 60rpx; margin: 0 20rpx 0  10rpx;" class="iconfont icon-mianfei"></i>
			<i style="font-size: 60rpx;" class="iconfont icon-maikefeng"></i>
		</view>
		<!-- 头部轮播图 -->
		<indexSwipe :bannerList="bannerImages"></indexSwipe>
		<!-- 圆形图标入口 -->
		<ScrollList></ScrollList>
		<!-- 推荐歌单 -->
		<RecommendedPlaylist :rPlayList="playList"></RecommendedPlaylist>
		<!-- 热门播客 -->
		<TopPodcasts :data="topPodcastsList"></TopPodcasts>
		<!-- <text style="display:block;height: 300rpx;text-align: center;margin-top: 100rpx;">------有待更新------</text> -->
		<MiniPlay :bottom="100"></MiniPlay>
		<!-- <Tabbar></Tabbar> -->
		<!-- <u-notify message="获取数据失败!" type="error" :show="isShowError"></u-notify> -->
	</view>
</template>

<script>
	import Tabbar from "@/components/Tabbar.vue"
	import ScrollList from "@/components/index/ScrollList.vue"
	import RecommendedPlaylist from "@/components/index/RecommendedPlaylist.vue"
	import indexSwipe from "@/components/index/indexSwipe.vue"
	import TopPodcasts from "@/components/index/TopPodcasts.vue"
	import MiniPlay from "@/components/MiniPlay.vue"
	import http from "@/utils/request/index.js"
	// 导入空出状态栏位置的组件
	import StatusBar from "@/components/StatusBar.vue"
	export default {
		data() {
			return {
				title: 'Hello',
				indexData: {},
				userInfo: {
					userName: '',
					userPic: ''
				},
				isShowError: true,
				bannerList: [],
				bannerImages: [],
				// 推荐歌单列表
				playList: [],
				// 热门博客列表数据
				topPodcastsList: []
			}
		},
		onLoad() {
			this.init()
			this.isShowError = true
		},
		methods: {
			async init() {
				const res = await http('common.IndexData')

				uni.showLoading({
					title: '加载中...'
				});
				if (res.code !== 200) {
					uni.hideLoading()
					uni.showToast({
						title: '获取首页数据失败！',
						icon: 'error',
						duration: 1000
					});
					return
				}
				uni.hideLoading()
				this.indexData = res
				this.bannerList = this.indexData.data.blocks[0].extInfo.banners
				// 保存推荐歌单列表
				this.playList = this.indexData.data.blocks[1].creatives
				// 保存热门博客列表
				this.topPodcastsList = this.indexData.data.blocks[2].creatives
				// console.log(this.playList);
				this.bannerImagesAdd()
				console.log(this.indexData);
			},
			//将图片存入banner数组中
			bannerImagesAdd() {
				for (let key in this.bannerList) {
					this.bannerImages.push(this.bannerList[key].pic)
				}
			},
			async getUserInfo() {

			},
			toSearch() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			}

		},
		components: {
			Tabbar,
			ScrollList,
			RecommendedPlaylist,
			indexSwipe,
			TopPodcasts,
			MiniPlay,
			StatusBar
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		margin-bottom: 182rpx;
	}

	.search {
		display: flex;
		align-items: center;
		margin: 30rpx 10rpx;
		// padding: 0 10rpx;
		height: 60rpx;

		.u-input {
			height: 50rpx;
			margin: 0 20rpx;
			border-radius: 40rpx;

			/deep/ span {
				font-size: 25px;
			}
		}

		i {
			font-size: 30rpx;
			color: #4d4c5a;
		}
	}
</style>