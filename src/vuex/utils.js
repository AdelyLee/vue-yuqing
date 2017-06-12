/**
 * Created by lyc on 17-6-6.
 */
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
    getCustomSubjectConfig: function() {
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
            },
            error: function (error) {
            }
        });

        return config;
    }
};

export default {
    utils
}
