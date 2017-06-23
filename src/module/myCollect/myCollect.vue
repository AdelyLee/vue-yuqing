<template>
    <div id="myCollect">
        <common-header></common-header>
        <el-row :gutter="5">
            <el-col :span="3">
                <common-menu></common-menu>
            </el-col>
            <el-col :span="21" :offset="3">
                <el-card class="box-card my-card-box">
                    <el-button type="info">全选</el-button>
                    <el-button type="info">批量删除</el-button>
                    <el-button type="info">时间升序</el-button>
                    <el-button type="info">时间降序</el-button>
                    <el-button type="info">正面置顶</el-button>
                    <el-button type="info">负面置顶</el-button>
                    <article-list v-if="articles.length > 0" :id="articleListId" :type="articleType"
                                  :articles="articles" :pager="pager" @data="getData"></article-list>
                </el-card>

            </el-col>
        </el-row>
    </div>
</template>
<style>
    .my-card-box {margin-top:70px;}
</style>
<script>
    import Header from '@/components/commons/header';
    import CommonMenu from '@/components/commons/menu';
    import ArticleList from '@/components/index/articleList';
    import dateUtil from '../../vuex/dateUtil.js';
    import typeUtil from '../../vuex/typeUtil.js';
    import service from '../../vuex/module/myCollect.js';
    import $ from 'jquery';
    export default {
        name: 'presentationList',
        data () {
            var that = this;
            return {
                pager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 10
                },
                articles: [],
                articleListId: 'article-list'
            }
        },
        components: {
            'common-menu': CommonMenu,
            'common-header': Header,
            'article-list': ArticleList
        },
        mounted () {
            this.getArticleListByCondition();//新闻列表
        },
        methods: {
            getData (data) {
              debugger;
                var self = this;
                self.articlesCondition = {};
                switch (data.action) {
                    case 'clickArticleListPager':
                        self.pager = data.articleListPager;
                        self.getArticleListByCondition();
                        break;
                    case 'showMoreArticle':
                        self.conditions.searchKv = self.searchKv;
                        self.conditions.type = ["news"];
                        self.getArticleListByCondition(self.conditions);
                        break;
                    case 'handleCollect':
                        self.handleCollect = [];
                        self.handleCollect.push({"key":data.id,"value":data.collect});
                        self.getArticleListByCondition();
                        break;
                }
            },
            getArticleListByCondition: function () {
                var self = this;
                service.actions.getArticleListByCondition(self.pager.pageSize, self.pager.currentPage).then(function (data) {
                    self.articles = data.content;
                    self.pager.totalElements = data.totalElements;
                })
            }
        }
    }
</script>

