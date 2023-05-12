// const BASE_URL = 'http://qapi.bingkele.cc' //域名或选取所有接口不变的那一部分

// export const Request = (options) => { //暴露一个function：myRequest，使用options接收页面传过来的参数
// 	return new Promise((resolve, reject) => { //异步封装接口，使用Promise处理异步请求
// 		uni.request({ //发送请求
// 			url: BASE_URL + options.url, //接收请求的API
// 			method: options.method || 'GET', //接收请求的方式,如果不传默认为GET
// 			data: options.data || {}, //接收请求的data,不传默认为空
// 			success: (res) => { //数据获取成功
// 				// if (res.data.meta.status !== 200) { //因为200是返回成功的状态码，如果不等于200,则代表获取失败,
// 				// 	return uni.showToast({
// 				// 		title: "数据获取失败！"
// 				// 	})
// 				// }
// 				resolve(res) //成功,将数据返回
// 			},
// 			fail: (err) => { //失败操作
// 				// uni.showToast({
// 				// 	title: "请求接口失败！"
// 				// })
// 				reject(err)
// 			}
// 		})
// 	})
// }

/**
 * Request:请求封装
 * @property {Object} config = 私有属性，默认值
 * @property {Function} isUrl = 私有方法，url是否完整
 * @property {Function} requestBefore = 私有方法，请求前
 * @property {Function} requestAfter = 私有方法，请求后
 */
import {
	BASE_URL
}
from '@/env'

export default class Request {
	constructor() {
		// 默认配置
		this.config = {
			baseUrl: BASE_URL,
			header: {
				'content-type': 'application/json'
			},
			url: '',
			data: {},
			params: {},
			method: 'GET',
			dataType: 'json',
			// #ifndef MP-ALIPAY || APP-PLUS
			responseType: 'text',
			// #endif
			custom: {},
			// #ifdef APP-PLUS
			sslVerify: false
			// #endif
		}

		/* 拦截器 */
		this.interceptor = {
			request: cb => {
				if (cb) {
					this.requestBefore = cb
				} else {
					this.requestBefore = request => request
				}
			},
			response: (cb) => {
				if (cb) {
					this.requestAfter = cb
				} else {
					this.requestAfter = response => response
				}
			}
		}
	}

	/* 判断url是否完整 */
	static isUrl(url) {
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
	}

	static addQueryString(params) {
		let paramsData = ''
		Object.keys(params).forEach(key => {
			paramsData += key + '=' + encodeURIComponent(params[key]) + '&'
		})
		return paramsData.substring(0, paramsData.length - 1)
	}

	/* 请求前 */
	static requestBefore(config) {
		return config
	}

	/* 请求后 */
	static requestAfter(response) {
		return response
	}

	/*设置全局配置*/
	setConfig(func) {
		return func(this.config)
	}

	/**
	 * @Function
	 * @param {Object} options - 请求配置项
	 * @prop {String} options.url - 请求路径
	 * @prop {Object} options.data - 请求参数
	 * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
	 * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
	 * @prop {Object} [options.header = config.header] - 请求header
	 * @prop {Object} [options.method = config.method] - 请求方法
	 * @returns {Promise<unknown>}
	 */
	async request(options = {}) {
		options = {
			...options,
			...this.config,
			...this.requestBefore(options)
		}
		return new Promise((resolve, reject) => {
			let mergeUrl = Request.isUrl(options.url) ? options.url : (options.baseUrl + options.url)
			if (JSON.stringify(options.params) !== '{}') {
				let query = Request.addQueryString(options.params);
				mergeUrl += mergeUrl.indexOf('?') === -1 ? `?${query}` : `&${query}`
			}
			options.url = mergeUrl
			options.success = res => {
				resolve(this.requestAfter(res.data))
			}
			options.fail = err => {
				reject(this.requestAfter(err))
			}
			uni.request(options)
		})
	}

	get(url, options = {}) {
		return this.request({
			url,
			method: 'GET',
			...options
		})
	}

	post(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'POST',
			...options
		})
	}

}