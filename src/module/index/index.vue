<template>
    <div id="index">
        <common-header></common-header>
        <el-row :gutter="5">
            <!--<el-col :span="3">-->
                <!--<el-card class="box-card" :body-style="{ padding: '10px' }">-->
                    <!--<div slot="header" class="panel-height">-->
                        <!--<span style="line-height: 40px;">重点行业领域</span>-->
                    <!--</div>-->
                    <!--<div class="card-body">-->
                        <!--<check-box @data="getCheckedBox"></check-box>-->
                    <!--</div>-->
                <!--</el-card>-->
            <!--</el-col>-->
            <el-col :span="24">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <div slot="header" class="panel-height">
                        <span style="line-height: 40px;font-size: 18px;"><i class="el-icon-more"></i> 综合概况</span>
                    </div>
                    <div class="card-body">
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
                                    <el-tabs v-model="activeName" @tab-click="handleClick" id="tab-content">
                                    <el-tab-pane name="今天">
                                        <span slot="label"><i class="el-icon-date"></i> 今天</span>
                                        <el-row type="flex" class="row-bg" justify="space-around">
                                            <bar-chart :chartConfig="carrierAnalysis"></bar-chart>
                                        </el-row>
                                    </el-tab-pane>
                                    <el-tab-pane name="昨天">
                                        <span slot="label"><i class="el-icon-date"></i> 昨天</span>
                                        <el-row type="flex" class="row-bg" justify="space-around">
                                            <bar-chart :chartConfig="carrierAnalysisyesterday"></bar-chart>
                                        </el-row>
                                    </el-tab-pane>
                                        <el-tab-pane name="近7天">
                                            <span slot="label"><i class="el-icon-date"></i> 近7天</span>
                                            <el-row type="flex" class="row-bg" justify="space-around">
                                                <bar-chart :chartConfig="carrierAnalysisnearlydays"></bar-chart>
                                            </el-row>
                                        </el-tab-pane>
                                        <el-tab-pane name="近30天">
                                            <span slot="label"><i class="el-icon-date"></i> 近30天</span>
                                            <el-row type="flex" class="row-bg" justify="space-around">
                                                <bar-chart :chartConfig="carrierAnalysismonth"></bar-chart>
                                            </el-row>
                                        </el-tab-pane>
                                    </el-tabs>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="8">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span style="line-height: 20px;">载体分布统计</span>
                                    </div>
                                    <el-tabs v-model="activeNames" @tab-click="handleClickpie" id="tab-contents">
                                        <el-tab-pane name="今天">
                                            <span slot="label"><i class="el-icon-date"></i> 今天</span>
                                            <el-row type="flex" class="row-bg" justify="space-around">
                                                <bar-chart :chartConfig="carrierAnalysisfb"></bar-chart>
                                            </el-row>
                                        </el-tab-pane>
                                        <el-tab-pane name="昨天">
                                            <span slot="label"><i class="el-icon-date"></i> 昨天</span>
                                            <el-row type="flex" class="row-bg" justify="space-around">
                                                <bar-chart :chartConfig="carrierAnalysisfbyesterday"></bar-chart>
                                            </el-row>
                                        </el-tab-pane>
                                        <el-tab-pane name="近7天">
                                            <span slot="label"><i class="el-icon-date"></i> 近7天</span>
                                            <el-row type="flex" class="row-bg" justify="space-around">
                                                <bar-chart :chartConfig="carrierAnalysisfbnearlydays"></bar-chart>
                                            </el-row>
                                        </el-tab-pane>
                                        <el-tab-pane name="近30天">
                                            <span slot="label"><i class="el-icon-date"></i> 近30天</span>
                                            <el-row type="flex" class="row-bg" justify="space-around">
                                                <bar-chart :chartConfig="carrierAnalysisfbmonth"></bar-chart>
                                            </el-row>
                                        </el-tab-pane>
                                    </el-tabs>
                                </el-card>
                            </el-col>
                            <el-col :span="16" class="lists">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span style="line-height: 20px;">主流媒体分布</span>
                                    </div>
                                    <bar-chart :chartConfig="mediaBarChart"></bar-chart>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="24" class="lists">
                                <news-list :newsList="newsList"></news-list>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Header from '@/components/commons/header';
    import News from '@/components/index/news';
    import LineBarChart from '@/components/commons/charts/line-bar';
    import PieChart from '@/components/commons/charts/pie';
    import service from '../../vuex/module/index.js'
    export default {
        name: 'index',
        data () {
            return {
                activeName: '近30天',
                activeNames:'近30天',
                name:'',
                newsList:[],
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
                carrierAnalysisyesterday: {
                    chartId: 'carrierAnalysisyesterday',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                carrierAnalysisnearlydays: {
                    chartId: 'carrierAnalysisnearlydays',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                carrierAnalysismonth: {
                    chartId: 'carrierAnalysismonth',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                carrierAnalysisfb: {
                    chartId: 'carrierAnalysisfb',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                carrierAnalysisfbyesterday: {
                    chartId: 'carrierAnalysisfbyesterday',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                carrierAnalysisfbnearlydays: {
                    chartId: 'carrierAnalysisfbnearlydays',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                carrierAnalysisfbmonth: {
                    chartId: 'carrierAnalysisfbmonth',
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
                timesType:'month'
            }
        },
        components: {
            'common-header': Header,
            'news-list': News,
            'bar-chart': LineBarChart,
            'pie-chart': PieChart
        },
        mounted () {
            this.getyuqingChart();
            this.getCarrierAnalysisChart();
            this.getCarrierAnalysispieChart();
            this.getMediaBarChart();
            this.getNewsList();
        },
        methods: {
            getyuqingChart: function () {
                var self = this;
                service.actions.getyuqingChart().then(function (option) {
                    self.sentimentAnalysis.option = option;
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getCarrierAnalysisChart: function () {
                var self = this;
                service.actions.getCarrierAnalysisChart(self.timesType).then(function (option) {
                    self.carrierAnalysis.option = option;
                    self.carrierAnalysisyesterday.option = option;
                    self.carrierAnalysisnearlydays.option = option;
                    self.carrierAnalysismonth.option = option;
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getCarrierAnalysispieChart: function () {
                var self = this;
                service.actions.getCarrierAnalysispieChart(self.timesType).then(function (option) {
                    self.carrierAnalysisfb.option = option;
                    self.carrierAnalysisfbyesterday.option = option;
                    self.carrierAnalysisfbnearlydays.option = option;
                    self.carrierAnalysisfbmonth.option = option;
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
            getNewsList:function() {
                var self = this;
                service.actions.getNewsList().then(function (data) {
                    self.newsList = data.content;
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            handleClick(tab, event) {
                console.log(tab, event);
                var self = this;
                self.name = tab.name;
                switch (self.name)
                {
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
//                if (self.name == "今天") {
//                    self.timesType = "day";
//                }else if (self.name == "昨天"){
//                    self.timesType = "yesterday";
//                }else if (self.name == "近7天"){
//                    self.timesType = "nearlydays";
//                }else if (self.name == "近30天"){
//                    self.timesType = "month";
//                }
                this.getCarrierAnalysisChart();
            },
            handleClickpie(tab, event) {
                console.log(tab, event);
                var self = this;
                self.name = tab.name;
                switch (self.name)
                {
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
                this.getCarrierAnalysispieChart();
            }
        },
    }
</script>


