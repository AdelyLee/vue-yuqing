<template>
    <div id="focusNews">
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
                            <span class="sort">排序方式:</span>
                            <el-button class="rel" @click.native="relevant()">相关度</el-button>
                            <el-button class="dataTims"  @click.native="dataTimes()">时间</el-button>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="24">
                                <focus-list :articleData="articleTabData" @data="getData" v-loading="loading"></focus-list>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="12">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span class="chart-text">情感分析</span>
                                    </div>
                                    <pie-chart :chartConfig="sentimentAnalysis" v-loading="loading"></pie-chart>
                                </el-card>
                            </el-col>
                            <el-col :span="12">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span class="chart-text" v-loading="loading">热点词云</span>
                                    </div>
                                    <keywords-chart :chartConfig="hotWordCloud"></keywords-chart>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="24" class="lists">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span class="chart-text" v-loading="loading">趋势图</span>
                                    </div>
                                    <bar-chart :chartConfig="allcarrierAnalysisMonth"></bar-chart>
                                </el-card>
                            </el-col>
                        </el-row>
                        <article-list v-if="articles.length > 0" :id="articleListId" :type="articleType"
                                      :articles="articles" :pager="pager" @data="getData" v-loading="loading"></article-list>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Header from '@/components/commons/header';
    import CommonMenu from '@/components/commons/menu';
    import News from '@/components/focus/news';
    import LineBarChart from '@/components/commons/charts/line-bar';
    import PieChart from '@/components/commons/charts/pie';
    import KeywordsChart from '@/components/commons/charts/keywords-cloud';
    import ArticleList from '@/components/index/articleList';
    import typeUtil from '../../vuex/typeUtil';
    import dateUtil from '../../vuex/dateUtil';
    import service from '../../vuex/module/focusNews.js';

    import $ from 'jquery';

    export default {
        data () {
            var self = this;
            return {
                loading: true,
                sentimentAnalysis: {
                    chartId: 'sentimentAnalysis',
                    option: {},
                    events: {
                        'click': function (param) {
                            self.articlesCondition = {};
                            self.articlesCondition.startDate =self.addForm.startDate;
                            self.articlesCondition.endDate = self.addForm.endDate;
                            var value = typeUtil.typeUtil.encodeSentimentType(param.name);
                            self.articlesCondition.searchKv = [{"key": "nlp.sentiment.label", "value": value}];
                            self.getArticleListByCondition(self.articlesCondition);
                        }
                    }
                },
                hotWordCloud: {
                    chartId: 'hotWordCloud',
                    option: {}
                },
                allcarrierAnalysisMonth: {
                    chartId: 'allcarrierAnalysisMonth',
                    option: {},
                    events: {
                        'click': function (param) {
                            self.getMediaTypeTrendChartCondition(param);
                            self.getArticleListByCondition(self.articlesCondition);
                        }
                    }
                },
                pager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 1
                },
                articlesCondition: {
                    startDate: "",
                    endDate: "",
                    searchKv: [],
                    type: []
                },
                articleType: "",
                articles: [],
                articleListId: 'article-list',
                articleTabData:{
                    articles:[]
                },
                handleCollect:[],
                addForm: {
                    startDate: '',
                    endDate: '',
                    orders: {
                        "limit": 10,
                         "page": 1
                    },
                },
                rules: {
                    startDate: [
                        {type: "date", required: true, message: '选择专题开始时间', trigger: 'change' }
                    ],
                    endDate: [
                        {type: "date", required: true, message: '选择专题结束时间', trigger: 'change' }
                    ]
                },
            }
        },
        components: {
            'common-header': Header,
            'common-menu': CommonMenu,
            'bar-chart': LineBarChart,
            'pie-chart': PieChart,
            'keywords-chart': KeywordsChart,
            'article-list': ArticleList,
            'focus-list': News
        },
        mounted () {
            this.getTime();
            this.getArticleTabList();
            this.getSentimentTypeChart();
            this.getCarrierAnalysisChart();
            this.getHotWordCloudChart();
        },
        methods: {
            getTime: function () {
                setTimeout(() => {
                    var self = this;
                self.loading = false;
               }, 2000);
                var self = this;
                var date = new Date();
                self.addForm.startDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), 'yyyy-MM-dd');
                self.addForm.endDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 0), 'yyyy-MM-dd');
            },
            addFormSubmit: function (subject) {
                var self = this;
                subject.startDate =dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(subject.startDate, 'M', 0), 'yyyy-MM-dd');
                subject.endDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate( subject.endDate, 'd', 0), 'yyyy-MM-dd');
                self.getArticleTabList(subject.startDate,subject.endDate,self.addForm.orders);
                self.getSentimentTypeChart(subject.startDate,subject.endDate);
                self.getCarrierAnalysisChart(subject.startDate,subject.endDate);
                self.getHotWordCloudChart(subject.startDate,subject.endDate);
            },
            getArticleTabList: function () {
                var self = this;
                service.actions.getArticleTabList(self.addForm.startDate,self.addForm.endDate,self.addForm.orders).then(function (data) {
                        self.articleTabData.articles = data.content;
                });
            },
            getSentimentTypeChart: function () {
                var self = this;
                service.actions.getSentimentTypeChart(self.addForm.startDate,self.addForm.endDate).then(function (option) {
                    self.sentimentAnalysis.option = option;
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getHotWordCloudChart: function () {
                var self = this;
                service.actions.getHotWordCloudChart(self.addForm.startDate,self.addForm.endDate).then(function (renderData) {
                    self.hotWordCloud.option = renderData.option;
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getCarrierAnalysisChart: function () {
                var self = this;
                service.actions.getCarrierAnalysisChart(self.addForm.startDate,self.addForm.endDate).then(function (option) {
                    self.allcarrierAnalysisMonth.option = option;
                });

            },
            getArticleListByCondition: function () {
                var self = this;
                service.actions.getArticleListByCondition(self.pager.pageSize, self.pager.currentPage, self.articlesCondition).then(function (data) {
                    if (self.handleCollect.length > 0 && self.handleCollect[0].value == true) {
                        var collectID = [];
                        for (var i = 0; i < data.content.length; i++) {
                            collectID.push(data.content[i].id);
                        }
                        service.actions.getCollectOrID(collectID).then(function (collectCompare) {
                            data.content.forEach(function (item) {
                                for (var i = 0; i < collectCompare.length; i++) {
                                    if (collectCompare[i].key == item.id) {
                                        item.collect = collectCompare[i].value;
                                    }
                                }
                            })
                            service.actions.saveCollect(self.handleCollect).then(function () {
                                data.content.forEach(function (item) {
                                    if(item.id == self.handleCollect[0].key) {
                                        item.collect = self.handleCollect[0].value;
                                    }
                                })
                                self.articles = data.content;
                                self.pager.totalElements = data.totalElements;
                            })
                        })
                    } else if (self.handleCollect.length > 0 && self.handleCollect[0].value == false) {
                        var collectID = [];
                        for (var i = 0; i < data.content.length; i++) {
                            collectID.push(data.content[i].id);
                        }
                        service.actions.getCollectOrID(collectID).then(function (collectCompare) {
                            data.content.forEach(function (item) {
                                for (var i = 0; i < collectCompare.length; i++) {
                                    if (collectCompare[i].key == item.id) {
                                        item.collect = collectCompare[i].value;
                                    }
                                }
                            })
                            service.actions.deleteCollect(self.handleCollect).then(function () {
                                data.content.forEach(function (item) {
                                    if(item.id == self.handleCollect[0].key) {
                                        item.collect = self.handleCollect[0].value;
                                    }
                                })
                                self.articles = data.content;
                                self.pager.totalElements = data.totalElements;
                            })
                        })
                    } else {
                        var collectID = [];
                        for (var i = 0; i < data.content.length; i++) {
                            collectID.push(data.content[i].id);
                        }
                        service.actions.getCollectOrID(collectID).then(function (collectCompare) {
                            data.content.forEach(function (item) {
                                for (var i = 0; i < collectCompare.length; i++) {
                                    if (collectCompare[i].key == item.id) {
                                        item.collect = collectCompare[i].value;
                                    }
                                }
                            })
                            self.articles = data.content;
                            self.pager.totalElements = data.totalElements;
                        })
                    }
                })
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
            getData (data) {
                var self = this;
                self.articlesCondition = {};
                switch (data.action) {
                    case 'clickArticleListPager':
                        self.pager = data.articleListPager;
                        break;
                    case 'showMoreArticle':
                        self.pager.currentPage = 1;
                        self.articlesCondition.startDate =self.addForm.startDate;
                        self.articlesCondition.endDate = self.addForm.endDate;
                        self.articlesCondition.type = [data.data];
                        self.articlesCondition.searchKv = [];
                        self.articleType = data.data;
                        break;
                    case 'handleCollect':
                        self.handleCollect = [];
                        self.handleCollect.push({"key": data.id, "value": data.collect});
                        break;
                }
                self.getArticleListByCondition();
            },
            relevant: function () {
                if ($('.el-button').hasClass('dataTims')) {
                    $('.dataTims').css('background','#ffffff');
                }
                $('.rel').css('background','#cccccc');
                var self = this;
                self.addForm.orders = {"limit": 10, "page": 1};
                self.getArticleTabList();
            },
            dataTimes: function() {
                if ($('.el-button').hasClass('rel')) {
                    $('.rel').css('background','#ffffff');
                }
                $('.dataTims').css('background','#cccccc');
                var self = this;
                self.addForm.orders = {"limit": 10, "page": 1,"orders": [{"direction": "DESC", "orderBy": "pubTime"}]};
                self.getArticleTabList();
            }
        },
        watch: {
            articles: function (val, oldVal) {
                var self = this;
                if (val.length > 0) {
                    self.$nextTick(function () {
                        $('html, body').animate({
                            scrollTop: $("#article-list").offset().top
                        }, 500);
                    })
                }
            }
        }
    }
</script>


