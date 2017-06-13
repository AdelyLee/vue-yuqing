<template>
    <div id="search">
        <common-header></common-header>
        <el-row :gutter="5" class="content">
            <el-col :span="3">
                <common-menu></common-menu>
            </el-col>
            <el-col :span="21">
                <div class="card-body" id="content">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <el-row :gutter="15">
                        <div class="card-body">
                            <div class="search">
                                <el-input placeholder="请输入内容" v-model="condition.mustWord">
                                    <template slot="prepend"><i class="el-icon-view"></i></template>
                                    <el-button slot="append" @click="clickSearch"><span class="search-icon">搜索</span>
                                    </el-button>
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
                        <el-col :span="18" :offset="3">
                            <el-collapse accordion>
                                <el-collapse-item title="更多筛选">
                                        <el-col :span="20" style="margin-bottom: 15px;">
                                            <span class="text">监测时间: </span>
                                            <el-date-picker
                                                v-model="value1"
                                                type="date"
                                                placeholder="选择日期"
                                                :picker-options="pickerOptions0">
                                            </el-date-picker>
                                              -
                                            <el-date-picker
                                                v-model="value2"
                                                type="date"
                                                placeholder="选择日期"
                                                :picker-options="pickerOptions1">
                                            </el-date-picker>
                                        </el-col>
                                       <hr size=1 style="color: #ccc;border-style:dashed ;width:100%">
                                        <el-col :span="10" style="margin-bottom: 15px;">
                                            <span class="text">信息排序: </span>
                                            <el-radio-group v-model="radio2" @change="changeSort(radio2)">
                                                <el-radio :label="1">时间降序</el-radio>
                                                <el-radio :label="2">时间升序</el-radio>
                                                <el-radio :label="3">相关度降序</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                        <el-col :span="10" style="margin-bottom: 15px;">
                                            <span class="text">匹配方式: </span>
                                            <el-radio-group v-model="radio4" @change="changeTitle(radio4)">
                                                <el-radio :label="1">按全文</el-radio>
                                                <el-radio :label="2">按正文</el-radio>
                                                <el-radio :label="3">按标题</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                       <hr size=1 style="color: #ccc;border-style:dashed ;width:100%">
                                        <el-col :span="10" style="margin-bottom: 15px;">
                                            <span class="text">情感属性: </span>
                                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                            <el-checkbox-group v-model="checkedEmotion" @change="handleCheckedCitiesChange" style="display: inline-block;">
                                                <el-checkbox v-for="emotion in emotions" :label="emotion" :key="emotion">{{emotion}}</el-checkbox>
                                            </el-checkbox-group>
                                        </el-col>
                                        <el-col :span="10" style="margin-bottom: 15px;">
                                            <span class="text">载体类型: </span>
                                            <el-checkbox :indeterminate="isIndeterminateType" v-model="checkAllType"
                                                         @change="handleCheckAllTypeChange">全部
                                            </el-checkbox>
                                            <el-checkbox-group v-model="checkedType" @change="handleCheckedTypesChange"
                                                               style="display: inline-block;">
                                                <el-checkbox v-for="type in types" :label="type" :key="type">{{type}}</el-checkbox>
                                            </el-checkbox-group>

                                        </el-col>
                                    <hr size=1 style="color: #ccc;border-style:dashed ;width:100%">
                                       <el-col :span="10" style="margin-bottom: 15px;">
                                        <span class="text">显示条数: </span>
                                        <el-radio-group v-model="radio5" @change="changeTitle(radio5)">
                                            <el-radio :label="1">30</el-radio>
                                            <el-radio :label="2">50</el-radio>
                                            <el-radio :label="3">100</el-radio>
                                        </el-radio-group>
                                    </el-col>
                               </el-collapse-item>
                            </el-collapse>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="24">
                            <div class="article-list" style="width: 95%; margin: 0 auto;">
                                <search-list :searchList="searchList" @data="getArticle"></search-list>
                                <el-row>
                                    <list-page :pager="pager" @data="getPager"></list-page>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import CommonMenu from '@/components/commons/menu';
    import Paging from '@/components/commons/paging';
    import SearchList from '@/components/search/search-list';

    import service from '../../vuex/module/search.js'
    const typeOptions = ['新闻', '微博', '贴吧', '论坛'];
    const emotionOptions = ['正面', '负面', '中性'];
    export default{
        name: 'search',
        data () {
            return {
                condition: {
                    mustWord: "",
                    mustNotWord: "",
                    shouldWord: ""
                },
                searchList: [],
                pager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 1
                },
                article: {},
                value1: '',
                value2: '',
                radio2: 1,
                radio3: 1,
                radio4: 1,
                radio5: 1,
                checkAll: true,
                checkedEmotion: ['正面', '负面', '中性'],
                checkedType: ['新闻'],
                isIndeterminate: true,
                checkAllType: true,
                checkAllEmotion: true,
                types: typeOptions,
                emotions: emotionOptions,
                isIndeterminateType: true,
                isIndeterminateEmotion: true,
            }
        },
        components: {
            'common-header': Header,
            'common-menu': CommonMenu,
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
                service.actions.getSearchArticlesTemp(self.pager.pageSize, self.pager.currentPage, condition).then(function (data) {
                    debugger;
                    self.searchList = data.content;
                    self.pager.totalElements = data.totalElements;
                });
            },
            showArticleDetail: function (article) {
                window.open("../module/detail.html?id=" + article.id);
            },
            getPager(pager) {
                this.pager = pager;
                this.getSearchArticles(this.condition);
            },
            getArticle(data) {
                var self = this;
                self.article = data.article;
                switch (data.action) {
                    case 'showArticleDetail':
                        self.showArticleDetail(self.article);
                        break;
                }
            }
        }
    }
</script>

