<template>
    <div id="detail">
        <common-header></common-header>
        <el-row :gutter="5" class="list">
            <el-col :span="3">
                <common-menu></common-menu>
            </el-col>
            <el-col :span="21">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <!--<div slot="header" class="panel-height">-->
                        <!--<span style="line-height: 40px;"><i class="el-icon-document"></i> 文章详情</span>-->
                    <!--</div>-->
                    <div class="card-body" id="content">
                    <el-row :gutter="5" class="list">
                        <el-col :span="20" class="m_l10">
                            <!--标题-->
                            <el-row :gutter="1" class="list border_1">
                                <el-col :span="22" class="font_style">
                                    <div class="title" v-if="detailData.title">{{detailData.title}}</div>
                                    <div class="new">
                                        <el-col :span="8" class="m_t20"><span v-if="detailData.site">文章来源：{{detailData.site}}</span></el-col>
                                        <el-col :span="8" class="m_t20"><span v-if="detailData.pubTime">发布时间：{{new Date(detailData.pubTime).toLocaleString().substr(0,9)}}</span>
                                        </el-col>
                                        <el-col :span="8" class="m_t20"><span v-if="detailData.author">作者：{{detailData.author}}</span></el-col>
                                    </div>
                                </el-col>
                            </el-row>
                            <!--内容-->
                            <el-row :gutter="2" class="list border_1">
                                <el-col :span="22" class="main">
                                    <div class="key"><span
                                        class="field">关键字</span>：<span class="keySpan" v-if="detailData.nlp.keywords">{{detailData.nlp.keywords}}</span></div>
                                    <div class="content">
                                        <span v-if="detailData.content" v-html="detailData.content"></span>
                                    </div>
                                    <div class="panel-footer text-left entity fiex_entity ">
                                        <dt class="dt_entity"> 实体类别图示</dt>
                                        <dd class="person_name"><b>人名</b></dd>
                                        <dd class="area"><b>地名</b></dd>
                                        <dd class="org_name"><b>机构名</b></dd>
                                    </div>
                                </el-col>
                            </el-row>
                            <!--情感-->
                            <el-row :gutter="2" class="list border_1">
                                <el-col :span="12">
                                    <el-col :span="1">
                                        <img :src="emotionSrc" class="imgStyle">
                                    </el-col>
                                    <div class="emotionTitle">情感分析</div>
                                    <gauge-chart :chartConfig="mediaEmotionGauge" class="p_t"></gauge-chart>
                                </el-col>
                                <el-col :span="12">
                                    <el-col :span="1">
                                        <img :src="hotSrc" class="imgStyle">
                                    </el-col>
                                    <div class="emotionTitle">热点词云</div>
                                        <keywords-chart v-if="hotList" :hotList="hotList" :chartConfig="hotLists"></keywords-chart>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>
<script>
    import Gauge from '@/components/commons/charts/gauge';
    import Header from '@/components/commons/header';
    import CommonMenu from '@/components/commons/menu';
    import KeywordsChart from '@/components/commons/charts/keywords-cloud';
//    import $ from 'jquery'
    import service from '../../vuex/module/detail.js'
    import queryParam from '../../vuex/utils.js';

    export default {
        name: 'detail',
        data () {
            return {
                id: queryParam.utils.getQueryVariable("id"),
                mediaEmotionGauge: {
                    chartId: 'emotion-gauge',
                    option: {},
                    events: {
                        'click': function (param) {
                        }
                    }
                },
                hotLists: {
                    chartId: 'hotLists',
                    option: {},
                    events: {
                        'click': function (param) {
                        }
                    }
                },
                hotList: [],
                detailData: {
                    author: "",
                    nameEntitys: [],
                    title: "",
                    site: "",
                    pubTime: "",
                    nlp: {
                        keywords: [],
                        nameEntity: {
                            org: [],
                            people: [],
                            place: [],
                        },
                        sentiment: {
                            lable: "",
                            value: 0,
                        },
                    }
                },
                emotionSrc: '../../static/img/xinxin.png',
                hotSrc:'../../static/img/huohuo.png',
           }
        },
        components: {
            'common-header': Header,
            'common-menu': CommonMenu,
            'gauge-chart': Gauge,
            'keywords-chart': KeywordsChart
        },
        mounted () {
            this.getNewsCurrentList();
            this.getCommentHotKeywordsChart();
        },
        methods: {
            getNewsCurrentList: function () {
                var self = this;
                service.actions.getNewsCurrentList(self.id).then(function (data) {
//                    data.content = data.content.replace(/&nbsp;/ig, "");
                    self.detailData = data;
                    self.mediaEmotionGauge.option = data.option;
                    self.detailData.nlp.keywords = data.nlp.keywords.join(" ").replace(/&nbsp/ig, "");
                    if (data.author == "" || data.author == undefined) {
                        self.detailData.author = "佚名";
                    }

                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getCommentHotKeywordsChart: function () {
                var self = this;
                service.actions.getCommentHotKeywordsChart(self.id).then(function (renderData) {
                    self.hotLists.option = renderData.option;
                    self.hotList = renderData;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            change: function (id) {
                window.open('https://www.baidu.com#id=' + id)
            },
        },
        watch: {
            id: function (val, oldVal) {
//                console.log(this.checkedItems)
                console.log('new: %s, old: %s', val, oldVal)
            },
            News: function (val, oldVal) {
//                console.log(this.checkedItems)
                console.log('new: %s, old: %s', val, oldVal)
            },
        },
    }

</script>

