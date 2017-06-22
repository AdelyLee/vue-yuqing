<template>
    <div id="latestBbs">
        <common-header></common-header>
        <el-row :gutter="5">
            <el-col :span="3">
                <common-menu></common-menu>
            </el-col>
            <el-col :span="21">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <div class="card-body" id="content">
                        <el-row :gutter="15">
                            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="时间:">
                                    <el-col :span="4">
                                        <el-form-item prop="startDate">
                                            <el-date-picker type="date" placeholder="选择开始时间" v-model="addForm.startDate"style="width: 100%;"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-form-item prop="endDate">
                                            <el-date-picker type="date" placeholder="选择结束时间" v-model="addForm.endDate" style="width: 100%;"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-button type="primary" @click.native="addFormSubmit(addForm)">查询</el-button>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="24">
                                <news-list :articleData="articleBbsTabData" @data="getData"></news-list>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="8">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span class="chart-text">舆情信息</span>
                                    </div>
                                    <pie-chart :chartConfig="sentimentAnalysis"></pie-chart>
                                </el-card>
                            </el-col>
                            <el-col :span="16">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span class="chart-text">论坛趋势分析</span>
                                    </div>
                                    <bar-chart :chartConfig="carrierAnalysisMonth"></bar-chart>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="8">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span class="chart-text">热点词云</span>
                                    </div>
                                    <keywords-chart v-if="hotList" :hotList="hotList" :chartConfig="hotLists"></keywords-chart>
                                </el-card>
                            </el-col>
                            <el-col :span="16" class="lists">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span class="chart-text">热议网民</span>
                                    </div>
                                    <bar-chart :chartConfig="mediaBarChart"></bar-chart>
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
    import service from '../../vuex/module/latestBbs.js';
    import KeywordsChart from '@/components/commons/charts/keywords-cloud';

    import $ from 'jquery';

    export default {
        name: 'latestBbs',
        data () {
            var self = this;
            return {
                activeTrendName: '近30天',
                activeBarName: '近30天',
                articleBbsTabData: {
                    type: '',
                    articles: []
                },
                addForm: {
                    startDate: '',
                    endDate: ''
                },
                tabBbsArticleType: "bbs",
                sentimentAnalysis: {
                    chartId: 'sentimentAnalysis',
                    option: {},
                    events: {
                        'click': function (param) {
                            self.articlesCondition = {};
//
                            self.articlesCondition.startDate =self.addForm.startDate;
                            self.articlesCondition.endDate = self.addForm.endDate;
                            var value = typeUtil.typeUtil.encodeSentimentType(param.name);
                            self.articlesCondition.searchKv = [{"key": "nlp.sentiment.label", "value": value}];
                            self.articlesCondition.type=["bbs"];
                            debugger;
                            self.getArticleListByCondition(self.articlesCondition);
                        }
                    }
                },
                hotLists: {
                    chartId: 'hotLists',
                    option: {},
                    events: {
                        'click': function (param) {
                        }
                    }
                },
                hotList: [],
                carrierAnalysisMonth: {
                    chartId: 'carrierAnalysisMonth',
                    option: {},
                    events: {
                        'click': function (param) {
                            self.getMediaTypeTrendChartCondition(param);
                            self.getArticleListByCondition(self.articlesCondition);
                        }
                    }
                },
//                carrierAnalysisTypeYesterday: {
//                    chartId: 'carrierAnalysisTypeYesterday',
//                    option: {},
//                    events: {
//                        'click': function (param) {
//                            self.getMediaTypeBarChartCondition(param);
//                            self.getArticleListByCondition(self.articlesCondition);
//                        }
//                    }
//                },
//                carrierAnalysisTypeNearlyDays: {
//                    chartId: 'carrierAnalysisTypeNearlyDays',
//                    option: {},
//                    events: {
//                        'click': function (param) {
//                            self.getMediaTypeBarChartCondition(param);
//                            self.getArticleListByCondition(self.articlesCondition);
//                        }
//                    }
//                },
//                carrierAnalysisTypeMonth: {
//                    chartId: 'carrierAnalysisTypeMonth',
//                    option: {},
//                    events: {
//                        'click': function (param) {
//                            self.getMediaTypeBarChartCondition(param);
//                            self.getArticleListByCondition(self.articlesCondition);
//                        }
//                    }
//                },
                mediaBarChart: {
                    chartId: 'media-bar-chart',
                    option: {},
                    events: {
                        'click': function (param) {
                            debugger;
                            self.articlesCondition = {};
                            self.articlesCondition.startDate =self.addForm.startDate;
                            self.articlesCondition.endDate = self.addForm.endDate;
                            var value = param.name;
                            self.articlesCondition.searchKv = [{"key": "author", "value": value}];
                            self.articlesCondition.type=["bbs"];
                            self.getArticleListByCondition(self.articlesCondition);
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
            'article-list': ArticleList,
            'keywords-chart': KeywordsChart,
        },
        mounted () {
            this.getTime();
            this.getSentimentTypeChart(this.addForm.startDate,this.addForm.endDate);
            this.getCarrierAnalysisChart(this.addForm.startDate,this.addForm.endDate);
            this.getMediaBarChart(this.addForm.startDate,this.addForm.endDate);
            this.getCommentHotKeywordsChart(this.addForm.startDate,this.addForm.endDate)
            this.getArticleTabList(this.addForm.startDate,this.addForm.endDate,this.tabBbsArticleType);
        },
        methods: {
            getTime: function () {
                var self = this;
                var date = new Date();
                self.addForm.startDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), 'yyyy-MM-dd');
                self.addForm.endDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 0), 'yyyy-MM-dd');
            },
            addFormSubmit: function (subject) {
                debugger;
                var self = this;
                subject.startDate =dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(subject.startDate, 'M', 0), 'yyyy-MM-dd');
                subject.endDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate( subject.endDate, 'd', 0), 'yyyy-MM-dd');
                self.getArticleTabList(subject.startDate,subject.endDate,self.tabBbsArticleType);
                this.getSentimentTypeChart(subject.startDate,subject.endDate);
                this.getCarrierAnalysisChart(subject.startDate,subject.endDate);
                this.getMediaBarChart(subject.startDate,subject.endDate);
                this.getCommentHotKeywordsChart(subject.startDate,subject.endDate)
            },
            getSentimentTypeChart: function (startDate,endDate) {
                var self = this;
                service.actions.getSentimentTypeChart(startDate,endDate).then(function (option) {
                    self.sentimentAnalysis.option = option;
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getCarrierAnalysisChart: function (startDate,endDate) {
                var self = this;
                service.actions.getCarrierAnalysisChart(startDate,endDate).then(function (option) {
                    self.carrierAnalysisMonth.option = option;
                },function (error) {
                    console.error('出错了', error);
                })
            },
//            getCarrierAnalysisBarChart: function (type) {
//                var self = this;
//                var width = document.getElementById('bar-tab-content').offsetWidth;
//                var chartWidth = width - 50 + "px";
//                var conditionDate = self.getConditionDate(type);
//                service.actions.getCarrierAnalysisBarChart(conditionDate).then(function (option) {
//                    if (type == 'day') {
//                        document.getElementById("carrierAnalysisType").style.width = chartWidth;
//                        self.carrierAnalysisType.option = option;
//                    }
//                    if (type == 'yesterday') {
//                        document.getElementById("carrierAnalysisTypeYesterday").style.width = chartWidth;
//                        self.carrierAnalysisTypeYesterday.option = option;
//                    }
//                    if (type == 'nearlydays') {
//                        document.getElementById("carrierAnalysisTypeNearlyDays").style.width = chartWidth;
//                        self.carrierAnalysisTypeNearlyDays.option = option;
//                    }
//                    if (type == 'month') {
//                        document.getElementById("carrierAnalysisTypeMonth").style.width = chartWidth;
//                        self.carrierAnalysisTypeMonth.option = option;
//                    }
//                });
//            },

            getMediaBarChart: function (startDate,endDate) {
                var self = this;
                service.actions.getMediaBarChart(startDate,endDate).then(function (option) {
                    debugger;
                    self.mediaBarChart.option = option;
                });
            },
            getArticleTabList: function (startDate,endDate,type) {
                var self = this;
                service.actions.getArticleTabList(startDate,endDate,type).then(function (data) {
                    debugger;
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
//                        var date = new Date();
//                        var startDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), 'yyyy-MM-dd');
//                        var endDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), 'yyyy-MM-dd');
                        self.articlesCondition.startDate =self.addForm.startDate;
                        self.articlesCondition.endDate = self.addForm.endDate;
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
            getCommentHotKeywordsChart: function (startDate,endDate) {
                var self = this;
                service.actions.getCommentHotKeywordsChart(startDate,endDate).then(function (renderData) {
                    self.hotLists.option = renderData.option;
                    self.hotList = renderData;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getMediaTypeTrendChartCondition: function (param) {
                var self = this;
                self.articlesCondition = {};
                self.articlesCondition.startDate =self.addForm.startDate;
                self.articlesCondition.endDate = self.addForm.endDate;
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
                    case "day":
                        e_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), "yyyy-MM-dd");
                        s_date = dateUtil.dateUtil.formatDate(date, "yyyy-MM-dd");
                        break;
                    case 'yesterday':
                        e_date = dateUtil.dateUtil.formatDate(date, "yyyy-MM-dd");
                        s_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', -1), "yyyy-MM-dd");
                        break;
                    case 'nearlydays':
                        e_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), "yyyy-MM-dd");
                        s_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', -7), "yyyy-MM-dd");
                        break;
                    case 'month':
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


