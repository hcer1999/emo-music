# 网抑云音乐Ver1.0.0

技术栈：`uniapp` `vue2` `Vuex` `vue-router`

说明：只做了H5和App端的兼容

预览地址：[http://wyy.bingkele.cc](http://wyy.bingkele.cc)

### 网抑云音乐迭代日志

之前没想到写.....

- 2023年4月25日  
  - 解决迷你播放器唱片旋转的bug（将当前旋转的角度存入Vuex，在跳转到别的页面的时候会继续沿着上次的角度旋转。
  - 在调用迷你播放器组件时需传入bottom参数以控制该组件显示的位置。
  - 歌单列表界面滚动到底部直接加载剩余未加载歌曲。（为节省资源，一次性限制获取50首）
- 2023年4月26日
  - 排行榜功能写完啦（暂时只获取了官方排行榜）
  - 歌单界面优化
    - 显示SQ，Hi-Res，VIP等标签
    - 根据是否有MV视频显示视频图标
- 2023年4月27日
  - 排行榜歌单全部获取完成
  - 优化歌单列表界面，在作者后面跟上专辑名称
- 2023年4月28日
  - 初步完成搜索功能，暂时只能搜索单曲。
- 2023年5月5日
  - 完成显示搜索历史功能
  - 在滚动列表界面底部显示加载提示
  - 完成显示默认搜索文本
  - 完成加载热门搜索功能
- 2023年5月12日
  - 重新封装调用接口函数
  - 针对APP端进行优化
  - 优化搜索界面性能







------

## 当前已知BUG

1. 当前歌曲在播放结束后，Vuex中播放状态未改变。
   - 已修复，在自然播放结束事件后直接修改状态
2. 歌单列表界面，播放全部按钮未写点击事件，居然能点击播放第一首歌。
   - 已修复，原因是该元素没有设置高度，直接穿透了
3. 无版权的歌曲播放直接报错。
   - 已修复，播放歌曲之前判断信息就好了
4. app端无法实现唱片旋转功能（app端获取dom操作js控制style样式无法解决....)

