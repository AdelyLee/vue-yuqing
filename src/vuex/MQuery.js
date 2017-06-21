import jquery from './api';
const $ = jquery.jQuery;
import common from './common'

const Mquery = {
    MQueryParam : function () {
    this.select = [];
    this.where = [];
    this.groupBy = [];
    this.having = [];
    this.sortBy = [];
    this.limit = null;
    this.skip = null;
    this.from = null;
},
MQuery : function (param, successCallBack, failedCallBack, async) {
    this.successCallBack = successCallBack;
    this.failedCallBack = failedCallBack;
    if (async != undefined && async == false) {
        async = false;
    } else {
        async = true;
    }
    this.query = function () {
        $.ajax({
            async: async,
            type: 'post',
            url: common.url.webserviceUrl + '/report/aggregate.json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(param),
            dataType: "json",
            success: function (data) {
                if (successCallBack) {
                    successCallBack(data);
                }
            },
            error: function (res) {
                if (failedCallBack) {
                    failedCallBack(res);
                }
            }
        });
    };
},
};
export default {
    Mquery
}
