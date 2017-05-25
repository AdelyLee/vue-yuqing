import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import Presentation from './presentationList.vue'
import VueResource from 'vue-resource'

import 'element-ui/lib/theme-default/index.css'   // 默认主题
import './scss/presentationList.scss'

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
            path: '/presentationList',
            component: Presentation
        }
    ]
})

new Vue({
    el: '#presentation',
    router: router,
    template: '<home-presentation></home-presentation>',
    components: {
        'home-presentation': Presentation
    }
})
