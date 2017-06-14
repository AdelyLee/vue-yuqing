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
                            <el-col :span="12"><news-list :articleData="articleTabData" @data="getData"></news-list></el-col>
                            <el-col :span="12"><news-list :articleData="articlebbsTabData" @data="getData"></news-list></el-col>
                            <!--<el-col :span="24" class="lists">-->
                                <!--<el-tabs v-model="activeArticleTabName" @tab-click="handleClickListTab">-->
                                    <!--<el-tab-pane label="最新新闻" name="news">-->
                                        <!--<news-list :articleData="articleTabData" @data="getData"></news-list>-->
                                    <!--</el-tab-pane>-->
                                    <!--<el-tab-pane label="最新微博" name="weibo">-->
                                        <!--<news-list :articleData="articleTabData" @data="getData"></news-list>-->
                                    <!--</el-tab-pane>-->
                                    <!--<el-tab-pane label="最新论坛" name="bbs">-->
                                        <!--<news-list :articleData="articleTabData" @data="getData"></news-list>-->
                                    <!--</el-tab-pane>-->
                                <!--</el-tabs>-->
                            <!--</el-col>-->
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="8">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span style="line-height: 20px;">近30天舆情信息</span>
                                    </div>
                                    <pie-chart :chartConfig="sentimentAnalysis"></pie-chart>
                                </el-card>
                            </el-col>
                            <el-col :span="16">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span style="line-height: 20px;">载体趋势分析</span>
                                    </div>
                                    <el-tabs v-model="activeTrendName" @tab-click="handleClickTrendTab"
                                             id="trend-tab-content">
                                        <el-tab-pane name="今天">
                                            <span slot="label"><i class="el-icon-date"></i> 今天</span>
                                            <el-row type="flex" class="row-bg" justify="space-around">
                                                <bar-chart :chartConfig="carrierAnalysis"></bar-chart>
                                            </el-row>
                                        </el-tab-pane>
                                        <el-tab-pane name="昨天">
                                            <span slot="label"><i class="el-icon-date"></i> 昨天</span>
                                            <el-row type="flex" class="row-bg" justify="space-around">
                                                <bar-chart v-if="activeTrendName == '昨天'"
                                                           :chartConfig="carrierAnalysisYesterday"></bar-chart>
                                            </el-row>
                                        </el-tab-pane>
                                        <el-tab-pane name="近7天">
                                            <span slot="label"><i class="el-icon-date"></i> 近7天</span>
                                            <el-row type="flex" class="row-bg" justify="space-around">
                                                <bar-chart v-if="activeTrendName == '近7天'"
                                                           :chartConfig="carrierAnalysisNearlyDays"></bar-chart>
                                            </el-row>
                                        </el-tab-pane>
                                        <el-tab-pane name="近30天">
                                            <span slot="label"><i class="el-icon-date"></i> 近30天</span>
                                            <el-row type="flex" class="row-bg" justify="space-around">
                                                <bar-chart v-if="activeTrendName == '近30天'"
                                                           :chartConfig="carrierAnalysisMonth"></bar-chart>
                                            </el-row>
                                        </el-tab-pane>
                                    </el-tabs>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="16" class="lists">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span style="line-height: 20px;">主流媒体分布</span>
                                    </div>
                                    <bar-chart :chartConfig="mediaBarChart"></bar-chart>
                                </el-card>
                            </el-col>
                            <el-col :span="8">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span style="line-height: 20px;">载体分布统计</span>
                                    </div>
                                    <el-tabs v-model="activeBarName" @tab-click="handleClickBarTab"
                                             id="bar-tab-content">
                                        <el-tab-pane name="今天">
                                            <span slot="label"><i class="el-icon-date"></i> 今天</span>
                                            <el-row type="flex" class="row-bg" justify="space-around">
                                                <bar-chart v-if="activeBarName == '今天'"
                                                           :chartConfig="carrierAnalysisType"></bar-chart>
                                            </el-row>
                                        </el-tab-pane>
                                        <el-tab-pane name="昨天">
                                            <span slot="label"><i class="el-icon-date"></i> 昨天</span>
                                            <el-row type="flex" class="row-bg" justify="space-around">
                                                <bar-chart v-if="activeBarName == '昨天'"
                                                           :chartConfig="carrierAnalysisTypeYesterday"></bar-chart>
                                            </el-row>
                                        </el-tab-pane>
                                        <el-tab-pane name="近7天">
                                            <span slot="label"><i class="el-icon-date"></i> 近7天</span>
                                            <el-row type="flex" class="row-bg" justify="space-around">
                                                <bar-chart v-if="activeBarName == '近7天'"
                                                           :chartConfig="carrierAnalysisTypeNearlyDays"></bar-chart>
                                            </el-row>
                                        </el-tab-pane>
                                        <el-tab-pane name="近30天">
                                            <span slot="label"><i class="el-icon-date"></i> 近30天</span>
                                            <el-row type="flex" class="row-bg" justify="space-around">
                                                <bar-chart v-if="activeBarName == '近30天'"
                                                           :chartConfig="carrierAnalysisTypeMonth"></bar-chart>
                                            </el-row>
                                        </el-tab-pane>
                                    </el-tabs>
                                </el-card>
                            </el-col>
                        </el-row>
                        <article-list v-if="articles.length > 0" :id="articleListId" :type="articleType"
                                      :articles="articles" :pager="pager"
                                      @data="getData"></article-list>
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
    import service from '../../vuex/module/index.js';

    import $ from 'jquery';

    export default {
        name: 'index',
        data () {
            return {
                activeTrendName: '近30天',
                activeBarName: '近30天',
                activeArticleTabName: 'news',
                articleTabData: {
                    type: '',
                    articles: []
                },
                articlebbsTabData: {
                    type: '',
                    articles: []
                },
                tabArticleType: "news",
                tabbbsArticleType: "bbs",
                sentimentAnalysis: {
                    chartId: 'sentimentAnalysis',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                carrierAnalysis: {
                    chartId: 'carrierAnalysis',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                carrierAnalysisYesterday: {
                    chartId: 'carrierAnalysisYesterday',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                carrierAnalysisNearlyDays: {
                    chartId: 'carrierAnalysisNearlyDays',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                carrierAnalysisMonth: {
                    chartId: 'carrierAnalysisMonth',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                carrierAnalysisType: {
                    chartId: 'carrierAnalysisType',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                carrierAnalysisTypeYesterday: {
                    chartId: 'carrierAnalysisTypeYesterday',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                carrierAnalysisTypeNearlyDays: {
                    chartId: 'carrierAnalysisTypeNearlyDays',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                carrierAnalysisTypeMonth: {
                    chartId: 'carrierAnalysisTypeMonth',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                mediaBarChart: {
                    chartId: 'media-bar-chart',
                    option: {},
                    events: {
                        'click': function (param) {
                        }
                    }
                },
                pager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 1
                },
                trendTimesType: 'month',
                barTimesType: 'month',
                articlesCondition: {
                    type: ""
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
            this.getCarrierAnalysisChart(this.trendTimesType);
            this.getCarrierAnalysisBarChart(this.barTimesType);
            this.getMediaBarChart();
            this.getArticleTabList(this.tabArticleType,this.tabbbsArticleType);
            this.getArticlebbsTabList(this.tabbbsArticleType);
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
            getCarrierAnalysisChart: function (type) {
                var self = this;
                var width = document.getElementById('trend-tab-content').offsetWidth;
                var chartWidth = width - 50 + "px";
                service.actions.getCarrierAnalysisChart(type).then(function (option) {
                    if (type == 'day') {
                        document.getElementById("carrierAnalysis").style.width = chartWidth;
                        self.carrierAnalysis.option = option;
                    }
                    if (type == 'yesterday') {
                        document.getElementById("carrierAnalysisYesterday").style.width = chartWidth;
                        self.carrierAnalysisYesterday.option = option;
                    }
                    if (type == 'nearlydays') {
                        document.getElementById("carrierAnalysisNearlyDays").style.width = chartWidth;
                        self.carrierAnalysisNearlyDays.option = option;
                    }
                    if (type == 'month') {
                        document.getElementById("carrierAnalysisMonth").style.width = chartWidth;
                        self.carrierAnalysisMonth.option = option;
                    }
                });

            },
            getCarrierAnalysisBarChart: function (type) {
                var self = this;
                var width = document.getElementById('bar-tab-content').offsetWidth;
                var chartWidth = width - 50 + "px";
                service.actions.getCarrierAnalysisBarChart(type).then(function (option) {
                    if (type == 'day') {
                        document.getElementById("carrierAnalysisType").style.width = chartWidth;
                        self.carrierAnalysisType.option = option;
                    }
                    if (type == 'yesterday') {
                        document.getElementById("carrierAnalysisTypeYesterday").style.width = chartWidth;
                        self.carrierAnalysisTypeYesterday.option = option;
                    }
                    if (type == 'nearlydays') {
                        document.getElementById("carrierAnalysisTypeNearlyDays").style.width = chartWidth;
                        self.carrierAnalysisTypeNearlyDays.option = option;
                    }
                    if (type == 'month') {
                        document.getElementById("carrierAnalysisTypeMonth").style.width = chartWidth;
                        self.carrierAnalysisTypeMonth.option = option;
                    }
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
                    self.articleTabData.type = type;
                    self.articleTabData.articles = data.content;
                });
            },
            getArticlebbsTabList: function (type) {
                var self = this;
                service.actions.getArticlebbsTabList(type).then(function (data) {
                    self.articlebbsTabData.type = type;
                    self.articlebbsTabData.articles = data.content;
                });
            },
            getData (data) {
                var self = this;
                switch (data.action) {
                    case 'clickArticleListPager':
                        self.pager = data.articleListPager;
                        break;
                    case 'showMoreArticle':
                        self.pager.currentPage = 1;
                        self.articlesCondition.type = data.data;
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

            handleClickTrendTab(tab, event) {
                console.log(tab, event);
                var self = this;
                switch (tab.name) {
                    case "今天":
                        self.trendTimesType = "day";
                        break;
                    case "昨天":
                        self.trendTimesType = "yesterday";
                        break;
                    case "近7天":
                        self.trendTimesType = "nearlydays";
                        break;
                    case "近30天":
                        self.trendTimesType = "month";
                        break;
                }
                this.getCarrierAnalysisChart(self.trendTimesType);
            },

            handleClickBarTab(tab) {
                var self = this;
                switch (tab.name) {
                    case "今天":
                        self.barTimesType = "day";
                        break;
                    case "昨天":
                        self.barTimesType = "yesterday";
                        break;
                    case "近7天":
                        self.barTimesType = "nearlydays";
                        break;
                    case "近30天":
                        self.barTimesType = "month";
                        break;
                }
                this.getCarrierAnalysisBarChart(self.barTimesType);
            },

            handleClickListTab(tab) {
//                var self = this;
//                switch (tab.name) {
//                    case "news":
//                        self.tabArticleType = "news";
//                        break;
//                    case "weibo":
//                        self.tabArticleType = "weibo";
//                        break;
//                    case "bbs":
//                        self.tabArticleType = "bbs";
//                        break;
//                }
//                this.getArticleTabList(self.tabArticleType);
            }
        },
        watch: {
            articles: function (val, oldVal) {
                var self = this;
                if (val) {
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


