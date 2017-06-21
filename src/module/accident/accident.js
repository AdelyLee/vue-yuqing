/**
 * Created by Administrator on 2017/6/21.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import Accident from './accident.vue'
import VueResource from 'vue-resource'

import 'element-ui/lib/theme-default/index.css'   // 默认主题
import './scss/accident.scss'


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
            path: '/accident',
            component: Accident
        }
    ]
})

new Vue({
    el: '#accident',
    router: router,
    template: '<accident-analysis></accident-analysis>',
    components: {
        'accident-analysis': Accident
    }
})
