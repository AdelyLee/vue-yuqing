/**
 * Created by Administrator on 2017/6/7.
 */
/**
 * Created by topcom on 2017/5/27.
 */
/**
 * Created by topcom on 2017/5/24.
 */
import jquery from '../api';
const $ = jquery.jQuery;
import common from '../common'
import queryParam from '../utils'
import dateUtil from '../dateUtil'
import typeParam from '../typeUtil'

// const searchData = {
//     searchParam: function () {
//         var searchId = queryParam.utils.getQueryVariable('id');
//         var search = {};
//         $.ajax({
//             url: common.url.webserviceUrl + '/customSubject/' + searchId,
//             type: 'get',
//                success: function (data) {
//                 data.startDate = dateUtil.dateUtil.formatDate(new Date(data.startDate), "yyyy-MM-dd");
//                 data.endDate = dateUtil.dateUtil.formatDate(new Date(data.endDate), "yyyy-MM-dd");
//                 search = data;
//             },
//         })
//         return search;
//     },
//     error: function (error) {
//     }
// }

const actions = {
    //新闻列表
    getNewsCurrentList: function (id) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/news/findById/'+id,
                contentType: "application/json; charset=utf-8",
                type: 'get',
                // async: false,
                success: function (data) {
                    console.log(data);
                    data.content=queryParam.utils.heightLightKeywords(data.content, data.content.length,'...',"","");
                    if(data.nlp.nameEntity.org){
                        data.content=heightLightKeywords.heightLightKeywords(data.content, data.content.length, '...', data.nlp.nameEntity.org,"","org_name");
                    }
                    if(data.nlp.nameEntity.place){
                        data.content=heightLightKeywords.heightLightKeywords(data.content, data.content.length, '...', data.nlp.nameEntity.place,"","area");
                    }
                    if(data.nlp.nameEntity.people){
                        data.content=heightLightKeywords.heightLightKeywords(data.content, data.content.length, '...', data.nlp.nameEntity.people,"","person_name");

                    }

                    var option = {
                        tooltip : {
                            formatter: "{a} <br/>{b} : {c}%"
                        },
                      grid:{
                            top:80
                      },
                        series:[
                            {
                                name: '情感类型',
                                startAngle:180,
                                endAngle:0,
                                min:0,
                                max:100,
                                type: 'gauge',
                                detail: {formatter:'{value}'},
                                radius: '85%',
                                // axisTick: {
                                //     splitNumber: 10
                                // },
                                axisLine:{
                                    show:true,
                                    lineStyle:{
                                        width:30,
                                        shadowBlur:0,
                                        color:[[0.3,'#E96C6C'],[0.7,'#52B5FF'],[1,'#D2DD2A']]
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
            });
        });
    },
    getCommentHotKeywordsChart: function (id) {
        debugger;
        // var mySearch = searchData.searchParam();
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
            });
        });
    },
}
const heightLightKeywords={
    heightLightKeywords:function (content, length, append, keywords, divider,className) {
        // var script_Pattern = "<script[^>]*?>[\\s\\S]*?<\/script>";    // '匹配js标签
        // var style_Pattern = "<style[^>]*?>[\\s\\S]*?<\/style>";      //'匹配style标签
        // var tag_Pattern = "<[^>].*?>";// '匹配html标签

        if (!content) {
            return '';
        }
        var temp;
        content = content.replace(new RegExp("&#60;", "gm"), '<');
        content = content.replace(new RegExp("&#62;", "gm"), '>');
        content = content.replace(new RegExp("<!--;", "gm"), '<style>');
        content = content.replace(new RegExp("-->;", "gm"), '</style>');
        // content = content.replace(new RegExp(script_Pattern, 'gi'), '');
        // content = content.replace(new RegExp(style_Pattern, 'gi'), '');
        // content = content.replace(new RegExp(tag_Pattern, 'gi'), '');
        if (divider == undefined) {
            divider = '@';
        }
        if (content.length < length) {
            length = content.length;
        }
        temp = content.substring(0, length);
        if (length != content.length && append != '') {
            temp += append;
        }
        var ks = [];
        if (typeof(keywords) != 'undefined') {
            if (keywords.constructor != Array) {// 如果不是数组,则形式为a@b@c,先分割为数组
                ks = keywords.split(divider);
                //去除为" "的元素
                for (var i = 0; i < ks.length; i++) {
                    if (ks[i].replace(/(^\s*)|(\s*$)/g, "") == '') {
                        ks.splice(i);
                    }
                }
            } else {
                ks = keywords;
            }
            for (var i = 0; i < ks.length; i++) {
                temp = temp.replace(new RegExp(ks[i], "gm"), '<font class='+className+'>' + ks[i] + '</font>');
            }
        }
        return temp;
    }
}

export default {
    actions
}
