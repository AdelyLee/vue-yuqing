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
import dateUtil from '../dateUtil'
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
                data.startDate = dateUtil.dateUtil.formatDate(new Date(data.startDate), "yyyy-MM-dd");
                data.endDate = dateUtil.dateUtil.formatDate(new Date(data.endDate), "yyyy-MM-dd");
                search = data;
            },
        })
        return search;
    },
    error: function (error) {
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
                                        color:[[0.3,'#E96C6C'],[0.7,'#D2DD2A'],[1,'#E96C6C']]
                                    }
                                },
                                axisLabel: {
                                    formatter: function(e) {
                                        switch (e + "") {
                                            case "0":
                                                return "负面";
                                            case "50":
                                                return "中性";
                                            case "100":
                                                return "正面";
                                            default:
                                                return "";
                                        }
                                    },
                                    textStyle: {
                                        fontSize: 15,
                                        fontWeight: ""
                                    }
                                },
                                data: [{value: parseInt(data.nlp.sentiment.value*100), name:typeParam.typeUtil.sentimentType(data.nlp.sentiment.label)}],

                            },
                        ]
                    };
                     data.option=option;
                    resolve(data);
                },
                error: function (error) {
                }
            });
        });
    },
    getCommentHotKeywordsChart: function (id) {
        debugger;
        var mySearch = searchData.searchParam();
        var param = {
            id:id,
            count:50
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl +'/keywords/hotkeywords',
                data: param,
                type: 'get',
                success: function (data) {
                    console.log(data);
                    debugger;
                    data.sort(function (a, b) {
                        return b.score - a.score
                    });
                    var renderData = {};
                    var seriesData = [];
                    $.each(data, function (i, item) {
                        var node = {};
                        node.keyword = item.key;
                        node.score = item.score;
                        seriesData.push(node);
                    });
                    renderData.option = {"data": seriesData};
                    console.log(renderData);
                    resolve(renderData);
                },
                error: function (error) {
                }
            });
        });
    },
}

export default {
    actions, searchData
}
