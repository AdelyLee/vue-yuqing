/**
 * Created by Administrator on 2017/5/3.
 */
/**
 * Created by Administrator on 2017/5/3.
 */
/**
 * Created by lyc on 17-4-27.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Customize from './customize.vue'

Vue.use(VueRouter)

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

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #index 匹配的元素上。
/* eslint-disable no-new */
new Vue({
    el: '#customize',
    router: router,
    template: '<customize-inspect></customize-inspect>',
    components: {
        'customize-inspect': Customize
    }
})
