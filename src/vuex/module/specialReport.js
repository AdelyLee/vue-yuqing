/**
 * Created by topcom on 2017/5/24.
 */
import $ from 'jquery'
import common from './common'
import dateUtil from '../dateUtil'
import queryParam from '../utils'
import typeParam from '../typeUtil'
const searchData = {
    searchParam: function () {
        var searchId = queryParam.utils.getQueryVariable('id');
        var search = {};
        $.ajax({
            url: common.url.webserviceUrl + '/customSubject/' + searchId,
            type: 'get',
            async: false,
            success: function (data) {
                // 如果searchId为空
                if (data.content && data.content.length > 1) {
                    data = data.content[0];
                }

                data.startDate = dateUtil.dateUtil.formatDate(new Date(data.startDate), "yyyy-MM-dd");
                data.endDate = dateUtil.dateUtil.formatDate(new Date(data.endDate), "yyyy-MM-dd");

                search = data;
            },
            error: function (error) {
            }
        });

        return search;
    }
};
const actions = {
    getBriefingJson: function () {
        return new Promise(function (resolve, reject) {
            $.ajax({
                // url: common.url.webserviceUrl + '/briefing/detail/5928035494cdbe0088dce147',
                url: 'http://192.168.0.12:8081/briefingJson.json',
                type: 'get',
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    // 與情综述描述
    getSpecialSummarize: function () {
        var renderData = {};
        var mySearch = searchData.searchParam();
        var param = {
            mustWord: mySearch.mustWord,
            mustNotWord: mySearch.mustNotWord,
            shouldWord: mySearch.shouldWord,
            s_date: mySearch.startDate,
            e_date: mySearch.endDate
        };
        return new Promise(function (resolve, reject) {
            var option = {};
            var description = "调查报告发布至今,共产生相关话题的报道3375篇,其中新闻媒体报道3362篇,成为本次话题最主要的舆论传播阵地";
            renderData.description = description;
            renderData.option = option;

            resolve(renderData);
        });
    },
    //媒体报道情况分析
    getArticleTypeChart: function () {
        var mySearch = searchData.searchParam();
        var param = {
            groupName: 'type',
            mustWord: mySearch.mustWord,
            shouldWord: mySearch.shouldWord,
            mustNotWord: mySearch.mustNotWord,
            s_date: mySearch.startDate,
            e_date: mySearch.endDate
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupBy.json',
                data: param,
                type: 'get',
                success: function (data) {
                    // 拼装 chart option
                    var total = 0;
                    var renderData = {};
                    var seriesData = [];
                    $.each(data, function (i, item) {
                        var node = {};
                        node.name = typeParam.typeUtil.sentimentType(item.key);
                        node.value = item.value;
                        seriesData.push(node);
                        total += item.value;
                    });
                    var option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {},
                        calculable: true,
                        series: [
                            {
                                name: '媒体报道分析',
                                type: 'pie',
                                radius: [30, 110],
                                center: ['55%', '50%'],
                                roseType: 'area',
                                data: seriesData
                            }
                        ]
                    };

                    var itemsStr = "";
                    seriesData.forEach(function (item, i) {
                        if (i < 3) {
                            itemsStr += "<span class='describe-redText'>" + item.name + item.value + "(" + (item.value * 100 / total).toFixed(2) + "%)</span>、";
                        }
                    });
                    itemsStr = itemsStr.substring(0, itemsStr.length - 1) + "。";
                    var description = "<div class='describe-text'>根据互联网抓取的数据，对数据载体进行分析，共抓取数据<span class='describe-redText'>" + total + "</span>条，其中排名前三的为" + itemsStr + "</div>";
                    renderData.descriptiontwo = "<div class = 'describe-text'>调查报告发布至今,共产生相关话题的报道<span class = 'describe-redText'>" + total + "</span>篇,其中<span class = 'describe-redText'>" + seriesData[0].name + "</span>媒体报道<span class = 'describe-redText'>" + seriesData[0].value + "</span>篇,成为本次话题最主要的舆论传播阵地。</div>";
                    renderData.option = option;
                    renderData.description = description;

                    resolve(renderData);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    //新闻客户端舆情量对比
    getMediaBarChart: function () {
        var mySearch = searchData.searchParam();
        var param = {
            groupName: 'site',
            mustWord: mySearch.mustWord,
            shouldWord: mySearch.shouldWord,
            mustNotWord: mySearch.mustNotWord,
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
                        var node = {};
                        node.name = item.key;
                        node.value = item.value;
                        seriesData.push(node);
                        xAxisData.push(item.key.slice(0, 10));
                    });
                    var option = {
                        legend: {},
                        grid: {
                            top: 20,
                            bottom: 180,
                            left: 120
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
                            },
                        ]
                    };
                    var itemStr = "";
                    seriesData.forEach(function (item, i) {
                        if (i < 4) {
                            itemStr += "<span class='describe-redText'>" + item.name + "(" + item.value + ")" + "</span>、";
                        }
                    });

                    itemStr = itemStr.substring(0, itemStr.length - 1);

                    var description = "<div class='describe-text'>根据互联网抓取的数据，主流媒体报道较多的是" + itemStr + "等。</div>";
                    renderData.option = option;
                    renderData.description = description;
                    resolve(renderData);

                },
                error: function (error) {
                    reject(error);
                }
            });
        });

    },
    //媒体报道走势
    getArticleTrendChart: function () {
        var mySearch = searchData.searchParam();
        var param = {
            dateType: 'day',
            mustWord: mySearch.mustWord,
            shouldWord: mySearch.shouldWord,
            mustNotWord: mySearch.mustNotWord,
            s_date: mySearch.startDate,
            e_date: mySearch.endDate
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupByTime.json',
                async: true,
                data: param,
                type: 'get',
                success: function (data) {
                    var renderData = {};
                    var total = 0, seriesData = [], xAxisData = [], indexOfMax = 0, maxDate = "", indexOfMin = 0, minDate = "", legendData = [];
                    legendData.push("與情数目");
                    for (var item of data) {
                        var itemDate = dateUtil.dateUtil.parseDate(item.key);
                        var itemDateStr = dateUtil.dateUtil.formatDate(itemDate, 'yyyy-MM-dd');
                        xAxisData.push(itemDateStr);
                        seriesData.push(item.value);
                    }

                    // 获取数据的最高点和最地点
                    indexOfMax = seriesData.indexOf(Math.max.apply(Math, seriesData));
                    maxDate = xAxisData[indexOfMax];
                    indexOfMin = seriesData.indexOf(Math.min.apply(Math, seriesData));
                    minDate = xAxisData[indexOfMin];

                    // 获取所有数据总数
                    seriesData.forEach(function (value) {
                        total += value;
                    });

                    var option = {
                        legend: {
                            x: 'right',
                            y: 'middle',
                            orient: 'vertical',
                            data: legendData
                        },
                        grid: {
                            left: '4%',
                            right: '150px',
                            bottom: '3%',
                            containLabel: true
                        },
                        color: ['#e7ba09', '#30a8dd'],
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: xAxisData,
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 700,
                                    fontSize: 16
                                }
                            }
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                interval: 0,
                                textStyle: {
                                    fontWeight: 600,
                                    fontSize: 18
                                }
                            }
                        },
                        series: [
                            {
                                name: "與情数目",
                                type: 'line',
                                data: seriesData
                            }
                        ]
                    };

                    // make ArticleTypeChart description
                    var description = '<div class="describe-text">根据最新舆情分析, 共抓取互联网数据'
                        + '<span class="describe-redText">' + total + '</span>条，其中<span class="describe-redText">' + maxDate
                        + '</span>日热度最高，共有数据<span class="describe-redText">' + seriesData[indexOfMax] + '</span>条。'
                        + '<span class="describe-redText">' + minDate
                        + '</span>日最低，共有数据<span class="describe-redText">' + seriesData[indexOfMin] + '</span>条。</div>';

                    renderData.option = option;
                    renderData.description = description;
                    resolve(renderData);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    //　网民舆论热点
    getArticleHotPointChart: function () {
        var mySearch = searchData.searchParam();
        var param = {
            groupName: 'title.raw',
            mustWord: mySearch.mustWord,
            shouldWord: mySearch.shouldWord,
            mustNotWord: mySearch.mustNotWord,
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
                                    fontWeight: 700,
                                    fontSize: 20
                                },
                                formatter: function (value, index) {
                                    return value.length > 10 ? value.substr(0, 10) + "..." : value;
                                }
                            }
                        },
                        grid: {
                            bottom: '10',
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
                    renderData.description = "<div class = 'describe-text'>参与话题讨论中，最为激烈的前<span class = 'describe-redText'>" + yAxisData.length + "</span>名话题分别为<span class = 'describe-redText'>" + yAxisData.join("，") + "</span>。</div>";
                    renderData.option = option;
                    resolve(renderData);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    //　热议网民
    getHotAuthorChart: function () {
        var mySearch = searchData.searchParam();
        var param = {
            groupName: 'author',
            mustWord: mySearch.mustWord,
            shouldWord: mySearch.shouldWord,
            mustNotWord: mySearch.mustNotWord,
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
                            left: 80,
                            bottom: 100
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
                                },
                                formatter: function (value, index) {
                                    return value.length > 6 ? value.substr(0, 6) + "..." : value;
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
                    renderData.description = "<div class = 'describe-text'>参与话题讨论的网民中，讨论最为激烈的前<span class = 'describe-redText'>" + xAxisData.length + "</span>名网民分别为<span class = 'describe-redText'>" + xAxisData.join("，") + "</span>。</div>";
                    renderData.option = option;
                    resolve(renderData);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    // 话题关注人群地域分布图
    getFocusPeopleMapChart: function () {
        var mySearch = searchData.searchParam();
        var param = {
            groupName: 'area',
            mustWord: mySearch.mustWord,
            shouldWord: mySearch.shouldWord,
            mustNotWord: mySearch.mustNotWord,
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
                    // data = [{key:"河北",value:1212},{key:"山东",value:45},{key:"江苏",value:890}];
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
                                name: '事故起数',
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
                    renderData.description = "<div class = 'describe-text'>从关注人群的地域分布来看，对参与话题讨论的网民言论样本进行分析发现，<span class = 'describe-redText'>" + seriesData[0].name + "(" + seriesData[0].value + ")</span>和<span class = 'describe-redText'>" + seriesData[1].name + "(" + seriesData[1].value + ")</span>对话题关注度最高，其次是<span class = 'describe-redText'>" + seriesData[2].name + "(" + seriesData[2].value + ")</span>。</div>";
                    renderData.option = option;
                    resolve(renderData);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    // 网民评论热点词词云分析
    getCommentHotKeywordsChart: function () {
        var mySearch = searchData.searchParam();
        var param = {
            mustWord: mySearch.mustWord,
            shouldWord: mySearch.shouldWord,
            mustNotWord: mySearch.mustNotWord,
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
                    renderData.description = "<div class = 'describe-text'>从词频分析，与话题相关的主要关联词汇包括，<span class = 'describe-redText'>\"" + data[0].key + "\"、\"" + data[1].key + "\"、\"" + data[2].key + "\"、\"" + data[3].key + "\"、\"" + data[4].key + "\"、\"" + data[5].key + "\"</span>等词</div>";
                    renderData.option = {"data": seriesData};
                    resolve(renderData);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    //网络主要观点分布
    getCommentPieChart: function () {
        var mySearch = searchData.searchParam();
        var param = {
            "startDate": mySearch.startDate,
            "endDate": mySearch.endDate
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/accidentYuqing/hotAccidentComment',
                data: JSON.stringify(param),
                type: 'Post',
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    var renderData = {};
                    // 拼装 chart option
                    var seriesItems = [], legendData = [];
                    // 条数最多的占圆环的 80% 环的宽度为20
                    var maxItemValue = parseInt(data[0].value / 0.8);
                    data.forEach(function (item, i) {
                        var seriesItem = {
                            name: '相关品论分析',
                            type: 'pie',
                            clockWise: false,
                            radius: [160 - 20 * i, 180 - 20 * i],
                            itemStyle: {
                                normal: {
                                    label: {show: false},
                                    labelLine: {show: false},
                                    shadowBlur: 40,
                                    shadowColor: 'rgba(40, 40, 40, 0.5)',
                                }
                            },
                            hoverAnimation: false,
                            data: [
                                {
                                    value: item.value,
                                    name: item.key
                                },
                                {
                                    value: maxItemValue - item.value,
                                    name: 'invisible',
                                    itemStyle: {
                                        normal: {
                                            color: 'rgba(0,0,0,0)',
                                            label: {show: false},
                                            labelLine: {show: false}
                                        },
                                        emphasis: {
                                            color: 'rgba(0,0,0,0)'
                                        }
                                    }
                                }
                            ]
                        };
                        if (i < 5) {
                            seriesItems.push(seriesItem);
                            legendData.push(item.key);
                        }
                    });

                    var option = {
                        color: ['#85b6b2', '#6d4f8d', '#cd5e7e', '#e38980', '#f7db88'],
                        title: {
                            text: "相关言论",
                            left: "center",
                            top: "center",
                            textStyle: {
                                fontSize: 20,
                                fontWeight: 700
                            }
                        },
                        tooltip: {
                            show: true,
                            formatter: "{a} <br/>{b} : {c}"
                        },
                        legend: {
                            show: false,
                            itemGap: 12,
                            right: 'right',
                            data: legendData
                        },
                        series: seriesItems
                    };

                    var itemStr = "";
                    data.forEach(function (item, i) {
                        if (i < 3) {
                            itemStr += "<span class='describe-redText'>" + item.key + "(" + item.value + ")</span>、";
                        }
                    });
                    itemStr = itemStr.substring(0, itemStr.length - 1);
                    var description = "<div class='describe-text'>对互联网事故相关言论进行分析，网民关注一下几个方面：" + itemStr + "</div>";
                    renderData.option = option;
                    renderData.description = description;
                    resolve(renderData);
                },
                error: function (error) {
                    reject(error);
                }
            })

        })
    }
};
export default {
    actions
}
