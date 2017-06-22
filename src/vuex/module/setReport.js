/**
 * Created by lyc on 17-6-6.
 */
import jquery from '../api';
const $ = jquery.jQuery;
import common from '../common'

const actions = {
    getReportInfo: function (briefingType) {
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/briefingTask/findByType?briefingType=' + briefingType,
                contentType: "application/json; charset=utf-8",
                type: 'post',
                success: function (data) {
                    data.cronExpression.hour = data.cronExpression.hour + ":00";
                    resolve(data);
                },
            });
        });
    },

    //保存
    editMonthlyReportSetting: function (briefingConfig) {
        // 时间修改
        briefingConfig.cronExpression.hour = parseInt(briefingConfig.cronExpression.hour.split(":")[0]);
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/briefingTask/' + briefingConfig.id,
                data: JSON.stringify(briefingConfig),
                contentType: "application/json; charset=utf-8",
                type: 'put',
                success: function (data) {
                    console.log("edit " + briefingConfig.briefingType  + "report success");
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    },

};

export default {
    actions
}
