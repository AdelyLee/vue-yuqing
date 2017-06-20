/**
 * Created by lyc on 17-4-27.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import Bbs from './latestBbs.vue'
import VueResource from 'vue-resource'

import 'element-ui/lib/theme-default/index.css'   // 默认主题
import './scss/latestBbs.scss'


Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueResource)

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
  mode: 'history',
  // base: baseUrl,
  routes: [
    {
      path: '/latestBbs',
      component: Bbs
    }
  ]
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #index 匹配的元素上。
/* eslint-disable no-new */
new Vue({
  el: '#latestBbs',
  router: router,
  template: '<latest-bbs></latest-bbs>',
  components: {
    'latest-bbs': Bbs
  }
})
