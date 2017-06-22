
import jquery from '../api';
const $ = jquery.jQuery;
import common from '../common'
import dateUtil from '../dateUtil'
import queryParam from '../utils'
import typeUtil from '../typeUtil'
import utils from '../utils'

const actions = {
    // 获取关键词
    config: utils.utils.getUserBaseKeyword(),
    // 获取高亮的词
    heightLightWords: utils.utils.getBaseHeightLightKeywords(),
    // 点击显示article列表
    getArticleListByCondition: function (pageSize, currentPage) {
        var self = this;
        var param = {
            "keyword": {
                "mustWord": self.config.mustWord,
                "shouldWord": self.config.shouldWord,
                "mustNotWord": self.config.mustNotWord
            },
            "page": {
                "limit": pageSize,
                "page": currentPage,
                "orders": [{
                    "direction": "DESC",
                    "orderBy": "dateCreated"
                }]
            }
        };
        return new Promise(function (resolve) {

            $.ajax({
                url: common.url.webserviceUrl + '/collect/searchCollect',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                async:false,
                success: function (data) {
                    data.content.sort(function(a,b) {return b.pubTime-a.pubTime});
                    data.content.forEach(function (item) {
                        item.type = item.type.toLowerCase();
                        if (item.type == 'weibo') {
                            item.title = item.content;
                        }
                        item.nlp.sentiment.label = typeUtil.typeUtil.sentimentType(item.nlp.sentiment.label);
                        item.pubTime = dateUtil.dateUtil.formatDate(new Date(item.pubTime), 'yyyy/MM/dd');
                        item.title = utils.utils.heightLightKeywords(item.title, 50, '...', self.heightLightWords);
                        item.content = utils.utils.heightLightKeywords(item.content, 200, '...', self.heightLightWords);
                    });
                    resolve(data);
                }
            });
        });
    }
}
export default {
    actions
}
