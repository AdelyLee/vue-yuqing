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
                            <report-text></report-text>
                            <report-title :title="title1_1"></report-title>
                            <report-title :title="title2_1_1"></report-title>
                            <pie-chart :chartConfig="articleTypePieChartConfig"></pie-chart>
                            <report-describe v-html="describe"></report-describe>
                            <report-title :title="title2_1_2"></report-title>
                            <bar-chart :chartConfig="accidentAreaChartConfig"></bar-chart>
                            <report-describe v-html="describe_2"></report-describe>
                            <report-title :title="title2_1_3"></report-title>
                            <bar-chart :chartConfig="articleTrendChartConfig"></bar-chart>
                            <map-chart :chartConfig="mapChartConfig"></map-chart>
                            <report-describe :describe="describe_3"></report-describe>
                            <keywords-chart :chartConfig="keywordsChartConfig"></keywords-chart>
                            <report-title :title="title2_1_4"></report-title>
                            <report-describe v-html="describe_4"></report-describe>
                            <report-title :title="title2_1_5"></report-title>
                            <report-title :title="title3_1_5_1"></report-title>
                            <pie-chart :chartConfig="newsEmotionPieChartConfig"></pie-chart>
                            <report-describe v-html="describe_5_1"></report-describe>
                            <report-title :title="title3_1_5_2"></report-title>
                            <bar-chart :chartConfig="mediaBarChartConfig"></bar-chart>
                            <report-describe v-html="describe_5_2"></report-describe>
                            <report-title :title="title3_1_5_3"></report-title>
                            <report-describe v-html="describe_5_3"></report-describe>
                            <report-title :title="title1_2"></report-title>
                            <report-title :title="title2_2_1"></report-title>
                            <report-describe v-html="describe_6"></report-describe>
                            <report-title :title="title2_2_2"></report-title>
                            <report-title :title="title2_2_2_1"></report-title>
                            <report-describe v-html="describe_7"></report-describe>
                            <report-title :title="title2_2_2_2"></report-title>
                            <report-describe v-html="describe_7_1"></report-describe>
                            <report-title :title="title2_2_3"></report-title>
                            <pie-chart :chartConfig="commentPieChartConfig"></pie-chart>
                            <report-title :title="title2_2_3_1"></report-title>
                            <report-describe v-html="describe_8"></report-describe>
                            <report-title :title="title2_2_3_2"></report-title>
                            <report-describe v-html="describe_8_1"></report-describe>
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
            var self = this;
            return {
                cardTitle: '與情月报',
                title1_1: {
                    text: '一、與情综述',
                    levelClass: 'level-one'
                },
                title2_1_1: {
                    text: '载体分布情况',
                    levelClass: 'level-two'
                },
                describe: '<div class="describe-text">中国政府网、人民网、新华网、新浪、网易、凤凰网等高权重的主流媒体参与了话题报道，其中排名前三分别是<span class="describe-redText">网易（约占40%）</span>、<span class="describe-redText">人民网（约占30%）</span>、<span class="describe-redText">凤凰网（约占25%)</span></div>',
                title2_1_2: {
                    text: '事故相关区域分析',
                    levelClass: 'level-two'
                },
                describe_2: '<div class="describe-text">以<span class="describe-redText">辽宁</span>为中心的北部地区，以及江苏、浙江、湖南为代表的南部地区的生产安全事故发生率较高。其中<span class="describe-redText">爆炸类</span>事故最为突出，事故多由操作不当产生。具体事故中，<span class="describe-redText">浙江天台足浴店</span>火灾因死伤人数众多</div>',
                title2_1_3: {
                    text: '(一) 5月安全生产與情趋势',
                    levelClass: 'level-two'
                },
                //describe_3: '<div class="describe-text">根据最新舆情分析2月份中<span class="describe-redText" id="heat_1"></span>日热度最高，<span class="describe-redText">1</span>日最低，1月份热度<span class="describe-redText">21</span>最高，<span class="describe-redText">1</span>日最低</div>',
                title2_1_4: {
                    text: '(二) 5月安全生产新闻传播舆论热度',
                    levelClass: 'level-two'
                },
                describe_4: '<div class="describe-text">2月份安全生产相关新闻的媒体报道数量，从其具体内容方面也可以发现，国家层级的安全生产工作相较于地方安全生产话题，更受关注。主要话题集中在<span class="describe-redText">“安全生产十三五规划”</span>以及<span class="describe-redText">节后至两会期间复产复工的安全生产监管”</span>两个方面</div>',
                title2_1_5: {
                    text: '(三) 5月安全生产热点新闻解析',
                    levelClass: 'level-two'
                },
                title3_1_5_1: {
                    text: '新闻情感正负面分析',
                    levelClass: 'level-three'
                },
                describe_5_1: '<div class="describe-text">根据最新舆情分析2月份中新闻情感<span class="describe-redText">负面</span>占比最多约<span class="describe-redText">60%</span>、<span class="describe-redText">中性20%</span>、<span class="describe-redText">正面20%</span></div>',
                title3_1_5_2: {
                    text: '主流媒体报道统计',
                    levelClass: 'level-three'
                },
                describe_5_2: '<div class="describe-text">根据最新舆情分析2月份中主流媒体报道最多的是<span class="describe-redText">网易</span>、<span class="describe-redText">凤凰网</span></div>',
                title3_1_5_3: {
                    text: '热点词词云分析',
                    levelClass: 'level-three'
                },
                describe_5_3: '<div class="describe-text"> 排名前五的事故评论中，其中<span class="describe-redText">安全</span>、<span class="describe-redText">施工</span>、<span class="describe-redText">火灾</span>、<span class="describe-redText">装修</span>等与事故直接相关的关键词词频较高。此外，<span class="describe-redText">保护伞</span>、<span class="describe-redText">救护</span>、<span class="describe-redText">防护栏</span>等与事故救援相关的词汇出现频率也比较高</div>',
                title1_2: {
                    text: '二、安全生产事故聚焦',
                    levelClass: 'level-one'
                },
                title2_2_1: {
                    text: '1. 本月事故情况',
                    levelClass: 'level-two'
                },
                describe_6: '<div class="describe-text">根据最新舆情分析2月份事故舆情报道最多前三名分别是<span class="describe-redText">浙江天台足浴店火灾致18人死亡 18人受伤</span>、<span class="describe-redText">湖南涟源矿难瞒报  已确认10人遇难</span>、<span class="describe-redText">江西南昌酒店火灾事故已致10人死亡</span></div>',
                title2_2_2: {
                    text: '2. 事故分析',
                    levelClass: 'level-two'
                },
                title2_2_2_1: {
                    text: '事故类型分布图',
                    levelClass: 'level-three'
                },
                describe_7: '<div class="describe-text">2月份生产安全事故类型来看，<span class="describe-redText">爆炸类</span>事故占比高达61%，<span class="describe-redText">化工厂爆炸</span>占据整体爆炸事故的35%。其次是一些营业场所的火灾事故，比如浙江天台足浴店、江西南昌酒店等，这类事故占比约为22%，<span class="describe-redText">冒顶事故</span>和<span class="describe-redText">顶板事故</span>类，合计占比约13%，<span class="describe-redText">坠落事故</span>占比约为4%。</div>',
                title2_2_2_2: {
                    text: '事故地域分布图',
                    levelClass: 'level-three'
                },
                describe_7_1: '<div class="describe-text">2月份的事故发生地来看，<span class="describe-redText">浙江</span>、<span class="describe-redText">江苏</span>、<span class="describe-redText">安徽</span>、<span class="describe-redText">湖南</span>、<span class="describe-redText">云南</span>、<span class="describe-redText">辽宁</span>六省均发生了2起生产安全事故。其他11个省份分别发生了1起安全事故。从地图分布来看，以辽宁为中心的北部地区，以及<span class="describe-redText">江苏</span>、<span class="describe-redText">浙江</span>、<span class="describe-redText">湖南</span>为代表的南部地区的事故发生率较高</div>',
                title2_2_3: {
                    text: '3. 相关言论分析',
                    levelClass: 'level-two'
                },
                title2_2_3_1: {
                    text: '事故相关言论占比分析',
                    levelClass: 'level-three'
                },
                describe_8: '<div class="describe-text"> 2月份报道的生产安全类事故中，网民关注量排名前五的事故分别是<span class="describe-redText">浙江天台足浴店火灾、江西南昌酒店火灾事故、湖南涟源矿难瞒报事故、安徽铜陵一化工厂爆炸事故以及湖南岳阳一烟花店爆炸事故</span>，其中浙江天台足浴店火灾事故因死伤人数最多成为2月份最受网民关注的生产安全事故，网民参与话题讨论的数量占据前五位话题的<span class="describe-redText">78%</span>。其次是<span class="describe-redText">江西南昌酒店火灾事故</span>网民讨论量占比约<span class="describe-redText">15%</span>。</div>',
                title2_2_3_2: {
                    text: '事故相关言论关键词词云',
                    levelClass: 'level-three'
                },
                describe_8_1: '<div class="describe-text"> 排名前五的事故评论中，其中<span class="describe-redText">安全</span>、<span class="describe-redText">施工</span>、<span class="describe-redText">火灾</span>、<span class="describe-redText">装修</span>等与事故直接相关的关键词词频较高。此外，<span class="describe-redText">保护伞</span>、<span class="describe-redText">救护</span>、<span class="describe-redText">防护栏</span>等与事故救援相关的词汇出现频率也比较高</div>',

                articleTypePieChartConfig: {
                    chartId: 'article-type-pie-chart',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                newsEmotionPieChartConfig: {
                    chartId: 'news-emotion-pie-chart',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                commentPieChartConfig: {
                    chartId: 'comment-pie-chart',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },

                accidentAreaChartConfig: {
                    chartId: 'accident-area-chart',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                mediaBarChartConfig: {
                    chartId: 'media-bar-chart',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },

                articleTrendChartConfig: {
                    chartId: 'article-trend-chart',
                    option: {},
                    events: {
                        'click': function (param) {
                            console.log(param.name);
                        }
                    }
                },
                describe_3: {
                    Id: 'describe_3'
                },
                mapChartConfig: {
                    chartId: 'map-chart-test',
                    option: {
                        mapType: "china"
                    },
                    events: {
                        'click': clickMapChart
                    }
                },
                keywordsChartConfig: {
                    chartId: 'keywords-chart-test',
                    option: {}
                }
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
            'report-text': ReportText
        },
        mounted () {
            this.getArticleTypeChart();
            this.getAccidentAreaChart();
            this.getArticleTrendChart();
            this.getNewsEmotionPieChart();
            this.getMediaBarChart();
            this.getCommentPieChart();
        },
        methods: {
            getArticleTypeChart: function () {
                var self = this;
                service.actions.getArticleTypeChart().then(function (option) {
                    self.articleTypePieChartConfig.option = option;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
//            情感分析
            getNewsEmotionPieChart: function () {
                var self = this;
                service.actions.getNewsEmotionPieChart().then(function (option) {
                    self.newsEmotionPieChartConfig.option = option;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
//            相关评论
            getCommentPieChart: function () {
                var self = this;
                service.actions.getCommentPieChart().then(function (option) {
                    self.commentPieChartConfig.option = option;
                }, function (error) {
                    console.error('出错了', error);
                })
            },

            getAccidentAreaChart: function () {
                var self = this;
                service.actions.getAccidentAreaChart().then(function (option) {
                    self.accidentAreaChartConfig.option = option;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
//            主流媒体
            getMediaBarChart: function () {
                var self = this;
                service.actions.getMediaBarChart().then(function (option) {
                    self.mediaBarChartConfig.option = option;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getArticleTrendChart: function () {
                var self = this;
                service.actions.getArticleTrendChart().then(function (option) {
                    self.articleTrendChartConfig.option = option;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getArticleHotPointChart: function () {

            },
            getNewAnalysisChart: function () {

            },
            getArticleMediaTypeChart: function () {

            },
            getArticleHotKeyWordsChart: function () {

            }
        }
    }

    // 点击地图下钻事件
    var self = this;
    var itme = self.default.data();
    function clickMapChart(param) {
        itme.mapChartConfig.option.mapType = param.name;
//        delete itme.mapChartConfig.events;
        Chart.drawMapChart(itme.mapChartConfig.chartId, itme.mapChartConfig.option, itme.mapChartConfig.events);
    }
</script>


