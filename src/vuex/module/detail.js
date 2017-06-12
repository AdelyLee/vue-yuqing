/**
 * Created by Administrator on 2017/6/7.
 */
/**
 * Created by topcom on 2017/5/27.
 */
/**
 * Created by topcom on 2017/5/24.
 */
import $ from 'jquery'
import common from '../common'
import queryParam from '../utils'

const searchData = {
    searchParam: function () {
        var searchId = queryParam.utils.getQueryVariable('id');
        var search = {};
        $.ajax({
            url: common.url.webserviceUrl + '/customSubject/' + searchId,
            type: 'get',
            async: false,
            success: function (data) {
                data.startDate = new Date(data.startDate).toJSON().substr(0, new Date(data.startDate).toJSON().indexOf("T"));
                data.endDate = new Date(data.endDate).toJSON().substr(0, new Date(data.endDate).toJSON().indexOf("T"));
                search = data;
            },
            error: function (error) {
            }
        })
        return search;
    }
}

const actions = {
    //新闻列表
    getNewsCurrentList: function (id) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/news/findById/'+id,
                contentType: "application/json; charset=utf-8",
                type: 'get',
                success: function (data) {
                  var option = {
                        tooltip : {
                            formatter: "{a} <br/>{b} : {c}%"
                        },
                      grid:{
                            top:80
                      },
                        series: [
                            {
                                name: '情感类型',
                                startAngle:180,
                                endAngle:0,
                                min:0,
                                max:100,
                                type: 'gauge',
                                detail: {formatter:'{value}'},
                                radius: '85%',
                                axisTick: {
                                    splitNumber: 10
                                },
                                axisLine:{
                                    show:true,
                                    lineStyle:{
                                        width:30,
                                        shadowBlur:0,
                                        color:[[0.3,'#52B5FF'],[0.7,'#D2DD2A'],[1,'#E96C6C']]
                                    }
                                },
                                axisLabel: {
                                    formatter: function(e) {
                                        switch (e + "") {
                                            case "0":
                                                return "正面";
                                            case "50":
                                                return "中性";
                                            case "100":
                                                return "负面";
                                            default:
                                                return "";
                                        }
                                    },
                                    textStyle: {
                                        fontSize: 15,
                                        fontWeight: ""
                                    }
                                },
                                data: [{value: parseInt(data.nlp.sentiment.value*100), name: emotion.resetEmotionTypeName(data.nlp.sentiment.lable)}],
                            }
                        ]
                    };
                     data.option=option;
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },
    getCommentHotKeywordsChart: function () {
        var mySearch = searchData.searchParam();
        var param = {
            mustWord: mySearch.mustWord,
            shouldWord: mySearch.shouldWord,
            mustNotWord: mySearch.mustNotWord,
            s_date: '',
            e_date: '',
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
                    renderData.option = {"data": seriesData};
                    console.log(renderData);
                    resolve(renderData);
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
            case 'comments':
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
    actions, searchData
}
