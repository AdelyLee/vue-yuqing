<template>
    <div id="article">
        <common-header></common-header>
        <div class="model">
            <span class="close" @click="close()"><i class="el-icon-circle-cross"></i></span>
            <el-row :gutter="5" class="list">
                <el-col class="el_coldate">
                    <el-card class="box-card" :body-style="{ padding: '10px' }">
                        <el-row class="content" id="list">
                            <ul v-if="type =='News'" class="ul_p">
                                <li class="l_style" v-for="item in News" :key="item.id" :title="item.title"
                                    :id="item.id" @click="change(item.id)">
                                    <a target="blank">
                                        <el-col :span="1">
                                            <img :src="logoSrc">
                                        </el-col>
                                        <el-row :gutter="1" class="news_p">
                                            <el-col :span="12">
                                                <a class="a_font"><span>{{item.title}}</span></a>
                                            </el-col>
                                            <el-col :span="20" class="news_m">
                                                <span>{{item.content.length > 100 ? item.content.substr(0, 100) + '...' : item.content}}</span>
                                            </el-col>
                                        </el-row>
                                    </a>
                                    <a target="blank" class="a_position">
                                        <el-row :gutter="1" class="l_bottom">
                                            <el-col :span="8">
                                                <span v-html="">[来源]：{{item.site}}</span>
                                            </el-col>
                                            <el-col :span="8">
                                                <span>[发布时间]：{{new Date(item.pubTime).toLocaleString().substr(0,9)}}</span>
                                            </el-col>
                                            <el-col :span="8">
                                                <span>[评论数]：{{item.commentNum}}</span>
                                            </el-col>
                                        </el-row>
                                    </a>
                                </li>
                            </ul>
                            <ul v-else-if="type =='Bar'">
                                <li class="l_style" v-for="item in News" :key="item.id" :title="item.title" :id="item.id"
                                    @click="change(item.id)">
                                    <a target="blank">
                                        <el-col :span="4">
                                            <img :src='item.photo'>
                                            <a><span class="author">{{item.author}}</span></a>
                                            <span class="bar_title">{{item.title}}</span>
                                        </el-col>
                                        <el-row :gutter="1">
                                            <el-col :span="12">
                                            <a class="a_font"><span>{{item.title}}</span></a>
                                            </el-col>

                                        </el-row>
                                    </a>
                                    <a target="blank" class="a_position">
                                        <el-row :gutter="1" class="l_bottom">

                                            <el-col :span="8">
                                                <span v-html="">[来源]：{{item.site}}</span>
                                            </el-col>
                                            <el-col :span="8">
                                                <span>[发布时间]：{{new Date(item.pubTime).toLocaleString().substr(0,9)}}</span>
                                            </el-col>
                                            <el-col :span="8">
                                                <span>[评论数]：{{item.commentNum}}</span>
                                            </el-col>
                                        </el-row>
                                    </a>
                                </li>
                            </ul>
                            <ul v-if="type =='bbs'">
                                <li class="l_style" v-for="item in News" :key="item.id" :title="item.title" :id="item.id"
                                    @click="change(item.id)">
                                    <a target="blank">
                                        <el-col :span="1">
                                            <img :src="logoSrc">
                                        </el-col>
                                        <el-row :gutter="1">
                                            <el-col :span="12">
                                                <a class="a_font">{{item.title.length > 13 ? item.title.substr(0, 13) +
                                                    '...' : item.title}}</a>
                                            </el-col>
                                            <el-col :span="20" class="news_m">
                                                <span>{{item.content.length > 100 ? item.content.substr(0, 100) + '...' : item.content}}</span>
                                            </el-col>
                                        </el-row>
                                    </a>
                                    <a target="blank" class="a_position">
                                        <el-row :gutter="1" class="l_bottom">

                                            <el-col :span="8">
                                                <span>[作者]：{{item.author}}</span>
                                            </el-col>
                                            <el-col :span="8">
                                                <span v-html="">[来源]：{{item.channel}}</span>
                                            </el-col>
                                            <el-col :span="8">
                                                <span>[发布时间]：{{new Date(item.pubTime).toLocaleString().substr(0,9)}}</span>
                                            </el-col>

                                        </el-row>
                                    </a>
                                </li>
                            </ul>
                        </el-row>
                        <list-page :pager="pager" @data="getPager"></list-page>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import Paging from '@/components/commons/paging';
    import service from '../../vuex/module/articleList.js';
    import queryParam from '../../vuex/utils.js';
    import $ from 'jquery'
    export default {
        name: 'articleList',
        data () {
            return {
                type: queryParam.utils.getQueryVariable("type"),
                News: [],
                logoSrc: '../../static/img/WB_logo.png',
                pager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 10
                },
            }
        },
        components: {
            'common-header': Header,
            'list-page': Paging
        },
        mounted () {
                this.getNewsCurrentList();
        },
        methods: {
            getNewsCurrentList: function () {
                var self = this;
                service.actions.getNewsCurrentList(self.type, self.pager.pageSize, self.pager.currentPage).then(function (data) {
                    data.content.forEach(function(item){
                        item.content = item.content.replace(new RegExp('<[^>].*?>', 'gi'), '').replace(/&nbsp;/ig, "");
                    });
                    self.News = data.content;
                    self.pager.totalElements = data.totalElements;
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            change: function (id) {
                window.open('../../module/detail.html?id=' + id)
            },
            getPager(pager) {
                var self=this;
                self.pager = pager;
                console.log( self.pager)
                this.getNewsCurrentList();
            },
            establish: function () {
                $('.model').show();
            },
            close: function () {
                $('.model').hide();
            },

        },
        watch: {

            type: function (val, oldVal) {
//                console.log(this.checkedItems)
                console.log('new: %s, old: %s', val, oldVal)
            },
            News: function (val, oldVal) {
//                console.log(this.checkedItems)
                console.log('new: %s, old: %s', val, oldVal)
            },
        },
    }

</script>

