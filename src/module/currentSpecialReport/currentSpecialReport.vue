<template>
    <div id="currentSpecial">
        <common-header></common-header>
        <el-row :gutter="5" class="list">
            <el-col :span="24">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <div slot="header" class="panel-height">
                        <span style="line-height: 40px;"><i class="el-icon-document"></i> 专题报告</span>
                    </div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="网民舆论分析" name="first">
                            <el-row :gutter="15">
                                <el-col :span="12">
                                    <el-card class="box-card my-card">
                                        <div slot="header" class="clearfix my-header">
                                            <span class = "my-title">网民话题</span>
                                        </div>
                                        <bar-chart :chartConfig="netizenTitleBar"></bar-chart>
                                    </el-card>
                                </el-col>
                                <el-col :span = "12">
                                    <el-card class="box-card my-card">
                                        <div slot="header" class="clearfix">
                                            <span class = "my-title">热议网民</span>
                                        </div>
                                        <bar-chart :chartConfig="netizenConsensusBar"></bar-chart>
                                    </el-card>
                                </el-col>
                            </el-row>
                            <el-row :gutter="15">
                                <el-col :span="12">
                                    <el-card class="box-card my-card">
                                        <div slot="header" class="clearfix">
                                            <span class = "my-title">地域分布</span>
                                        </div>
                                        <map-chart :chartConfig="netizenMap"></map-chart>
                                    </el-card>
                                </el-col>
                                <el-col :span="12">
                                    <el-card class="box-card my-card">
                                        <div slot="header" class="clearfix">
                                            <span class = "my-title">热点词云</span>
                                        </div>
                                        <keywords-chart :chartConfig="keywordsChart"></keywords-chart>
                                    </el-card>
                                </el-col>
                            </el-row>
                            <el-row :gutter="15">
                                <el-col :span="12">
                                    <el-card class="box-card my-card">
                                        <div slot="header" class="clearfix">
                                            <span  class = "my-title">网民观点</span>
                                        </div>
                                        <pie-chart :chartConfig="netizenOptions"></pie-chart>
                                    </el-card>
                                </el-col>
                                <el-col :span="12">

                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="配置管理" name="second">
                            <el-col :span="24" class="lists">
                                <news-list :type="newsUrl" :checkedItems="checkedItems"></news-list>
                            </el-col>
                            <el-row :gutter="15">
                                <el-col :span="12">
                                    <el-card class="box-card my-card">
                                        <div slot="header" class="clearfix">
                                            <span class = "my-title">情感分析</span>
                                        </div>
                                        <pie-chart :chartConfig="mediaReportAnalysisPie"></pie-chart>
                                    </el-card>
                                </el-col>
                                <el-col :span = "12">
                                    <el-card class="box-card my-card">
                                        <div slot="header" class="clearfix">
                                            <span class = "my-title">载体</span>
                                        </div>
                                        <pie-chart :chartConfig="mediaArticleTypePie"></pie-chart>
                                    </el-card>
                                </el-col>
                            </el-row>
                            <el-row :gutter="15">
                                <el-col :span="12">
                                    <el-card class="box-card my-card">
                                        <div slot="header" class="clearfix">
                                            <span class = "my-title">主流媒体</span>
                                        </div>
                                        <bar-chart :chartConfig="mediaBarChart"></bar-chart>
                                    </el-card>
                                </el-col>
                                <el-col :span = "12">
                                    <el-card class="box-card my-card">
                                        <div slot="header" class="clearfix">
                                            <span class = "my-title">话题趋势</span>
                                        </div>
                                        <bar-chart :chartConfig="mediaReportTrendBar"></bar-chart>
                                    </el-card>
                                </el-col>
                            </el-row>

                                    <!--<div class="list-box">-->
                                        <!--<div class="clearfix table-top"><span class="news-title">网民观点</span></div></div>-->
                            <!---->

                            <el-tabs type="card">
                                <el-tab-pane label="新闻观点">
                                    <el-col :span="24" class="lists">
                                        <news-list :type="newsUrl" :checkedItems="checkedItems"></news-list>
                                    </el-col>

                                </el-tab-pane>
                                <el-tab-pane label="微博观点">
                                    <el-col :span="24" class="lists">
                                        <weibo-list :type="weiboUrl" :checkedItems="checkedItems"></weibo-list>

                                    </el-col>
                                </el-tab-pane>
                                <el-tab-pane label="论坛观点">
                                    <el-col :span="24" class="lists">
                                        <bbs-list :type="bbsUrl" :checkedItems="checkedItems"></bbs-list>

                                    </el-col>
                                </el-tab-pane>
                            </el-tabs>





                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import LineBarChart from '@/components/commons/charts/line-bar';
    import PieChart from '@/components/commons/charts/pie';
    import MapChart from '@/components/commons/charts/map';
    import KeywordsChart from '@/components/commons/charts/keywords-cloud';
    import News from '@/components/index/news';
    import service from '../../vuex/module/currentSpecialReport.js'
//    import service from '../../vuex/module/specialReport.js'
    export default {
        name: 'presentationList',
        data () {
            return {
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
                            console.log(param.name);
                        }
                    }
                },
                mediaArticleTypePie:{
                    chartId: 'media-article-type-pie',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                mediaBarChart:{
                    chartId: 'media-bar-chart',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                mediaReportTrendBar:{
                    chartId: 'media-report-trend-bar',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                netizenTitleBar: {
                    chartId: 'accident-report-bar',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                netizenConsensusBar:{
                    chartId: 'netizen-consensus-bar',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
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
            'news-list': News,
            'weibo-list': News,
            'bbs-list': News,
            'common-header': Header,
            'bar-chart': LineBarChart,
            'pie-chart': PieChart,
            'map-chart': MapChart,
            'keywords-chart': KeywordsChart,
        },
        mounted () {
            this.getNewsEmotionPieChart();//情感类型分析饼图
            this.getArticleTypeChart()   //新闻载体分析饼图
            this.getMediaBarChart()        //主流媒体
            this.getMediaReportTrendBar();//媒体报道走势柱图
            this.getNetionTitleBar();//网民舆论热点柱图

            this.getNetizenConsensusBar();//热议网民柱图
            this.getNetizenMap();//网民地图分布
            this.getKeywordsChart();//热点词云
            this.getNetizenOptions();//网民观点饼图
        },
        methods: {
            handleClick(tab, event) {
            },
            getNewsEmotionPieChart: function() {
                var self = this;
                service.actions.getNewsEmotionPieChart().then(function (option) {
                    self.mediaReportAnalysisPie.option =option;
//                    self.mediaReportAnalysisPieText=renderData.description;
//                    self.totalTitleText= renderData.descriptiontwo
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getArticleTypeChart:function() {
                var self = this;
                service.actions.getArticleTypeChart().then(function (option) {
                    self.mediaArticleTypePie.option =option;

//                    self.mediaReportAnalysisPieText=renderData.description;
//                    self.totalTitleText= renderData.descriptiontwo
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getMediaBarChart:function() {
                var self = this;
                service.actions.getMediaBarChart().then(function (option) {
                    self.mediaBarChart.option =option;

//                    self.mediaReportAnalysisPieText=renderData.description;
//                    self.totalTitleText= renderData.descriptiontwo
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getMediaReportTrendBar:function(){
                var self = this;
                service.actions. getMediaReportTrendBar().then(function (renderData) {
                    self.mediaReportTrendBar.option = renderData.option;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getNetionTitleBar: function () {
                var self = this;
                service.actions.getNetionTitleBar().then(function (renderData) {
                    self.netizenTitleBar.option =  renderData.option;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getNetizenConsensusBar: function () {
                var self = this;
                service.actions.getNetizenConsensusBar().then(function (renderData) {
                    self.netizenConsensusBar.option =  renderData.option;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getNetizenMap: function () {
                var self = this;
                service.actions.getNetizenMap().then(function (renderData) {
                    self.netizenMap.option =  renderData.option;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getKeywordsChart: function () {
                var self = this;
                service.actions.getKeywordsChart().then(function(renderData) {
                    self.keywordsChart.option = renderData.option;
                },function (error) {
                    console.error('出错了',error);
                })

            },
            getNetizenOptions:function () {
                var self = this;
                service.actions.getNetizenOptions().then(function(renderData) {
                    self.netizenOptions.option = renderData.option;
                },function (error) {
                    console.error('出错了',error);
                })
            }
        }
    }

</script>

