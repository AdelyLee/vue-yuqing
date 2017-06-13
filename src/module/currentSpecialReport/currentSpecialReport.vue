<template>
    <div id="currentSpecial">
        <common-header></common-header>
        <el-row :gutter="15">
            <el-col :span="4">
                <common-menu></common-menu>
            </el-col>
            <el-col :span="20" :offset ="4">
                <el-card class="box-card " style ="margin-top:70px;">
                    <div slot="header" class="clearfix" style="line-height: 40px;text-align: left"><i
                        class="el-icon-star-off"></i>专题 ：{{subjectName}}
                    </div>
                    <el-row :gutter="15" class="list">
                        <el-col :span="24">
                            <div style="height:5px;"></div>
                            <el-menu :default-active="1" class="el-menu-demo" mode="horizontal">
                                <el-menu-item index="1" @click="changeIndex(1)"><i class="el-icon-message"></i>信息列表
                                </el-menu-item>
                                <el-menu-item index="2" @click="changeIndex(2)"><i class="el-icon-menu"></i>舆论分析
                                </el-menu-item>
                                <el-menu-item index="3" @click="changeIndex(3)"><i class="el-icon-setting"></i>网民分析
                                </el-menu-item>
                                <el-menu-item index="4" @click="changeIndex(4)"><i class="el-icon-information"></i>历史预警
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
                                            专题时间 ：{{timeRange}}
                                        </el-card>
                                        <el-card class="box-card my-card" style="margin-top:15px;">
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
                                <el-row :gutter="15">
                                    <el-col :span="24">
                                        <el-card class=" my-card" style="margin-top:5px;">
                                            <span class="my-title">舆论热点</span>
                                            <el-tabs type="card">
                                                <el-tab-pane label="新闻观点">
                                                    <el-col :span="24" class="lists">
                                                        <bar-chart :chartConfig="netizenTypeTitleBar"></bar-chart>
                                                        <!--<news-list :type="newsUrl" :checkedItems="checkedItems"></news-list>-->
                                                    </el-col>
                                                </el-tab-pane>
                                                <el-tab-pane label="微博观点">
                                                    <el-col :span="24" class="lists">
                                                        <weibo-list :type="weiboUrl"
                                                                    :checkedItems="checkedItems"></weibo-list>
                                                    </el-col>
                                                </el-tab-pane>
                                                <el-tab-pane label="论坛观点">
                                                    <el-col :span="24" class="lists">
                                                        <bbs-list :type="bbsUrl"
                                                                  :checkedItems="checkedItems"></bbs-list>
                                                    </el-col>
                                                </el-tab-pane>
                                            </el-tabs>
                                        </el-card>
                                    </el-col>
                                </el-row>
                                <el-dialog title="收货地址" size="large" :visible="dialogTableVisible">
                                    <el-table :data="gridData">
                                        <el-table-column property="date" label="日期" width="150"></el-table-column>
                                        <el-table-column property="name" label="姓名" width="200"></el-table-column>
                                        <el-table-column property="address" label="地址"></el-table-column>
                                    </el-table>
                                </el-dialog>
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
                                <el-row :gutter="15">
                                    <el-col :span="12">
                                        <el-card class="box-card my-card" style="margin-top:5px;">
                                            <div slot="header" class="clearfix">
                                                <span class="my-title">网民观点</span>
                                            </div>
                                            <pie-chart :chartConfig="netizenOptions"></pie-chart>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="12">

                                    </el-col>
                                </el-row>
                            </div>
                            <div v-if="myIndex == 4">
                                <warning-list :yujingList="warningList"></warning-list>
                                <yujing-pager :pager="yujignPager" @data="getyujingPager"></yujing-pager>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style scoped>

</style>
<script>
    import Header from '@/components/commons/header';
    import CommonMenu from '@/components/commons/menu';
    import LineBarChart from '@/components/commons/charts/line-bar';
    import PieChart from '@/components/commons/charts/pie';
    import MapChart from '@/components/commons/charts/map';
    import KeywordsChart from '@/components/commons/charts/keywords-cloud';
    import currentListComponent from '@/components/currentSpecialReport/currentList_new';
    import currentSearchParam from '@/components/currentSpecialReport/currentSearchParam';
    import currentPagination from '@/components/currentSpecialReport/currentPagination';
    import warningListData from '@/components/currentSpecialReport/warningList';
    import yujingPagerData from '@/components/commons/paging';
    import service from '../../vuex/module/currentSpecialReport.js';
    import dateUtil from '../../vuex/dateUtil'
    export default {
        name: 'presentationList',
        data () {
            return {
                gridData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                dialogTableVisible: false,
                currentListNew: [],
                myListPagination: {
                    pageSize: 5,
                    currentPage4: 1,
                    total: 0,
                },
                yujignPager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 10
                },
                warningList: {
                    loading3: false,
                    tableData3: [
                        {
                            "subjectName": "六一儿童节",
                            "keyWord": "快乐@happy",
                            "timeChange": "2017-06至2017-07",
                            "dateCreated": "2017-06-01",
                            "set": "查看预警",
                            "id": "8"
                        }]
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
                    type: ["news", "weibo"]
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
                activeName: 'first',
                mediaReportAnalysisPie: {
                    chartId: 'media-report-analysis-pie',
                    option: {},
                    events: {
                        'click': function (param) {
                            var self = this;
                            debugger;
                            this.dialogTableVisible = true
                        }
                    }
                },
                mediaArticleTypePie: {
                    chartId: 'media-article-type-pie',
                    option: {},
                    events: {
                        'click': function (param) {
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
                mediaReportTrendBar: {
                    chartId: 'media-report-trend-bar',
                    option: {},
                    events: {
                        'click': function (param) {
                        }
                    }
                },
                netizenTypeTitleBar: {
                    chartId: 'net-title-bar',
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
                        }
                    }
                },
                netizenConsensusBar: {
                    chartId: 'netizen-consensus-bar',
                    option: {},
                    events: {
                        'click': function (param) {
                        }
                    }
                },
                netizenMap: {
                    chartId: 'netizen-map',
                    option: {
                        mapType: "china"
                    },
                    events: {
//                        'click': clickMapChart
                    }
                },
                keywordsChart: {
                    chartId: 'keywords-chart',
                    option: {}
                },
                netizenOptions: {
                    chartId: 'netizen-options',
                    option: {}
                }
            }
        },
        components: {
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
//            this.getPager();
        },
        methods: {
            changeIndex: function (index) {
                var self = this;
                self.myIndex = index;
                if (index == 1) {
                    this.getmylist();//信息列表
                } else if (index == 2) {
                    this.getNewsEmotionPieChart();//情感类型分析饼图
                    this.getArticleTypeChart();   //新闻载体分析饼图
                    this.getMediaBarChart();        //主流媒体
                    this.getMediaReportTrendBar();//媒体报道走势柱图
                    this.getNetionTypeTitleBar();//网民观点

                } else if (index == 3) {
                    this.getNetionTitleBar();//网民舆论热点柱图
                    this.getNetizenConsensusBar();//热议网民柱图
                    this.getNetizenMap();//网民地图分布
                    this.getKeywordsChart();//热点词云
                    this.getNetizenOptions();//网民观点饼图
                } else if (index == 4) {
                    this.getWarningListData();
                }
            },
            handleClick(tab, event) {
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
            getNetionTypeTitleBar: function () {
                var self = this;
                service.actions.getNetionTypeTitleBar().then(function (renderData) {
                    self.netizenTypeTitleBar.option = renderData.option;
                }, function (error) {
                    console.error('出错了', error);
                })
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
                    self.netizenOptions.option = renderData.option;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getmylist: function () {
                var self = this;
                service.actions.getmylist(self.mylistSearch, self.myListPagination.pageSize, self.myListPagination.currentPage4).then(function (renderData) {
//                    self.mylist.items = renderData.seriesData;
                    self.currentListNew = renderData.seriesData;
                    self.myListPagination.total = renderData.total;
//                    if(renderData.seriesData.length == 0) {
//                      self.mylist.show = true;
//                    }else {
//                        self.mylist.show = false;
//                    }
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
        }
    }

</script>


