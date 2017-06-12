/**
 * Created by lyc on 17-5-18.
 */

import jquery from '../api';
const $ = jquery.jQuery;
import common from '../common'
import queryParam from '../utils'

const actions = {
    getBriefingJson: function () {
        var reportId = queryParam.utils.getQueryVariable('id');
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/briefing/detail/' + reportId,
                type: 'get',
                success: function (data) {
                    resolve(data);
                }
            });
        });
    }
};
export default {
    actions
}

