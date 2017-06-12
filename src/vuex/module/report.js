import jquery from '../api';
const $ = jquery.jQuery;
import common from '../common';
import dateUtil from '../dateUtil'
import utils from '../utils'

const actions = {
    getReportList: function (reportType, pageSize, currentPage) {
        reportType = reportType == undefined ? "MONTHLY" :  reportType;
        pageSize = pageSize == undefined ? 10 :  pageSize;
        currentPage = currentPage == undefined ? 1 :  currentPage;
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
                url: common.url.webserviceUrl + '/briefing/search',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    data.content.forEach(function(item){
                        item.createTime = dateUtil.dateUtil.formatDate(new Date(item.dateCreated), 'yyyy/MM/dd');
                    });
                    resolve(data);
                }
            });
        });
    },

    getBriefingJson: function () {
        var reportId = utils.utils.getQueryVariable('id');
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/briefing/detail/' + reportId,
                type: 'get',
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }
};
export default {
    actions
}
