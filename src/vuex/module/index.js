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

    //近30天舆情
    getSentimentTypeChart: function () {
        var data = new Date();
        var endDate = data.getTime();
        var startDate = data.setMonth(data.getMonth() - 1);
        var param = {
            groupName: 'nlp.sentiment.label',
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: startDate,
            e_date: endDate,
            articleType: ''
        };
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupBy.json',
                data: param,
                type: 'get',
                success: function (data) {
                    // 拼装 chart option
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
                        color: [
                            '#d2b356', '#db726c', '#56b6ff', '#E87C25', '#27727B',
                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ],
                        calculable: true,
                        series: [{
                            name: '情感类型',
                            type: 'pie',
                            radius: [30, 110],
                            center: ['50%', '50%'],
                            roseType: 'area',
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        fontSize: 20
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            data: seriesData
                        }]
                    };

                    resolve(option);
                }
            });
        });
    },

    // 载体趋势图
    getCarrierAnalysisChart: function (timesType) {
        var date = new Date();
        var s_date = '', e_date = '', dateType = '', gap = '', articleType = 'news@weibo@bbs@bar';
        switch (timesType) {
            case "day":
                e_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), "yyyy-MM-dd");
                s_date = dateUtil.dateUtil.formatDate(date, "yyyy-MM-dd");
                dateType = 'hour';
                gap = 5;
                break;
            case 'yesterday':
                e_date = dateUtil.dateUtil.formatDate(date, "yyyy-MM-dd");
                s_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', -1), "yyyy-MM-dd");
                dateType = 'hour';
                gap = 5;
                break;
            case 'nearlydays':
                e_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), "yyyy-MM-dd");
                s_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', -7), "yyyy-MM-dd");
                dateType = 'day';
                gap = '1';
                break;
            case 'month':
                e_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), "yyyy-MM-dd");
                s_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), "yyyy-MM-dd");
                dateType = 'day';
                gap = '1';
                break;
            default:
                break;
        }
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
                                    fontSize: 16
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
                                    fontSize: 16
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
                                    color: '#fc7f7d'
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
                                    color: '#efee55'
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
                                    color: '#4fa8e4'
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
                                    color: '#e679cc'
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

    getCarrierAnalysisBarChart: function (timesType) {
        var date = new Date();
        var s_date = '', e_date = '', articleType = 'news@weibo@bbs@bar';
        switch (timesType) {
            case "day":
                e_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), "yyyy-MM-dd");
                s_date = dateUtil.dateUtil.formatDate(date, "yyyy-MM-dd");
                break;
            case 'yesterday':
                e_date = dateUtil.dateUtil.formatDate(date, "yyyy-MM-dd");
                s_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', -1), "yyyy-MM-dd");
                break;
            case 'nearlydays':
                e_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), "yyyy-MM-dd");
                s_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', -7), "yyyy-MM-dd");
                break;
            case 'month':
                e_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'd', 1), "yyyy-MM-dd");
                s_date = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', -1), "yyyy-MM-dd");
                break;
            default:
                break;
        }
        var param = {
            groupName: 'type',
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: s_date,
            e_date: e_date,
            articleType: articleType
        };
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupBy.json',
                data: param,
                type: 'get',
                success: function (data) {
                    var yAxisData = [], seriesData = [];
                    if (data.length > 0) {
                        data.reverse();
                        data.forEach(function (item) {
                            yAxisData.push(typeUtil.typeUtil.articleType(item.key));
                            seriesData.push(item.value);
                        });
                    }
                    var myOption = {
                        yAxis: {
                            data: yAxisData,
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 600,
                                    fontSize: 16
                                }
                            }
                        },
                        xAxis: {
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 600,
                                    fontSize: 16
                                }
                            }
                        },
                        series: [{
                            name: '文章数目',
                            type: 'bar',
                            data: seriesData,
                            barMaxWidth: 45,
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        var colorList = ['#fc7f7d', '#efee55', '#4fa8e4', '#e679cc'];
                                        return colorList[params.dataIndex % 4]
                                    }
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
    getMediaBarChart: function () {
        var param = {
            groupName: 'source',
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: "",
            e_date: ""
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/news/filterAndGroupBy.json',
                data: param,
                type: 'get',
                success: function (data) {
                    var renderData = {};
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
                            name: '媒体类型',
                            axisLine: {
                                lineStyle: {
                                    color: '#4d94e2'
                                }
                            },
                            axisLabel: {
                                interval: 0,
                                rotate: 30,
                                textStyle: {
                                    fontWeight: 600,
                                    fontSize: 14
                                }
                            },
                        },
                        yAxis: [{
                            name: '数量',
                            axisLine: {
                                lineStyle: {
                                    color: '#4d94e2'
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
                                itemStyle: {
                                    normal: {
                                        color: function (params) {
                                            // build a color map as your need.
                                            var colorList = [
                                                '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
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
                    }
                    resolve(option);

                }
            });
        });

    },

    //新闻列表
    getArticleTabList: function (type) {
            var param = {
                type: "source",
                page: 1,
                size: 5,
                sortBy: "pubTime",
                s_date: '',
                e_date: ''
            };
            return new Promise(function (resolve) {
                $.ajax({
                    url: common.url.webserviceUrl + "/" + type + '/findPageByMustShouldDateInType.json',
                    data: param,
                    type: 'get',
                    success: function (data) {
                        data.content.forEach(function (item) {
                            if (type == 'news') {
                                if (item.title.length > 17) {
                                    item.title = item.title.substring(0, 17) + "...";
                                }
                            }
                            item.type = item.type.toLowerCase();
                            item.pubTime = dateUtil.dateUtil.formatDate(new Date(item.pubTime), 'yyyy/MM/dd');
                        });
                        resolve(data);
                    }
                });
            });
    },
    //论坛列表
    getArticlebbsTabList: function (type) {
        var self = this;
        var param = {
            page: 1,
            size: 5,
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            sortBy: "pubTime"
        };
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + "/" + type + '/findPageByMustShouldDateInType.json',
                data: param,
                type: 'get',
                success: function (data) {
                    console.log(data);
                    data.content.forEach(function (item) {
                        if (type == 'bbs') {
                            if (item.title.length > 17) {
                                item.title = item.title.substring(0, 17) + "...";
                            }
                        }
                        item.type = item.type.toLowerCase();
                        item.pubTime = dateUtil.dateUtil.formatDate(new Date(item.pubTime), 'yyyy/MM/dd');
                        item.title = utils.utils.heightLightKeywords(item.title, 50, '...', self.heightLightWords);
                        item.content = utils.utils.heightLightKeywords(item.content, 200, '...', self.heightLightWords);
                    });
                    resolve(data);
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
            "keyword": {
                "mustNotWord": this.config.mustWord,
                "mustWord": this.config.shouldWord,
                "shouldWord": this.config.mustNotWord,
            },
            "page": {
                "limit": pageSize,
                "page": currentPage,
                "orders": [{
                    "direction": "DESC",
                    "orderBy": "dateCreated"
                }],
                "searchKv": ''
            },
            "type": [condition.type]
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
