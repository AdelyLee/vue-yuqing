/**
 * Created by topcom on 2017/5/27.
 */
/**
 * Created by topcom on 2017/5/24.
 */
import $ from 'jquery'
import common from './common'
const searchData = {
    searchParam:function ( ) {
        var searchId = window.location.search.substr(4);
        var search = {};
        $.ajax({
            url:common.url.webserviceUrl+'/customSubject/'+searchId,
            type:'get',
            async:false,
            success:function(data){
                data.startDate = new Date(data.startDate).toJSON().substr(0,new Date(data.startDate).toJSON().indexOf("T"));
                data.endDate = new Date(data.endDate).toJSON().substr(0,new Date(data.endDate).toJSON().indexOf("T"));
                search = data;
            },
            error: function(error) {
            }
        })
        return search;
    }
}
const actions = {
    //current里面新闻情感类型
    getNewsEmotionPieChart: function () {
        var param = {
            groupName: 'nlp.sentiment.label',
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/news/filterAndGroupBy.json',
                data: param,
                type: 'get',
                success: function (data) {

                    // 拼装 chart option
                    var seriesData = [];
                    var lengeds = [];
                    $.each(data,function(i,item){
                        var node = {};
                        node.name = emotion.resetEmotionTypeName(item.key);
                        node.value=item.value;
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
    //current里面新闻载体分析
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
                url: common.url.webserviceUrl + '/es/findByMustShouldDateInType.json',
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
    //current主流媒体
    getMediaBarChart: function () {
        var param = {
            groupName: 'source.raw',
            s_date: '2017-02',
            e_date: '2017-04',

        };

        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/news/filterAndGroupBy.json',
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
    getMediaReportTrendBar: function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/news/filterAndGroupByTime.json',
                async: true,
                data: {
                    s_date: '2017-02-01',
                    e_date: '2017-04-01',
                    dateType: 'day'
                },
                type: 'get',
                success: function (data) {
                    var renderData={};
                    var seriesData_a = [];
                    var seriesData_b = [];
                    var xAxisData = [];
                    var heatMax_a = [], heatMax_b = [];
                    $.each(data, function (i, item) {
                        var node = {};
                        var nodes = {};
                        var month_name = item.key.substr(0, 7);
                        if (month_name == "2017-02") {
                            node.name = item.key.substr(8);
                            node.value = item.value;
                            heatMax_a = item.value;
                            seriesData_a.push(node);
                        } else if (month_name == "2017-03") {
                            xAxisData.push(item.key.substr(8));
                            nodes.name = item.key.substr(8);
                            nodes.value = item.value;
                            heatMax_b = item.value;
                            seriesData_b.push(nodes);
                        }
                    });

                    var option = {
                        legend: {
                            x: 'right',
                            y: 'middle',
                            orient: 'vertical',
                            data: ['2017年2月', '2017年3月']
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
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                interval: 0,
                                rotate: 35,
                                textStyle: {
                                    fontWeight: 600,
                                    fontSize: 14
                                }
                            }
                        },
                        series: [
                            {
                                name: '2017年2月',
                                type: 'line',
                                data: seriesData_a
                            },
                            {
                                name: '2017年3月',
                                type: 'line',
                                data: seriesData_b

                            }
                        ]
                    };
                    renderData.option = option;
                    // renderData.description = "<div class = 'descript-text'>从媒体报道走势来看,<span class = 'highlight'>"+option.legend.data[0]+"</span><span class = 'highlight'>"+max_a+"日</span>、<span class = 'highlight'>"+option.legend.data[1]+"</span><span class = 'highlight'>"+max_b+"日</span>是媒体报道高峰,随后话题热度出现直线下降。</div>";

                    resolve(renderData);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    //网络主要观点分布
    getNetizenOptionPie:function(){
        var param = {
            "endDate": "2017-02",
            "startDate": "2017-01"
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/accidentYuqing/hotAccidentComment',
                data: JSON.stringify(param),
                type: 'Post',
                contentType:"application/json;charset=utf-8",
                success: function (data) {
                    data = data.sort(function (a, b) {
                        return b.value - a.value;
                    });
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
                                name:data[0].key,
                                type: 'pie',
                                clockWise: false,
                                center: ['50%', '50%'],
                                radius:[180,200],
                                itemStyle: dataStyle,
                                hoverAnimation: false,
                                data: [{
                                    value:data[0].value
                                },
                                    {
                                        value:4,
                                        // value: numberLength.resetNumberType(data[0].value),
                                        name: 'invisible',
                                        itemStyle: placeHolderStyle
                                    }
                                ]
                            },
                            {
                                name:data[1].key,
                                type: 'pie',
                                clockWise: false,
                                center: ['50%', '50%'],
                                radius:[160,180],
                                itemStyle: dataStyle,
                                hoverAnimation: false,
                                data: [{
                                    value:data[1].value
                                },
                                    {
                                        value:14,
                                        // value: numberLength.resetNumberType(data[1].value),
                                        name: 'invisible',
                                        itemStyle: placeHolderStyle
                                    }

                                ]
                            },
                            {
                                name:data[2].key,
                                type: 'pie',
                                clockWise: false,
                                hoverAnimation: false,
                                center: ['50%', '50%'],
                                radius:[140,160],
                                itemStyle: dataStyle,
                                data: [
                                    {
                                        value:data[2].value
                                    },
                                    {
                                        // value: numberLength.resetNumberType(data[2].value),
                                        value:24,
                                        name: 'invisible',
                                        itemStyle: placeHolderStyle
                                    }
                                ]
                            },


                            {
                                name:data[3].key,
                                type: 'pie',
                                clockWise: false,
                                center: ['50%', '50%'],
                                radius:[120,140],
                                hoverAnimation: false,
                                itemStyle: dataStyle,
                                data: [
                                    {
                                        value:data[3].value
                                    },
                                    {
                                        // value: numberLength.resetNumberType(data[3].value),
                                        value:34,
                                        name: 'invisible',
                                        itemStyle: placeHolderStyle
                                    }
                                ]
                            },
                            {
                                name:data[4].key,
                                type: 'pie',
                                clockWise: false,
                                center: ['50%', '50%'],
                                radius:[100,120],
                                hoverAnimation: false,
                                itemStyle: dataStyle,
                                data: [
                                    {
                                        value:data[4].value
                                    },
                                    {
                                        // value: numberLength.resetNumberType(data[4].value),
                                        name: 'invisible',
                                        value:44,
                                        itemStyle: placeHolderStyle
                                    }
                                ]
                            },

                        ]
                    };
                    resolve(option);
                },
                error: function (error) {
                    reject(error);
                }
            })

        })
    },
    getNetionTitleBar:function() {
        var mySearch = {};
        mySearch= searchData.searchParam();
        var param = {
            groupName: 'title.raw',
            mustWord:mySearch.mustWord,
            shouldWord:mySearch.shouldWord,
            mustNotWord:mySearch.mustNotWord,
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
                    if(data.length>6) {
                        new_data = data.slice(0,6);
                    }else {
                        new_data = data;
                    }
                    // 拼装 chart option
                    var seriesData = [];
                    var yAxisData = [];
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
                                },
                                formatter:function(value, index) {
                                    return value.length>10?value.substr(0,10)+"...":value;
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
                    renderData.option = option;
                    resolve(renderData);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    getNetizenConsensusBar: function () {
        var mySearch = {};
        mySearch= searchData.searchParam();
        var param = {
            groupName: 'author',
            mustWord:mySearch.mustWord,
            shouldWord:mySearch.shouldWord,
            mustNotWord:mySearch.mustNotWord,
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
                        seriesData.push(item.value);
                        xAxisData.push(item.key);
                    });
                    var option = {
                        legend: {},
                        grid: {
                            left:80,
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
                                formatter:function(value, index) {
                                    return value.length>6?value.substr(0,6)+"...":value;
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
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    getNetizenMap: function () {
        var mySearch = {};
        mySearch= searchData.searchParam();
        var param = {
            groupName:'area',
            mustWord:mySearch.mustWord,
            shouldWord:mySearch.shouldWord,
            mustNotWord:mySearch.mustNotWord,
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
                    $.each(data, function(i, item){
                        var node = {};
                        node.name = item.key;
                        node.value = item.value;
                        seriesData.push(node);
                    });
                    seriesData.sort(function(a,b) {return b.value-a.value});
                    maxCount = seriesData[0].value==undefined?10:seriesData[0].value;
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
                            text: ['高','低'],           // 文本，默认为数值文本
                            calculable: true,
                            inRange: {
                                color: ['#B7EEEB','#FEFDC7','#FCC171','#F27449', '#DB3B29'],
                            },

                        },
                        series: [
                            {
                                name:'地域分布',
                                type:'map',
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
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    getKeywordsChart:function() {
        var mySearch = {};
        mySearch= searchData.searchParam();
        var param = {
            mustWord:mySearch.mustWord,
            shouldWord:mySearch.shouldWord,
            mustNotWord:mySearch.mustNotWord,
            s_date: mySearch.startDate,
            e_date: mySearch.endDate,
            limit:50
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/hotWords.json',
                data: param,
                type: 'get',
                success: function (data) {
                    data.sort(function(a,b) {return b.value-a.value});
                    var renderData = {};
                    var seriesData = {"data":[]};
                    $.each(data, function (i, item) {
                        var node = {};
                        node.keyword = item.key;
                        node.score = item.value;
                        seriesData.data.push(node);
                    });
                    renderData.description = "<div class = 'descript-text'>从词频分析，与话题相关的主要关联词汇包括，<span class = 'highlight'>\""+data[0].key+"\"、\""+data[1].key+"\"、\""+data[2].key+"\"、\""+data[3].key+"\"、\""+data[4].key+"\"、\""+data[5].key+"\"</span>等词</div>";
                    renderData.option = {"data":seriesData};
                    resolve(renderData);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    getNetizenOptions:function () {
        var mySearch = {};
        mySearch= searchData.searchParam();
        var param = {
            "date": {
                "endDate": mySearch.endDate,
                "startDate": mySearch.startDate
            },
            "keyword": {
                "mustNotWord": mySearch.mustNotWord,
                "mustWord": mySearch.mustWord,
                "shouldWord": mySearch.shouldWord
            }
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/comments/viewport',
                data: JSON.stringify(param),
                contentType:'application/json;charset=utf-8',
                type: 'post',
                success: function (data) {
                   debugger;
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
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
const numberLength = {
    resetNumberType: function (num) {
        var numbers = 0;
        var l = num.toString().length;
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
const emotion = {
    resetEmotionTypeName: function (source) {
        var type = '';
        switch (source) {
            case 'POS':
                type = '正面';
                break;
            case 'NEG':
                type = '负面';
                break;
            case 'NEU':
                type = '中性';
                break;
        }

        return type;
    }
}
export default {
    actions
}
