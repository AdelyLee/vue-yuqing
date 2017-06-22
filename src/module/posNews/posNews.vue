<template>
    <div id="posNews">
        <common-header></common-header>
        <el-row :gutter="5">
            <el-col :span="3">
                <common-menu></common-menu>
            </el-col>
            <el-col :span="21" :offset="3">
                <el-card class="box-card my-card-box">
                    <el-row>
                        <el-col :span="24">
                            <time-change :timeChange="timeChange" @data="getTimeParam"></time-change>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <news-list :articleData="articleTabData" @data="getData"></news-list>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-card class="box-card my-card" style="margin-top:5px;">
                                <div slot="header" class="clearfix">
                                    <span class="my-title">话题趋势</span>
                                </div>
                                <bar-chart :chartConfig="mediaReportTrendBar"></bar-chart>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-card class="box-card my-card" style="margin-top:5px;">
                                <div slot="header" class="clearfix">
                                    <span class="my-title">主流媒体</span>
                                </div>
                                <bar-chart :chartConfig="mediaBarChart"></bar-chart>
                            </el-card>
                        </el-col>
                        <el-col :span="12">
                            <el-card class="box-card my-card" style="margin-top:5px;">
                                <div slot="header" class="clearfix">
                                    <span class="my-title">热点词云</span>
                                </div>
                                <keywords-chart :chartConfig="keywordsChart"></keywords-chart>
                            </el-card>
                        </el-col>
                    </el-row>
                    <article-list v-if="articles.length > 0" :id="articleListId" :type="articleType"
                                  :articles="articles" :pager="pager" @data="getData"></article-list>
                </el-card>

            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import CommonMenu from '@/components/commons/menu';
    import News from '@/components/index/negNews';
    import ArticleList from '@/components/index/articleList';
    import LineBarChart from '@/components/commons/charts/line-bar';
    import KeywordsChart from '@/components/commons/charts/keywords-cloud';
    import timeChange from '@/components/index/timeChange';
    import dateUtil from '../../vuex/dateUtil.js';
    import typeUtil from '../../vuex/typeUtil.js';
    import service from '../../vuex/module/posNews.js';
    import $ from 'jquery';
    export default {
        name: 'presentationList',
        data () {
            var that = this;
            return {
                articleType: "",
                articles: [],
                kv: "nlp.sentiment.label,POS",
                handleCollect:[

                ],
                pager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 10
                },
                articleListId: 'article-list',
                timeChange: {
                    startDate: dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(new Date(), 'M', -1), 'yyyy-MM-dd'),
                    endDate: dateUtil.dateUtil.formatDate(new Date(), 'yyyy-MM-dd')
                },
                tabArticleType: "news",
                searchKv: [{
                    "key": "nlp.sentiment.label",
                    "value": "POS"
                }],
                articleTabData: {
                    type: '',
                    articles: [],
                    emotion: ''
                },
                keywordsChart: {
                    chartId: 'keywords-chart',
                    option: {}
                },
                conditions: {
                    searchKv: [],
                    type: []
                },
                mediaBarChart: {
                    chartId: 'media-bar-chart',
                    option: {},
                    events: {
                        'click': function (param) {
                            that.pager.currentPage = 1;
                            var value = param.name;
                            that.conditions.searchKv = [{
                                "key": "source",
                                "value": value
                            }, {"key": "nlp.sentiment.label", "value": "POS"}];
                            that.conditions.type = ["news"];
                            that.getArticleListByCondition(that.conditions, that.timeChange, that.pager.pageSize, that.pager.currentPage);
                        }
                    }
                },
                mediaReportTrendBar: {
                    chartId: 'media-report-trend-bar',
                    option: {},
                    events: {
                        'click': function (param) {
                            that.pager.currentPage = 1;
                            var dateStr = param.name;
                            var type = [];
                            type.push(typeUtil.typeUtil.encodeArticleType(param.seriesName));
                            var date = new Date(dateStr);
                            var startDate = dateUtil.dateUtil.formatDate(date, 'yyyy-MM-dd');
                            var endDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), 'yyyy-MM-dd');
                            that.timeChange.startDate = startDate;
                            that.timeChange.endDate = endDate;
                            that.conditions.searchKv = [{"key": "nlp.sentiment.label", "value": "POS"}];
                            that.conditions.type = type;
                            that.getArticleListByCondition(that.conditions, that.timeChange, that.pager.pageSize, that.pager.currentPage);
                        }
                    }
                }
            }
        },
        components: {
            'time-change': timeChange,
            'bar-chart': LineBarChart,
            'keywords-chart': KeywordsChart,
            'news-list': News,
            'common-menu': CommonMenu,
            'common-header': Header,
            'article-list': ArticleList
        },
        mounted () {
            this.getMediaReportTrendBar();//媒体报道走势柱图
            this.getMediaBarChart();        //主流媒体
            this.getKeywordsChart();//热点词云
            this.getArticleTabList();//新闻列表
        },
        methods: {
            getData (data) {
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
                service.actions.getArticleListByCondition(self.conditions, self.handleCollect,self.timeChange, self.pager.pageSize, self.pager.currentPage).then(function (data) {
                    self.articles = data.content;
                    self.pager.totalElements = data.totalElements;
                })
            },

            getMediaReportTrendBar: function () {
                var self = this;
                service.actions.getMediaReportTrendBar(self.timeChange, self.kv).then(function (renderData) {
                    self.mediaReportTrendBar.option = renderData;
                }, function (error) {
                    console.error('出错了', error);
                });
            },
            getArticleTabList: function () {
                var self = this;
                service.actions.getArticleTabList(self.tabArticleType, self.searchKv, self.timeChange).then(function (data) {
                    self.articleTabData.type = self.tabArticleType;
                    self.articleTabData.articles = data.content;
                    self.articleTabData.emotion = data.emotion;
                });
            },
            getMediaBarChart: function () {
                var self = this;
                service.actions.getMediaBarChart(self.timeChange, self.kv).then(function (option) {
                    self.mediaBarChart.option = option;
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getKeywordsChart: function () {
                var self = this;
                service.actions.getKeywordsChart(self.timeChange, self.kv).then(function (renderData) {
                    self.keywordsChart.option = renderData.option;
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getTimeParam: function (data) {
                var self = this;
                self.timeChange = data;
                this.getMediaReportTrendBar();
                this.getMediaBarChart();
                this.getKeywordsChart();
                this.getArticleTabList();
            }

        },
        watch: {
            articles: function (val, oldVal) {
                var self = this;
                if (val.length > 0) {
                    self.$nextTick(function () {
                        // DOM 现在更新了
                        // `this` 绑定到当前实例
                        // 页面滚动到指定位置
                        $('html, body').animate({
                            scrollTop: $("#article-list").offset().top - 30
                        }, 500);
                    })
                }
            }
        }
    }
</script>

