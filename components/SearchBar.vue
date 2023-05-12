<template>
	<view class="search-bar">
		<!-- #ifdef APP-PLUS -->
		<StatusBar></StatusBar>
		<!-- #endif -->
		<!-- 搜索部分 -->
		<u-row class="search-haed">
			<u-col span="1">
				<u-icon name="arrow-left" color="#909399" size="28" @click="back()"></u-icon>
			</u-col>
			<u-col span="11">
				<u-search :placeholder="placeholder" @search="search()" @custom="search()" margin="10rpx" clearabled
					shape="round" height="75rpx" v-model="searchVal"></u-search>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	import http from "@/utils/request/index.js"
	// 导入空出状态栏位置的组件
	import StatusBar from "@/components/StatusBar.vue"
	export default {
		data() {
			return {
				searchVal: '',
				placeholder: ""
			};
		},
		props: ["sVal"],
		methods: {
			back() {
				uni.navigateBack()
			},
			search() {
				// 如果没输入搜索内容,则搜索placeholder内容
				let searchText = ''
				if (this.searchVal === '') {
					searchText = this.placeholder
				} else {
					searchText = this.searchVal
				}
				// 将搜索的内容存入localstorage
				// 先判断里面有没有重复的数据
				// console.log(getLocal);

				let searchHistory = uni.getStorageSync("searchHistory") ? uni.getStorageSync("searchHistory") : ""
				console.log(searchHistory);
				let searchHistoryArr = []
				if (searchHistory === "") {
					searchHistoryArr = []
					// console.log(222);
				} else {
					// 先将其转换成数组
					// 使用,号分隔
					// console.log(123);
					searchHistoryArr = searchHistory.split(",")
				}


				if (searchHistoryArr.includes(searchText)) {
					// 如果搜索历史中存在，就不存了
				} else {
					// 如果不存在，需要将搜索内容以数组形式存入
					// 如果数量大于10个，就把最后一个弹出
					if (searchHistoryArr.length >= 10) {
						searchHistoryArr.pop()
					}

					searchHistoryArr.unshift(searchText)
					searchHistory = searchHistoryArr.join(",")
					console.log(searchHistory);
					uni.setStorageSync("searchHistory", searchHistory)

				}
				// 把搜索内容传递给父元素
				console.log(searchHistoryArr);
				this.$emit("childSearch", searchHistoryArr)
				uni.navigateTo({
					url: "/pages/searchResult/searchResult?s=" + searchText
				})

			},
			// 获取默认搜索文本
			async getDefaultSearch() {
				const res = await http("common.SearchDefaultText")

				// console.log(res);
				if (res.code !== 200) {
					return
				}
				// console.log(res);
				this.placeholder = res.data.showKeyword

			}
		},
		components: {
			StatusBar
		},
		created() {
			// console.log(this.sVal);
			this.searchVal = this.sVal
			this.getDefaultSearch()
		}
	}
</script>

<style lang="scss" scoped>
	.search-haed {
		display: flex;
		align-items: center;
		padding: 30rpx 10rpx;
		// padding: 0 10rpx;
		height: 50rpx;

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