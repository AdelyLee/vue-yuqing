/**
 * Created by Administrator on 2017/6/19.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import FocusNews from './focusNews.vue'
import VueResource from 'vue-resource'

import 'element-ui/lib/theme-default/index.css'   // 默认主题
import './scss/focusNews.scss'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueResource)

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/focusNews',
            component: FocusNews
        }
    ]
})

new Vue({
    el: '#focusNews',
    router: router,
    template: '<focusNews-list></focusNews-list>',
    components: {
        'focusNews-list': FocusNews
    }
})
