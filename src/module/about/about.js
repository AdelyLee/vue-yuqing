/**
 * Created by lyc on 17-4-27.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import About from './about.vue'

Vue.use(VueRouter)

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
  mode: 'history',
  // base: baseUrl,
  routes: [
    {
      path: '/about',
      component: About
    }
  ]
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #about 匹配的元素上。
/* eslint-disable no-new */
new Vue({
  el: '#about',
  router: router,
  template: '<home-about></home-about>',
  components: {
    'home-about': About
  }
})
