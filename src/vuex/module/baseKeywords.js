/**
 * Created by lyc on 17-6-15.
 */
import jquery from '../api';
const $ = jquery.jQuery;
import common from '../common'

const actions = {
    editUserBaseKeywords: function (keywords) {
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/keywords/' + keywords.id,
                data: JSON.stringify(keywords),
                contentType: "application/json; charset=utf-8",
                type: 'put',
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
