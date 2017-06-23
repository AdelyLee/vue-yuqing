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
    getSentimentTypeChart: function (startDate,endDate) {
        var param = {
            groupName: 'nlp.sentiment.label',
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: startDate,
            e_date: endDate,
            articleType: 'news'
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
        var s_date = '', e_date = '', dateType = '', gap = '', articleType = 'news';
                // e_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), "yyyy-MM-dd");
                // s_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), "yyyy-MM-dd");
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
                    console.log(data);
                    var dataZoomStart = s_date;
                    var xAxis = [];
                    var seriesData = [];
                    data.news.forEach(function (item) {
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
                            data: ["新闻"]
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



    //主流媒体
    getMediaBarChart: function (startDate,endDate) {
        var param = {
            groupName: 'source',
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: startDate,
            e_date: endDate,
            articleType:"news"
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupBy.json',
                data: param,
                type: 'get',
                success: function (data) {
                    debugger;
                    var seriesData = [];
                    var xAxisData = [];
                    data = data.sort(function (a, b) {
                        return b.value - a.value;
                    });
                    $.each(data, function (i, item) {
                        if(item.key==""){
                            item.key="其他";
                        }
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
                            name: '媒体类型',
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
                                name: '媒体名称',
                                type: 'bar',
                                data: seriesData,
                                barMaxwidth:"10",
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
                                name: '媒体名称',
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
    getArticleTabList: function (startDate,endDate,type,orders) {
        // var date = new Date();
        var self = this;
        // var e_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), "yyyy-MM-dd");
        // var s_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), "yyyy-MM-dd");
        var param = {
          "date":{
              "startDate":startDate,
              "endDate":endDate
          },
            "keyword": {
                "mustWord": this.config.mustWord,
                "shouldWord": this.config.shouldWord,
                "mustNotWord": this.config.mustNotWord,
            },
            "page":orders,
            //"page": {
            //    "limit": 10,
            //    "page": 1,
            //    "orders": [{
            //        "direction": "DESC",
            //        "orderBy": "pubTime"
            //    }],
            //},
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
    getCommentHotKeywordsChart: function (startDate,endDate) {

        // var mySearch = searchData.searchParam();
        var param = {
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: startDate,
            e_date: endDate,
            limit:30
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl +'/news/hotWords.json',
                data: param,
                type: 'get',
                success: function (data) {
                    debugger;
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
    //保存收藏
    saveCollect: function (collect) {
        return new Promise(function (resolve) {
            var paramTrue = {
                oId: collect[0].key
            }
            debugger;
            $.ajax({
                url: common.url.webserviceUrl + '/collect/saveCollect2ES.json',
                data: paramTrue,
                type: 'get',
                success: function () {
                    resolve()
                    console.log('收藏成功')
                },
                error: function () {
                    console.log('收藏失败')
                }
            })
        })
    },
    //删除收藏
    deleteCollect: function (collect) {
        return new Promise(function (resolve) {
            var paramFalse = {
                oIds: collect[0].key
            }
            debugger;
            $.ajax({
                url: common.url.webserviceUrl + '/collect/deleteCollectedInOid',
                data: paramFalse,
                type: 'get',
                success: function () {
                    resolve()
                    console.log('删除成功')
                },
                error: function () {
                    console.log('删除失败')
                }
            })
        })
    },
    //获取是否收藏id
    getCollectOrID: function (collectID) {
        return new Promise(function (resolve) {
            var collectArray = []
            $.ajax({
                url: common.url.webserviceUrl + '/collect/hasCollected.json?oIds=' + collectID.join(','),
                type: 'get',
                success: function (data) {
                    collectArray = data
                    console.log('拿到了是否收藏的十个id')
                    resolve(collectArray)
                },
                error: function (error) {
                    console.log('没有拿到了是否收藏的十个id')
                }
            })
        })
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
                        item.collect = false;
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
