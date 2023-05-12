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
			<view v-for="item in rPlayList" class="recommendedPlayListItem" :key="item.creativeId"
				@click="playListClick(item.creativeId)">
				<image :src="item.uiElement.image.imageUrl"></image>
				<i class="iconfont icon-bofang1 playIcon"></i>
				<u--text :text="item.uiElement.mainTitle.title"></u--text>
				<text class="playCount"><i
						class="iconfont icon-bofang1"></i>{{item.resources[0].resourceExtInfo.playCount | playcount}}</text>
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
		methods: {
			playListClick(id) {
				// uni.showToast({
				// 	title: '正在开发中...',
				// 	icon: 'none',
				// 	duration: 1000
				// });
				uni.navigateTo({
					url: "/pages/playList/playList?id=" + id,
				})
				// console.log(id);
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
				height: 360rpx;
				margin: 20rpx 0rpx 20rpx 40rpx;
				position: relative;

				.playIcon {
					position: absolute;
					bottom: 130rpx;
					right: 20rpx;
					color: #fff;
					font-size: 50rpx;
				}

				uni-image {
					border-radius: 30rpx;
					width: 240rpx;
					height: 240rpx;

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
			margin-left: 20rpx;
			font-size: 40rpx;
			font-weight: 200px;

		}

	}
</style>