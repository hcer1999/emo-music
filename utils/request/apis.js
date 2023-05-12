//功能：暴露接口

export default {
	common: {
		// 获取主页数据接口
		IndexData: {
			url: '/homepage/block/page',
			auth: false,
			methods: "GET"
		},
		// 获取歌单数据接口
		PlayList: {
			url: '/playlist/track/all',
			auth: false,
			methods: "GET"
		},
		// 获取歌单信息接口
		PlayListInfo: {
			url: '/playlist/detail',
			auth: false,
			methods: "GET"
		},
		// 获取歌曲播放链接接口
		MusicPlayUrl: {
			url: '/song/url',
			auth: false,
			methods: "GET"
		},
		// 获取歌曲信息接口
		MusicInfo: {
			url: '/song/detail',
			auth: false,
			methods: "GET"
		},
		// 获取搜索排行榜接口
		SearchHot: {
			url: '/search/hot',
			auth: false,
			methods: "GET"
		},
		// 获取默认搜索文本
		SearchDefaultText: {
			url: '/search/default',
			auth: false,
			methods: "GET"
		},
		// 搜索单曲接口
		SearchMusic: {
			url: '/cloudsearch',
			auth: false,
			methods: "GET"
		},
		// 排行榜数据
		TopList: {
			url: '/toplist/detail',
			auth: false,
			methods: "GET"
		},
	}

}