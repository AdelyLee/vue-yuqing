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
                                        <el-button slot="append" @click="clickSearch"><span
                                            class="search-icon">搜索</span>
                                        </el-button>
                                    </el-input>
                                </div>
                                <!--<div class="hot-search">-->
                                <!--<p>热门搜索：</p>-->
                                <!--<li>煤矿</li>-->
                                <!--<li>安监</li>-->
                                <!--<li>隐患企业</li>-->
                                <!--</div>-->
                            </div>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="18" :offset="3">
                                <el-collapse accordion>
                                    <el-collapse-item title="更多筛选">
                                        <el-col :span="24" style="margin-bottom: 15px;">
                                                <span class="text" style="width:15%;">关键词: </span>
                                                <el-input type="input" v-model="condition.mustWord" placeholder="关键词之间用@隔开" style="width:65%;margin-left: 1%"></el-input>
                                                <hr size=1 style="color: #ccc;border-style:dashed;width:100%;">
                                                <span class="text" style="width:15%;">同现词: </span>
                                                <el-input type="input" v-model="condition.shouldWord" placeholder="同现词之间用@隔开" style="width:65%;margin-left: 1%"></el-input>
                                                <hr size=1 style="color: #ccc;border-style:dashed;width:100%;">
                                                <span class="text" style="width:15%;">排除词: </span>
                                                <el-input type="input" v-model="condition.mustNotWord" placeholder="排除词之间用@隔开" style="width:65%;margin-left: 1%"></el-input>
                                        </el-col>
                                        <hr size=1 style="color: #ccc;border-style:dashed;width:100%;">
                                        <el-col :span="20" style="margin-bottom: 15px;">
                                            <span class="text">监测时间: </span>
                                            <el-date-picker v-model="condition.startDate" type="date"
                                                            placeholder="选择开始日期">
                                            </el-date-picker>
                                            <span> - </span>
                                            <el-date-picker v-model="condition.endDate" type="date"
                                                            placeholder="选择结束日期">
                                            </el-date-picker>
                                        </el-col>
                                        <hr size=1 style="color: #ccc;border-style:dashed;width:100%;">
                                        <el-col :span="12" style="margin-bottom: 15px;">
                                            <span class="text">信息排序: </span>
                                            <el-radio-group v-model="direction" @change="changeSort">
                                                <el-radio :label="-1">时间降序</el-radio>
                                                <el-radio :label="1">时间升序</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                        <el-col :span="12" style="margin-bottom: 15px;">
                                            <span class="text">匹配方式: </span>
                                            <el-radio-group v-model="filed" @change="changeFiled">
                                                <el-radio :label="0">按全文</el-radio>
                                                <el-radio :label="1">按正文</el-radio>
                                                <el-radio :label="2">按标题</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                        <hr size=1 style="color: #ccc;border-style:dashed ;width:100%">
                                        <el-col :span="12" style="margin-bottom: 15px;">
                                            <span class="text">情感属性: </span>
                                            <el-checkbox :indeterminate="isIndeterminateEmotion"
                                                         v-model="checkAllEmotion"
                                                         @change="handleEmotionCheckAllChange">全选
                                            </el-checkbox>
                                            <el-checkbox-group v-model="emotionArray"
                                                               @change="handleCheckedEmotionChange"
                                                               style="display: inline-block;">
                                                <el-checkbox v-for="emotion in emotions" :label="emotion"
                                                             :key="emotion">{{emotion}}
                                                </el-checkbox>
                                            </el-checkbox-group>
                                        </el-col>
                                        <el-col :span="12" style="margin-bottom: 15px;">
                                            <span class="text">载体类型:  </span>
                                            <el-checkbox :indeterminate="isIndeterminateMediaType"
                                                         v-model="checkAllMediaType"
                                                         @change="handleMediaTypeCheckAllChange">全选
                                            </el-checkbox>
                                            <el-checkbox-group v-model="mediaTypeArray"
                                                               @change="handleCheckedMediaTypeChange"
                                                               style="display: inline-block;">
                                                <el-checkbox v-for="type in mediaTypes" :label="type" :key="type">
                                                    {{type}}
                                                </el-checkbox>
                                            </el-checkbox-group>
                                        </el-col>
                                        <hr size=1 style="color: #ccc;border-style:dashed ;width:100%">
                                        <el-col :span="12" style="margin-bottom: 15px;">
                                            <span class="text">显示条数: </span>
                                            <el-radio-group v-model="condition.pageSize" @change="changePageSize">
                                                <el-radio :label="10">10</el-radio>
                                                <el-radio :label="30">30</el-radio>
                                                <el-radio :label="50">50</el-radio>
                                                <el-radio :label="100">100</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-collapse-item>
                                </el-collapse>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="18" :offset="3">
                                <div class="article-list">
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

    import typeUtil from '../../vuex/typeUtil.js'
    import service from '../../vuex/module/search.js'
    const typeOptions = ['新闻', '微博', '贴吧', '论坛'];
    const emotionOptions = ['正面', '负面', '中性'];
    export default{
        name: 'search',
        data () {
            return {
                condition: {
                    mustWord: "安全生产",
                    mustNotWord: "",
                    shouldWord: "",
                    startDate: "",
                    endDate: "",
                    direction: "DESC", //排序方式ASC DESC
                    filed: "",
                    pageSize: 10,
                    searchKv: [],
                    mediaTypes: [],
                },
                direction: -1, //排序方式ASC DESC
                filed: 0,
                searchList: [],
                pager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 1
                },
                article: {},
                checkAllEmotion: false,
                checkAllMediaType: false,
                isIndeterminateMediaType: false,
                isIndeterminateEmotion: false,
                emotionArray: [],
                mediaTypeArray: [],
                mediaTypes: typeOptions,
                emotions: emotionOptions
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
                var self = this;
                this.getSearchArticles(self.condition);
            },
            getSearchArticles: function (condition) {
                debugger;
                var self = this;
                self.pager.pageSize = self.condition.pageSize;

                service.actions.getSearchArticles(self.pager.pageSize, self.pager.currentPage, condition).then(function (data) {
                    self.searchList = data.content;
                    console.log(self.searchList);
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
            },
            changeSort: function () {
                var self = this;
                if (self.direction == -1) {
                    self.condition.direction = "DESC";
                } else if (self.direction == 1) {
                    self.condition.direction = "ASC";
                }
                self.clickSearch();
            },
            changeFiled: function () {
                var self = this;
                if (self.filed == 0) {
                    self.condition.filed = "";
                } else if (self.filed == 1) {
                    self.condition.filed = "content.cn";
                } else if (self.filed == 2) {
                    self.condition.filed = "title.cn";
                }

                self.clickSearch();
            },
            changePageSize: function () {
                this.clickSearch();
            },
            handleEmotionCheckAllChange(event) {
                var self = this;
                this.emotionArray = event.target.checked ? this.emotions : [];
                this.isIndeterminateEmotion = false;

                var emotions = [];
                self.emotionArray.forEach(function (item) {
                    emotions.push(typeUtil.typeUtil.encodeSentimentType(item))
                });
                var searchKv = [];
                if (emotions.length > 0) {
                    var item = {};
                    item.key = "nlp.sentiment.label";
                    item.value = emotions.join('@');
                    searchKv.push(item);
                }

                self.condition.searchKv = searchKv;

                self.clickSearch();
            },

            handleCheckedEmotionChange(value) {
                var self = this;
                var checkedCount = value.length;
                this.checkAllEmotion = checkedCount === this.emotions.length;
                this.isIndeterminateEmotion = checkedCount > 0 && checkedCount < this.emotions.length;

                var emotions = [];
                self.emotionArray.forEach(function (item) {
                    emotions.push(typeUtil.typeUtil.encodeSentimentType(item))
                });
                var searchKv = [];
                if (emotions.length > 0) {
                    var item = {};
                    item.key = "nlp.sentiment.label";
                    item.value = emotions.join('@');
                    searchKv.push(item);
                }
                self.condition.searchKv = searchKv;

                self.clickSearch();
            },

            handleMediaTypeCheckAllChange(event) {
                var self = this;
                this.mediaTypeArray = event.target.checked ? this.mediaTypes : [];
                this.isIndeterminateMediaType = false;

                var mediaTypes = [];
                self.mediaTypeArray.forEach(function (item) {
                    mediaTypes.push(typeUtil.typeUtil.encodeArticleType(item))
                });
                self.condition.mediaTypes = mediaTypes;

                self.clickSearch();
            },

            handleCheckedMediaTypeChange(value) {
                var self = this;
                var checkedCount = value.length;
                this.checkAllMediaType = checkedCount === this.mediaTypes.length;
                this.isIndeterminateMediaType = checkedCount > 0 && checkedCount < this.mediaTypes.length;

                var mediaTypes = [];
                self.mediaTypeArray.forEach(function (item) {
                    mediaTypes.push(typeUtil.typeUtil.encodeArticleType(item))
                });
                self.condition.mediaTypes = mediaTypes;

                self.clickSearch();
            },
        }
    }
</script>
