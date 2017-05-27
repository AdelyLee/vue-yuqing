<template>
    <div id="special">
        <common-header></common-header>
        <el-row :gutter="5">
            <el-col :span="24">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <div slot="header" class="panel-height">
                        <span style="line-height: 40px;">{{cardTitle}}</span>
                    </div>
                    <div class="card-body">
                        <report-header></report-header>
                        <div class="report-content">
                            <report-text></report-text>
                            <report-title :title="title1_1"></report-title>
                            <report-describe v-html="totalTitleText"></report-describe>
                            <report-describe v-html="totalTitleTextOne"></report-describe>
                            <report-title :title="title2"></report-title>
                            <pie-chart :chartConfig="mediaReportAnalysisPie"></pie-chart>
                            <report-describe v-html="mediaReportAnalysisPieText"></report-describe>
                            <report-title :title="title2_1_2"></report-title>
                            <bar-chart :chartConfig="newsCountBar"></bar-chart>
                            <report-describe v-html="newsCountBarText"></report-describe>
                            <report-title :title="title2_1_3"></report-title>
                            <bar-chart :chartConfig="mediaReportTrendBar"></bar-chart>
                            <report-describe v-html="mediaReportTrendBarText"></report-describe>
                            <report-title :title="title2_1_4"></report-title>
                            <bar-chart :chartConfig="netizenTitleBar"></bar-chart>
                            <report-describe v-html="netizenTitleBarText"></report-describe>
                            <report-title :title="title2_1_5"></report-title>
                            <bar-chart :chartConfig="netizenConsensusBar"></bar-chart>
                            <report-describe v-html="netizenConsensusBarText"></report-describe>
                            <report-title :title="title3_1_5_1"></report-title>
                            <map-chart :chartConfig="netizenMap"></map-chart>
                            <report-describe v-html="netizenMapText"></report-describe>
                            <report-title :title="title3_1_5_2"></report-title>
                            <keywords-chart :chartConfig="keywordsChart"></keywords-chart>
                            <report-describe v-html = "keywordsChartText"></report-describe>
                            <report-title :title="title3_1_5_3"></report-title>
                            <pie-chart :chartConfig="netizenOptionPie"></pie-chart>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import ReportHeader from '@/components/decisionReport/report-header';
    import ReportTitle from '@/components/decisionReport/report-title';
    import ReportText from '@/components/decisionReport/report-text'
    import ReportDescribe from '@/components/decisionReport/report-describe';
    import LineBarChart from '@/components/commons/charts/line-bar';
    import PieChart from '@/components/commons/charts/pie';
    import MapChart from '@/components/commons/charts/map';
    import KeywordsChart from '@/components/commons/charts/keywords-cloud';
    import service from '../../vuex/module/specialReport.js'
    import Chart from '../../../lib/draw-echarts'
    export default{
        name: 'specialReport',
        data () {
            var self = this;
            return {
                cardTitle: '與情月报',
                title1_1: {
                    text: '一、與情综述',
                    levelClass: 'level-one'
                },
                title2: {
                    text: '二、媒体报道情况分析',
                    levelClass: 'level-one'
                },
                title2_1_2: {
                    text: '新闻客户端舆情量对比',
                    levelClass: 'level-two'
                },
                title2_1_3: {
                    text: '媒体报道走势',
                    levelClass: 'level-two'
                },
                title2_1_4: {
                    text: '三、网民舆论热点',
                    levelClass: 'level-one'
                },
                title2_1_5: {
                    text: '四、网民舆论情况',
                    levelClass: 'level-one'
                },
                title3_1_5_1: {
                    text: '话题关注人群地域分布图',
                    levelClass: 'level-two'
                },
                title3_1_5_2: {
                    text: '网民评论热点词词云分析',
                    levelClass: 'level-two'
                },
                title3_1_5_3: {
                    text: '网民主要观点分布',
                    levelClass: 'level-two'
                },
                netizenTitleBarText:'',
                netizenConsensusBarText:'',
                mediaReportAnalysisPieText:'',
                newsCountBarText:"",
                totalTitleText:"",
                totalTitleTextOne:"",
                netizenMapText:'',
                keywordsChartText:'',
                mediaReportTrendBarText:"",
                mediaReportAnalysisPie: {
                    chartId: 'media-report-analysis-pie',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                newsCountBar: {
                    chartId: 'news-count-bar',
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
                netizenOptionPie: {
                    chartId: 'netizen-option-pie',
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
                }
//
//            }
            }
        },
        components: {
            'common-header': Header,
            'report-header': ReportHeader,
            'report-title': ReportTitle,
            'report-describe': ReportDescribe,
            'bar-chart': LineBarChart,
            'pie-chart': PieChart,
            'map-chart': MapChart,
            'keywords-chart': KeywordsChart,
            'report-text':ReportText
        },
        mounted () {
            this.getMediaReportAnalysisPie();//媒体报道分析饼图
            this.getNewsCountBar();//新闻舆情对比柱图
            this.getMediaReportTrendBar();//媒体报道走势柱图
            this.getNetionTitleBar();//网民舆论热点柱图
            this.getNetizenConsensusBar();//网民舆论情况柱图
            this.getNetizenMap();//网民地图分布
            this.getKeywordsChart();//热点词云
            this.getNetizenOptionPie();//网民观点饼图
        },
        methods: {
            getMediaReportAnalysisPie: function() {
                var self = this;
                service.actions.getMediaReportAnalysisPie().then(function (renderData) {
                    self.mediaReportAnalysisPie.option = renderData.option;

                    self.mediaReportAnalysisPieText=renderData.description;
                    self.totalTitleText= renderData.descriptiontwo
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getNewsCountBar:function(){

                var self = this;
                service.actions.getNewsCountBar().then(function (renderData) {
                    self.newsCountBar.option =  renderData.option;
                    self.newsCountBarText=renderData.description;
//                    self.totalTitleTextOne=renderData.descriptionthree;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getMediaReportTrendBar:function(){
                var self = this;
                service.actions. getMediaReportTrendBar().then(function (renderData) {
                    self.mediaReportTrendBar.option = renderData.option;
                    self.mediaReportTrendBarText=renderData.description
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getNetionTitleBar: function () {
                var self = this;
                service.actions.getNetionTitleBar().then(function (renderData) {
                    self.netizenTitleBar.option =  renderData.option;
                    self.netizenTitleBarText = renderData.description;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getNetizenConsensusBar: function () {
                var self = this;
                service.actions.getNetizenConsensusBar().then(function (renderData) {
                    self.netizenConsensusBar.option =  renderData.option;
                    self.netizenConsensusBarText = renderData.description;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getNetizenMap: function () {
                var self = this;
                service.actions.getNetizenMap().then(function (renderData) {
                    self.netizenMap.option =  renderData.option;
                    self.netizenMapText = renderData.description;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getKeywordsChart: function () {
                var self = this;
                service.actions.getKeywordsChart().then(function(renderData) {
                    self.keywordsChart.option = renderData.option;
                    self.keywordsChartText = renderData.description;
                },function (error) {
                    console.error('出错了',error);
                })

            },
            getNetizenOptionPie: function() {
                var self = this;
                service.actions.getNetizenOptionPie().then(function(option) {
                    self.netizenOptionPie.option = option;
                },function (error) {
                    console.error('出错了',error);
                })
            }
        }
    }
</script>

