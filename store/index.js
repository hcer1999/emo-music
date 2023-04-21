
// 1. 引入vue 和 vuex
import Vue from 'vue';
import Vuex from 'vuex';// 2. 安装插件
Vue.use(Vuex)// 3. 导入对象
const store = new Vuex.Store({
  state: {
	  // 当前正在播放的歌曲信息
	  playMusic: {},
	  // 当前正在播放的歌曲url地址
	  playUrl: '',
	  // 当前是否正在播放
	  isPlay: 0,   //  0  未播放    1 正在播放   2  暂停播放
  },
  getters: {
	  getPlayMusic(state){
		 return  state.playMusic
	  },
	  getPlayUrl(state){
		  return state.playUrl
	  },
	  getIsPlay(state){
		  return state.isPlay
	  }
  },
  mutations: {
	  setPlayMusic(state,data){
		  state.playMusic = data
	  },
	  setPlayUrl(state,url){
		  state.playUrl = url
	  },
	  setIsPlay(state,s){
	  	state.isPlay = s
	  }
  },
  actions: {
  },
  modules: {
  }
})// 4. 默认导出 store
export default store
