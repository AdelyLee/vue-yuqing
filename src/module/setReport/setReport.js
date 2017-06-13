/**
 * Created by Administrator on 2017/5/3.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import SetReport from './setReport.vue'
import VueResource from 'vue-resource'

import 'element-ui/lib/theme-default/index.css'   // 默认主题
import './scss/setReport.scss'

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
            path: '/setReport',
            component: SetReport
        }
    ]
})

new Vue({
    el: '#setReport',
    router: router,
    template: '<set-report></set-report>',
    components: {
        'set-report': SetReport
    }
})
