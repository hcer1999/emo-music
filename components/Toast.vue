<template>
	<view>
		<!-- //封装一个uToast组件用来提示 -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		name: "Toast",
		data() {
			return {

			};
		},
		props: {
			type: {
				type: String,
				default: 'primary'
			},
			message: {
				type: String,
				default: ''
			},
		},
		created(){
			console.log(this.type)
		},
		onLoad() {
			console.log(123);
			this.showToast(this.type, this.message)
		},
		methods: {
			showToast(type, msg) {
				this.$refs.uToast.show({
					type: type,
					message: msg,
				})
			}
		},
		watch: {
			type(newValue, oldValue) {
				this.showToast(this.type, this.message)
			}
		},
	}
</script>

<style lang="scss">

</style>