import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import myCollect from './myCollect.vue'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'   // 默认主题
import '../index/scss/index.scss'


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
            path: '/myCollect',
            component: myCollect
        }
    ]
})

new Vue({
    el: '#myCollect',
    router: router,
    template: '<home-presentation></home-presentation>',
    components: {
        'home-presentation': myCollect
    }
})
