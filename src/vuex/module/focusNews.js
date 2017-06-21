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
    config: utils.utils.getfocusKeyword(),

    // 获取高亮的词
    heightLightWords: utils.utils.getFocusHeightLightKeywords(),
    //getTimes: function (){
    //    return new Promise(function (resolve) {
    //        var setTimesData = [];
    //        var timesData={};
    //        var date = new Date();
    //        timesData.startDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), 'yyyy-MM-dd');
    //        timesData.endDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 0), 'yyyy-MM-dd');
    //        setTimesData.push(timesData);
    //        resolve(setTimesData);
    //    });
    //},
    //焦点报道
    getArticleTabList: function (startDate,endDate) {
        var self = this;
        var param = {
            "date": {
                "startDate":startDate,
                "endDate": endDate,
            },
            "keyword": {
                "mustWord": this.config.mustWord,
                "shouldWord": this.config.shouldWord,
                "mustNotWord": this.config.mustNotWord,
            },
            "filed": "title.cn",
            "page": {
                "limit": 10,
                "page": 1,
                "orders": [{
                    "direction": "DESC",
                    "orderBy": "pubTime"
                }],
            },
            "type": ["article"]
        };
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/findPageByMustShouldDateInType',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                   data.content.sort(function (a,b) {return b.pubTime - a.pubTime});
                    data.content.forEach(function (item) {
                        item.type = item.type.toLowerCase();
                        if (item.type == 'weibo') {
                            item.title = item.content;
                        }
                        if (item.type == 'bbs') {
                            item.source = item.author;
                        }
                        if(item.title === ""){
                            item.title = utils.utils.heightLightKeywords(item.content, 45, '...', self.heightLightWords).replace(/(^\s*)|(\s*$)/g, "");
                        }else{
                            item.title = utils.utils.heightLightKeywords(item.title, 45, '...', self.heightLightWords).replace(/(^\s*)|(\s*$)/g, "");
                        }

                        item.pubTime = dateUtil.dateUtil.formatDate(new Date(item.pubTime), 'yyyy/MM/dd');

                    });
                    resolve(data);
                }
            });
        });
    },
    //近30天舆情
    getSentimentTypeChart: function (startDate,endDate) {
        //var date = new Date();
        //var startDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), 'yyyy-MM-dd');
        //var endDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), 'yyyy-MM-dd');
        var param = {
            groupName: 'nlp.sentiment.label',
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: startDate,
            e_date: endDate,
            // articleType: ''
        };
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupBy.json',
                data: param,
                type: 'get',
                success: function (data) {
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
    getCarrierAnalysisChart: function (startDate,endDate) {
        var date = new Date();
        var s_date = '', e_date = '', dateType = '', gap = '', articleType = 'news@weibo@bbs@bar';
            //e_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), "yyyy-MM-dd");
            //s_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), "yyyy-MM-dd");
            dateType = 'day';
            gap = '1';

        var param = {
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: startDate,
            e_date: endDate,
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
                    var dataZoomStart = s_date;
                    var xAxis = [];
                    var seriesData = {news: [], weibo: [], bbs: [], bar: []};
                    var articleTypeArray = articleType.split("@");
                    articleTypeArray.forEach(function (type) {
                        data[type].forEach(function (item) {
                            if (type == 'news') {
                                xAxis.push(item.key);
                            }
                            seriesData[type].push(item.value);
                        });
                    });
                    var myOption = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ["新闻", "微博", "论坛", "贴吧"]
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
                            name: '新闻',
                            type: 'line',
                            smooth: true,
                            show: true,
                            data: seriesData.news,
                            itemStyle: {
                                normal: {
                                    color: '#21b6b9'
                                }
                            },
                            lineStyle: {
                                normal: {
                                    width: 3
                                }
                            }
                        }, {
                            name: '微博',
                            type: 'line',
                            smooth: true,
                            symbolSize: 6,
                            data: seriesData.weibo,
                            itemStyle: {
                                normal: {
                                    color: '#eba954'
                                }
                            },
                            lineStyle: {
                                normal: {
                                    width: 3
                                }
                            }
                        }, {
                            name: '论坛',
                            type: 'line',
                            smooth: true,
                            symbolSize: 6,
                            data: seriesData.bbs,
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
                        }, {
                            name: '贴吧',
                            type: 'line',
                            smooth: true,
                            symbolSize: 6,
                            data: seriesData.bar,
                            itemStyle: {
                                normal: {
                                    color: '#d74e67'
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
    ////关键词云
    getHotWordCloudChart: function (startDate,endDate) {
        //var date = new Date();
        //var s_date = '', e_date = '';
        //    e_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), "yyyy-MM-dd");
        //    s_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), "yyyy-MM-dd");
        var param = {
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: startDate,
            e_date: endDate,
            limit: 50
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/hotWords.json',
                data: param,
                type: 'get',
                success: function (data) {
                    data.sort(function (a, b) {
                        return b.value - a.value
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
                }
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
                    "orderBy": "pubTime"
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
