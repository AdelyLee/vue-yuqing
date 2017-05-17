<template>
    <div id="decision">
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
                            <report-title :title="title1_1"></report-title>
                            <report-title :title="title2_1_1"></report-title>
                            <bar-chart :chartConfig="barChartConfig"></bar-chart>
                            <report-title :title="title2_1_2"></report-title>
                            <pie-chart :chartConfig="pieChartConfig"></pie-chart>
                            <report-title :title="title2_1_3"></report-title>
                            <map-chart :chartConfig="mapChartConfig"></map-chart>
                            <report-title :title="title2_1_4"></report-title>
                            <report-title :title="title2_1_5"></report-title>
                            <report-title :title="title3_1_5_1"></report-title>
                            <report-title :title="title3_1_5_2"></report-title>
                            <report-title :title="title3_1_5_3"></report-title>
                            <report-title :title="title1_2"></report-title>
                            <report-title :title="title2_2_1"></report-title>
                            <report-title :title="title2_2_2"></report-title>
                            <report-title :title="title2_2_2_1"></report-title>
                            <report-title :title="title2_2_2_2"></report-title>
                            <report-title :title="title2_2_3"></report-title>
                            <report-title :title="title2_2_3_1"></report-title>
                            <report-title :title="title2_2_3_2"></report-title>
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
    import LineBarChart from '@/components/commons/charts/line-bar';
    import PieChart from '@/components/commons/charts/pie';
    import MapChart from '@/components/commons/charts/map';

    import Chart from '../../../lib/draw-echarts'
    export default{
        name: 'decisionReport',
        data () {
            var self = this;
            return {
                cardTitle: '與情月报',
                title1_1: {
                    text: '一、與情综述',
                    levelClass: 'level-one'
                },
                title2_1_1: {
                    text: '话题报道',
                    levelClass: 'level-two'
                },
                title2_1_2: {
                    text: '事故相关区域分析',
                    levelClass: 'level-two'
                },
                title2_1_3: {
                    text: '(一) 5月安全生产與情趋势',
                    levelClass: 'level-two'
                },
                title2_1_4: {
                    text: '(二) 5月安全生产新闻传播舆论热度',
                    levelClass: 'level-two'
                },
                title2_1_5: {
                    text: '(三) 5月安全生产热点新闻解析',
                    levelClass: 'level-two'
                },
                title3_1_5_1: {
                    text: '新闻情感正负面分析',
                    levelClass: 'level-three'
                },
                title3_1_5_2: {
                    text: '主流媒体报道统计',
                    levelClass: 'level-three'
                },
                title3_1_5_3: {
                    text: '热点词词云分析',
                    levelClass: 'level-three'
                },
                title1_2: {
                    text: '二、安全生产事故聚焦',
                    levelClass: 'level-one'
                },
                title2_2_1: {
                    text: '1. 本月事故情况',
                    levelClass: 'level-two'
                },
                title2_2_2: {
                    text: '2. 事故分析',
                    levelClass: 'level-two'
                },
                title2_2_2_1: {
                    text: '事故类型分布图',
                    levelClass: 'level-three'
                },
                title2_2_2_2: {
                    text: '事故地域分布图',
                    levelClass: 'level-three'
                },
                title2_2_3: {
                    text: '3. 相关言论分析',
                    levelClass: 'level-two'
                },
                title2_2_3_1: {
                    text: '事故相关言论占比分析',
                    levelClass: 'level-three'
                },
                title2_2_3_2: {
                    text: '事故相关言论关键词词云',
                    levelClass: 'level-three'
                },
                barChartConfig: {
                    chartId: 'bar-chart-test',
                    option: {
                        xAxis: {
                            data: ["1", "2", "3", "4", "5", "6"]
                        }
                    },
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                pieChartConfig: {
                    chartId: 'pie-chart-test',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                mapChartConfig: {
                    chartId: 'map-chart-test',
                    option: {
                        mapType: "china"
                    },
                    events: {
                        'click': clickMapChart
                    }
                }
            }
        },
        components: {
            'common-header': Header,
            'report-header': ReportHeader,
            'report-title': ReportTitle,
            'bar-chart': LineBarChart,
            'pie-chart': PieChart,
            'map-chart': MapChart
        },
        watch: {
            mapChartConfig: {
                handler(val, oldVal) {
                    debugger;
                    console.log('new: %s, old: %s', val, oldVal)
                    Chart.drawMapChart(this.mapConfig.chartId, this.mapConfig.option, this.mapConfig.events);

                },
                deep :true
            }
        }
    }

    // 点击地图事件
    var self = this;
    var itme = self.default.data();
    function clickMapChart(param) {
        debugger;
        itme.mapChartConfig.option.mapType = param.name;
        delete itme.mapChartConfig.events;
//        Chart.drawMapChart(itme.mapChartConfig.chartId, itme.mapChartConfig.option, itme.mapChartConfig.events);
    }
</script>
