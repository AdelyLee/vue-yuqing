<template>
    <div id="decision">
        <common-header></common-header>
        <el-row :gutter="5">
            <el-col :span="24">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <div slot="header" class="panel-height">
                        <span style="line-height: 40px;">與情{{briefingJson.type}}</span>
                    </div>
                    <div class="card-body">
                        <report-header :briefingJson="briefingJson"></report-header>
                        <div class="report-content">
                            <report-content :briefingJson="briefingJson"></report-content>
                            <!--<report-text :briefingJson="briefingJson"></report-text>-->
                            <!--<report-title :title="title1_1"></report-title>-->
                            <!--<report-title :title="title2_1_1"></report-title>-->
                            <!--<pie-chart :chartConfig="articleTypePieChartConfig"></pie-chart>-->
                            <!--&lt;!&ndash;<report-describe v-html="describe"></report-describe>&ndash;&gt;-->
                            <!--<report-title :title="title2_1_2"></report-title>-->
                            <!--<bar-chart :chartConfig="accidentAreaChartConfig"></bar-chart>-->
                            <!--&lt;!&ndash;<report-describe v-html="describe_2"></report-describe>&ndash;&gt;-->
                            <!--<report-title :title="title2_1_3"></report-title>-->
                            <!--<bar-chart :chartConfig="articleTrendChartConfig"></bar-chart>-->
                            <!--&lt;!&ndash;<report-describe :describe="describe_3"></report-describe>&ndash;&gt;-->
                            <!--<report-title :title="title2_1_4"></report-title>-->
                            <!--<bar-chart :chartConfig="newsHotPointConfig"></bar-chart>-->
                            <!--&lt;!&ndash;<report-describe v-html="describe_4"></report-describe>&ndash;&gt;-->
                            <!--<report-title :title="title2_1_5"></report-title>-->
                            <!--<report-title :title="title3_1_5_1"></report-title>-->
                            <!--<pie-chart :chartConfig="newsEmotionPieChartConfig"></pie-chart>-->
                            <!--&lt;!&ndash;<report-describe v-html="describe_5_1"></report-describe>&ndash;&gt;-->
                            <!--<report-title :title="title3_1_5_2"></report-title>-->
                            <!--<bar-chart :chartConfig="mediaBarChartConfig"></bar-chart>-->
                            <!--&lt;!&ndash;<report-describe v-html="describe_5_2"></report-describe>&ndash;&gt;-->
                            <!--<report-title :title="title3_1_5_3"></report-title>-->
                            <!--&lt;!&ndash;<report-describe v-html="describe_5_3"></report-describe>&ndash;&gt;-->
                            <!--<keywords-chart :chartConfig="keywordsChartConfig"></keywords-chart>-->
                            <!--<report-title :title="title1_2"></report-title>-->
                            <!--<report-title :title="title2_2_1"></report-title>-->
                            <!--<bar-chart :chartConfig="monthAccidentConfig"></bar-chart>-->
                            <!--&lt;!&ndash;<report-describe v-html="describe_6"></report-describe>&ndash;&gt;-->
                            <!--<report-title :title="title2_2_2"></report-title>-->
                            <!--<report-title :title="title2_2_2_1"></report-title>-->
                            <!--<pie-chart :chartConfig="accidentTypePieChartConfig"></pie-chart>-->
                            <!--&lt;!&ndash;<report-describe v-html="describe_7"></report-describe>&ndash;&gt;-->
                            <!--<report-title :title="title2_2_2_2"></report-title>-->
                            <!--<map-chart :chartConfig="mapChartConfig"></map-chart>-->
                            <!--&lt;!&ndash;<report-describe v-html="describe_7_1"></report-describe>&ndash;&gt;-->
                            <!--<report-title :title="title2_2_3"></report-title>-->
                            <!--<report-title :title="title2_2_3_1"></report-title>-->
                            <!--<pie-chart :chartConfig="commentPieChartConfig"></pie-chart>-->
                            <!--&lt;!&ndash;<report-describe v-html="describe_8"></report-describe>&ndash;&gt;-->
                            <!--<report-title :title="title2_2_3_2"></report-title>-->
                            <!--&lt;!&ndash;<report-describe v-html="describe_8_1"></report-describe>&ndash;&gt;-->
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
    import service from '../../vuex/module/decisionReport.js'
    import Chart from '../../../lib/draw-echarts'
    export default{
        name: 'decisionReport',
        data () {
            return {
                level: 1,
                briefingJson: {}
            }
        },
        components: {
            "report-content": {
                functional: true,
                render: function (createElement, context) {
                    console.log("briefingJson", context.props.briefingJson);
                    var briefingBody = context.props.briefingJson.briefingBody;

                    var briefingCells = [];

                    function analysisArray(briefingBody) {
                        for (var item of briefingBody) {
                            briefingCells.push(item);
                            if (item.children != undefined && item.children.length > 0) {
                                analysisArray(item.children)
                            }
                        }
                    }

//                    analysisArray(briefingBody);
//                    appropriateListComponent();
                    function appropriateListComponent() {
                        for (var item of briefingCells) {
                            if (item.title != undefined && item.title != "") {
                                return 'report-title';
                            }
                        }
                    }

                    return createElement(
                        'report-title',
                        context.data,
                    )
                },
                props: ['briefingJson'],
                data:{
                    attrs: {
                        id: 'foo'
                    }
                }
            },
            'common-header': Header,
            'report-header': ReportHeader,
            'report-title': ReportTitle,
//            'report-describe': ReportDescribe,
//            'bar-chart': LineBarChart,
//            'pie-chart': PieChart,
//            'map-chart': MapChart,
//            'keywords-chart': KeywordsChart,
//            'report-text': ReportText
        },
        mounted () {
            // get briefing json data from mongodb
            this.getBriefingJson();
        },
        methods: {
            getBriefingJson: function () {
                var self = this;
                service.actions.getBriefingJson().then(function (briefingJson) {
                    self.briefingJson = briefingJson;
                    console.log(briefingJson);
                }, function (error) {
                    console.error('出错了', error);
                })
            }
        }
    }
</script>


