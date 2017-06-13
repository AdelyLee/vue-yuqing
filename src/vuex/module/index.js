import jquery from '../api';
const $ = jquery.jQuery;
import common from '../common'
import dateUtil from '../dateUtil'
import typeUtil from '../typeUtil'

const actions = {
    //近30天舆情
    getSentimentTypeChart: function () {
        var data = new Date();
        var endDate = data.getTime();
        var startDate = data.setMonth(data.getMonth() - 1);
        var param = {
            groupName: 'nlp.sentiment.label',
            mustWord: '',
            shouldWord: '',
            mustNotWord: '',
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
                    var seriesData = [];
                    var lengeds = [];
                    $.each(data, function (i, item) {
                        var node = {};
                        var type = item.key;
                        node.name = typeUtil.typeUtil.sentimentType(type);
                        node.value = item.value;
                        seriesData.push(node);
                        lengeds.push(node.name)
                    });
                    var option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            x: 'center',
                            y: 'top',
                            data: lengeds
                        },
                        color: [
                            '#d2b356', '#db726c', '#56b6ff', '#E87C25', '#27727B',
                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ],
                        calculable: true,
                        series: [
                            {
                                name: '情感类型',
                                type: 'pie',
                                radius: [30, 110],
                                center: ['50%', '50%'],
                                roseType: 'area',
                                label: {
                                    normal: {
                                        show: true,
                                        // position: 'center',
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
                            }
                        ]
                    };

                    resolve(option);
                }
            });
        });
    },
    getCarrierAnalysisChart: function (timesType) {
        var width = $('#tab-content').width();
        $('#carrierAnalysis,#carrierAnalysisMonth,#carrierAnalysisNearlyDays,#carrierAnalysisYesterday').width(width - 50);
        var data = new Date();
        switch (timesType) {
            case "day":
                var start = data.getTime();
                var end = data.getTime();
                //var start = dateUtil.dateUtil.formatDate(new Date(startDate), "yyyy-MM-dd HH:mm:ss");
                //var start = dateUtil.dateUtil.formatDate(new Date(endDate), "yyyy-MM-dd HH:mm:ss");
                var dataType = 'hour';
                var gap = 5;
                break;
            case 'yesterday':
                var end = data.getTime();
                var start = data.setDate(data.getDate() - 1);
                var dataType = 'hour';
                var gap = 5;
                break;
            case 'nearlydays':
                var endDate = data.getTime();
                var startDate = data.setDate(data.getDate() - 7);
                var start = dateUtil.dateUtil.formatDate(new Date(startDate), "yyyy-MM-dd");
                var end = dateUtil.dateUtil.formatDate(new Date(endDate), "yyyy-MM-dd");
                var dataType = 'day';
                var gap = '';
                break;
            case 'month':
                var endDate = data.getTime();
                var startDate = data.setMonth(data.getMonth() - 1);
                var start = dateUtil.dateUtil.formatDate(new Date(startDate), "yyyy-MM-dd");
                var end = dateUtil.dateUtil.formatDate(new Date(endDate), "yyyy-MM-dd");
                var dataType = 'day';
                var gap = '';
                break;
            default:
                break;
        }
        var param = {
            mustWord: '',
            shouldWord: '',
            mustNotWord: '',
            s_date: start,
            e_date: end,
            dateType: dataType,
            gap: gap
        };
        var newsSeries = {"data": [], "xAxis": []};
        var weiboSeries = {"data": [], "xAxis": []};
        var bbsSeries = {"data": [], "xAxis": []};
        var barSeries = {"data": [], "xAxis": []};
        $.ajax({
            url: common.url.webserviceUrl + '/news/filterAndGroupByTime.json',
            async: false,
            data: param,
            type: 'get',
            success: function (data) {
                $.each(data, function (i, item) {
                    newsSeries.data.push(item.value);
                    newsSeries.xAxis.push(item.key);
                })
            }
        });
        $.ajax({
            url: common.url.webserviceUrl + '/weibo/filterAndGroupByTime.json',
            async: false,
            data: param,
            type: 'get',
            success: function (data) {
                $.each(data, function (i, item) {
                    weiboSeries.data.push(item.value);
                    weiboSeries.xAxis.push(item.key);
                });
            }
        });
        $.ajax({
            url: common.url.webserviceUrl + '/bbs/filterAndGroupByTime.json',
            async: false,
            data: param,
            type: 'get',
            success: function (data) {
                $.each(data, function (i, item) {
                    bbsSeries.data.push(item.value);
                    bbsSeries.xAxis.push(item.key);
                })
            }
        });
        $.ajax({
            url: common.url.webserviceUrl + '/bar/filterAndGroupByTime.json',
            async: false,
            data: param,
            type: 'get',
            success: function (data) {
                $.each(data, function (i, item) {
                    barSeries.data.push(item.value);
                    barSeries.xAxis.push(item.key);
                })
            }
        });
        var myOption = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ["新闻", "微博", "论坛", "贴吧"]
            },
            toolbox: {
                show: false,
                left: 'center',
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            dataZoom: [{
                startValue: start
            }, {
                type: 'inside'
            }],
            xAxis: {
                type: 'category',
                name: '时间',
                data: weiboSeries.xAxis,
                boundaryGap: false,
                splitLine: {
                    show: true,
                    interval: 'auto',
                    lineStyle: {
                        color: ['#cccccc']
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#4d94e2'
                    }
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
                splitLine: {
                    lineStyle: {
                        color: ['#cccccc']
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#4d94e2'
                    }
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
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 6,
                data: newsSeries.data,
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
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 6,
                data: weiboSeries.data,
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
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 6,
                data: bbsSeries.data,
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
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 6,
                data: barSeries.data,
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
        return new Promise(function (resolve, reject) {
            resolve(myOption);
        });
    },
    getCarrierAnalysisBarChart: function (timesType) {
        var width = $('#tab-contents').width();
        $('#carrierAnalysisType,#carrierAnalysisTypeMonth,#carrierAnalysisTypeNearlyDays,#carrierAnalysisTypeYesterday').width(width - 50);
        var data = new Date();
        switch (timesType) {
            case "day":
                var endDate = data.getTime();
                var startDate = data.getTime();
                var start = dateUtil.dateUtil.formatDate(new Date(startDate), "yyyy-MM-dd");
                var end = dateUtil.dateUtil.formatDate(new Date(endDate), "yyyy-MM-dd");
                var dataType = 'hour';
                var gap = 5;
                break;
            case 'yesterday':
                var endDate = data.getTime();
                var startDate = data.setDate(data.getDate() - 1);
                var start = dateUtil.dateUtil.formatDate(new Date(startDate), "yyyy-MM-dd");
                var end = dateUtil.dateUtil.formatDate(new Date(endDate), "yyyy-MM-dd");
                var dataType = 'hour';
                var gap = 5;
                break;
            case 'nearlydays':
                var endDate = data.getTime();
                var startDate = data.setDate(data.getDate() - 7);
                var start = dateUtil.dateUtil.formatDate(new Date(startDate), "yyyy-MM-dd");
                var end = dateUtil.dateUtil.formatDate(new Date(endDate), "yyyy-MM-dd");
                var dataType = 'day';
                var gap = '';
                break;
            case 'month':
                var endDate = data.getTime();
                var startDate = data.setMonth(data.getMonth() - 1);
                var start = dateUtil.dateUtil.formatDate(new Date(startDate), "yyyy-MM-dd");
                var end = dateUtil.dateUtil.formatDate(new Date(endDate), "yyyy-MM-dd");
                var dataType = 'day';
                var gap = '';
                break;
            default:
                break;
        }
        var param = {
            mustWord: '',
            shouldWord: '',
            mustNotWord: '',
            s_date: start,
            e_date: end,
            dateType: 'day',
            gap: ''
        };
        var newsSeries = {"data": [], "xAxis": []};
        var weiboSeries = {"data": [], "xAxis": []};
        var bbsSeries = {"data": [], "xAxis": []};
        var barSeries = {"data": [], "xAxis": []};
        $.ajax({
            url: common.url.webserviceUrl + '/news/filterAndGroupByTime.json',
            async: false,
            data: param,
            type: 'get',
            success: function (data) {
                $.each(data, function (i, item) {
                    newsSeries.data.push(item.value);
                    newsSeries.xAxis.push(item.key);
                })
            }
        });
        $.ajax({
            url: common.url.webserviceUrl + '/weibo/filterAndGroupByTime.json',
            async: false,
            data: param,
            type: 'get',
            success: function (data) {
                $.each(data, function (i, item) {
                    weiboSeries.data.push(item.value);
                    weiboSeries.xAxis.push(item.key);
                })
            }
        });
        $.ajax({
            url: common.url.webserviceUrl + '/bbs/filterAndGroupByTime.json',
            async: false,
            data: param,
            type: 'get',
            success: function (data) {
                $.each(data, function (i, item) {
                    bbsSeries.data.push(item.value);
                    bbsSeries.xAxis.push(item.key);
                })
            }
        });
        $.ajax({
            url: common.url.webserviceUrl + '/bar/filterAndGroupByTime.json',
            async: false,
            data: param,
            type: 'get',
            success: function (data) {
                $.each(data, function (i, item) {
                    barSeries.data.push(item.value);
                    barSeries.xAxis.push(item.key);
                })
            }
        });
        var myOption = {
            title: {
                text: ''
            },
            color: ['#fc7f7d', '#efee55', '#4fa8e4', '#e679cc'],
            xAxis: {
                axisLine: {
                    lineStyle: {
                        color: '#4d94e2'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 14
                    }
                },
            },
            yAxis: [{
                //axisLine: {
                //    lineStyle: {
                //        color: '#4d94e2'
                //    }
                //},
                inverse: true,
                splitLine: {
                    show: true
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#4d94e2'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 14
                    }
                },
                data: ['-']
            }],
            legend: {
                data: ["新闻", "微博", "论坛", "贴吧"]
            },
            toolbox: {
                show: false,
                left: 'center',
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [{
                name: '新闻',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'left',
                        textStyle: {color: '#000'},
                        formatter: '新闻',
                        label: {
                            show: true,
                            position: 'right',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                data: newsSeries.data
            }, {
                name: '微博',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'left',
                        textStyle: {color: '#000'},
                        formatter: '微博',
                    }
                },
                data: weiboSeries.data
            }, {
                name: '论坛',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'left',
                        textStyle: {color: '#000'},
                        formatter: '论坛',
                    }
                },
                data: bbsSeries.data
            }, {
                name: '贴吧',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'left',
                        textStyle: {color: '#000'},
                        formatter: '贴吧',
                    }
                },
                data: barSeries.data
            }]
        };
        return new Promise(function (resolve, reject) {
            resolve(myOption);
        });
    },
    //主流媒体
    getMediaBarChart: function () {
        var param = {
            groupName: 'source',
            mustWord: '',
            shouldWord: '',
            mustNotWord: '',
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
    getArticleList: function (type) {
        var param = {
            type: "source",
            page: 1,
            limit: 5,
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
                        item.pubTime = dateUtil.dateUtil.formatDate(new Date(item.pubTime), 'yyyy/MM/dd');
                    });
                    resolve(data);
                }
            });
        });
    },
    getNewsCurrentList: function (reportType, pageSize, currentPage) {
        reportType = reportType == undefined ? "MONTHLY" : reportType;
        pageSize = pageSize == undefined ? 2 : pageSize;
        currentPage = currentPage == undefined ? 1 : currentPage;
        var param = {
            "keyword": {
                "mustNotWord": "",
                "mustWord": "",
                "shouldWord": ""
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
            "type": [reportType]
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/findPageByMustShouldDateInType',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    data.content.forEach(function (item) {
                        item.content = item.content.replace(new RegExp('<[^>].*?>', 'gi'), '').replace(/&nbsp;/ig, "");
                    });
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
}
export default {
    actions
}
