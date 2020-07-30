import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register'
import download from '@/components/download'
Vue.use(Router)

let router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'register',
      component: register
    },
    {
      path: '/download',
      name: 'download',
      component: download
    }
  ]
})
router.afterEach((to, from) => {
  // 百度统计
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?93a02eec98e8f582feec78064ae5264d";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
})


export default router;
