<template>
	<view class="top-tabbar">
		<!-- 2.0.19支持autoBack，默认为false -->
		<u-navbar :title="name" :autoBack="true" titleWidth="100rpx" height="100rpx">
		</u-navbar>
	</view>
</template>

<script>
	export default {
		name: "TopTabbar",
		props: ["name"],
		data() {
			return {

			};
		},
		created() {
			console.log(this.name);
		}
	}
</script>

<style lang="scss">
	.top-tabbar {

		/deep/ .uicon-arrow-left {
			font-size: 50rpx !important;
		}

		/deep/ .u-navbar__content__title {
			font-size: 40rpx;
			position: absolute;
			left: 90rpx;
			text-align: left;
			width: 400rpx !important;
		}
	}
</style>