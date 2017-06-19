<template>
    <div id="negNews">
        <common-header></common-header>
        <el-row :gutter = "5">
            <el-col :span = "3">
                <common-menu></common-menu>
            </el-col>
            <el-col :span = "21" :offset = "3">
                <el-row style = "margin-top:70px;">
                    <el-col>
                        <time-change :timeChange = "timeChange" @data="getTimeParam"></time-change>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span = "12">

                    </el-col>
                    <el-col :span = "12">
                        <el-card class="box-card my-card">
                            <div slot="header" class="clearfix">
                                <span class="my-title">话题趋势</span>
                            </div>
                            <bar-chart :chartConfig="mediaReportTrendBar"></bar-chart>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import CommonMenu from '@/components/commons/menu';
    import LineBarChart from '@/components/commons/charts/line-bar';
    import timeChange from '@/components/index/timeChange';
    import service from '../../vuex/module/negNews.js';
    export default {
        name: 'presentationList',
        data () {
            return {
                timeChange:{
                    startDate: '2017-05-01',
                    endDate: '2017-06-01'
                },
                mediaReportTrendBar: {
                    chartId: 'media-report-trend-bar',
                    option: {},
                    events: {
                        'click': function (param) {
                        }
                    }
                }
            }
        },
        components: {
            'time-change':timeChange,
            'bar-chart': LineBarChart,
            'common-menu': CommonMenu,
            'common-header': Header,
        },
        mounted () {
            this.getMediaReportTrendBar();//媒体报道走势柱图
        },
        methods: {
            getMediaReportTrendBar: function () {
                var self = this;
                service.actions.getMediaReportTrendBar(self.timeChange).then(function (renderData) {
                    self.mediaReportTrendBar.option = renderData;
                }, function (error) {
                    console.error('出错了', error);
                });
            },
            getTimeParam:function (data) {
              var self = this;
              self.timeChange = data;
              this.getMediaReportTrendBar();
            }

        }
    }
</script>

