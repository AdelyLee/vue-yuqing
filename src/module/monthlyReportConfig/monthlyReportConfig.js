/**
 * Created by Administrator on 2017/5/3.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'

import MonthlyReport from './monthlyReportConfig.vue'

import 'element-ui/lib/theme-default/index.css'   // 默认主题
import '../customize/scss/customize.scss'
import './scss/monthlyReportConfig.scss'

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
            path: '/monthlyReportConfig',
            component: MonthlyReport
        }
    ]
})

new Vue({
    el: '#monthlyReport',
    router: router,
    template: '<monthly-report></monthly-report>',
    components: {
        'monthly-report': MonthlyReport
    }
})
