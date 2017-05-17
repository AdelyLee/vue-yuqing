/**
 * Created by Administrator on 2017/5/3.
 */
import Vue from "vue"
import VueRouter from "vue-router"
import Decision from "./decisionReport.vue"
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-default/index.css'   // 默认主题
import './scss/decisionReport.scss'

Vue.use(VueRouter);
Vue.use(ElementUI);
//创建一个路由器实例
//并且配置路由规则

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/decisionReport",
            component: Decision
        }
    ]
})

new Vue({
    el: "#decision",
    router: router,
    template: '<decision-report></decision-report>',
    components: {
        "decision-report": Decision
    }
})

