<template>
	<view class="other-list">
		<view class="title">
			<text class="text">精选榜</text>
		</view>
		<view class="content">
			<view class="item" v-for="item in otherList" :key="item.id" @click="clickHandle(item.id)">
				<u--image :showLoading="true" :src="item.coverImgUrl" width="220rpx" height="220rpx" radius="4px">
				</u--image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: []
			}
		},
		props: ["otherList"],
		created() {
			// console.log(this.list);
			// this.dataList = this.list
			// console.log(this.dataList.length);
			// console.log(Math.ceil(this.dataList.length / 3));
		},
		methods:{
			clickHandle(id){
				uni.navigateTo({
					url:"/pages/playList/playList?id=" + id,
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.other-list {
		padding: 0 20rpx;

		.title {
			height: 66rpx;
			margin-left: 20rpx;
			.text {
				font-size: 36rpx;
				
			}
		}
		.content {
			display: flex;
			flex-wrap: wrap; 
			justify-content: space-between;
			.item {
				// flex-grow: 12px	;
				margin-bottom: 20rpx;
			}
		}
	}
</style>