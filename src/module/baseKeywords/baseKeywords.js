/**
 * Created by Administrator on 2017/5/3.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import BaseKeywords from './baseKeywords.vue'
import VueResource from 'vue-resource'

import 'element-ui/lib/theme-default/index.css'   // 默认主题
import './scss/baseKeywords.scss'

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
            path: '/baseKeywords',
            component: BaseKeywords
        }
    ]
})

new Vue({
    el: '#baseKeywords',
    router: router,
    template: '<base-word></base-word>',
    components: {
        'base-word': BaseKeywords
    }
})
