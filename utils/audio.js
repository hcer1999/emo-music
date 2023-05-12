// 这里封装audio组件的相关事件
import Vue from 'vue'

Vue.$AudioContext.onPlay(() => {
	// console.log('开始播放');
	// this.toastInfo.type = "success"
	// this.toastInfo.message = `正在播放：${this.playInfo.name}`
});
Vue.$AudioContext.onPause(() => {
	// console.log('暂停播放');

})
Vue.$AudioContext.onError((res) => {
	console.log(res);
	console.log(res);
});
export default {


}