<template>
	<view class="tabbar">
		<!-- <u-tabbar :value="value" @change="change" fixed :safeAreaInsetBottom="false">
			<u-tabbar-item v-for="item in tabbarList" :key="item.name" :text="item.text" :icon="item.icon"
				@click="tabbarClick(item.name)"></u-tabbar-item>
		</u-tabbar> -->
		<ul>
			<li :class="item.name === activePath ? 'active' : '' " @click="tabClick(item)" v-for="item in tabbarList" :key="item.name">
				<i class="iconfont icon" :class="item.icon"></i>
				<text class="txt">{{item.text}}</text>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		name: "Tabbar",
		data() {
			return {
				value: 0,
				tabbarList: [{
						text: '发现',
						icon: 'icon-wangyiyunyinle',
						name: 'index'
					},
					{
						text: '播客',
						icon: 'icon-boke',
						name: 'boke'
					},
					{
						text: '我的',
						icon: 'icon-yinle',
						name: 'wode'
					},
					{
						text: '关注',
						icon: 'icon-guanzhuderen',
						name: 'guanzhu'
					},
					{
						text: '社区',
						icon: 'icon-shequ',
						name: 'shequ'
					},
				],
			    activePath: "index"
			};
			
		},
		methods: {
			tabbarClick(name) {
				console.log(this.$route);
				if (this.$route.path === `pages/${name}/${name}`) return
				this.$router.push(`pages/${name}/${name}`)
				console.log(name);
			},
			change(e) {
				this.value = e
				console.log(e)
			},
			tabClick(e){
				this.activePath = e.name
				// console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	.tabbar {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 120rpx;
		width: 750rpx;
		background-color: #fcfdff;
		ul {
			list-style: none;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 40rpx;
			height: 120rpx;
			li.active {
				.icon {
					color:#fff;
					z-index: 999;
				}
				.icon::after {
					content: '';
					position: absolute;
					background-color: #f82e4c;
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					transform: translate(-60rpx,-8rpx);
					z-index: -1;
				}
				.txt {
					color: #f82e4c;
				}
			}
			li {
				color: #98999b;
				width: 80rpx;
				text-align: center;
				.icon {
					font-size: 55rpx;
				}
				.txt {
					display: block;
					font-size: 20rpx;
					margin-top: 8rpx;
				}
			}
		};
	}
</style>