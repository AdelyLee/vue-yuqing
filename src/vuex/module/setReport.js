/**
 * Created by lyc on 17-6-6.
 */
import jquery from '../api';
const $ = jquery.jQuery;
import common from '../common'

const actions = {
    getMonthlyReportInfo: function () {
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/briefingTask/findByType?briefingType=MONTHLY',
                contentType: "application/json; charset=utf-8",
                type: 'post',
                success: function (data) {
                    data.hours = data.hours + ":00";
                    resolve(data);
                },
            });
        });
    },

    createMonthlyReportSetting: function (briefingConfig) {
        // 时间修改
        briefingConfig.hours = parseInt(briefingConfig.hours.split(":")[0]);
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/briefingTask/',
                data: JSON.stringify(briefingConfig),
                contentType: "application/json; charset=utf-8",
                type: 'post',
                success: function (data) {
                    console.log("create monthly report success");
                    resolve(data);
                }
            });
        });
    },

    //保存
    editMonthlyReportSetting: function (briefingConfig) {
        // 时间修改
        briefingConfig.hours = parseInt(briefingConfig.hours.split(":")[0]);
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/briefingTask/' + briefingConfig.id,
                data: JSON.stringify(briefingConfig),
                contentType: "application/json; charset=utf-8",
                type: 'put',
                success: function (data) {
                    console.log("edit monthly report success");
                    resolve(data);
                }
            });
        });
    }
};

export default {
    actions
}
