/**
 * Created by lyc on 17-5-18.
 */
import $ from 'jquery'
import common from './common'

const actions = {
    getArticleTypeChart: function () {
        var param = {
            method: 'get',
            params: {
                mustWord: '事故@安全生产',
                startDate: '2017-01',
                endDate: '2017-02'
            }
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.esUrl + '/es/findByMustShouldDateInType.json',
                data: param,
                type: 'get',
                success: function (data) {
                    // 拼装 chart option
                    var seriesData = [];
                    $.each(data, function (i, item) {
                        var node = {};
                        node.name = utils.resetArticleTypeName(item.key);
                        node.value = item.value;
                        seriesData.push(node);
                    });
                    var option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {},
                        series: [
                            {
                                name: '媒体类型',
                                type: 'pie',
                                radius: ['40%', '55%'],
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
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    //新闻情感类型
    getNewsEmotionPieChart: function () {
        var param = {
            groupName: 'nlp.sentiment.label',


        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.esUrl + '/news/filterAndGroupBy.json',
                data: param,
                type: 'get',
                success: function (data) {
                    debugger;
                    console.log(data);
                    // 拼装 chart option
                    var seriesData = [];
                    var lengeds = [];
                    $.each(data, function (i, item) {
                        var node = {};
                        node.name = emotion.resetEmotionTypeName(item.key);
                        node.value = item.value;
                        seriesData.push(node);
                        lengeds.push(node.name)
                    });

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
                        series: [
                            {
                                name: '情感类型',
                                type: 'pie',
                                radius: ['40%', '60%'],
                                label: {
                                    normal: {
                                        show: false,
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
                                        show: false
                                    }
                                },
                                data: seriesData
                            }
                        ]
                    };

                    resolve(option);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    getAccidentAreaChart: function () {
        var param = {
            "date": {
                "startDate": "2017-01",
                "endDate": "2017-02"
            },
            "page": {
                "limit": 6,
                "orders": [
                    {
                        "direction": "DESC",
                        "orderBy": "count"
                    }
                ]
            },
            "types": [
                "province"
            ]
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.mongodbUrl + '/accident/aggByTypes',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    // 拼装 chart option
                    var seriesData = [];
                    var yAxisData = [];
                    data = data.sort(function (a, b) {
                        return a.count - b.count;
                    });
                    $.each(data, function (i, item) {
                        seriesData.push(item.count);
                        yAxisData.push(item.id);
                    });
                    var option = {
                        legend: {},
                        yAxis: {
                            data: yAxisData,
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 700,
                                    fontSize: 20
                                }
                            }
                        },
                        xAxis: {
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 700,
                                    fontSize: 20
                                }
                            }
                        },
                        series: [
                            {
                                name: '事故起数',
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

                    resolve(option);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    //主流媒体
    getMediaBarChart: function () {
        var param = {
            groupName: 'source.raw',

        };

        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.esUrl + '/news/filterAndGroupBy.json',
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
                        xAxisData.push(item.key);
                    });
                    var option = {
                        legend: {},
                        grid: {
                            bottom: 120
                        },
                        yAxis: {
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 700,
                                    fontSize: 20
                                }
                            }

                        },
                        xAxis: {
                            data: xAxisData,
                            axisLabel: {
                                interval: 0,
                                rotate: 35,
                                textStyle: {
                                    fontWeight: 700,
                                    fontSize: 20
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
                            }
                        ]
                    };
                    resolve(option);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    //相关评论
    getCommentPieChart: function () {
        var param = {
            method: 'get',
            params: {
                mustWord: '事故@安全生产',
                startDate: '2017-01',
                endDate: '2017-02'
            }
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.esUrl + '/es/findByMustShouldDateInType.json',
                data: param,
                type: 'get',
                success: function (data) {
                    debugger;
                    console.log(data);
                    // 拼装 chart option
                    data = data.sort(function (a, b) {
                        return b.value - a.value;
                    });
                    var news = {};
                    var weiBo = {}
                    var pinglun = {};
                    var tieba = {};
                    var luntan = {}
                    var total = 0;

                    var seriesData = [];
                    var lengeds = [];
                    $.each(data, function (i, item) {
                        seriesData.push(utils.resetArticleTypeName(item.key));

                    });
                    for (var j = 0; j < seriesData.length; j++) {
                        $.each(data, function (i, item) {
                            // var node = {};
                            // var temp="";
                            var temp = utils.resetArticleTypeName(item.key);
                            if (seriesData[j] == temp) {
                                switch (temp) {
                                    case "新闻":
                                        news.name = temp, news.value = parseInt(item.value);
                                        break;
                                    case "微博":
                                        weiBo.name = temp, weiBo.value = parseInt(item.value);
                                        break;
                                    case "论坛":
                                        luntan.name = temp, luntan.value = parseInt(item.value);
                                        break;
                                    case "贴吧":
                                        tieba.name = temp, tieba.value = parseInt(item.value);
                                        break;
                                    case "评论":
                                        pinglun.name = temp, pinglun.value = parseInt(item.value);
                                        break;

                                }
                                ;
                                lengeds.push(temp)
                            }

                        });
                    }

                    var dataStyle = {
                        normal: {
                            label: {show: false},
                            labelLine: {show: false},
                            shadowBlur: 40,
                            shadowColor: 'rgba(40, 40, 40, 0.5)',
                        }
                    };
                    var placeHolderStyle = {
                        normal: {
                            color: 'rgba(0,0,0,0)',
                            label: {show: false},
                            labelLine: {show: false}
                        },
                        emphasis: {
                            color: 'rgba(0,0,0,0)'
                        }
                    };
                    var option = {
                        color: ['#85b6b2', '#6d4f8d', '#cd5e7e', '#e38980', '#f7db88'],
                        tooltip: {
                            show: true,
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        series: [
                            {
                                name: '新闻',
                                type: 'pie',
                                clockWise: false,
                                center: ['50%', '50%'],
                                radius: [160, 180],
                                itemStyle: dataStyle,
                                hoverAnimation: false,
                                data: [{
                                    value: news.value
                                },
                                    {
                                        value: numberLength.resetNumberType(news.value),
                                        name: 'invisible',
                                        itemStyle: placeHolderStyle
                                    }
                                ]
                            },
                            {
                                name: '微博',
                                type: 'pie',
                                clockWise: false,
                                center: ['50%', '50%'],
                                radius: [180, 200],
                                itemStyle: dataStyle,
                                hoverAnimation: false,
                                data: [{
                                    value: weiBo.value
                                },
                                    {
                                        value: numberLength.resetNumberType(weiBo.value),
                                        name: 'invisible',
                                        itemStyle: placeHolderStyle
                                    }

                                ]
                            },

                            {
                                name: '论坛',
                                type: 'pie',
                                clockWise: false,
                                hoverAnimation: false,
                                center: ['50%', '50%'],
                                radius: [100, 120],
                                itemStyle: dataStyle,
                                data: [
                                    {
                                        value: luntan.value
                                    },
                                    {
                                        value: numberLength.resetNumberType(luntan.value),
                                        name: 'invisible',
                                        itemStyle: placeHolderStyle
                                    }
                                ]
                            },
                            {
                                name: '评论',
                                type: 'pie',
                                clockWise: false,
                                center: ['50%', '50%'],
                                hoverAnimation: false,
                                radius: [140, 160],
                                itemStyle: dataStyle,
                                data: [
                                    {
                                        value: pinglun.value
                                    },
                                    {
                                        value: numberLength.resetNumberType(pinglun.value),
                                        name: 'invisible',
                                        itemStyle: placeHolderStyle
                                    }
                                ]
                            },
                            {
                                name: '贴吧',
                                type: 'pie',
                                clockWise: false,
                                center: ['50%', '50%'],
                                hoverAnimation: false,
                                radius: [120, 140],
                                itemStyle: dataStyle,
                                data: [
                                    {
                                        value: tieba.value
                                    },
                                    {
                                        value: numberLength.resetNumberType(tieba.value),
                                        name: 'invisible',
                                        itemStyle: placeHolderStyle
                                    }
                                ]
                            },


                        ]
                    };

                    // var option = {
                    //     tooltip: {
                    //         trigger: 'item',
                    //         formatter: "{a} <br/>{b}: {c} ({d}%)"
                    //     },
                    //     legend: {
                    //         orient: 'vertical',
                    //         x: 'right',
                    //         data:lengeds
                    //     },
                    //     series: [
                    //         {
                    //             name:'情感类型',
                    //             type:'pie',
                    //             radius: ['40%', '60%'],
                    //             label: {
                    //                 normal: {
                    //                     show: false,
                    //                     // position: 'center',
                    //                     textStyle: {
                    //                         fontSize: 20
                    //                     }
                    //                 },
                    //                 emphasis: {
                    //                     show: true,
                    //                     textStyle: {
                    //                         fontSize: '30',
                    //                         fontWeight: 'bold'
                    //                     }
                    //                 }
                    //             },
                    //             labelLine: {
                    //                 normal: {
                    //                     show: false
                    //                 }
                    //             },
                    //             data: seriesData
                    //         }
                    //     ]
                    // };

                    resolve(option);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
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

const utils = {
    resetArticleTypeName: function (source) {
        var target = '';
        switch (source) {
            case 'news':
                target = '新闻';
                break;
            case 'weibo':
                target = '微博';
                break;
            case 'bbs':
                target = '论坛';
                break;
            case 'bar':
                target = '贴吧';
                break;
            case 'comment':
                target = '评论';
                break;
        }

        return target;
    }
}
const emotion = {
    resetEmotionTypeName: function (source) {
        var type = '';
        switch (source) {
            case 'pos':
                type = '正面';
                break;
            case 'neg':
                type = '负面';
                break;
            case 'neu':
                type = '中性';
                break;

        }

        return type;
    }
}
const numberLength = {
    resetNumberType: function (num) {
        var numbers = 0;
        var l = num.toString().length;
        console.log(l);
        if (l == 3) {
            numbers = num / 2 - 100;
        } else if (l == 4) {
            numbers = num / 2 - 1000;
        } else if (l >= 5) {
            numbers = num / 2 - 10000;
        } else {
            numbers = num
        }
        return numbers
    }

}

export default {
    actions
}
