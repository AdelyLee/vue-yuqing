<template>
    <div id="search">
        <common-header></common-header>
        <el-row :gutter="5" class="content">
            <el-col :span="24">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <div slot="header" class="panel-height">
                        <span style="line-height: 40px;"><i class="el-icon-menu"></i> 與情搜索</span>
                    </div>
                    <el-row :gutter="15">
                        <div class="card-body">
                            <div class="search">
                                <el-input placeholder="请输入内容" v-model="condition.mustWord">
                                    <template slot="prepend"><i class="el-icon-view"></i></template>
                                    <el-button slot="append" @click="clickSearch"><span class="search-icon">搜索</span></el-button>
                                </el-input>
                            </div>
                            <div class="hot-search">
                                <p>热门搜索：</p>
                                <li>煤矿</li>
                                <li>安监</li>
                                <li>隐患企业</li>
                            </div>
                        </div>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="15">
                            <search-list :searchList="searchList"></search-list>
                            <el-row>
                                <list-page :pager="pager" @data="getPager"></list-page>
                            </el-row>
                        </el-col>
                        <el-col :span="9">
                            <div class="hot-list">热度排行</div>
                            <div class="search-list">
                                <li class="title">重庆矿难系越界违法生产、违章放炮所致</li>
                                <li>重庆永川区金山沟煤矿瓦斯爆炸，33人已确认全部遇难。很奇怪，平时爱义愤填膺的媒体与网络公知却没有...</li>
                                <div class="times">2017-04-06</div>
                            </div>
                            <div class="clearfix table-bottom"><span class="news-more" @click="target(title)">更多</span>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import Paging from '@/components/commons/paging';
    import SearchList from '@/components/search/search-list';

    import service from '../../vuex/module/search.js'

    export default{
        name: 'search',
        data () {
            return {
                condition: {
                    mustWord: "",
                    mustNotWord: "",
                    shouldWord: "",
                },
                searchList: [],
                pager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 1
                },
            }
        },
        components: {
            'common-header': Header,
            'list-page': Paging,
            'search-list': SearchList
        },
        mounted () {
            this.clickSearch();
        },
        methods: {
            clickSearch: function () {
                this.getSearchArticles(this.condition);
            },
            getSearchArticles: function (condition) {
                var self = this;
                service.actions.getSearchArticles(self.pager.pageSize, self.pager.currentPage, condition).then(function (data) {
                    self.searchList = data.content;
                    self.pager.totalElements = data.totalElements;
                });
            },
            getPager(pager) {
                this.pager = pager;
                this.getSearchArticles(this.condition);
            }
        }
    }
</script>

