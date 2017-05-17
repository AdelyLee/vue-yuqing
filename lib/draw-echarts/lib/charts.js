/**
 * Created by lyc on 17-5-17.
 * echarts 画图工具类, 引入jquery使用jquery的深度copy 和数据请求get方法
 * 引用 MapChartUtil 是对地图geoJson数据进行处理.
 *
 * drawLineBarChart 画这线图或者柱状图
 *
 * drawPieChart 画饼图
 *
 * drawMapChart 渲染地图 TODO: 地图下钻的功能
 *
 */

var echarts = require('echarts');
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
            series : [
                {
                    name: '数量',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'a'},
                        {value:310, name:'b'},
                        {value:234, name:'c'},
                        {value:135, name:'d'},
                        {value:1548, name:'e'}
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
                        selectedMode : 'multiple',
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:[]
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

    return module;
})();
module.exports = chart;
