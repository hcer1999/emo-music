<template>
	<view>
		<SearchBar :sVal="searchVal"></SearchBar>
		<u-tabs :current="activeTab" :list="tablist" lineWidth="30" lineColor="#f56c6c" :activeStyle="{
		            color: '#303133',
		            fontWeight: 'bold',
		            transform: 'scale(1.05)'
		        }" :inactiveStyle="{
		            color: '#606266',
		            transform: 'scale(1)'
		        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;" @change="tabChange">
		</u-tabs>
		<div v-show="activeType === 0">
			<!-- //综合搜索 -->
			综合搜索
		</div>
		<div v-show="activeType === 1">
			<!-- 单曲搜索 -->
			<scroll-view class="songScroll" ref="scorll" scroll-y @scrolltolower="songScrollToLower()">
				<MusicList :songCount="pageConfig.music.songCount" :listData="musicListData"></MusicList>
				<u-loadmore :status="loadStatus" />
				<!-- #ifdef APP-PLUS -->
				<BottomBar />
				<!-- #endif -->
			</scroll-view>
		</div>
		<div v-show="activeType === 2">
			<!-- 歌单搜索 -->
			歌单搜索
		</div>
		<div v-show="activeType === 3">
			<!-- 视频搜索 -->
			视频搜索
		</div>
		<div v-show="activeType === 4">
			<!-- 歌手搜索 -->
			歌手搜索
		</div>
		<div v-show="activeType === 5">
			<!-- 播客搜索 -->
			播客搜索
		</div>
		<div v-show="activeType === 6">
			<!-- 歌词搜索 -->
			歌词搜索
		</div>
		<div v-show="activeType === 7">
			<!-- 专辑搜索 -->
			专辑搜索
		</div>
		<div v-show="activeType === 8">
			<!-- 声音搜索 -->
			声音搜索
		</div>
		<div v-show="activeType === 9">
			<!-- 话题搜索 -->
			话题搜索
		</div>
		<div v-show="activeType === 10">
			<!-- 用户搜索 -->
			用户搜索
		</div>
		<MiniPlay></MiniPlay>
	</view>
</template>

<script>
	import SearchBar from "@/components/SearchBar.vue"
	import MusicList from "@/components/MusicList.vue"
	import MiniPlay from "@/components/MiniPlay.vue"
	import http from "@/utils/request/index.js"
	import BottomBar from "@/components/BottomBar.vue"
	export default {
		data() {
			return {
				searchVal: '',
				// 当前激活的tab标签
				activeTab: 1,
				activeType: 1,
				tablist: [{
					type: 1018,
					name: '综合',
				}, {
					type: 1,
					name: '单曲',
				}, {
					type: 1000,
					name: '歌单'
				}, {
					type: 1014,
					name: '视频'
				}, {
					type: 100,
					name: '歌手'
				}, {
					type: 1009,
					name: '播客'
				}, {
					type: 1006,
					name: '歌词'
				}, {
					type: 10,
					name: '专辑'
				}, {
					type: 2000,
					name: '声音'
				}, {
					type: 9999,
					name: '话题'
				}, {
					type: 1002,
					name: '用户'
				}],
				playInfo: {
					name: '',
					author: '',
					poster: ''
				},
				// 搜索到的单曲数据
				musicListData: [],
				// 分页配置
				pageConfig: {
					// 单曲分页配置
					music: {
						limit: 30,
						offset: 0,
						songCount: 0
					}
				},
				// 加载更多状态
				//加载前值为loadmore，加载中为loading，没有数据为nomore
				loadStatus: "loadmore",


			}
		},
		methods: {
			async getSearchVal() {
				// 需要先判断当前搜索的类型。
				// 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户,
				//                    1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
				if (this.activeType === 1) {
					//搜索单曲
					this.loadStatus = "loading"
					const res = await http("common.SearchMusic", {
						keywords: this.searchVal,
						limit: this.pageConfig.music.limit,
						offset: this.pageConfig.music.offset,
						type: this.activeType
					})

					console.log(res);
					if (res.code !== 200) {
						uni.showToast({
							icon: 'error',
							title: '搜索单曲失败！',
							duration: 1500
						})
						uni.hideLoading()
						return
					}
					if (res.result.songCount === 0) {
						// 没有搜索到
						uni.hideLoading()
						uni.showToast({
							icon: 'error',
							title: '暂无资源，请换个搜索内容再试试',
							duration: 1500
						})

						this.loadStatus = "nomore"
						return
					}
					// console.log(res);
					this.musicListData.push(...res.result.songs)
					this.pageConfig.music.songCount = res.result.songCount
					uni.hideLoading()
				} else {
					uni.showToast({
						icon: 'error',
						name: '敬请期待',
						duration: 1500
					})
					uni.hideLoading()
				}

			},
			// 当tab改变
			tabChange(e) {
				// 获取当前选中的标签是tablist的第几个成员
				this.activeType = this.tablist.findIndex(item => {
					return item.type === e.type
				})
			},
			songScrollToLower() {
				// 需要先判断偏移量加上当前获取数量（30）是否大于歌曲总数
				console.log(this.pageConfig.music.offset);
				console.log(this.pageConfig.music.songCount);
				if (this.pageConfig.music.offset + this.pageConfig.music.limit >= this.pageConfig.music.songCount) {
					// 如果大于等于总数,则已获取全部歌曲
					this.loadStatus = "nomore"
					console.log(123);
					return
				} else {
					// 获取歌曲
					// 偏移量要加上limit
					this.pageConfig.music.offset += this.pageConfig.music.limit
					console.log(this.pageConfig.music.offset);
					this.getSearchVal()
				}


			}
		},
		created() {
			uni.showLoading({
				name: '加载中...'
			});
			this.getSearchVal()
		},
		mounted() {
			// console.log(this.$refs.scorll);
			// this.$refs.scorll.$el.style.height = '100%'
		},
		computed: {
			getSearchType() {
				return this.activeType
			}
		},
		components: {
			SearchBar,
			MusicList,
			MiniPlay,
			BottomBar
		},
		onLoad(d) {
			console.log(d);
			this.searchVal = d.s
		}

	}
</script>
<style lang="scss" scoped>
	/deep/ .u-tabs__wrapper__nav__item {
		z-index: 1;
	}

	/deep/ .u-tabs__wrapper__nav__line {
		top: 25px;
		z-index: 0;
	}

	.songScroll {
		height: 82vh;
	}
</style>