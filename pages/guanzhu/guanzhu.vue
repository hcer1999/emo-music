<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<StatusBar></StatusBar>
		<!-- #endif -->
		关注
	</view>
</template>

<script>
	// 导入空出状态栏位置的组件
	import StatusBar from "@/components/StatusBar.vue"
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		components: {
			StatusBar
		}
	}
</script>

<style>

</style>