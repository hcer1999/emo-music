<template>
	<view class="search">

		<!-- 搜索部分 -->
		<SearchBar :sVal="''" @childSearch="childSearch"></SearchBar>
		<view class="search-history">
			<view class="title">
				<text>搜索历史</text>
			</view>
			<view class="content">
				<u-tag plain shape="circle" type="error" v-for="item in searchHistory" :key="" :text="item"
					@click="tagClick(item)"></u-tag>
			</view>
		</view>
		<view class="search-hot">
			<view class="title">
				<text>热门搜索</text>
			</view>
			<view class="content">
				<u-tag plain shape="circle" type="error" v-for="(item,index) in searchHot" :key="index"
					:text="item.first" @click="tagClick(item.first)"></u-tag>
			</view>
		</view>
	</view>
</template>

<script>
	import SearchBar from "@/components/SearchBar"
	import http from "@/utils/request/index.js"
	// 导入空出状态栏位置的组件
	import StatusBar from "@/components/StatusBar.vue"
	export default {
		data() {
			return {
				// 搜索历史列表数据
				searchHistory: [],
				// 热门搜索列表数据
				searchHot: []
			};
		},
		created() {
			// 从localstorage中读取搜索历史并转换成数组
			this.searchHistory = this.getSearchHistory
			this.getHotSearch()
		},
		mounted() {
			// this.searchHistory = this.getSearchHistory
		},
		computed: {
			getSearchHistory() {
				// 从localstorage中读取搜索历史并转换成数组
				let str = uni.getStorageSync("searchHistory")
				console.log(str);
				if (str === null || str === '') {
					return
				}
				return str.split(",")
			}
		},
		methods: {
			// 标签被点击事件
			tagClick(searchVal) {
				// 将当前搜索内容存入localstorage
				// 先判断里面有没有重复的数据
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
				if (searchHistoryArr.includes(searchVal)) {
					// 如果搜索历史中存在，就不存了
				} else {
					// 如果不存在，需要将搜索内容以数组形式存入
					// 如果数量大于10个，就把最后一个弹出
					if (searchHistoryArr.length >= 10) {
						searchHistoryArr.pop()
					}
					searchHistoryArr.unshift(searchVal)
					this.searchHistory = searchHistoryArr
					searchHistory = searchHistoryArr.join(",")
					// console.log(searchHistory);
					uni.setStorageSync("searchHistory", searchHistory)

				}
				uni.navigateTo({
					url: "/pages/searchResult/searchResult?s=" + searchVal
				})
			},
			// 子组件搜索后把最新搜索历史记录传过来
			childSearch(arr) {
				this.searchHistory = arr
			},
			// 获取热门搜索
			async getHotSearch() {
				const res = await http('common.SearchHot')
				if (res.code !== 200) {

					return
				}

				this.searchHot = res.result.hots

			}
		},
		watch: {
			getSearchHistory() {

			}
		},
		components: {
			SearchBar
		}
	}
</script>

<style lang="scss" scoped>
	.search {


		.search-history {
			padding: 10rpx 20rpx;

			.title {
				font-size: 38rpx;
			}

			.content {
				margin-top: 20rpx;
				display: flex;
				justify-content: left;
				flex-wrap: wrap;

				/deep/ .u-tag {
					margin: 20rpx;
				}
			}
		}

		.search-hot {
			padding: 10rpx 20rpx;

			.title {
				font-size: 38rpx;
			}

			.content {
				margin-top: 20rpx;
				display: flex;
				justify-content: left;
				flex-wrap: wrap;

				/deep/ .u-tag {
					margin: 20rpx;
				}
			}
		}
	}
</style>