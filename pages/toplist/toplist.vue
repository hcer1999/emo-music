<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<StatusBar></StatusBar>
		<!-- #endif -->
		<TopTabbar name="排行榜"></TopTabbar>
		<view class="top-list">
		</view>
		<u-tabs :list="topCategory" lineColor="#ec4141" lineWidth="30" current="0" lineHeight="5"></u-tabs>
		<Official :list="officialTopList"></Official>
		<Other :otherList="otherTopList"></Other>
		<text style="height: 200rpx;display: block;text-align: center;margin: 100rpx 0;">- 我是有底线的 -</text>
		<MiniPlay :bottom="0"></MiniPlay>
	</view>
</template>

<script>
	import MiniPlay from "@/components/MiniPlay.vue"
	import TopTabbar from "@/components/TopTabbar.vue"
	import Official from "@/components/toplist/Official.vue"
	import Other from "@/components/toplist/Other.vue"
	import http from "@/utils/request/index.js"
	// 导入空出状态栏位置的组件
	import StatusBar from "@/components/StatusBar.vue"
	export default {
		data() {
			return {
				active: 0,
				topCategory: [{
					id: 0,
					name: '官方'
				}, {
					id: 1,
					name: '精选'
				}, {
					id: 2,
					name: '曲风'
				}, {
					id: 3,
					name: '全球'
				}, {
					id: 4,
					name: '语种'
				}, {
					id: 5,
					name: '特色'
				}],
				// 所有榜单的数据
				allTopList: [],
				// 官方榜单的数据
				officialTopList: [],
				// 精选榜单的数据
				otherTopList: []
			};
		},
		methods: {
			// 获取所有榜单数据  
			// 接口：https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%89%80%e6%9c%89%e6%a6%9c%e5%8d%95
			async getTopList() {
				const res = await http('common.TopList')
				if (res.code !== 200) {
					uni.showToast({
						icon: 'error',
						name: '获取歌单列表失败！',
						duration: 1500
					})
					uni.hideLoading()
					return
				}
				this.allTopList = res.list
				console.log(this.allTopList);
				this.spliceTopList()
				uni.hideLoading()
			},
			spliceTopList() {
				// 官方榜单为下标0 - 3
				this.officialTopList.push(this.allTopList[0])
				this.officialTopList.push(this.allTopList[1])
				this.officialTopList.push(this.allTopList[2])
				this.officialTopList.push(this.allTopList[3])

				// 精选表单为 4 - 41
				this.otherTopList = this.allTopList.slice(4)
				console.log(this.otherTopList);
			}
		},
		created() {
			uni.showLoading({
				name: '加载中...'
			});
			this.getTopList()
		},
		components: {
			MiniPlay,
			TopTabbar,
			Official,
			Other,
			StatusBar
		}
	}
</script>

<style lang="scss">
	.top-list {
		margin-top: 100rpx;
	}

	/deep/ .u-tabs__wrapper__nav__item {
		z-index: 1;
	}

	/deep/ .u-tabs__wrapper__nav__line {
		top: 25px;
		z-index: 0;
	}
</style>