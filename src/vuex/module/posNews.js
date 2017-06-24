import jquery from '../api'
const $ = jquery.jQuery
import common from '../common'
import dateUtil from '../dateUtil'
import queryParam from '../utils'
import typeUtil from '../typeUtil'
import utils from '../utils'

const actions = {
    // 获取关键词
    config: utils.utils.getUserBaseKeyword(),
    // 获取高亮的词
    heightLightWords: utils.utils.getBaseHeightLightKeywords(),
    //趋势图
    getMediaReportTrendBar: function (time, kv) {
        var self = this
        var articleType = 'news'
        var param = {
            mustWord: self.config.mustWord,
            shouldWord: self.config.shouldWord,
            mustNotWord: self.config.mustNotWord,
            s_date: time.startDate,
            e_date: time.endDate,
            dateType: 'day',
            articleType: articleType,
            kv: kv
        }
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupByTime.json',
                data: param,
                type: 'get',
                success: function (data) {
                    var xAxis = []
                    var seriesData = {news: []}
                    var articleTypeArray = []
                    articleTypeArray.push(articleType)
                    articleTypeArray.forEach(function (type) {
                        data[type].forEach(function (item) {
                            if (type == 'news') {
                                xAxis.push(item.key)
                            }
                            seriesData[type].push(item.value)
                        })
                    })
                    var myOption = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['新闻']
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
                    }
                    resolve(myOption)
                }
            })
        })
    },
    //主流媒体柱图
    getMediaBarChart: function (time, kv) {
        var self = this
        var param = {
            groupName: 'source',
            mustWord: self.config.mustWord,
            shouldWord: self.config.shouldWord,
            mustNotWord: self.config.mustNotWord,
            s_date: time.startDate,
            e_date: time.endDate,
            articleType: 'news',
            kv: kv
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupBy.json',
                data: param,
                type: 'get',
                success: function (data) {
                    var renderData = {}
                    var seriesData = []
                    var xAxisData = []
                    data = data.sort(function (a, b) {
                        return b.value - a.value
                    })
                    $.each(data, function (i, item) {
                        if (item.key != '') {
                            seriesData.push(item.value)
                            xAxisData.push(item.key.slice(0, 10))
                        }
                    })
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
                        barMaxWidth: 30,
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
                                            ]
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
                    resolve(option)
                }
            })
        })

    },
    //关键词云
    getKeywordsChart: function (time, kv) {
        var self = this
        var param = {
            mustWord: self.config.mustWord,
            shouldWord: self.config.shouldWord,
            mustNotWord: self.config.mustNotWord,
            s_date: time.startDate,
            e_date: time.endDate,
            limit: 50
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/hotWords.json',
                data: param,
                type: 'get',
                success: function (data) {
                    data.sort(function (a, b) {
                        return b.value - a.value
                    })
                    var renderData = {}
                    var seriesData = []
                    $.each(data, function (i, item) {
                        var node = {}
                        node.keyword = item.key
                        node.score = item.value
                        seriesData.push(node)
                    })
                    renderData.option = {'data': seriesData}
                    resolve(renderData)
                }
            })
        })
    },
    //新闻列表
    getArticleTabList: function (type, searchKv, time,orders) {
        var self = this
        var param = {
            'date': {
                'endDate': time.endDate,
                'startDate': time.startDate
            },
            'keyword': {
                'mustWord': self.config.mustWord,
                'shouldWord': self.config.shouldWord,
                'mustNotWord': self.config.mustNotWord,
            },
            // 'page': {
            //     'limit': 10,
            //     'page': 1,
            //     'orders': [{
            //         'direction': 'DESC',
            //         'orderBy': 'dateCreated'
            //     }],
            // },
            "page":orders,
            'searchKv': searchKv,
            'type': [type]
        }
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/findPageByMustShouldDateInType',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    data.emotion = ''
                    data.content.sort(function (a, b) {return b.pubTime - a.pubTime})
                    data.content.forEach(function (item) {
                        item.type = item.type.toLowerCase()
                        if (item.type == 'weibo') {
                            item.title = item.content
                        }
                        if (item.type == 'bbs') {
                            item.source = item.author
                        }
                        data.emotion = item.emotion = typeUtil.typeUtil.sentimentType(item.nlp.sentiment.label)
                        item.pubTime = dateUtil.dateUtil.formatDate(new Date(item.pubTime), 'yyyy/MM/dd')
                        item.title = utils.utils.heightLightKeywords(item.title, 20, '...', self.heightLightWords)
                    })
                    resolve(data)
                }
            })
        })
    },
    //保存收藏
    saveCollect: function (collect) {
        return new Promise(function (resolve) {
            var paramTrue = {
                oId: collect[0].key
            }
            debugger;
            $.ajax({
                url: common.url.webserviceUrl + '/collect/saveCollect2ES.json',
                data: paramTrue,
                type: 'get',
                success: function () {
                    resolve()
                    console.log('收藏成功')
                },
                error: function () {
                    console.log('收藏失败')
                }
            })
        })
    },
    //删除收藏
    deleteCollect: function (collect) {
        return new Promise(function (resolve) {
            var paramFalse = {
                oIds: collect[0].key
            }
            debugger;
            $.ajax({
                url: common.url.webserviceUrl + '/collect/deleteCollectedInOid',
                data: paramFalse,
                type: 'get',
                success: function () {
                    resolve()
                    console.log('删除成功')
                },
                error: function () {
                    console.log('删除失败')
                }
            })
        })
    },
    //获取是否收藏id
    getCollectOrID: function (collectID) {
        return new Promise(function (resolve) {
            var collectArray = []
            $.ajax({
                url: common.url.webserviceUrl + '/collect/hasCollected.json?oIds=' + collectID.join(','),
                type: 'get',
                success: function (data) {
                    collectArray = data
                    console.log('拿到了是否收藏的十个id')
                    resolve(collectArray)
                },
                error: function (error) {
                    console.log('没有拿到了是否收藏的十个id')
                }
            })
        })
    },
    // 点击显示article列表
    getArticleListByCondition: function (conditions,time, pageSize, currentPage) {
        var self = this
        var param = {
            'date': {
                'startDate': time.startDate,
                'endDate': time.endDate
            },
            'keyword': {
                'mustWord': self.config.mustWord,
                'shouldWord': self.config.shouldWord,
                'mustNotWord': self.config.mustNotWord
            },
            'page': {
                'limit': pageSize,
                'page': currentPage,
                'orders': [{
                    'direction': 'DESC',
                    'orderBy': 'dateCreated'
                }]
            },
            'searchKv': conditions.searchKv,
            'type': conditions.type
        }
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/findPageByMustShouldDateInType',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    data.content.sort(function (a, b) {return b.pubTime - a.pubTime});
                    data.content.forEach(function (item) {
                        item.type = item.type.toLowerCase();
                        if (item.type == 'weibo') {
                            item.title = item.content;
                        }
                        item.collect = false;
                        item.nlp.sentiment.label = typeUtil.typeUtil.sentimentType(item.nlp.sentiment.label);
                        item.pubTime = dateUtil.dateUtil.formatDate(new Date(item.pubTime), 'yyyy/MM/dd');
                        item.title = utils.utils.heightLightKeywords(item.title, 50, '...', self.heightLightWords);
                        item.content = utils.utils.heightLightKeywords(item.content, 200, '...', self.heightLightWords);
                    })
                    resolve(data);
                }
            })
        })
    }
}
export default {
    actions
}
