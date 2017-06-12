/**
 * Created by lyc on 17-6-9.
 */
import jquery from '../api';
const $ = jquery.jQuery;

import common from '../common'

const actions = {
    getSearchArticles: function (pageSize, currentPage, condition) {
        var param = {
            "keyword": {
                "mustNotWord": condition.mustNotWord,
                "mustWord": condition.mustWord,
                "shouldWord": condition.shouldWord
            },
            "page": {
                "limit": pageSize,
                "orders": [
                    {
                        "direction": "DESC",
                        "orderBy": "dateCreated"
                    }
                ],
                "page": currentPage
            }
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/findPageByMustShouldDateInType',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    data.content.forEach(function (item) {
                        item.title = item.title.replace(new RegExp('<[^>].*?>', 'gi'), '').replace("&nbsp;", "");
                        item.content = item.content.replace(new RegExp('<[^>].*?>', 'gi'), '').replace(/&nbsp;/ig, "");
                        item.title = item.title.length > 40 ? item.title.substring(0, 40) + "..." : item.title;
                        item.content = item.content.length > 100 ? item.content.substring(0, 100) + "..." : item.content;
                    });
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },

    getSearchArticlesTemp: function (pageSize, currentPage, condition) {
        var param = {
            "mustNotWord": condition.mustNotWord,
            "mustWord": condition.mustWord,
            "shouldWord": condition.shouldWord,
            "size": pageSize,
            "page": currentPage
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/findPageByMustShouldDateInType.json',
                contentType: "application/json; charset=utf-8",
                data: param,
                type: 'get',
                success: function (data) {
                    debugger;
                    data.content.forEach(function (item) {
                        item.title = item.title.replace(new RegExp('<[^>].*?>', 'gi'), '').replace("&nbsp;", "");
                        item.content = item.content.replace(new RegExp('<[^>].*?>', 'gi'), '').replace(/&nbsp;/ig, "");
                        item.title = item.title.length > 40 ? item.title.substring(0, 40) + "..." : item.title;
                        item.content = item.content.length > 100 ? item.content.substring(0, 100) + "..." : item.content;
                    });
                    resolve(data);
                }
            });
        });
    },
};


export default {
    actions
}
