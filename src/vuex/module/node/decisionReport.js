/**
 * Created by lyc on 17-5-18.
 */
var url = require('./common.js');

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
            require("jsdom").env("", function (err, window) {
                if (err) {
                    console.error(err);
                    return;
                }
                var $ = require("jquery")(window);

                $.ajax({
                    url: url.esUrl + '/es/findByMustShouldDateInType.json',
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
            require("jsdom").env("", function (err, window) {
                if (err) {
                    console.error(err);
                    return;
                }
                var $ = require("jquery")(window);
                $.ajax({
                    url: url.mongodbUrl + '/accident/aggByTypes',
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
        });
    },
    getArticleTrendChart: function () {
        var param = {
            method: 'get',
            params: {
                mustWord: '事故@安全生产',
                startDate: '2017-01',
                endDate: '2017-02'
            }
        };
        return new Promise(function (resolve, reject) {
            require("jsdom").env("", function (err, window) {
                if (err) {
                    console.error(err);
                    return;
                }
                var $ = require("jquery")(window);
                $.ajax({
                    url: url.esUrl + '/es/filterAndGroupByTime.json',
                    contentType: "application/json; charset=utf-8",
                    data: param,
                    type: 'get',
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

module.exports = actions;
