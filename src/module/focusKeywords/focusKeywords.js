/**
 * Created by Administrator on 2017/6/19.
 */
/**
 * Created by Administrator on 2017/5/3.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import FocusKeywords from './focusKeywords.vue'
import VueResource from 'vue-resource'

import 'element-ui/lib/theme-default/index.css'   // 默认主题
import './scss/focusKeywords.scss'

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
            path: '/focusKeywords',
            component: FocusKeywords
        }
    ]
})

new Vue({
    el: '#focusKeywords',
    router: router,
    template: '<focus-word></focus-word>',
    components: {
        'focus-word': FocusKeywords
    }
})
