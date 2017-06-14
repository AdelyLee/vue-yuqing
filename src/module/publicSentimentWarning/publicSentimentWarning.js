import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import warningList from './publicSentimentWarning.vue'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'   // 默认主题
import './scss/publicSentimentWarning.scss'

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
            path: '/publicSentimentWarning',
            component: warningList
        }
    ]
})

new Vue({
    el: '#warningList',
    router: router,
    template: '<home-presentation></home-presentation>',
    components: {
        'home-presentation': warningList
    }
})
