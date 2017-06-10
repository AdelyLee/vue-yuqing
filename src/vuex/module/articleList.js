/**
 * Created by topcom on 2017/5/27.
 */
/**
 * Created by topcom on 2017/5/24.
 */
import $ from 'jquery'
import common from './common'
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
    getNewsCurrentList: function (reportType, pageSize, currentPage) {
        reportType = reportType == undefined ? "MONTHLY" :  reportType;
        pageSize = pageSize == undefined ? 2 :  pageSize;
        currentPage = currentPage == undefined ? 1 :  currentPage;
        var mySearch = {};
        // mySearch = searchData.searchParam();
        var param = {
            // "date": {
            //     "startDate": "2017-01",
            //     "endDate": "2018"
            // },
            "page": {
                "limit": pageSize,
                "page": currentPage,
                "orders": [{
                    "direction": "DESC",
                    "orderBy": "dateCreated"
                }]
            },
            "type": reportType
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/findPageByMustShouldDateInType',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    resolve(data);
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
