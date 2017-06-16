<template>
    <div id="currentSpecial">
        <common-header></common-header>
        <el-row :gutter="15">
            <el-col :span="3">
                <common-menu></common-menu>
            </el-col>
            <el-col :span="21" :offset="3">
                <el-card class="box-card my-card-box">
                    <div slot="header" class="clearfix subject-title">
                        <el-tag type="primary" style ="font-size:20px;margin-top:10px;margin-left:15px;"><i class="el-icon-star-off"></i>专题名称：{{subjectName}}</el-tag>
                        <el-tag type="primary" style ="font-size:20px;"><i class = "el-icon-time"></i>专题时间 ：{{timeRange}}</el-tag>
                    </div>
                    <el-row :gutter="15" class="list">
                        <el-col :span="24">
                            <div style="height:5px;"></div>
                            <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                                <el-menu-item index="1" ><i class="el-icon-message"></i>信息列表
                                </el-menu-item>
                                <el-menu-item index="2"><i class="el-icon-menu"></i>舆论分析
                                </el-menu-item>
                                <el-menu-item index="3" ><i class="el-icon-setting"></i>网民分析
                                </el-menu-item>
                                <el-menu-item index="4"><i class="el-icon-information"></i>历史预警
                                </el-menu-item>
                            </el-menu>
                            <div style="height:15px;"></div>
                            <div v-if="myIndex==1">
                                <el-row :gutter="15">
                                    <el-col :span="24" class="lists">
                                        <search-param :listSearch="mylistSearch"
                                                      @data="getListSearchParam"></search-param>
                                        <el-card class="box-card my-card" style="margin-top:15px;">
                                            <current-list :currentList="currentListNew"></current-list>
                                            <list-pagination :myListPagination="myListPagination"
                                                             @data="getPager"></list-pagination>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-if="myIndex==2">
                                <el-row :gutter="15">
                                    <el-col :span="8">
                                        <el-card class="box-card my-card">
                                            <div slot="header" class="clearfix">
                                                <span class="my-title">情感分析</span>
                                            </div>
                                            <pie-chart :chartConfig="mediaReportAnalysisPie"></pie-chart>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="16">
                                        <el-card class="box-card my-card">
                                            <div slot="header" class="clearfix">
                                                <span class="my-title">话题趋势</span>
                                            </div>
                                            <bar-chart :chartConfig="mediaReportTrendBar"></bar-chart>
                                        </el-card>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="15">
                                    <el-col :span="14">
                                        <el-card class="box-card my-card" style="margin-top:5px;">
                                            <div slot="header" class="clearfix">
                                                <span class="my-title">主流媒体</span>
                                            </div>
                                            <bar-chart :chartConfig="mediaBarChart"></bar-chart>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-card class="box-card my-card" style="margin-top:5px;">
                                            <div slot="header" class="clearfix">
                                                <span class="my-title">载体分析</span>
                                            </div>
                                            <pie-chart :chartConfig="mediaArticleTypePie"></pie-chart>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-if="myIndex==3">
                                <el-row :gutter="15">
                                    <el-col :span="12">
                                        <el-card class="box-card my-card">
                                            <div slot="header" class="clearfix my-header">
                                                <span class="my-title">网民话题</span>
                                            </div>
                                            <bar-chart :chartConfig="netizenTitleBar"></bar-chart>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-card class="box-card my-card">
                                            <div slot="header" class="clearfix">
                                                <span class="my-title">热议网民</span>
                                            </div>
                                            <bar-chart :chartConfig="netizenConsensusBar"></bar-chart>
                                        </el-card>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="15">
                                    <el-col :span="12">
                                        <el-card class="box-card my-card" style="margin-top:5px;">
                                            <div slot="header" class="clearfix">
                                                <span class="my-title">地域分布</span>
                                            </div>
                                            <map-chart :chartConfig="netizenMap"></map-chart>
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
                                <el-row :gutter = "15">
                                    <el-col :span = "12">
                                        <el-card class="box-card my-card" style="margin-top:5px;">
                                            <div slot="header" class="clearfix">
                                                <span class="my-title">网民观点</span>
                                            </div>
                                            <pie-chart :chartConfig="netizenOptions"></pie-chart>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-if="myIndex == 4">
                                <warning-list :yujingList="warningList"></warning-list>
                                <yujing-pager :pager="yujignPager" @data="getyujingPager"></yujing-pager>
                            </div>
                            <div style = "height:15px;"></div>
                            <article-list v-if="getArticles.length > 0" :id="articleListId" :articles ="getArticles" :pager = "articlePager" @data = "getArticleData"></article-list>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Header from '@/components/commons/header';
    import CommonMenu from '@/components/commons/menu';
    import LineBarChart from '@/components/commons/charts/line-bar';
    import PieChart from '@/components/commons/charts/pie';
    import articleList from '@/components/index/articleList';
    import MapChart from '@/components/commons/charts/map';
    import KeywordsChart from '@/components/commons/charts/keywords-cloud';
    import currentListComponent from '@/components/currentSpecialReport/currentList_new';
    import currentSearchParam from '@/components/currentSpecialReport/currentSearchParam';
    import currentPagination from '@/components/currentSpecialReport/currentPagination';
    import warningListData from '@/components/currentSpecialReport/warningList';
    import yujingPagerData from '@/components/commons/paging';
    import service from '../../vuex/module/currentSpecialReport.js';
    import dateUtil from '../../vuex/dateUtil';
    import typeUtil from '../../vuex/typeUtil';
    import $ from 'jquery';
    export default {
        name: 'presentationList',
        data () {
            var that = this;
            return {
                articleListId:'article-list',
                activeIndex2: '1',
                currentListNew: [],
                myListPagination: {
                    pageSize: 5,
                    currentPage4: 1,
                    total: 0
                },
                articlePager:{
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 10
                },
                yujignPager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 10
                },
                warningList: {
                    loading3: false,
                    tableData3: []
                },
                mylistSearch: {
                    startDate: service.searchData.searchParam().startDate,
                    endDate: service.searchData.searchParam().endDate,
                    filed: '',
                    searchWord: '',
                    orders: [{
                        "direction": "DESC",
                        "orderBy": "pubTime"
                    }],
                    searchKey: [],
                    type: []
                },
                limits: 0,
                pages: 1,
                myIndex: 1,
                subjectName: service.searchData.searchParam().name,
                timeRange: service.searchData.searchParam().startDate + "至" + service.searchData.searchParam().endDate,
                newsUrl: 'news',
                weiboUrl: 'weibo',
                bbsUrl: 'bbs',
                checkedItems: [],
                conditions: {
                    searchKv:[],
                    type:[]
                },
                getArticles: [],
                getListTypeData: [],
                activeName: 'first',
                mediaReportAnalysisPie: {
                    chartId: 'media-report-analysis-pie',
                    option: {},
                    events: {
                        'click': function (param) {
                            var value = typeUtil.typeUtil.encodeSentimentType(param.name);
                            that.conditions.searchKv = [{"key": "nlp.sentiment.label", "value": value}];
                            that.conditions.type = ["news","weibo","bar","bbs"];
                            that.getArticleList(that.conditions);
                        }
                    }
                },
                mediaArticleTypePie: {
                    chartId: 'media-article-type-pie',
                    option: {},
                    events: {
                        'click': function (param) {
                            var name = typeUtil.typeUtil.encodeArticleType(param.name);
                            var type = [];
                            type.push(name);
                            that.conditions.searchKv = [];
                            that.conditions.type = type;
                            that.getArticleList(that.conditions);
                        }
                    }
                },
                mediaBarChart: {
                    chartId: 'media-bar-chart',
                    option: {},
                    events: {
                        'click': function (param) {
                            var value = param.name;
                            that.conditions.searchKv = [{"key": "source", "value": value}];
                            that.conditions.type = ["news","weibo","bar","bbs"];
                            that.getArticleList(that.conditions);
                        }
                    }
                },
                mediaReportTrendBar: {
                    chartId: 'media-report-trend-bar',
                    option: {},
                    events: {
                        'click': function (param) {
                        }
                    }
                },
                netizenTitleBar: {
                    chartId: 'accident-report-bar',
                    option: {},
                    events: {
                        'click': function (param) {
                            var value = param.name;
                            that.conditions.searchKv = [{"key": "title.raw", "value": value}];
                            that.conditions.type = ["news","weibo","bar","bbs"];
                            that.getArticleList(that.conditions);
                        }
                    }
                },
                netizenConsensusBar: {
                    chartId: 'netizen-consensus-bar',
                    option: {},
                    events: {
                        'click': function (param) {
                            var value = param.name;
                            that.conditions.searchKv = [{"key": "author", "value": value}];
                            that.conditions.type = ["news","weibo","bar","bbs"];
                            that.getArticleList(that.conditions);
                        }
                    }
                },
                netizenMap: {
                    chartId: 'netizen-map',
                    option: {
                        mapType: "china"
                    },
                    events: {
                        'click': function (param) {
                            var value = param.name;
                            that.conditions.searchKv = [{"key": "area", "value": value}];
                            that.conditions.type = ["news","weibo","bar","bbs"];
                            that.getArticleList(that.conditions);
                        }
                    }
                },
                keywordsChart: {
                    chartId: 'keywords-chart',
                    option: {}
                },
                netizenOptions: {
                    chartId: 'netizen-options',
                    option: {},
                    events: {
                        'click': function (param) {
                            var value = param.name;
                            that.conditions.searchKv = [{"key": "content.raw", "value": value}];
                            that.conditions.type = ["comments"];
                            that.getArticleList(that.conditions);
                        }
                    }
                }
            }
        },
        components: {
            'article-list': articleList,
            'common-menu': CommonMenu,
            'current-list': currentListComponent,
            'warning-list': warningListData,
            'yujing-pager': yujingPagerData,
            'search-param': currentSearchParam,
            'list-pagination': currentPagination,
            'common-header': Header,
            'bar-chart': LineBarChart,
            'pie-chart': PieChart,
            'map-chart': MapChart,
            'keywords-chart': KeywordsChart
        },
        mounted () {
            this.getmylist();
        },
        methods: {
            getArticleData: function (data) {
                var self = this;
                switch (data.action) {
                    case 'clickArticleListPager':
                        self.articlePager = data.articleListPager;
                }
                self.getArticleList();
            },
            getArticleList: function () {
                var self = this;
                service.actions.getArticleList(self.conditions, self.articlePager.pageSize, self.articlePager.currentPage).then(function (renderData) {
                    self.getArticles = renderData.content;
                    self.articlePager.totalElements = renderData.totalElements;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            handleSelect:function (key, keyPath) {
                var self = this;
                self.myIndex = key-0;
                switch (self.myIndex) {
                    case 1:
                        self.getArticles = [];
                        this.getmylist();//信息列表
                        break;
                    case 2:
                        self.getArticles = [];
                        this.getNewsEmotionPieChart();//情感类型分析饼图
                        this.getArticleTypeChart();   //新闻载体分析饼图
                        this.getMediaBarChart();        //主流媒体
                        this.getMediaReportTrendBar();//媒体报道走势柱图
                        break;
                    case 3:
                        self.getArticles = [];
                        this.getNetionTitleBar();//网民舆论热点柱图
                        this.getNetizenConsensusBar();//热议网民柱图
                        this.getNetizenMap();//网民地图分布
                        this.getKeywordsChart();//热点词云
                        this.getNetizenOptions();//网民观点饼图
                        break;
                    case 4:
                        self.getArticles = [];
                        this.getWarningListData();
                        break;
                }
            },
            getNewsEmotionPieChart: function () {
                var self = this;
                service.actions.getNewsEmotionPieChart().then(function (option) {
                    self.mediaReportAnalysisPie.option = option;
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getArticleTypeChart: function () {
                var self = this;
                service.actions.getArticleTypeChart().then(function (option) {
                    self.mediaArticleTypePie.option = option;
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
            getMediaReportTrendBar: function () {
                var self = this;
                service.actions.getMediaReportTrendBar().then(function (renderData) {
                    self.mediaReportTrendBar.option = renderData;
                }, function (error) {
                    console.error('出错了', error);
                });
            },
            getNetionTitleBar: function () {
                var self = this;
                service.actions.getNetionTitleBar().then(function (renderData) {
                    self.netizenTitleBar.option = renderData.option;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getNetizenConsensusBar: function () {
                var self = this;
                service.actions.getNetizenConsensusBar().then(function (renderData) {
                    self.netizenConsensusBar.option = renderData.option;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getNetizenMap: function () {
                var self = this;
                service.actions.getNetizenMap().then(function (renderData) {
                    self.netizenMap.option = renderData.option;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getKeywordsChart: function () {
                var self = this;
                service.actions.getKeywordsChart().then(function (renderData) {
                    self.keywordsChart.option = renderData.option;
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getNetizenOptions: function () {
                var self = this;
                service.actions.getNetizenOptions().then(function (renderData) {
                    self.netizenOptions.option = renderData;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getmylist: function () {
                var self = this;
                service.actions.getmylist(self.mylistSearch, self.myListPagination.pageSize, self.myListPagination.currentPage4).then(function (renderData) {
                    self.currentListNew = renderData.seriesData;
                    self.myListPagination.total = renderData.total;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getListSearchParam: function (data) {
                var self = this;
                self.mylistSearch = data;
                self.getmylist();
            },
            getPager(pager) {
                var self = this;
                self.myListPagination = pager;
                self.getmylist();
            },
            getyujingPager(pager) {
                var self = this;
                self.yujignPager = pager;
                self.getWarningListData();
            },
            getWarningListData: function () {
                var self = this;
                service.actions.getWarningListData(self.yujignPager.pageSize, self.yujignPager.currentPage).then(function (renderData) {
                    self.warningList.tableData3 = renderData.seriesData;
                    self.yujignPager.totalElements = renderData.total;
                }, function (error) {
                    console.error('出错了', error);
                })
            }
        },
        watch: {
            getArticles: function (val, oldVal) {
                var self = this;
                if (val && val.length>0) {
                    self.$nextTick(function () {
                        // DOM 现在更新了
                        // `this` 绑定到当前实例
                        // 页面滚动到指定位置
                        $('html, body').animate({
                            scrollTop: $("#article-list").offset().top-60
                        }, 500);
                    })
                }
            }
        }
    }

</script>


