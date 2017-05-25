/**
 * Created by topcom on 2017/5/24.
 */
import $ from 'jquery'
import common from './common'
const actions = {
    getMediaReportAnalysisPie: function () {
        var param = {
                groupName:'type',
                mustWord: '事故@安全生产',

        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.esUrl + '/es/filterAndGroupBy.json',
                data: param,
                type: 'get',
                success: function (data) {
                    // 拼装 chart option
                    console.log(data);
                    var seriesData = [];
                    $.each(data, function (i, item) {
                        var node = {};
                        node.name = utils.resetArticleTypeName(item.key);
                        node.value = item.value;
                        seriesData.push(node);
                    });
                   var option = {
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                        },
                        calculable : true,
                        series : [
                            {
                                name:'媒体报道分析',
                                type:'pie',
                                radius : [30, 110],
                                center : ['55%', '50%'],
                                roseType : 'area',
                                data:seriesData
                            }
                        ]
                    };

                    // var option = {
                    //     tooltip: {
                    //         trigger: 'item',
                    //         formatter: "{a} <br/>{b}: {c} ({d}%)"
                    //     },
                    //     legend: {},
                    //     series: [
                    //         {
                    //             name: '媒体类型',
                    //             type: 'pie',
                    //             radius: ['40%', '55%'],
                    //             label: {
                    //                 normal: {
                    //                     show: true,
                    //                     textStyle: {
                    //                         fontSize: 20
                    //                     }
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
    getNewsCountBar: function () {
    var param = {
        groupName: 'source.raw',
        mustWord: '煤矿@安全生产',
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
                        top:20,
                        bottom: 180,
                        left:120
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
                            rotate: 30,
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
                        },{
                            name: '媒体名称',
                            type: 'line',
                            data: seriesData,
                            itemStyle: {
                                normal: {
                                    color: '#C1232B'
                                }
                            },
                            lineStyle:{
                                normal: {
                                    color: '#C1232B'
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
    getAccidentReportBar: function () {
        var param = {

            groupName: 'title.raw',
            s_date: '2017-01',
            e_date: '2017-02'

        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.esUrl + '/es/filterAndGroupBy.json',
                // contentType: "application/json; charset=utf-8",
                data: param,
                type: 'get',
                success: function (data) {
                    var new_data = [];
                    if(data.length>6) {
                        new_data = data.slice(0,6);
                    }else {
                        new_data = data;
                    }
                    // 拼装 chart option
                    var seriesData = [];
                    var yAxisData = [];
                    // data = data.sort(function (a, b) {
                    //     return a.value -b.value;
                    // });
                    $.each(new_data, function(i, item){
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
                                    fontWeight: 700,
                                    fontSize: 20
                                }
                            }
                        },
                        grid: {
                            left: '10',
                            right: '10',
                            bottom: '10',
                            top: '10',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'value',
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 700,
                                    fontSize: 20
                                }
                            }
                        },
                        series: [
                            {
                                name:'舆论热点',
                                type:'bar',
                                data: seriesData,
                                itemStyle: {
                                    normal: {
                                        color: function(params) {
                                            // build a color map as your need.
                                            var colorList = [
                                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
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
    getNetizenConsensusBar: function () {
        var param = {
            groupName: 'title.raw',
            s_date: '2017-02',
            e_date: '2017-04',

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
                            left:300,
                            bottom: 300
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
export default {
    actions
}
