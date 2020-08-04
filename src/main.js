// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import vueSensors from 'vue-sensors';
// 神策统计埋点
console.log(process.env.NODE_ENV);
var server_url =
	process.env.NODE_ENV == 'production'
		? 'https://jinghangapps.datasink.sensorsdata.cn/sa?token=3847889d9f7d7480&project=production'
		: 'http://jinghangapps.datasink.sensorsdata.cn/sa?project=default&token=3847889d9f7d7480';
// let server_url = 'https://jinghangapps.datasink.sensorsdata.cn/sa?token=3847889d9f7d7480&project=production'
const config = {
	name: 'sa',
	web_url: server_url,
	server_url: server_url,
	is_track_single_page: true,
	heatmap: {
		//是否开启触达注意力图，设置 default 表示开启，自动采集 $WebStay 事件，设置 'not_collect' 表示关闭
		//需要 JSSDK 版本号大于 1.9.1
		scroll_notice_map: 'default',
		scroll_delay_time: 4000,
		scroll_event_duration: 18000, //单位秒，预置属性停留时长 event_duration 的最大值。默认5个小时，也就是300分钟，18000秒。
		//是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
		//需要 Web JS SDK 版本号大于 1.7
		clickmap: 'default',
		collect_url: true
	},
	show_log: true
};
Vue.use(vueSensors, config);

Vue.config.productionTip = false
Vue.prototype.$http = axios;
require('./mock')//此部分引入的是我们所编写的mockjs文档
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted() {
		// 可以开启页面访问统计
		this.$sa.quick('autoTrack');
	}
})
