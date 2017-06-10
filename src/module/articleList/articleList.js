/**
 * Created by Administrator on 2017/5/3.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import ArticleList from './articleList.vue'
import VueResource from 'vue-resource'

import 'element-ui/lib/theme-default/index.css'   // 默认主题
import './scss/articleList.scss'

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
            path: '/articleList',
            component: ArticleList
        }
    ]
})

new Vue({
    el: '#articleList',
    router: router,
    template: '<article-list></article-list>',
    components: {
        'article-list': ArticleList
    }
})
