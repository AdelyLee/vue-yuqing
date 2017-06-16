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
                                    <div class="title" v-if="detailData.title" >{{detailData.title}}</div>
                                    <a :href="detailData.url" class="title_a" target="_blank">原文链接：{{detailData.url}}</a>
                                    <div class="new">
                                        <el-col :span="8" class="m_t20">文章来源：<span v-if="detailData.site">{{detailData.source}}</span></el-col>
                                        <el-col :span="8" class="m_t20">发布时间：<span v-if="detailData.pubTime">{{new Date(detailData.pubTime).toLocaleString().substr(0,9)}}</span>
                                        </el-col>
                                        <el-col :span="8" class="m_t20">作者：<span v-if="detailData.author">{{detailData.author}}</span></el-col>
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
                                        <dd class="person_name_label"><b>人名</b></dd>
                                        <dd class="area_label"><b>地名</b></dd>
                                        <dd class="org_name_label"><b>机构名</b></dd>
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
                    source: "",
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
                    },
                    url:"",
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
                    debugger;
//                    data.content = data.content.replace(/&nbsp;/ig, "");
                    self.detailData = data;
//                    self.detailData.url=data.url;
                    self.mediaEmotionGauge.option = self.detailData.option;
                    self.detailData.nlp.keywords.length=10;
//                    for(var i=0;i<10;i++){
//                        self.detailData.nlp.keywords.push(data.nlp.keywords[i])
//                    }
                    self.detailData.nlp.keywords = self.detailData.nlp.keywords.join(" ").replace(/&nbsp/ig, "");
                    if (data.author == "" || data.author == undefined) {
                        self.detailData.author = "佚名";
                    }
                    if (data.source == " " || data.source == undefined || data.source == null) {
                        self.detailData.source = "未知";
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

