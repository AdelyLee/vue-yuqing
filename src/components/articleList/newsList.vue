<template>
    <el-row class="content" id="list">
       <ul>
           <li class="l_style"  v-for="item in checkedItems" :title="item.title" :id="item.id" @click="change(item.id)">
               <a target="blank">
                       <el-col :span="1">
                           <img :src="logoSrc" >
                       </el-col>
                   <el-row :gutter="1">
                       <el-col :span="12">
                           <a class="a_font"><span>{{item.title}}</span></a>
                       </el-col>
                       <el-col :span="12">
                           <span v-html='item.content'></span>
                       </el-col>
                   </el-row>
               </a>
               <a target="blank" class="a_position">
                   <el-row :gutter="1" class="l_bottom">
                       <el-col :span="8">
                           <span>{{realTime}}</span>
                       </el-col>
                   <el-col :span="8">
                       <span v-html="">[来源]：{{item.site}}</span>
                   </el-col>
                   <el-col :span="8">
                       <span>[发布时间]：{{new Date(item.pubTime).toLocaleString().substr(0,9)}}</span>
                   </el-col>
                   </el-row>
               </a>
           </li>
       </ul>
    </el-row>
</template>
<script>
    //import service from '../../vuex/module/presentation.js'
    import Vue from 'vue'
//    import Paging from '@/components/presentationList/paging';
    import $ from 'jquery'
    import common from '../../vuex/module/common'
    import service from '../../vuex/module/currentSpecialReport.js'
    export default {
        data () {
            return {
                realTime: '实时监测',
                modify: '修改',
                update: '更新',
                deletes: '删除',
                value3: '100',
                items: [],
                limits: 10,
                pages: '',
                checkedItems: [],
                logoSrc: '../../static/img/WB_logo.png'
            }
        },
        components: {},
        mounted () {
            this.getNewsCurrentList();

        },
        methods: {

            getNewsCurrentList:function() {
                var self = this;
                service.actions.getNewsCurrentList().then(function (data) {
                    console.log(data);
                    self.checkedItems=data.content;

//                    self.title=self.resetArticleTypeName(data.content[0].type);
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            change: function (id) {
                window.open('https://www.baidu.com#id=' + id)
            },
        },
    }
</script>

<style lang="scss" scoped>
    /*$border-radius: 45px 0px 45px 0px;*/
    /*$background-color: #0000fe;*/
    /*$color:#ffffff;*/
    /*$text-align:center;*/
    /*$font-size:16px;*/
    /*$font-family:微软雅黑;*/

</style>
