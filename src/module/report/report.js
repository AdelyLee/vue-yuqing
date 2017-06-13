/**
 * Created by Administrator on 2017/5/3.
 */
import Vue from "vue"
import VueRouter from "vue-router"
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import Report from "./report.vue"

import 'element-ui/lib/theme-default/index.css'   // 默认主题
import './scss/report.scss'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
//创建一个路由器实例
//并且配置路由规则

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/report",
            component: Report
        }
    ]
});

new Vue({
    el: "#report",
    router: router,
    template: '<report></report>',
    components: {
        "report": Report
    }
});
