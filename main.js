import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from './store'




Vue.config.productionTip = false
App.mpType = 'app'



try {
	function isPromise(obj) {
		return (
			!!obj &&
			(typeof obj === "object" || typeof obj === "function") &&
			typeof obj.then === "function"
		);
	}

	// 统一 vue2 API Promise 化返回格式与 vue3 保持一致
	uni.addInterceptor({
		returnValue(res) {
			if (!isPromise(res)) {
				return res;
			}
			return new Promise((resolve, reject) => {
				res.then((res) => {
					if (res[0]) {
						reject(res[0]);
					} else {
						resolve(res[1]);
					}
				});
			});
		},
	});
} catch (error) {}



// 导入uView
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)


// // 导入自己封装的request
// import http from '@/utils/request/request.js';

// Vue.prototype.$http = http

// import '@/static/iconfont/iconfont.css'

Vue.prototype.$store = store




const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif