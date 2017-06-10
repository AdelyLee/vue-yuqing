<template>
    <div id="detail">
        <common-header></common-header>
        <el-row :gutter="5" class="list">
            <el-col :span="24">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <div slot="header" class="panel-height">
                        <span style="line-height: 40px;"><i class="el-icon-document"></i> 文章详情</span>
                    </div>
                    <el-row :gutter="5" class="list">
                        <el-col :span="20" class="m_l10">
                            <!--标题-->
                            <el-row :gutter="1" class="list border_1">
                                <el-col :span="22" class="font_style">
                                    <div class="title">{{detailData.title}}</div>
                                    <div class="new">
                                        <el-col :span="8" class="m_t20"><span>文章来源：{{detailData.site}}</span></el-col>
                                        <el-col :span="8" class="m_t20"><span>发布时间：{{new Date(detailData.pubTime).toLocaleString().substr(0,9)}}</span>
                                        </el-col>
                                        <el-col :span="8" class="m_t20"><span>作者：{{detailData.author}}</span></el-col>
                                    </div>
                                </el-col>
                            </el-row>
                            <!--内容-->
                            <el-row :gutter="2" class="list border_1">
                                <el-col :span="22" class="main">
                                    <div class="key"><span
                                        class="field">关键字</span>：<span class="keySpan">{{detailData.nlp.keywords}}</span></div>
                                    <div class="content">
                                        <span v-html="detailData.content"></span>
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
                                    <gauge-chart :chartConfig="mediaEmotionGauge"></gauge-chart>

                                </el-col>
                                <el-col :span="12">
                                    <el-col :span="1">
                                        <img :src="hotSrc" class="imgStyle">
                                    </el-col>
                                    <div class="emotionTitle">热点词云</div>
                                    <keywords-chart :hotList="hotList" :chartConfig="hotLists"></keywords-chart>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>
<script>
    import Header from '@/components/commons/header';
    import service from '../../vuex/module/detail.js'
    import queryParam from '../../vuex/utils.js';
    import GaugeChart from '@/components/commons/charts/gauge';
    import KeywordsChart from '@/components/commons/charts/keywords-cloud';
    import $ from 'jquery'
    export default {
        name: 'detail',
        data () {
            return {
                id: queryParam.utils.getQueryVariable("id"),
                mediaEmotionGauge: {
                    chartId: 'emotion-guage',
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
                hotSrc:'../../static/img/huohuo.png'
            }
        },
        components: {
            'common-header': Header,
            'gauge-chart': GaugeChart,
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
                    data.content = data.content.replace(/&nbsp;/ig, "");
                    self.detailData = data;
                    self.mediaEmotionGauge.option = data.option;
                    self.detailData.nlp.keywords = data.nlp.keywords.join(" ").replace(/&nbsp/ig, "");
                    if (data.author == "" || data.author == undefined) {
                        self.detailData.author = "佚名";
                    }
                    self.detailData.nlp.nameEntity.org.forEach(function (item) {
                        var newStr = "";
                        var nextStr = "";
                        var temp = "";
                        var middle = "";
                        var next = "";
                        if (self.detailData.content.indexOf(item) > 0) {
                            newStr = "<span class='org_name'>";
                            nextStr = "</span>";
                            temp = self.detailData.content.substr(0, self.detailData.content.indexOf(item));
                            middle = self.detailData.content.substring(self.detailData.content.indexOf(item), self.detailData.content.indexOf(item) + item.length);
                            next = self.detailData.content.substr(self.detailData.content.indexOf(item) + item.length, self.detailData.content.length + 1);

//
                        }
                        self.detailData.content = temp + newStr + middle + nextStr + next;
                    });
                    self.detailData.nlp.nameEntity.place.length = data.nlp.nameEntity.place.length - 2;
                    self.detailData.nlp.nameEntity.place.forEach(function (node) {
                        var newStr = "";
                        var nextStr = "";
                        var temp = "";
                        var middle = "";
                        var next = "";
                        if (self.detailData.content.indexOf(node) > 0) {
                            debugger;
                            newStr = "<span class='area'>";
                            nextStr = "</span>";
                            temp = self.detailData.content.substr(0, self.detailData.content.indexOf(node));
                            middle = self.detailData.content.substring(self.detailData.content.indexOf(node), self.detailData.content.indexOf(node) + node.length);
                            next = self.detailData.content.substr(self.detailData.content.indexOf(node) + node.length, self.detailData.content.length + 1);
                        }
                        self.detailData.content = temp + newStr + middle + nextStr + next;
                    })
                    self.detailData.nlp.nameEntity.people.forEach(function (item) {
                        var newStr = "";
                        var nextStr = "";
                        var temp = "";
                        var middle = "";
                        var next = "";
                        if (self.detailData.content.indexOf(item) > 0) {
                            newStr = "<span class='person_name'>";
                            nextStr = "</span>";
                            temp = self.detailData.content.substr(0, self.detailData.content.indexOf(item));
                            middle = self.detailData.content.substring(self.detailData.content.indexOf(item), self.detailData.content.indexOf(item) + item.length);
                            next = self.detailData.content.substr(self.detailData.content.indexOf(item) + item.length, self.detailData.content.length);

//
                        }

                        self.detailData.content = temp + newStr + middle + nextStr + next;
                    });
                }, function (error) {
                    console.error('出错了', error);
                })

            },
            getCommentHotKeywordsChart: function () {
                var self = this;
                service.actions.getCommentHotKeywordsChart().then(function (renderData) {
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

