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
                url: common.url.webserviceUrl + '/es/findPageByMustShouldDateInType.json',
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
export default {
    actions, searchData
}
