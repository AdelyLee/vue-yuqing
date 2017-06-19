
import jquery from '../api';
const $ = jquery.jQuery;
import common from '../common'
import dateUtil from '../dateUtil'
import queryParam from '../utils'
import typeParam from '../typeUtil'
import utils from '../utils'

const actions = {
    // 获取关键词
    config: utils.utils.getUserBaseKeyword(),
    //趋势图
    getMediaReportTrendBar: function (time) {
        debugger;
        var self = this;
        var articleType = 'news';
        var param = {
            mustWord: self.config.mustWord,
            shouldWord: self.config.shouldWord,
            mustNotWord: self.config.mustNotWord,
            s_date: time.startDate,
            e_date: time.endDate,
            dateType: "day",
            articleType: articleType
        };
        debugger;
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupByTime.json',
                data: param,
                type: 'get',
                success: function (data) {
                    var xAxis = [];
                    var seriesData = {news: []};
                    var articleTypeArray = [];
                    articleTypeArray.push(articleType);
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
                            data: ["新闻"]
                        },
                        dataZoom: [{
                            startValue: time.startDate
                        }, {
                            type: 'inside'
                        }],
                        grid: {
                            bottom: '40',
                            containLabel: true
                        },
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
    }
}
export default {
    actions
}
