/**
 * Created by lyc on 17-5-17.
 * echarts 画图工具类, 引入jquery使用jquery的深度copy 和数据请求get方法
 * 引用 MapChartUtil 是对地图geoJson数据进行处理.
 *
 * drawLineBarChart 画这线图或者柱状图
 *
 * drawPieChart 画饼图
 *
 * drawMapChart 渲染地图
 * 地图下钻的功能不能实现可配置花,可以根据自己的调用改渲染方法时,控制逻辑来实现
 *
 * 引入d3实现关键词云图
 *
 */

var echarts = require('echarts');
var d3 = require('d3');
var d3LayoutCloud = require("d3-cloud");
var $ = require('jquery');
var MapChartUtil = require('./MapChartUtil.js');

var chart = (function () {
    var module = {};

    module.drawLineBarChart = function (containerId, option, events) {
        var myChart = echarts.init(document.getElementById(containerId));
        // 指定图表默认配置项和数据
        var defaultOption = {
            tooltip: {},
            xAxis: {
                data: ["a", "b", "c", "d", "e", "f"]
            },
            yAxis: {},
            series: [{
                name: '数量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 如果option不为空，清空　defaultOption　的数据．
        if (option != "" && option != undefined) {
            delete defaultOption.xAxis.data;

            for (var item of defaultOption.series) {
                item.data = [];
            }
        }

        $.extend(true, defaultOption, option);

        if (events) {
            for (var i in events) {
                var event = events[i];
                if (typeof event == 'function') {
                    myChart.on(i, event);
                }
            }
        }

        myChart.setOption(defaultOption);
    };

    module.drawPieChart = function (containerId, option, events) {
        var myChart = echarts.init(document.getElementById(containerId));
        // 指定图表默认配置项和数据
        var defaultOption = {
            tooltip: {},
            series: [
                {
                    name: '数量',
                    type: 'pie',
                    radius: '55%',
                    data: [
                        {value: 335, name: 'a'},
                        {value: 310, name: 'b'},
                        {value: 234, name: 'c'},
                        {value: 135, name: 'd'},
                        {value: 1548, name: 'e'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        // 如果option不为空，清空　defaultOption　的数据．
        if (option != "" && option != undefined) {
            for (var item of defaultOption.series) {
                item.data = [];
            }
        }
        $.extend(true, defaultOption, option);

        if (events) {
            for (var i in events) {
                var event = events[i];
                if (typeof event == 'function') {
                    myChart.on(i, event);
                }
            }
        }

        myChart.setOption(defaultOption);
    };
    module.drawGuageChart = function (containerId, option, events) {
        var myChart = echarts.init(document.getElementById(containerId));
        // 指定图表默认配置项和数据
        var defaultOption = {
            tooltip: {},

            series: [
                {
                    name: '数量',
                    type: 'guage',
                    radius: '55%',
                    data: [
                        {value: 335, name: 'a'},
                        {value: 310, name: 'b'},
                        {value: 234, name: 'c'},
                        {value: 135, name: 'd'},
                        {value: 1548, name: 'e'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                }
            ]
        };

        // 如果option不为空，清空　defaultOption　的数据．
        if (option != "" && option != undefined) {
            for (var item of defaultOption.series) {
                item.data = [];
            }
        }
        $.extend(true, defaultOption, option);

        if (events) {
            for (var i in events) {
                var event = events[i];
                if (typeof event == 'function') {
                    myChart.on(i, event);
                }
            }
        }

        myChart.setOption(defaultOption);
    };

    module.drawMapChart = function (containerId, option, events) {
        var mapType = option.mapType == undefined ? "china" : option.mapType;
        var provinces = [];
        for (var province in MapChartUtil._provinceMap) {
            provinces.push(province);
        }

        function getJsonUrl(mapType) {
            var geoJsonName = "";
            var mapJsonUrl = '../../static/geoJson/china.json';
            if (mapType === 'china') {
                mapJsonUrl = '../../static/geoJson/china.json';
            } else if ($.inArray(mapType, provinces) !== -1) {
                geoJsonName = MapChartUtil._provinceMap[mapType];
                mapJsonUrl = '../../static/geoJson/geometryProvince/' + geoJsonName + '.json';
            } else {
                geoJsonName = MapChartUtil.cityMap[mapType];
                if (geoJsonName == undefined) {
                    mapJsonUrl = '../../static/geoJson/china.json';
                } else {
                    mapJsonUrl = '../../static/geoJson/geometryCounties/' + geoJsonName + '.json';
                }
            }

            return mapJsonUrl;
        }

        $.get(getJsonUrl(mapType), (mapJson) => {
            echarts.registerMap(mapType, mapJson);
            var myChart = echarts.init(document.getElementById(containerId));
            // 指定图表默认配置项和数据
            var defaultOption = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                series: [
                    {
                        name: '地图',
                        type: 'map',
                        mapType: mapType,
                        selectedMode: 'multiple',
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data: []
                    }
                ]
            };

            $.extend(true, defaultOption, option);

            if (events) {
                for (var i in events) {
                    var event = events[i];
                    if (typeof event == 'function') {
                        myChart.on(i, event);
                    }
                }
            }

            myChart.setOption(defaultOption);
        });

    };

    module.drawKeyWordsCloud = function (containerId, option) {
        var item = document.getElementById(containerId);
        var data = option.data;
        $(item).empty();
        var height = $(item).height();
        var width = $(item).width();
        var fill = d3.scale.category20();
        var scale = d3.scale.linear().domain(
            [0, data[0].score / 3, data[0].score]).range([10, 20, 50]);

        var layout = d3LayoutCloud()
            .size([width, height])
            .words(data.map(function (d) {
                return {
                    text: d.keyword,
                    size: scale(d.score)
                };
            })).padding(2).rotate(function () {
                return ~~(Math.random() * 2) * 90;
            }).font("Impact").fontSize(function (d) {
                return d.size;
            }).on("end", draw);

        layout.start();

        function draw(words) {
            d3.select(item).append("svg").attr("width", '100%').attr(
                "height", '100%').style("border-radius", width + "px").append(
                "g").attr("transform",
                "translate(" + width / 2 + "," + height / 2 + ")").selectAll(
                "text").data(words).enter().append("text").style("font-size",
                function (d) {
                    return d.size + "px";
                }).style("font-family", "黑体").style("fill", function (d, i) {
                return fill(i);
            }).attr("text-anchor", "middle").attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            }).text(function (d) {
                return d.text;
            });
        }

    };

    return module;
})();

module.exports = chart;
