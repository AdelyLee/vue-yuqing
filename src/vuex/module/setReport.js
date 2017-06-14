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
                url: common.url.webserviceUrl + '/briefingTask/4',
                contentType: "application/json; charset=utf-8",
                type: 'get',
                success: function (data) {
                    data.hours = data.hours + ":00";
                    resolve(data);
                },
            });
        });
    },

    //保存
    editMonthlyReportSetting: function (briefingConfig) {
        $.ajax({
            url: common.url.webserviceUrl + '/briefingTask/' + briefingConfig.id,
            data: JSON.stringify(briefingConfig),
            contentType: "application/json; charset=utf-8",
            type: 'put',
            success: function (data) {
                console.log("edit monthly report success");
            }
        });
    }
};

export default {
    actions
}
