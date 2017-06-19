<template>
    <div id="index">
        <common-header></common-header>
        <el-row :gutter="5">
            <el-col :span="3">
                <common-menu></common-menu>
            </el-col>
            <el-col :span="21">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <div class="card-body" id="content">
                        <el-row :gutter="15">
                            <el-col :span="12">
                                <news-list :articleData="articleTabData" @data="getData"></news-list>
                            </el-col>
                            <el-col :span="12">
                                <news-list :articleData="articleBbsTabData" @data="getData"></news-list>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="8">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span class="chart-text">近30天舆情信息</span>
                                    </div>
                                    <pie-chart :chartConfig="sentimentAnalysis"></pie-chart>
                                </el-card>
                            </el-col>
                            <el-col :span="16">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span class="chart-text">载体趋势分析</span>
                                    </div>
                                    <div class="buttons mediaTypeTrendChart">
                                        <div class="el-tabs__header">
                                            <div class="el-tabs__nav-wrap">
                                                <div class="el-tabs__nav-scroll">
                                                    <div class="el-tabs__nav">
                                                        <div class="el-tabs__item"
                                                             @click="handleClickTrendButton('today', $event)"><span>
                                                            <i class="el-icon-date"></i> 今天</span></div>
                                                        <div class="el-tabs__item"
                                                             @click="handleClickTrendButton('yesterday', $event)"><span>
                                                            <i class="el-icon-date"></i> 昨天</span></div>
                                                        <div class="el-tabs__item"
                                                             @click="handleClickTrendButton('nearly', $event)"><span>
                                                            <i class="el-icon-date"></i> 近7天</span></div>
                                                        <div class="el-tabs__item is-active"
                                                             @click="handleClickTrendButton('monthly', $event)"><span>
                                                            <i class="el-icon-date"></i> 近30天</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chart">
                                        <bar-chart :chartConfig="mediaTypeTrendAnalysis"></bar-chart>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="16" class="lists">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span class="chart-text">近30天主流媒体分布</span>
                                    </div>
                                    <bar-chart :chartConfig="mediaBarChart"></bar-chart>
                                </el-card>
                            </el-col>
                            <el-col :span="8">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span class="chart-text">载体分布统计</span>
                                    </div>
                                    <div class="buttons mediaTypeBarChart">
                                        <div class="el-tabs__header">
                                            <div class="el-tabs__nav-wrap">
                                                <div class="el-tabs__nav-scroll">
                                                    <div class="el-tabs__nav">
                                                        <div class="el-tabs__item"
                                                             @click="handleClickBarButton('today', $event)"><span>
                                                            <i class="el-icon-date"></i> 今天</span></div>
                                                        <div class="el-tabs__item"
                                                             @click="handleClickBarButton('yesterday', $event)"><span>
                                                            <i class="el-icon-date"></i> 昨天</span></div>
                                                        <div class="el-tabs__item"
                                                             @click="handleClickBarButton('nearly', $event)"><span>
                                                            <i class="el-icon-date"></i> 近7天</span></div>
                                                        <div class="el-tabs__item is-active"
                                                             @click="handleClickBarButton('monthly', $event)"><span>
                                                            <i class="el-icon-date"></i> 近30天</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chart">
                                        <bar-chart :chartConfig="mediaTypeBarAnalysis"></bar-chart>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                        <article-list v-if="articles.length > 0" :id="articleListId" :type="articleType"
                                      :articles="articles" :pager="pager" @data="getData"></article-list>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Header from '@/components/commons/header';
    import CommonMenu from '@/components/commons/menu';
    import News from '@/components/index/news';
    import LineBarChart from '@/components/commons/charts/line-bar';
    import PieChart from '@/components/commons/charts/pie';
    import ArticleList from '@/components/index/articleList';
    import typeUtil from '../../vuex/typeUtil';
    import dateUtil from '../../vuex/dateUtil';
    import service from '../../vuex/module/index.js';

    import $ from 'jquery';

    export default {
        name: 'index',
        data () {
            var self = this;
            return {
                activeBarName: '近30天',
                activeArticleTabName: 'news',
                articleTabData: {
                    type: '',
                    articles: []
                },
                articleBbsTabData: {
                    type: '',
                    articles: []
                },
                tabArticleType: "news",
                tabBbsArticleType: "bbs",
                sentimentAnalysis: {
                    chartId: 'sentimentAnalysis',
                    option: {},
                    events: {
                        'click': function (param) {
                            self.articlesCondition = {};
                            var date = new Date();
                            var startDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), 'yyyy-MM-dd');
                            var endDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), 'yyyy-MM-dd');
                            self.articlesCondition.startDate = startDate;
                            self.articlesCondition.endDate = endDate;
                            var value = typeUtil.typeUtil.encodeSentimentType(param.name);
                            self.articlesCondition.searchKv = [{"key": "nlp.sentiment.label", "value": value}];
                            self.getArticleListByCondition(self.articlesCondition);
                        }
                    }
                },
                mediaTypeTrendAnalysis: {
                    chartId: 'mediaTypeTrendAnalysis',
                    option: {},
                    events: {
                        'click': function (param) {
                            self.getMediaTypeTrendChartCondition(param);
                            self.getArticleListByCondition(self.articlesCondition);
                        }
                    }
                },
                mediaTypeBarAnalysis: {
                    chartId: 'mediaTypeBarAnalysis',
                    option: {},
                    events: {
                        'click': function (param) {
                            self.getMediaTypeBarChartCondition(param);
                            self.getArticleListByCondition(self.articlesCondition);
                        }
                    }
                },
                mediaBarChart: {
                    chartId: 'media-bar-chart',
                    option: {},
                    events: {
                        'click': function (param) {
                            self.articlesCondition = {};
                            var date = new Date();
                            var startDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), 'yyyy-MM-dd');
                            var endDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), 'yyyy-MM-dd');
                            self.articlesCondition.startDate = startDate;
                            self.articlesCondition.endDate = endDate;
                            var value = param.name;
                            self.articlesCondition.searchKv = [{"key": "source", "value": value}];
                            self.getArticleListByCondition(self.articlesCondition);
                        }
                    }
                },
                pager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 1
                },
                trendTimesType: 'monthly',
                barTimesType: 'monthly',
                articlesCondition: {
                    startDate: "",
                    endDate: "",
                    searchKv: [],
                    type: []
                }, // 获取文章列表相关条件
                articleType: "",
                articles: [],
                articleListId: 'article-list'
            }
        },
        components: {
            'common-header': Header,
            'common-menu': CommonMenu,
            'news-list': News,
            'bar-chart': LineBarChart,
            'pie-chart': PieChart,
            'article-list': ArticleList
        },
        mounted () {
            this.getSentimentTypeChart();
            this.getMediaTypeTrendChart(this.trendTimesType);
            this.getMediaTypeBarChart(this.barTimesType);
            this.getMediaBarChart();
            this.getArticleTabList(this.tabArticleType);
            this.getArticleTabList(this.tabBbsArticleType);
        },
        methods: {
            getSentimentTypeChart: function () {
                var self = this;
                service.actions.getSentimentTypeChart().then(function (option) {
                    self.sentimentAnalysis.option = option;
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getMediaTypeTrendChart: function (type) {
                var self = this;
                service.actions.getMediaTypeTrendChart(type).then(function (option) {
                    self.mediaTypeTrendAnalysis.option = option;
                });

            },
            getMediaTypeBarChart: function (type) {
                var self = this;
                var conditionDate = self.getConditionDate(type);
                service.actions.getMediaTypeBarChart(conditionDate).then(function (option) {
                    self.mediaTypeBarAnalysis.option = option;
                });
            },

            getMediaBarChart: function () {
                var self = this;
                service.actions.getMediaBarChart().then(function (option) {
                    self.mediaBarChart.option = option;
                });
            },
            getArticleTabList: function (type) {
                var self = this;
                service.actions.getArticleTabList(type).then(function (data) {
                    if (type == 'news') {
                        self.articleTabData.type = type;
                        self.articleTabData.articles = data.content;
                    } else if (type == 'bbs') {
                        self.articleBbsTabData.type = type;
                        self.articleBbsTabData.articles = data.content;
                    }
                });
            },
            getData (data) {
                var self = this;
                self.articlesCondition = {};
                switch (data.action) {
                    case 'clickArticleListPager':
                        self.pager = data.articleListPager;
                        break;
                    case 'showMoreArticle':
                        self.pager.currentPage = 1;
                        var date = new Date();
                        var startDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), 'yyyy-MM-dd');
                        var endDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), 'yyyy-MM-dd');
                        self.articlesCondition.startDate = startDate;
                        self.articlesCondition.endDate = endDate;
                        self.articlesCondition.type = [data.data];
                        self.articlesCondition.searchKv = [];
                        self.articleType = data.data;
                        break;
                }
                self.getArticleListByCondition();
            },

            getArticleListByCondition: function () {
                var self = this;
                service.actions.getArticleListByCondition(self.pager.pageSize, self.pager.currentPage, self.articlesCondition).then(function (data) {
                    self.articles = data.content;
                    self.pager.totalElements = data.totalElements;
                })
            },

            handleClickTrendButton: function (trendTimesType, item) {
                var self = this;
                $(".buttons.mediaTypeTrendChart").find(".el-tabs__item").removeClass('is-active');
                $(item.currentTarget).addClass('is-active');
                self.trendTimesType = trendTimesType;
                self.getMediaTypeTrendChart(self.trendTimesType);
            },

            handleClickBarButton: function (barTimesType, item) {
                var self = this;
                $(".buttons.mediaTypeBarChart").find(".el-tabs__item").removeClass('is-active');
                $(item.currentTarget).addClass('is-active');
                self.barTimesType = barTimesType;
                self.getMediaTypeBarChart(self.barTimesType);
            },

            getMediaTypeTrendChartCondition: function (param) {
                var self = this;
                self.articlesCondition = {};
                var dateStr = param.name;
                var date = dateUtil.dateUtil.parseDate(dateStr);
                var startDate = dateUtil.dateUtil.formatDate(date, 'yyyy-MM-dd');
                var endDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), 'yyyy-MM-dd');
                self.articlesCondition.startDate = startDate;
                self.articlesCondition.endDate = endDate;
                var value = typeUtil.typeUtil.encodeArticleType(param.seriesName);
                self.articlesCondition.type = [value];
            },

            getMediaTypeBarChartCondition: function (param) {
                var self = this;
                self.articlesCondition = {};
                self.articlesCondition.startDate = self.getConditionDate(self.barTimesType).startDate;
                self.articlesCondition.endDate = self.getConditionDate(self.barTimesType).endDate;
                var value = typeUtil.typeUtil.encodeArticleType(param.name);
                self.articlesCondition.type = [value];
            },

            getConditionDate: function (timeType) {
                var conditionDate = {}, s_date = "", e_date = "";
                var date = new Date();
                switch (timeType) {
                    case "today":
                        e_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), "yyyy-MM-dd");
                        s_date = dateUtil.dateUtil.formatDate(date, "yyyy-MM-dd");
                        break;
                    case 'yesterday':
                        e_date = dateUtil.dateUtil.formatDate(date, "yyyy-MM-dd");
                        s_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', -1), "yyyy-MM-dd");
                        break;
                    case 'nearly':
                        e_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), "yyyy-MM-dd");
                        s_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', -7), "yyyy-MM-dd");
                        break;
                    case 'monthly':
                        e_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), "yyyy-MM-dd");
                        s_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), "yyyy-MM-dd");
                        break;
                    default:
                        break;
                }
                conditionDate.startDate = s_date;
                conditionDate.endDate = e_date;

                return conditionDate;
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
                            scrollTop: $("#article-list").offset().top
                        }, 500);
                    })
                }
            }
        }
    }
</script>


