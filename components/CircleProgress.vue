<template>
	<view>
		<!-- 		| 参数名 | 值类型 | 是否必填 | 参数作用 | 默认值 |
		| :------: | :------: | :------: | :------: | :------: |
		| id | String | 选填 | 组件的id，多次定义设置不同的值 | 1 |
		| width | Number | 必填 | 设置圆整体的大小，单位为px | 无 |
		| radius | Number | 必填 | 设置进度条宽度，单位为px | 无 |
		| progress | Number | 必填 | 设置进度百分比 | 无 |
		| barColor | String | 必填 | 设置进度条颜色 | 无 |
		| backgroundColor | String | 必填 | 设置进度条背景颜色 | 无 |
		| delay | Number | 选填 | 延迟多久执行，单位为ms | 20 |
		| duration | Number | 选填 | 动画整体时长，单位为ms | 1000 |
		| timeFunction | String | 选填 | 动画缓动算法 | cubic-bezier(0.99, 0.01, 0.22, 0.94) |
		| isAnimation | Boolean | 选填 | 是否以动画的方式呈现 | true | -->
		<svg style="transform: rotate(-90deg)" :width="width" :height="width" xmlns="http://www.w3.org/2000/svg">
			<circle :r="(width-radius)/2" :cy="width/2" :cx="width/2" :stroke-width="radius" :stroke="backgroundColor"
				fill="none" />
			<circle ref="$bar" :r="(width-radius)/2" :cy="width/2" :cx="width/2" :stroke="barColor"
				:stroke-width="radius" :stroke-linecap="isRound ? 'round' : 'square'"
				:stroke-dasharray="(width-radius)*3.14"
				:stroke-dashoffset="isAnimation ? (width-radius) * 3.14 : (width - radius) * 3.14 * (100 - progress) / 100"
				fill="none" />
		</svg>
	</view>
</template>

<script>
	export default {
		name: "CircleProgress",
		data() {
			return {
				idStr: `circle_progress_keyframes_${this.id}`
			};
		},
		props: {
			width: [Number, String], // 圆的大小
			radius: [Number, String], // 进度条厚度
			progress: [Number, String], // 进度条百分比
			barColor: String, // 进度条颜色
			backgroundColor: String, // 背景颜色
			isAnimation: { // 是否是动画效果
				type: Boolean,
				default: true,
			},
			isRound: { // 是否是圆形画笔
				type: Boolean,
				default: true,
			},
			id: { // 组件的id，多组件共存时使用
				type: [String, Number],
				default: 1,
			},
			duration: { // 整个动画时长
				type: [String, Number],
				default: 1000,
			},
			delay: { // 延迟多久执行
				type: [String, Number],
				default: 200,
			},
			timeFunction: { // 动画缓动函数
				type: String,
				default: 'cubic-bezier(0.99, 0.01, 0.22, 0.94)',
			},
		},
		beforeDestroy() {
			// 清除旧组件的样式标签
			document.getElementById(this.idStr) && document.getElementById(this.idStr).remove()
		},
		mounted() {
			if (this.isAnimation) {
				// 重复定义判断
				if (document.getElementById(this.idStr)) {
					console.warn('vue-circle-progress should not have same id style')
					document.getElementById(this.idStr).remove()
				}
				// 生成动画样式文件
				let style = document.createElement('style')
				style.id = this.idStr
				style.type = 'text/css'
				style.innerHTML =
					`
		      @keyframes circle_progress_keyframes_name_${this.id} {
		      from {stroke-dashoffset: ${(this.width - this.radius) * 3.14}px;}
		      to {stroke-dashoffset: ${(this.width - this.radius) * 3.14 * (100 - this.progress) / 100}px;}}
		      .circle_progress_bar${this.id} {animation: circle_progress_keyframes_name_${this.id} ${this.duration}ms ${this.delay}ms ${this.timeFunction} forwards;}`
				// 添加新样式文件
				document.getElementsByTagName('head')[0].appendChild(style)
				// 往svg元素中添加动画class
				this.$refs.$bar.classList.add(`circle_progress_bar${this.id}`)
			}
		},
	}
</script>

<style lang="scss" scoped>
	@keyframes circle_progress_keyframes_name_1 {
		from {
			stroke-dashoffset: 565.2px;
		}

		to {
			stroke-dashoffset: 169.56px;
		}
	}

	.circle_progress_bar1 {
		animation: circle_progress_keyframes_name_1 1000ms 20ms cubic-bezier(0.99, 0.01, 0.22, 0.94) forwards;
	}
</style>