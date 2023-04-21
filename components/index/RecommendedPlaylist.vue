<template>
	<view class="recommendedPlayList">
		<view class="title">
			<view class="left">
				<text class="recommendedPlayListTitle">推荐歌单<i class="iconfont icon-youjiantou"></i></text>
			</view>
			<view class="right">
				<i class="iconfont icon-androidgengduo"></i>
			</view>
		</view>
		<scroll-view scroll-x class="scroll-list">
			<view v-for="item in rPlayList" class="recommendedPlayListItem" :key="item.creativeId" @click="playListClick()">
				<image :src="item.uiElement.image.imageUrl"></image>
				<text>{{item.uiElement.mainTitle.title}}</text>
				<text class="playCount">{{item.resources[0].resourceExtInfo.playCount | playcount}}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "RecommendedPlaylist",
		data() {
			return {};
		},
		props: {
			rPlayList: {
				type: Array,
				default: []
			}
		},
		created() {},
		methods:{
			playListClick(){
				uni.showToast({
					title: '正在开发中...',
					icon: 'none',
					duration: 1000
				});
			}
		},
		filters: {
			// 将播放次数转换成万单位
			playcount(count) {
				if (count > 10000) {
					return Math.floor(count / 10000) + '万'
				}
				return count
			}
		}
	}
</script>

<style lang="scss">
	.recommendedPlayList {
		margin-top: 20rpx;

		.scroll-list {
			/deep/.uni-scroll-view-content {
				display: flex;
			}

			.recommendedPlayListItem {
				height: 400rpx;
				margin: 20rpx;
				position: relative;

				uni-image {
					border-radius: 30rpx;
					width: 300rpx;
					height: 300rpx;

				}

				.playCount {
					position: absolute;
					top: 20rpx;
					right: 20rpx;
					color: #fff;
					font-weight: bold;
					box-shadow: rgba(255, 255, 255, 0.1)
				}
			}
		}

		// padding: 0 40rpx;
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left i {
				font-size: 40rpx;
			}

			.right i {
				font-size: 40rpx;
				margin-right: 20rpx;
			}
		}



		.recommendedPlayListTitle {
			margin-left: 30rpx;
			font-size: 40rpx;
			font-weight: 200px;

		}

	}
</style>