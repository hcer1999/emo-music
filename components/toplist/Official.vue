<template>
	<view class="officoal-top-list">
		<view class="title">
			<u-avatar class="icon" src="../../static/tabbar/index-h.png" shape="circle" size="20"></u-avatar>
			<text class="text">官方榜</text>
		</view>
		<view class="card" v-for="topItem in list" :key="topItem.id">
			<view class="top-title">
				<text class="name">{{topItem.name}}</text>
				<text class="desc">{{topItem.updateFrequency}}</text>
			</view>
			<u-row gutter="10" class="content" @click="playListClick(topItem.id)">
				<u-col span="3" class="pic">
					<u--image :showLoading="true"
						:src="topItem.coverImgUrl"
						width="130rpx"
						height="130rpx"
						radius="4px"></u--image>
				</u-col>
				<u-col span="8" class="index">
					<u--text class="music-item" :lines="1" size="14"
						:text="`${index + 1} ${musicItem.first} - ${musicItem.second}`" v-for="(musicItem,index) in topItem.tracks"></u--text>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: ["list"],
		methods:{
			playListClick(id){
				uni.navigateTo({
					url:"/pages/playList/playList?id=" + id,
					
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.officoal-top-list {
		margin-top: 20rpx;

		.title {
			display: flex;
			align-items: center;

			.icon {
				margin: 10rpx;
			}

			.text {
				font-size: 36rpx;
			}
		}

		.card {
			background-color: #ecf0f1;
			margin: 15rpx 30rpx 30rpx 30rpx;
			padding: 20rpx 40rpx;
			border-radius: 30rpx;
			height: 210rpx;
			.top-title {
				height: 70rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;
				.name {
					font-size: 40rpx;
					font-weight: bold;
				}
				.desc {
					font-size: 24rpx;
				}
			}
			.content{
				.pic {
					
				}
				.index {
					.music-item{
						// font-size: 26rpx;
						padding: 5rpx 0;
					}
				}
			}
		}
	}
</style>