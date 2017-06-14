/**
 * Created by lyc on 17-6-6.
 */
import jquery from './api'
const $ = jquery.jQuery;
import common from './common'
import dateUtil from './dateUtil'

const utils = {
    // 获取URL中的变量
    getQueryVariable: function (variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    },
    // 获取专题的关键词和专题时间
    getCustomSubjectConfig: function () {
        var subjectId = this.getQueryVariable('id');
        var config = {};
        $.ajax({
            url: common.url.webserviceUrl + '/customSubject/' + subjectId,
            type: 'get',
            async: false,
            success: function (data) {
                // 如果searchId为空
                if (data.content && data.content.length > 1) {
                    data = data.content[0];
                }

                data.startDate = dateUtil.dateUtil.formatDate(new Date(data.startDate), "yyyy-MM-dd");
                data.endDate = dateUtil.dateUtil.formatDate(new Date(data.endDate), "yyyy-MM-dd");

                config = data;
            }
        });

        return config;
    },

    // 获取用户基础关键词
    getUserBaseKeyword: function () {
        var config = {};
        $.ajax({
            url: common.url.webserviceUrl + '/keywords/findByUser/',
            type: 'get',
            async: false,
            success: function (data) {
                config = data;
            }
        });

        return config;
    },

    getBaseHeightLightKeywords: function () {
        var config = this.getUserBaseKeyword();

        return config.mustWord + "@" + config.shouldWord;
    },

    getCustomSubjectHeightLightKeywords: function(){
        var config = this.getCustomSubjectConfig();

        return config.mustWord + "@" + config.shouldWord;
    },

    // 高亮显示关键词
    heightLightKeywords: function (content, length, append, keywords, divider) {
        var script_Pattern = "<script[^>]*?>[\\s\\S]*?<\/script>";    // '匹配js标签
        var style_Pattern = "<style[^>]*?>[\\s\\S]*?<\/style>";      //'匹配style标签
        var tag_Pattern = "<[^>].*?>";// '匹配html标签

        if (!content) {
            return '';
        }
        var temp;
        content = content.replace(new RegExp("&#60;", "gm"), '<');
        content = content.replace(new RegExp("&#62;", "gm"), '>');
        content = content.replace(new RegExp("<!--;", "gm"), '<style>');
        content = content.replace(new RegExp("-->;", "gm"), '</style>');
        content = content.replace(new RegExp(script_Pattern, 'gi'), '');
        content = content.replace(new RegExp(style_Pattern, 'gi'), '');
        content = content.replace(new RegExp(tag_Pattern, 'gi'), '');
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
                temp = temp.replace(new RegExp(ks[i], "gm"), '<font style="color: red;">' + ks[i] + '</font>');
            }
        }
        return temp;
    }

};

export default {
    utils
}
