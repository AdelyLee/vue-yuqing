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
                                             id="tab-content">
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
                                    <el-tabs v-model="activeBarName" @tab-click="handleClickPieTab" id="tab-contents">
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
                        <el-row :gutter="15">
                            <el-col :span="24" class="lists">
                                <el-tabs v-model="activeNews" @tab-click="handleClickListTab">
                                    <el-tab-pane label="最新新闻" name="first">
                                        <news-list :newsList="newsList" @data="getData"></news-list>
                                    </el-tab-pane>
                                    <el-tab-pane label="最新微博" name="second">
                                        <news-list :newsList="weiboList" @data="getData"></news-list>
                                    </el-tab-pane>
                                    <el-tab-pane label="最新论坛" name="third">
                                        <news-list :newsList="bbsList" @data="getData"></news-list>
                                    </el-tab-pane>
                                </el-tabs>
                            </el-col>
                        </el-row>
                        <article-list v-if="articles.length > 0" :id="articleListId" :type="type" :articles="articles" :pager="pager"
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

    export default {
        name: 'index',
        data () {
            return {
                activeTrendName: '近30天',
                activeBarName: '近30天',
                activeNews: 'first',
                name: '',
                newsList: [],
                weiboList: [],
                bbsList: [],
                tabArticleType: "news",
                type: 'news',
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
                timesType: 'month',
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
            this.getCarrierAnalysisChart();
            this.getCarrierAnalysisBarChart();
            this.getMediaBarChart();
            this.getArticleList();
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
            getCarrierAnalysisChart: function () {
                var self = this;
                service.actions.getCarrierAnalysisChart(self.timesType).then(function (option) {
//                    self.carrierAnalysis.option = option;
//                    self.carrierAnalysisYesterday.option = option;
//                    self.carrierAnalysisNearlyDays.option = option;
                    self.carrierAnalysisMonth.option = option;
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getCarrierAnalysisBarChart: function () {
                var self = this;
                service.actions.getCarrierAnalysisBarChart(self.timesType).then(function (option) {
//                    self.carrierAnalysisType.option = option;
//                    self.carrierAnalysisTypeYesterday.option = option;
//                    self.carrierAnalysisTypeNearlyDays.option = option;
                    self.carrierAnalysisTypeMonth.option = option;
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getMediaBarChart: function () {
                var self = this;
                service.actions.getMediaBarChart().then(function (option) {
                    self.mediaBarChart.option = option;
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getArticleList: function () {
                var self = this;
                service.actions.getArticleList(self.tabArticleType).then(function (data) {
                    self.newsList = data.content;
                });
            },
            getData (data) {
                var self = this;
                switch (data.action) {
                    case 'clickArticleListPager':
                        break;
                    case 'showMoreArticle':
                        break;
                }
//                this.getNewsCurrentList();
            },

            getNewsCurrentList: function () {
                var self = this;
                service.actions.getNewsCurrentList(self.type, self.pager.pageSize, self.pager.currentPage).then(function (data) {
                    self.News = data.content;
                    self.pager.totalElements = data.totalElements;
                }, function (error) {
                    console.error('出错了', error);
                })

            },

            handleClickTrendTab(tab, event) {
                console.log(tab, event);
                var self = this;
                self.name = tab.name;
                switch (self.name) {
                    case "今天":
                        self.timesType = "day";
                        break;
                    case "昨天":
                        self.timesType = "yesterday";
                        break;
                    case "近7天":
                        self.timesType = "nearlydays";
                        break;
                    case "近30天":
                        self.timesType = "month";
                        break;
                }
                this.getCarrierAnalysisChart();
            },
            handleClickPieTab(tab, event) {
                console.log(tab, event);
                var self = this;
                self.name = tab.name;
                switch (self.name) {
                    case "今天":
                        self.timesType = "day";
                        break;
                    case "昨天":
                        self.timesType = "yesterday";
                        break;
                    case "近7天":
                        self.timesType = "nearlydays";
                        break;
                    case "近30天":
                        self.timesType = "month";
                        break;
                }
                this.getCarrierAnalysisBarChart();
            },
            handleClickListTab(tab, event) {
//
            }
        },
    }
</script>


