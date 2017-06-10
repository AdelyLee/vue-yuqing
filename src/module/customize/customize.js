/**
 * Created by Administrator on 2017/5/3.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import Customize from './customize.vue'

import 'element-ui/lib/theme-default/index.css'   // 默认主题
import './scss/customize.scss'

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
            path: '/customize',
            component: Customize
        }
    ]
})

new Vue({
    el: '#customize',
    router: router,
    template: '<customize-inspect></customize-inspect>',
    components: {
        'customize-inspect': Customize
    }
})
