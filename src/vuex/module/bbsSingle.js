/**
 * Created by Administrator on 2017/6/19.
 */
import jquery from '../api';
const $ = jquery.jQuery;
import common from '../common'
import dateUtil from '../dateUtil'
import typeUtil from '../typeUtil'
import utils from '../utils'

const actions = {
    // 获取关键词
    config: utils.utils.getUserBaseKeyword(),

    // 获取高亮的词
    heightLightWords: utils.utils.getBaseHeightLightKeywords(),

    //正负面舆情
    getSentimentTypeChart: function () {
        var date = new Date();
        var startDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), 'yyyy-MM-dd');
        var endDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), 'yyyy-MM-dd');

        var param = {
            groupName: 'nlp.sentiment.label',
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: startDate,
            e_date: endDate,
            articleType: 'bbs'
        };
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupBy.json',
                data: param,
                type: 'get',
                success: function (data) {
                    debugger;
                    var seriesData = [], legend = [];
                    data.forEach(function (item) {
                        var node = {};
                        node.name = typeUtil.typeUtil.sentimentType(item.key);
                        node.value = item.value;
                        seriesData.push(node);
                        legend.push(node.name)
                    });
                    var option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            x: 'center',
                            y: 'top',
                            data: legend
                        },
                        calculable: true,
                        series: [
                            {
                                name: '情感类型',
                                type: 'pie',
                                radius: ['40%', '55%'],
                                avoidLabelOverlap: false,
                                itemStyle: {
                                    normal: {
                                        color: function (params) {
                                            if (params.name == '正面') {
                                                var color = ['#0092ff'];
                                                return color

                                            } else if (params.name == '中性') {
                                                var color = ['#eba954'];
                                                return color
                                            } else if (params.name == '负面') {
                                                var color = ['#d74e67'];
                                                return color

                                            }
                                        }
                                    }
                                },
                                data: seriesData
                            }
                        ]

                    };
                    resolve(option);
                }
            });
        });
    },

    // 载体趋势图
    getCarrierAnalysisChart: function () {
        var date = new Date();
        var s_date = '', e_date = '', dateType = '', gap = '', articleType = 'bbs';
        e_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), "yyyy-MM-dd");
        s_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), "yyyy-MM-dd");
        dateType = 'day';
        gap = '1';
        var param = {
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: s_date,
            e_date: e_date,
            dateType: dateType,
            gap: gap,
            articleType: articleType
        };

        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupByTime.json',
                data: param,
                type: 'get',
                success: function (data) {
                    console.log(data);
                    var dataZoomStart = s_date;
                    var xAxis = [];
                    var seriesData = [];
                    data.bbs.forEach(function (item) {
                        var node = {};
                        node.name = item.key;
                        node.value = item.value;
                        seriesData.push(node);
                        xAxis.push(item.key);
                    });
                    console.log(seriesData);
                    // var articleTypeArray = articleType.split("@");
                    var myOption = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ["论坛"]
                        },
                        dataZoom: [{
                            startValue: dataZoomStart
                        }, {
                            type: 'inside'
                        }],
                        xAxis: {
                            type: 'category',
                            name: '时间',
                            data: xAxis,
                            boundaryGap: false,
                            splitLine: {
                                show: true,
                                interval: 'auto',
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                margin: 10,
                                textStyle: {
                                    fontSize: 14
                                }
                            }
                        },
                        yAxis: {
                            type: 'value',
                            name: '数量',
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                margin: 10,
                                textStyle: {
                                    fontSize: 14
                                }
                            }
                        },
                        series: [{
                            name: '论坛',
                            type: 'line',
                            smooth: true,
                            show: true,
                            data: seriesData,
                            itemStyle: {
                                normal: {
                                    color: '#0092ff'
                                }
                            },
                            lineStyle: {
                                normal: {
                                    width: 3
                                }
                            }
                        }]
                    };
                    resolve(myOption);
                }
            });
        });
    },


    //网民观点
    getMediaBarChart: function () {
        var date = new Date();
        var startDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), 'yyyy-MM-dd');
        var endDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), 'yyyy-MM-dd');
        var param = {
            groupName: 'author',
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: startDate,
            e_date: endDate,
            articleType:"bbs"

        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupBy.json',
                data: param,
                type: 'get',
                success: function (data) {
                    var seriesData = [];
                    var xAxisData = [];
                    data = data.sort(function (a, b) {
                        return b.value - a.value;
                    });
                    $.each(data, function (i, item) {
                        seriesData.push(item.value);
                        xAxisData.push(item.key.slice(0, 10));
                    });
                    var option = {
                        legend: {},
                        grid: {
                            bottom: 100,
                            left: 120
                        },
                        xAxis: {
                            data: xAxisData,
                            name: '网民名称',
                            axisLine: {
                                lineStyle: {
                                    color: '#000000'
                                }
                            },
                            axisLabel: {
                                interval: 0,
                                rotate: 30,
                                textStyle: {
                                    fontSize: 14
                                }
                            },
                        },
                        yAxis: [{
                            name: '数量',
                            axisLine: {
                                lineStyle: {
                                    color: '#000000'
                                }
                            },
                            axisLabel: {
                                interval: 0,
                                textStyle: {
                                    fontSize: 14
                                }
                            }
                        }],
                        series: [
                            {
                                name: '网民名称',
                                type: 'bar',
                                data: seriesData,
                                itemStyle: {
                                    normal: {
                                        color: function (params) {
                                            // build a color map as your need.
                                            var colorList = [
                                                '#21b6b9', '#eba954', '#0092ff', '#d74e67', '#27727B',
                                                '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                                            ];
                                            return colorList[params.dataIndex % 15]
                                        }
                                    }
                                }
                            }, {
                                name: '网民名称',
                                type: 'line',
                                data: seriesData,
                                itemStyle: {
                                    normal: {
                                        color: '#C1232B'
                                    }
                                },
                                lineStyle: {
                                    normal: {
                                        color: '#C1232B'
                                    }
                                }
                            }
                        ]
                    };
                    resolve(option);

                }
            });
        });
    },

    //新闻列表
    getArticleTabList: function (type) {
        var self = this;
        var param = {
            "keyword": {
                "mustWord": this.config.mustWord,
                "shouldWord": this.config.shouldWord,
                "mustNotWord": this.config.mustNotWord,
            },
            "page": {
                "limit":10,
                "page": 1,
                "orders": [{
                    "direction": "DESC",
                    "orderBy": "dateCreated"
                }],
            },
            "type": [type]
        };
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/findPageByMustShouldDateInType',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    data.content.forEach(function (item) {
                        item.type = item.type.toLowerCase();
                        if (item.type == 'weibo') {
                            item.title = item.content;
                        }
                        if (item.type == 'bbs') {
                            item.source = item.author;
                            item.title = item.content.slice(6,item.content.length);
                        }
                        item.pubTime = dateUtil.dateUtil.formatDate(new Date(item.pubTime), 'yyyy/MM/dd');
                        item.title = utils.utils.heightLightKeywords(item.title, 20, '...', self.heightLightWords);
                    });
                    resolve(data);
                }
            });
        });
    },
    //热点词云
    getCommentHotKeywordsChart: function () {

        // var mySearch = searchData.searchParam();
        var param = {
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            limit:50
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl +'/bbs/hotWords.json',
                data: param,
                type: 'get',
                success: function (data) {
                    data.sort(function (a, b) {
                        return b.score - a.score
                    });
                    var renderData = {};
                    var seriesData = [];
                    $.each(data, function (i, item) {
                        var node = {};
                        node.keyword = item.key;
                        node.score = item.value;
                        seriesData.push(node);
                    });
                    renderData.option = {"data": seriesData};
                    resolve(renderData);
                },
            });
        });
    },

    // 点击显示article列表
    getArticleListByCondition: function (pageSize, currentPage, condition) {
        var self = this;
        pageSize = pageSize == undefined ? 10 : pageSize;
        currentPage = currentPage == undefined ? 1 : currentPage;
        var param = {
            "date": {
                "startDate": condition.startDate,
                "endDate": condition.endDate,
            },
            "keyword": {
                "mustWord": this.config.mustWord,
                "shouldWord": this.config.shouldWord,
                "mustNotWord": this.config.mustNotWord,
            },
            "page": {
                "limit": pageSize,
                "page": currentPage,
                "orders": [{
                    "direction": "DESC",
                    "orderBy": "dateCreated"
                }],
            },
            "searchKv": condition.searchKv,
            "type": condition.type
        };
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/findPageByMustShouldDateInType',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    data.content.forEach(function (item) {
                        item.type = item.type.toLowerCase();
                        if (item.type == 'weibo') {
                            item.title = item.content;
                        }
                        item.nlp.sentiment.label = typeUtil.typeUtil.sentimentType(item.nlp.sentiment.label);
                        item.pubTime = dateUtil.dateUtil.formatDate(new Date(item.pubTime), 'yyyy/MM/dd');
                        item.title = utils.utils.heightLightKeywords(item.title, 50, '...', self.heightLightWords);
                        item.content = utils.utils.heightLightKeywords(item.content, 200, '...', self.heightLightWords);
                    });
                    resolve(data);
                }
            });
        });
    },
};
export default {
    actions
}
