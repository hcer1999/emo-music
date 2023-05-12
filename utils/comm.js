// import  from 'vuex'
import store from '@/store'
import Vue from 'vue'
export default {

	// 播放方法,需传入音乐的播放链接
	async playMusic(url) {
		// 判断是否正在播放
		if (store.state.isPlay) {
			store.commit("setIsPlay", 0)
			console.log('成功关闭当前播放事件');
		}
		Vue.$AudioContext.src = url


	},
	// 暂停方法,可以传入暂停的标记，如不传则为自动暂停
	// 1 =  手动暂停    2 = 自动暂停
	async pauseMusic(tag = 1) {
		// 判断是否正在播放
		// if (store.state.isPlay) {
		// 	store.commit("setIsPlay", 0)
		// 	console.log('成功关闭当前播放事件');
		// }

		//  0  未播放    1 正在播放   2  暂停播放,
		if (tag = 1) {
			// 手动暂停
			store.commit("setIsPlay", 2)
		} else if (tag = 2) {
			// 自动暂停
			store.commit("setIsPlay", 2)
		}
		Vue.$AudioContext.pause()


	},
	// 获取歌曲播放链接
	getMusicPlayUrlById(id) {
		const {
			data: res
		} = await Vue.$http({
			url: `/song/url?id=${id}`,
			methods: "GET"
		})

		if (res.code !== 200) {
			uni.showToast({
				icon: 'error',
				title: '获取歌曲播放地址失败!',
				duration: 1500
			})
			return
		}
		const playInfo = {
			name: ",",
			author: "",
			poster: "",
		}
		// this.playInfo.name = item.name
		// this.playInfo.author = item.ar[0].name
		// this.playInfo.poster = item.al.picUrl

		// // 将当前播放歌曲的信息存入Vuex
		store.commit("setPlayMusic", playInfo)
		store.commit("setPlayUrl", res.data[0].url)
		store.commit("setIsPlay", 1)
		console.log('成功将歌曲压入VUEX');
		Vue.$AudioContext.src = store.getPlayUrl


	},
	// 获取歌曲播放信息
	getMusicPlayInfoById(id) {


	},
	// 获取歌单信息
	getPlayListInfoById(id) {
		uni.showLoading({
			title: '加载中...'
		});
		const {
			data: res
		} = await Vue.$http({
			url: `/playlist/detail?id=${id}`,
			methods: 'GET'
		})
		if (res.code !== 200) {
			uni.hideLoading()
			uni.showToast({
				icon: 'error',
				title: '获取歌单信息失败！',
				duration: 1500
			})
			return
		}
		const playListInfo = res.playlist
		const creater = {
			url: this.playListInfo.creator.avatarUrl,
			nickname: this.playListInfo.creator.nickname
		}
		// this.getPlayListById(id)
		// console.log(this.playListInfo);
	},
	// 获取歌单所有歌曲列表
	getPlayListById(id) {

	}
}