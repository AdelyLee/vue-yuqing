/**
 * Created by topcom on 2017/5/27.
 */
/**
 * Created by topcom on 2017/5/24.
 */
import jquery from '../api';
const $ = jquery.jQuery;
import common from '../common'
import dateUtil from '../dateUtil'
import queryParam from '../utils'
import typeParam from '../typeUtil'
import utils from '../utils'
const searchData = {
    searchParam: function () {
        var searchId = queryParam.utils.getQueryVariable('id');
        var search = {};
        $.ajax({
            url: common.url.webserviceUrl + '/customSubject/' + searchId,
            type: 'get',
            async: false,
            success: function (data) {
                data.startDate = dateUtil.dateUtil.formatDate(new Date(data.startDate), "yyyy-MM-dd");
                data.endDate = dateUtil.dateUtil.formatDate(new Date(data.endDate), "yyyy-MM-dd");
                search = data;
            }
        })
        return search;
    }
}
const actions = {
    // 获取关键词
    config: utils.utils.getUserBaseKeyword(),

    // 获取高亮的词
    heightLightWords: utils.utils.getCustomSubjectHeightLightKeywords(),
    //新闻列表
    getNewsCurrentList: function () {
        var mySearch = {};
        mySearch = searchData.searchParam();
        var param = {
            type: "title",
            sortBy: "pubTime",
            s_date: mySearch.startDate,
            e_date: mySearch.endDate
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/news/findPageByMustShouldDateInType.json',
                data: param,
                type: 'get',
                success: function (data) {
                    resolve(data);
                }
            });
        });
    },
    //新闻情感类型分析饼图
    getNewsEmotionPieChart: function () {
        var mySearch = {};
        mySearch = searchData.searchParam();
        var param = {
            groupName: 'nlp.sentiment.label',
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: mySearch.startDate,
            e_date: mySearch.endDate,
            articleType:'news@weibo@bar@bbs'
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupBy.json',
                data: param,
                type: 'get',
                success: function (data) {
                    // 拼装 chart option
                    var seriesData = [];
                    var lengeds = [];
                    $.each(data, function (i, item) {
                        var node = {};
                        node.name = typeParam.typeUtil.sentimentType(item.key);
                        node.value = item.value;
                        seriesData.push(node);
                        lengeds.push(node.name)
                    })
                    var option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'right',
                            data: lengeds
                        },
                        color: [
                            '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ],
                        series: [
                            {
                                name: '情感类型',
                                type: 'pie',
                                radius: ['30%', '55%'],
                                label: {
                                    normal: {
                                        show: true,
                                        // position: 'center',
                                        textStyle: {
                                            fontSize: 20
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: true
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
    //current里面新闻载体分析
    getArticleTypeChart: function () {
        var mySearch = {};
        mySearch = searchData.searchParam();
        var param = {
            groupName: 'type',
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: mySearch.startDate,
            e_date: mySearch.endDate
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupBy.json',
                data: param,
                type: 'get',
                success: function (data) {
                    // 拼装 chart option
                    var seriesData = [];
                    var legendData = [];
                    $.each(data, function (i, item) {
                        var node = {};
                        node.name = typeParam.typeUtil.articleType(item.key);
                        node.value = item.value;
                        seriesData.push(node);
                        legendData.push(node.name);
                    });
                    var option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'right',
                            data:legendData
                        },
                        color: [
                            '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ],
                        series: [
                            {
                                name: '媒体类型',
                                type: 'pie',
                                radius: [0,'55%'],
                                // roseType: 'area',
                                label: {
                                    normal: {
                                        show: true,
                                        textStyle: {
                                            fontSize: 20
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
    //current主流媒体
    getMediaBarChart: function () {
        var mySearch = {};
        mySearch = searchData.searchParam();
        var param = {
            groupName: 'source',
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: mySearch.startDate,
            e_date: mySearch.endDate
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
                            top: 20,
                            bottom: 100,
                            left: 100
                        },
                        yAxis: {
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 600,
                                    fontSize: 14
                                }
                            }

                        },
                        barMaxWidth:30,
                        xAxis: {
                            data: xAxisData,
                            axisLabel: {
                                interval: 0,
                                rotate: 30,
                                textStyle: {
                                    fontWeight: 600,
                                    fontSize: 14
                                }
                            }
                        },
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
    //趋势图
    getMediaReportTrendBar: function () {
        var mySearch = {};
        mySearch = searchData.searchParam();
        var articleType = 'news@weibo@bbs@bar';
        var param = {
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: mySearch.startDate,
            e_date: mySearch.endDate,
            dateType: "day",
            articleType: articleType
        };
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupByTime.json',
                data: param,
                type: 'get',
                success: function (data) {
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
                            startValue: mySearch.startDate
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
                                // margin: 10,
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
    //网民观点
    getNetionTypeTitleBar: function () {
        var mySearch = {};
        mySearch = searchData.searchParam();
        var param = {
            groupName: 'title.raw',
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: mySearch.startDate,
            e_date: mySearch.endDate
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/news/filterAndGroupBy.json',
                // contentType: "application/json; charset=utf-8",
                data: param,
                type: 'get',
                success: function (data) {
                    var renderData = {};
                    data.sort(function (a, b) {
                        return a.value - b.value;
                    });
                    var new_data = [];
                    if (data.length > 6) {
                        new_data = data.slice(0, 6);
                    } else {
                        new_data = data;
                    }
                    // 拼装 chart option
                    var seriesData = [];
                    var yAxisData = [];
                    $.each(new_data, function (i, item) {
                        seriesData.push(item.value);
                        yAxisData.push(item.key);
                    });
                    var option = {
                        legend: {},
                        yAxis: {
                            type: 'category',
                            data: yAxisData,
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 600,
                                    fontSize: 14
                                },
                                formatter: function (value, index) {
                                    return value.length > 10 ? value.substr(0, 10) + "..." : value;
                                }
                            }
                        },
                        barMaxWidth:30,
                        grid: {
                            bottom: '10',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'value',
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 600,
                                    fontSize: 14
                                }
                            }
                        },
                        series: [
                            {
                                name: '舆论热点',
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
                            }
                        ]
                    };
                    renderData.option = option;
                    resolve(renderData);
                }
            });
        });
    },
    //网络主要观点分布
    // getNetizenOptionPie: function () {
    //     var param = {
    //         "endDate": "2017-02",
    //         "startDate": "2017-01"
    //     }
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: common.url.webserviceUrl + '/accidentYuqing/hotAccidentComment',
    //             data: JSON.stringify(param),
    //             type: 'Post',
    //             contentType: "application/json;charset=utf-8",
    //             success: function (data) {
    //                 data = data.sort(function (a, b) {
    //                     return b.value - a.value;
    //                 });
    //                 var dataStyle = {
    //                     normal: {
    //                         label: {show: false},
    //                         labelLine: {show: false},
    //                         shadowBlur: 40,
    //                         shadowColor: 'rgba(40, 40, 40, 0.5)',
    //                     }
    //                 };
    //                 var placeHolderStyle = {
    //                     normal: {
    //                         color: 'rgba(0,0,0,0)',
    //                         label: {show: false},
    //                         labelLine: {show: false}
    //                     },
    //                     emphasis: {
    //                         color: 'rgba(0,0,0,0)'
    //                     }
    //                 };
    //                 var option = {
    //                     color: ['#85b6b2', '#6d4f8d', '#cd5e7e', '#e38980', '#f7db88'],
    //                     tooltip: {
    //                         show: true,
    //                         formatter: "{a} <br/>{b} : {c} ({d}%)"
    //                     },
    //                     series: [
    //                         {
    //                             name: data[0].key,
    //                             type: 'pie',
    //                             clockWise: false,
    //                             center: ['50%', '50%'],
    //                             radius: [180, 200],
    //                             itemStyle: dataStyle,
    //                             hoverAnimation: false,
    //                             data: [{
    //                                 value: data[0].value
    //                             },
    //                                 {
    //                                     value: 4,
    //                                     // value: numberLength.resetNumberType(data[0].value),
    //                                     name: 'invisible',
    //                                     itemStyle: placeHolderStyle
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             name: data[1].key,
    //                             type: 'pie',
    //                             clockWise: false,
    //                             center: ['50%', '50%'],
    //                             radius: [160, 180],
    //                             itemStyle: dataStyle,
    //                             hoverAnimation: false,
    //                             data: [{
    //                                 value: data[1].value
    //                             },
    //                                 {
    //                                     value: 14,
    //                                     // value: numberLength.resetNumberType(data[1].value),
    //                                     name: 'invisible',
    //                                     itemStyle: placeHolderStyle
    //                                 }
    //
    //                             ]
    //                         },
    //                         {
    //                             name: data[2].key,
    //                             type: 'pie',
    //                             clockWise: false,
    //                             hoverAnimation: false,
    //                             center: ['50%', '50%'],
    //                             radius: [140, 160],
    //                             itemStyle: dataStyle,
    //                             data: [
    //                                 {
    //                                     value: data[2].value
    //                                 },
    //                                 {
    //                                     // value: numberLength.resetNumberType(data[2].value),
    //                                     value: 24,
    //                                     name: 'invisible',
    //                                     itemStyle: placeHolderStyle
    //                                 }
    //                             ]
    //                         },
    //
    //
    //                         {
    //                             name: data[3].key,
    //                             type: 'pie',
    //                             clockWise: false,
    //                             center: ['50%', '50%'],
    //                             radius: [120, 140],
    //                             hoverAnimation: false,
    //                             itemStyle: dataStyle,
    //                             data: [
    //                                 {
    //                                     value: data[3].value
    //                                 },
    //                                 {
    //                                     // value: numberLength.resetNumberType(data[3].value),
    //                                     value: 34,
    //                                     name: 'invisible',
    //                                     itemStyle: placeHolderStyle
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             name: data[4].key,
    //                             type: 'pie',
    //                             clockWise: false,
    //                             center: ['50%', '50%'],
    //                             radius: [100, 120],
    //                             hoverAnimation: false,
    //                             itemStyle: dataStyle,
    //                             data: [
    //                                 {
    //                                     value: data[4].value
    //                                 },
    //                                 {
    //                                     // value: numberLength.resetNumberType(data[4].value),
    //                                     name: 'invisible',
    //                                     value: 44,
    //                                     itemStyle: placeHolderStyle
    //                                 }
    //                             ]
    //                         },
    //
    //                     ]
    //                 };
    //                 resolve(option);
    //             }
    //         })
    //
    //     })
    // },
    //网民话题柱图
    getNetionTitleBar: function () {
        var mySearch = {};
        mySearch = searchData.searchParam();
        var param = {
            groupName: 'title.raw',
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: mySearch.startDate,
            e_date: mySearch.endDate
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupBy.json',
                // contentType: "application/json; charset=utf-8",
                data: param,
                type: 'get',
                success: function (data) {
                    var renderData = {};
                    data.sort(function (a, b) {
                        return a.value - b.value;
                    });
                    var new_data = [];
                    if (data.length > 6) {
                        new_data = data.slice(0, 6);
                    } else {
                        new_data = data;
                    }
                    // 拼装 chart option
                    var seriesData = [];
                    var yAxisData = [];
                    $.each(new_data, function (i, item) {
                        seriesData.push(item.value);
                        yAxisData.push(item.key);
                    });
                    var option = {
                        legend: {},
                        yAxis: {
                            type: 'category',
                            data: yAxisData,
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 600,
                                    fontSize: 14
                                },
                                formatter: function (value, index) {
                                    return value.length > 10 ? value.substr(0, 10) + "..." : value;
                                }
                            }
                        },
                        grid: {
                            top:'10',
                            left:'10',
                            right:'10',
                            bottom: '50',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'value',
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 600,
                                    fontSize: 16
                                }
                            }
                        },
                        barMaxWidth:30,
                        series: [
                            {
                                name: '舆论热点',
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
                            }
                        ]
                    };
                    renderData.option = option;
                    resolve(renderData);
                }
            });
        });
    },
    //热议网民柱图
    getNetizenConsensusBar: function () {
        var mySearch = {};
        mySearch = searchData.searchParam();
        var param = {
            groupName: 'author',
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: mySearch.startDate,
            e_date: mySearch.endDate
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupBy.json',
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
                        if (item.key != "") {
                            seriesData.push(item.value);
                            xAxisData.push(item.key);
                        }
                    });
                    var option = {
                        legend: {},
                        grid: {
                            top:10,
                            left: 80,
                            right:60,
                            bottom: 100
                        },
                        yAxis: {
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 600,
                                    fontSize: 14
                                }
                            }

                        },
                        barMaxWidth:30,
                        xAxis: {
                            data: xAxisData,
                            axisLabel: {
                                interval: 0,
                                rotate: 35,
                                textStyle: {
                                    fontWeight: 600,
                                    fontSize: 14
                                },
                                formatter: function (value, index) {
                                    return value.length > 6 ? value.substr(0, 6) + "..." : value;
                                }
                            }
                        },
                        series: [
                            {
                                name: '热议网民',
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
                            }
                        ]
                    };
                    renderData.option = option;
                    resolve(renderData);
                }
            });
        });
    },
    //网民地图分布
    getNetizenMap: function () {
        var mySearch = {};
        mySearch = searchData.searchParam();
        var param = {
            groupName: 'area',
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: mySearch.startDate,
            e_date: mySearch.endDate
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupBy.json',
                // contentType: "application/json; charset=utf-8",
                data: param,
                type: 'get',
                success: function (data) {
                    debugger;
                    if(data && data.length>0) {
                        var renderData = {};
                        var maxCount = 0;
                        var seriesData = [];
                        $.each(data, function (i, item) {
                            var node = {};
                            node.name = item.key;
                            node.value = item.value;
                            seriesData.push(node);
                        });
                        seriesData.sort(function (a, b) {
                            return b.value - a.value
                        });
                        maxCount = seriesData[0].value == undefined ? 10 : seriesData[0].value;
                        var option = {
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c}"
                            },
                            visualMap: {
                                min: 0,
                                max: maxCount,
                                left: 'left',
                                top: 'bottom',
                                text: ['高', '低'],           // 文本，默认为数值文本
                                calculable: true,
                                inRange: {
                                    color: ['#B7EEEB', '#FEFDC7', '#FCC171', '#F27449', '#DB3B29'],
                                },

                            },
                            series: [
                                {
                                    name: '地域分布',
                                    type: 'map',
                                    mapType: 'china',
                                    label: {
                                        normal: {
                                            show: true,
                                        }
                                    },
                                    data: seriesData
                                }
                            ]
                        };
                        renderData.option = option;
                        resolve(renderData);
                    }
                }
            });
        });
    },
    //关键词云
    getKeywordsChart: function () {
        var mySearch = {};
        mySearch = searchData.searchParam();
        var param = {
            mustWord: this.config.mustWord,
            shouldWord: this.config.shouldWord,
            mustNotWord: this.config.mustNotWord,
            s_date: mySearch.startDate,
            e_date: mySearch.endDate,
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
    //网民观点
    // getNetizenOptions: function () {
    //     var mySearch = {};
    //     mySearch = searchData.searchParam();
    //     var param = {
    //         "date": {
    //             "endDate": mySearch.endDate,
    //             "startDate": mySearch.startDate
    //         },
    //         "keyword": {
    //             "mustNotWord": mySearch.mustNotWord,
    //             "mustWord": mySearch.mustWord,
    //             "shouldWord": mySearch.shouldWord
    //         }
    //     }
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: common.url.webserviceUrl + '/comments/viewport',
    //             data: JSON.stringify(param),
    //             contentType: 'application/json;charset=utf-8',
    //             type: 'post',
    //             success: function (data) {
    //                 resolve(data);
    //             }
    //         });
    //     });
    // },
    //信息列表
    getmylist : function (searchParam,pageSize, currentPage) {
        var self = this;
        var mySearch = {};
        mySearch = searchData.searchParam();
        var param = {
            "date": {
                "endDate": searchParam.endDate,
                "startDate": searchParam.startDate
            },
            "filed": searchParam.filed,
            "keyword": {
                "mustNotWord": mySearch.mustNotWord,
                "mustWord": mySearch.mustWord+"@"+searchParam.searchWord,
                "shouldWord": mySearch.shouldWord
            },
            "page": {
                "limit": pageSize,
                "orders": searchParam.orders,
                "page": currentPage
            },
            "searchKv": searchParam.searchKey,
            "type": searchParam.type
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/findPageByMustShouldDateInType',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    var renderData = {};
                    renderData.limits = data.size;
                    renderData.pages = data.totalPages;
                    renderData.total = data.totalElements;
                    var datas = data.content;
                    var seriesData = [];
                    $.each(datas, function (i, item) {
                        var node = {};
                        if(item.title) {
                            node.title = utils.utils.heightLightKeywords(item.title, 20, '...', self.heightLightWords);
                            if(searchParam.searchWord != "" && node.title.indexOf(searchParam.searchWord) != -1 && param.filed != "content.cn") {
                                var fen = node.title.split(searchParam.searchWord);
                                node.title = fen.join('<span style="color:red;">'+searchParam.searchWord + '</span>')
                            }
                        }else {
                            node.title = "暂无数据";
                        }
                        node.time = item.dateCreated;
                        node.url = item.url;
                        if(item.content) {
                            node.content = utils.utils.heightLightKeywords(item.content, 200, '...', self.heightLightWords);
                            debugger;

                            if(searchParam.searchWord != "" && node.content.indexOf(searchParam.searchWord) != -1 && param.filed != "title.cn") {
                                var fen = node.content.split(searchParam.searchWord);
                                node.content = fen.join('<span style="color:red;">' + searchParam.searchWord + '</span>')
                            }
                        }else {
                            node.content = "暂无数据";
                        }
                        if(item.source && item.source != null) {
                            node.source = item.source.length>6?item.source.substr(0,6)+"...":item.source;
                        }else {
                            node.source = "暂无数据";
                        }
                        node.emotion = typeParam.typeUtil.sentimentType(item.nlp.sentiment.label);
                        node.type = item.type;
                        node.id = item.id;
                        node.pubTime = dateUtil.dateUtil.formatDate(new Date(item.pubTime), "yyyy-MM-dd hh:mm:ss");
                        node.isActive = false;
                        seriesData.push(node);
                    });
                    renderData.seriesData = seriesData;
                    resolve(renderData);
                }
            })
        })
    },
    //历史预警列表
    getWarningListData: function (pageSize,currentPage) {
        var subjectId = queryParam.utils.getQueryVariable('id');
        var param = {
            "limit": pageSize,
            "page": currentPage
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/warningLog/subject/'+subjectId,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    var renderData = {};
                    renderData.limits = data.size;
                    renderData.pages = data.totalPages;
                    renderData.total = data.totalElements;
                    var datas = data.content;
                    var seriesData = [];
                    $.each(datas, function (i, item) {
                        var node = {};
                        node.keyWord = item.mustWord;
                        node.dateCreated = dateUtil.dateUtil.formatDate(new Date(item.dateCreated), "yyyy-MM-dd hh:mm:ss");
                        node.id = item.id;
                        node.set = "查看预警";
                        node.subjectName = item.subjectName;
                        node.timeChange = item.startDate+"至"+item.endDate;
                        seriesData.push(node);
                    });
                    renderData.seriesData = seriesData;
                    resolve(renderData);
                }
            })
        })
    },
    //舆情预警列表
    getpublicSentimentListData: function (pageSize,currentPage) {
        var param = {
            "limit": pageSize,
            "page": currentPage
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/warningLog/findByUser/',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    var renderData = {};
                    renderData.limits = data.size;
                    renderData.pages = data.totalPages;
                    renderData.total = data.totalElements;
                    var datas = data.content;
                    var seriesData = [];
                    $.each(datas, function (i, item) {
                        var node = {};
                        node.keyWord = item.mustWord;
                        node.dateCreated = dateUtil.dateUtil.formatDate(new Date(item.dateCreated), "yyyy-MM-dd hh:mm:ss");
                        node.id = item.id;
                        node.set = "查看预警";
                        node.subjectName = item.subjectName;
                        node.timeChange = item.startDate+"至"+item.endDate;
                        seriesData.push(node);
                    });
                    renderData.seriesData = seriesData;
                    resolve(renderData);
                }
            })
        })
    },
    //点击情感分析饼图弹出列表
    getEmotionList: function (searchKv,pageSize,currentPage) {
        var mySearch = {};
        mySearch = searchData.searchParam();
        var param = {
            "date": {
                "endDate": mySearch.endDate,
                "startDate": mySearch.startDate
            },
            "filed": "",
            "keyword": {
                "mustNotWord": mySearch.mustNotWord,
                "mustWord": mySearch.mustWord,
                "shouldWord": mySearch.shouldWord
            },
            "page": {
                "limit": pageSize,
                "orders": [{
                    "direction": "DESC",
                    "orderBy": "pubTime"
                }],
                "page": currentPage
            },
            "searchKv": searchKv,
            "type": ["article"]
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/findPageByMustShouldDateInType',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    debugger;
                    var renderData = {};
                    renderData.limits = data.size;
                    renderData.pages = data.totalPages;
                    renderData.total = data.totalElements;
                    var datas = data.content;
                    var seriesData = [];
                    $.each(datas, function (i, item) {
                        var node = {};
                        if(item.title) {
                            node.title = item.title.length>20?item.title.substr(0,20)+"...":item.title;
                        }else {
                            node.title = "暂无数据";
                        }
                        node.site = item.site;
                        node.time = item.dateCreated;
                        node.url = item.url;
                        if(item.content) {
                            item.content=item.content.replace(new RegExp('<[^>].*?>', 'gi'), '').replace(/&nbsp;/ig, "").replace(/&quot;/ig,"");
                            node.content = item.content.length>120?item.content.substr(0,120)+"...":item.content;
                        }else {
                            node.content = "暂无数据";
                        }
                        if(item.source && item.source != null) {
                            node.source = item.source.length>6?item.source.substr(0,6)+"...":item.source;
                        }else {
                            node.source = "暂无数据";
                        }
                        node.emotion = typeParam.typeUtil.sentimentType(item.nlp.sentiment.label);
                        node.type = item.type;
                        node.id = item.id;
                        node.pubTime = dateUtil.dateUtil.formatDate(new Date(item.pubTime), "yyyy-MM-dd hh:mm:ss");
                        node.isActive = false;
                        seriesData.push(node);
                    });
                    renderData.seriesData = seriesData;
                    resolve(renderData);
                }
            })
        })
    },
    //点击载体类型饼图弹出列表
    getTypeList: function (type,pageSize,currentPage) {
        var mySearch = {};
        mySearch = searchData.searchParam();
        var param = {
            "date": {
                "endDate": mySearch.endDate,
                "startDate": mySearch.startDate
            },
            "filed": "",
            "keyword": {
                "mustNotWord": mySearch.mustNotWord,
                "mustWord": mySearch.mustWord,
                "shouldWord": mySearch.shouldWord
            },
            "page": {
                "limit": pageSize,
                "orders": [{
                    "direction": "DESC",
                    "orderBy": "pubTime"
                }],
                "page": currentPage
            },
            "searchKv": [],
            "type": type
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/findPageByMustShouldDateInType',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    var renderData = {};
                    renderData.limits = data.size;
                    renderData.pages = data.totalPages;
                    renderData.total = data.totalElements;
                    var datas = data.content;
                    var seriesData = [];
                    $.each(datas, function (i, item) {
                        var node = {};
                        if(item.title) {
                            node.title = item.title.length>20?item.title.substr(0,20)+"...":item.title;
                        }else {
                            node.title = "暂无数据";
                        }
                        node.time = item.dateCreated;
                        node.url = item.url;
                        if(item.content) {
                            item.content=item.content.replace(new RegExp('<[^>].*?>', 'gi'), '').replace(/&nbsp;/ig, "").replace(/&quot;/ig,"");
                            node.content = item.content.length>120?item.content.substr(0,120)+"...":item.content;
                        }else {
                            node.content = "暂无数据";
                        }
                        if(item.source && item.source != null) {
                            node.source = item.source.length>6?item.source.substr(0,6)+"...":item.source;
                        }else {
                            node.source = "暂无数据";
                        }
                        node.emotion = typeParam.typeUtil.sentimentType(item.nlp.sentiment.label);
                        node.type = item.type;
                        node.id = item.id;
                        node.pubTime = dateUtil.dateUtil.formatDate(new Date(item.pubTime), "yyyy-MM-dd hh:mm:ss");
                        node.isActive = false;
                        seriesData.push(node);
                    });
                    renderData.seriesData = seriesData;
                    resolve(renderData);
                }
            })
        })
    },
    //点击热议网民柱图弹出列表
    getAuthorList: function (searchKv,pageSize,currentPage) {
        var mySearch = {};
        mySearch = searchData.searchParam();
        var param = {
            "date": {
                "endDate": mySearch.endDate,
                "startDate": mySearch.startDate
            },
            "filed": "",
            "keyword": {
                "mustNotWord": mySearch.mustNotWord,
                "mustWord": mySearch.mustWord,
                "shouldWord": mySearch.shouldWord
            },
            "page": {
                "limit": pageSize,
                "orders": [{
                    "direction": "DESC",
                    "orderBy": "pubTime"
                }],
                "page": currentPage
            },
            "searchKv": searchKv,
            "type": ["article"]
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/findPageByMustShouldDateInType',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    debugger;
                    var renderData = {};
                    renderData.limits = data.size;
                    renderData.pages = data.totalPages;
                    renderData.total = data.totalElements;
                    var datas = data.content;
                    var seriesData = [];
                    $.each(datas, function (i, item) {
                        var node = {};
                        if(item.title) {
                            node.title = item.title.length>20?item.title.substr(0,20)+"...":item.title;
                        }else {
                            node.title = "暂无数据";
                        }
                        node.time = item.dateCreated;
                        node.url = item.url;
                        if(item.content) {
                            item.content=item.content.replace(new RegExp('<[^>].*?>', 'gi'), '').replace(/&nbsp;/ig, "").replace(/&quot;/ig,"");
                            node.content = item.content.length>120?item.content.substr(0,120)+"...":item.content;
                        }else {
                            node.content = "暂无数据";
                        }
                        if(item.source && item.source != null) {
                            node.source = item.source.length>6?item.source.substr(0,6)+"...":item.source;
                        }else {
                            node.source = "暂无数据";
                        }
                        node.site = item.site;
                        node.emotion = typeParam.typeUtil.sentimentType(item.nlp.sentiment.label);
                        node.type = item.type;
                        node.id = item.id;
                        node.pubTime = dateUtil.dateUtil.formatDate(new Date(item.pubTime), "yyyy-MM-dd hh:mm:ss");
                        node.isActive = false;
                        seriesData.push(node);
                    });
                    renderData.seriesData = seriesData;
                    resolve(renderData);
                }
            })
        })
    },
    //点击网民话题柱图弹出列表
    getTitleList: function (searchKv,pageSize,currentPage) {
        var mySearch = {};
        mySearch = searchData.searchParam();
        var param = {
            "date": {
                "endDate": mySearch.endDate,
                "startDate": mySearch.startDate
            },
            "filed": "",
            "keyword": {
                "mustNotWord": mySearch.mustNotWord,
                "mustWord": mySearch.mustWord,
                "shouldWord": mySearch.shouldWord
            },
            "page": {
                "limit": pageSize,
                "orders": [{
                    "direction": "DESC",
                    "orderBy": "pubTime"
                }],
                "page": currentPage
            },
            "searchKv": searchKv,
            "type": ["article"]
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/findPageByMustShouldDateInType',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    debugger;
                    var renderData = {};
                    renderData.limits = data.size;
                    renderData.pages = data.totalPages;
                    renderData.total = data.totalElements;
                    var datas = data.content;
                    var seriesData = [];
                    $.each(datas, function (i, item) {
                        var node = {};
                        if(item.title) {
                            node.title = item.title.length>20?item.title.substr(0,20)+"...":item.title;
                        }else {
                            node.title = "暂无数据";
                        }
                        node.time = item.dateCreated;
                        node.url = item.url;
                        if(item.content) {
                            item.content=item.content.replace(new RegExp('<[^>].*?>', 'gi'), '').replace(/&nbsp;/ig, "").replace(/&quot;/ig,"");
                            node.content = item.content.length>120?item.content.substr(0,120)+"...":item.content;
                        }else {
                            node.content = "暂无数据";
                        }
                        if(item.source && item.source != null) {
                            node.source = item.source.length>6?item.source.substr(0,6)+"...":item.source;
                        }else {
                            node.source = "暂无数据";
                        }
                        node.emotion = typeParam.typeUtil.sentimentType(item.nlp.sentiment.label);
                        node.type = item.type;
                        node.id = item.id;
                        node.pubTime = dateUtil.dateUtil.formatDate(new Date(item.pubTime), "yyyy-MM-dd hh:mm:ss");
                        node.isActive = false;
                        seriesData.push(node);
                    });
                    renderData.seriesData = seriesData;
                    resolve(renderData);
                }
            })
        })
    },
    //点击网站来源饼图弹出列表
    getSourceList: function (searchKv,pageSize,currentPage) {
        var mySearch = {};
        mySearch = searchData.searchParam();
        var param = {
            "date": {
                "endDate": mySearch.endDate,
                "startDate": mySearch.startDate
            },
            "filed": "",
            "keyword": {
                "mustNotWord": mySearch.mustNotWord,
                "mustWord": mySearch.mustWord,
                "shouldWord": mySearch.shouldWord
            },
            "page": {
                "limit": pageSize,
                "orders": [{
                    "direction": "DESC",
                    "orderBy": "pubTime"
                }],
                "page": currentPage
            },
            "searchKv": searchKv,
            "type": ["article"]
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/findPageByMustShouldDateInType',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    debugger;
                    var renderData = {};
                    renderData.limits = data.size;
                    renderData.pages = data.totalPages;
                    renderData.total = data.totalElements;
                    var datas = data.content;
                    var seriesData = [];
                    $.each(datas, function (i, item) {
                        var node = {};
                        if(item.title) {
                            node.title = item.title.length>20?item.title.substr(0,20)+"...":item.title;
                        }else {
                            node.title = "暂无数据";
                        }
                        node.time = item.dateCreated;
                        node.url = item.url;
                        if(item.content) {
                            item.content=item.content.replace(new RegExp('<[^>].*?>', 'gi'), '').replace(/&nbsp;/ig, "").replace(/&quot;/ig,"");
                            node.content = item.content.length>120?item.content.substr(0,120)+"...":item.content;
                        }else {
                            node.content = "暂无数据";
                        }
                        if(item.source && item.source != null) {
                            node.source = item.source.length>6?item.source.substr(0,6)+"...":item.source;
                        }else {
                            node.source = "暂无数据";
                        }
                        node.emotion = typeParam.typeUtil.sentimentType(item.nlp.sentiment.label);
                        node.type = item.type;
                        node.id = item.id;
                        node.pubTime = dateUtil.dateUtil.formatDate(new Date(item.pubTime), "yyyy-MM-dd hh:mm:ss");
                        node.isActive = false;
                        seriesData.push(node);
                    });
                    renderData.seriesData = seriesData;
                    resolve(renderData);
                }
            })
        })
    },
}
export default {
    actions, searchData
}
