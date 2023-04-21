<template>
	<view class="banner-swipe">
		<u-swiper :list="bannerList" indicator indicatorMode="line" circular @click="bannerClick"></u-swiper>
	</view>
</template>

<script>
	export default {
		name: "indexSwipe",
		data() {
			return {
			};
		},
		props: {
			bannerList: {
				type: Array,
				default: []
			}

		},
		methods:{
			bannerClick(){
				uni.showToast({
					title: '正在开发中...',
					icon: 'none',
					duration: 1000
				});
			}
		}
	}
</script>

<style lang="scss">
	.banner-swipe {
		margin: 20rpx;
		border-radius: 30rpx !important;
	}
</style>