/**
 * Created by lyc on 17-6-9.
 */
import jquery from '../api';
const $ = jquery.jQuery;
import common from '../common'
import dateUtil from '../dateUtil'
import typeUtil from '../typeUtil'
import utils from '../utils'

const actions = {
    getSearchArticles: function (pageSize, currentPage, condition) {
        var heightLightWords = condition.mustWord + "@" + condition.shouldWord;
        if (typeof condition.startDate !== 'string') {
            condition.startDate = dateUtil.dateUtil.formatDate(condition.startDate, 'yyyy-MM-dd');
        }
        if (typeof condition.endDate !== 'string') {
            condition.endDate = dateUtil.dateUtil.formatDate(condition.endDate, 'yyyy-MM-dd');
        }
        var param = {
            "date": {
                "startDate": condition.startDate,
                "endDate": condition.endDate
            },
            "filed": condition.filed,
            "keyword": {
                "mustNotWord": condition.mustNotWord,
                "mustWord": condition.mustWord,
                "shouldWord": condition.shouldWord
            },
            "page": {
                "limit": pageSize,
                "orders": [{
                    "direction": condition.direction,
                    "orderBy": "pubTime"
                }],
                "page": currentPage
            },
            "searchKv": condition.searchKv,
            "type": condition.mediaTypes
        };
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/findPageByMustShouldDateInType',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    data.content.forEach(function (item) {
                        item.nlp.sentiment.label = typeUtil.typeUtil.sentimentType(item.nlp.sentiment.label);
                        item.type = item.type.toLowerCase();
                        if (item.type == 'weibo') {
                            item.title = item.content;
                        }
                        item.title = utils.utils.heightLightKeywords(item.title, 50, '...', heightLightWords);
                        item.content = utils.utils.heightLightKeywords(item.content, 140, '...', heightLightWords);

                        item.title = '<span>' + item.title + '</span>';
                        item.content = '<span>' + item.content + '</span>';
                    });
                    resolve(data);
                }
            });
        });
    }
};


export default {
    actions
}
