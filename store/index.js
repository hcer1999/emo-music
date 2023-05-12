// 1. 引入vue 和 vuex
import Vue from 'vue';
import Vuex from 'vuex'; // 2. 安装插件
Vue.use(Vuex) // 3. 导入对象

import http from '@/utils/request/index.js'


// 注册播放器全局组件
const AudioContext = uni.createInnerAudioContext();
AudioContext.autoplay = true; //自动播放

const store = new Vuex.Store({
	state: {
		// 当前正在播放的歌曲信息
		playMusic: {
			name: '', // 歌名
			author: '', // 作者
			poster: '', // 封面
			playUrl: '', // 当前正在播放的歌曲url地址
		},

		// 当前是否正在播放
		isPlay: 0, //  0  未播放    1 正在播放   2  暂停播放,
		// 唱片当前旋转的角度
		rotateDeg: 0
	},
	getters: {
		getPlayMusic(state) {
			return state.playMusic
		},
		getPlayUrl(state) {
			return state.playMusic.playUrl
		},
		getIsPlay(state) {
			return state.isPlay
		},
		getRotateDeg(state) {
			return state.rotateDeg
		},
		getPlaySongTitle(state) {
			if (state.isPlay === 0) {
				return "等待播放...."
			} else {
				return `${state.playMusic.name} - ${state.playMusic.author}`
			}
		}
	},
	mutations: {
		setPlayMusic(state, data) {
			state.playMusic = data
		},
		setPlayUrl(state, url) {
			state.playMusic.playUrl = url
		},
		setIsPlay(state, s) {
			state.isPlay = s
		},
		setRotateDeg(state, deg) {
			state.rotateDeg = deg
		},
		// 音乐播放
		play() {
			AudioContext.play()

		},
		// 音乐暂停
		pause() {
			AudioContext.pause()
		},
		// 音乐结束
		stop() {
			AudioContext.stop()
		}



	},
	actions: {
		// 播放歌曲事件
		async playMusic(store, id) {
			if (store.state.isPlay) {
				this.commit("setIsPlay", 0)
				console.log('成功关闭当前播放事件');
			}
			const res = await http('common.MusicInfo', {
				ids: id
			})

			if (res.code !== 200 || res.songs.length === 0) {
				uni.showToast({
					icon: 'error',
					title: '获取歌曲信息失败！',
					duration: 1500
				})
				return
			}
			const musicInfo = res
			console.log(musicInfo);
			// uni.$store.state.palyMusic = res

			const res1 = await http('common.MusicPlayUrl', {
				id: id
			})

			if (res1.code !== 200) {
				uni.showToast({
					icon: 'error',
					title: '获取歌曲播放地址失败!',
					duration: 1500
				})
				return
			}



			const playInfo = {
				name: musicInfo.songs[0].name,
				author: musicInfo.songs[0].ar[0].name,
				poster: musicInfo.songs[0].al.picUrl,
				playUrl: res1.data[0].url
			}

			// fee: enum,
			//   0: 免费或无版权
			//   1: VIP 歌曲
			//   4: 购买专辑
			//   8: 非会员可免费播放低音质，会员可播放高音质及下载
			//   fee 为 1 或 8 的歌曲均可单独购买 2 元单曲
			// 判断当前歌曲的播放权限
			switch (musicInfo.songs[0].fee) {
				case 0:
					uni.showToast({
						icon: 'none',
						title: '开始播放：' + playInfo.name,
						duration: 1000
					})
					break;
				case 8:
					uni.showToast({
						icon: 'none',
						title: '开始播放：' + playInfo.name,
						duration: 1000
					})
					break;
				case 1:
					uni.showToast({
						icon: "none",
						title: 'VIP歌曲只能听30秒！',
						duration: 1000
					})
					break;
				default:
					uni.showToast({
						icon: "none",
						title: '该歌曲无版权',
						duration: 1000
					})
					return
			}


			this.commit("setPlayMusic", playInfo)
			this.commit("setIsPlay", 1)
			AudioContext.src = store.state.playMusic.playUrl

		}
	},
	modules: {}
}) // 4. 默认导出 store

// 自然播放结束事件
AudioContext.onEnded(() => {
	store.commit("setIsPlay", 0)
})

AudioContext.onCanplay(() => {
	console.log(AudioContext.duration);

})
export default store