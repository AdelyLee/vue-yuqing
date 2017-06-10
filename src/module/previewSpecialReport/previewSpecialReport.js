/**
 * Created by topcom on 2017/5/23.
 */
import Vue from "vue"
import VueRouter from "vue-router"
import VueResource from 'vue-resource'
import PreviewSpecialReport from "./previewSpecialReport.vue"
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-default/index.css'   // 默认主题
import './scss/previewSpecialReport.scss'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
//创建一个路由器实例
//并且配置路由规则

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/previewSpecialReport",
            component: PreviewSpecialReport
        }
    ]
})

new Vue({
    el: "#special",
    router: router,
    template: '<special-report></special-report>',
    components: {
        "special-report": PreviewSpecialReport
    }
})
