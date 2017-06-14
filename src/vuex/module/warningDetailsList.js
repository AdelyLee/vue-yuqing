/**
 * Created by topcom on 2017/5/27.
 */
import jquery from '../api';
const $ = jquery.jQuery;
import common from '../common';
import dateUtil from '../dateUtil';
import queryParam from '../utils';
import typeParam from '../typeUtil';
import utils from '../utils'
const actions = {
    // 获取关键词
    config: utils.utils.getUserBaseKeyword(),
    // 获取高亮的词
    heightLightWords: utils.utils.getBaseHeightLightKeywords(),
    getWarningDetailsList: function (pageSize,currentPage) {
        var self = this;
        var searchId = queryParam.utils.getQueryVariable('id');
        var param = {
            id:searchId,
            page: currentPage,
            limit: pageSize
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/warningLog/info/'+searchId,
                data: param,
                type: 'get',
                success: function (data) {
                    var renderData = {};
                    renderData.limits = data.size;
                    renderData.pages = data.totalPages;
                    renderData.total = data.totalElements;
                    var datas = data.content;
                    var seriesData = [];
                    $.each(datas, function (i, item) {
                        var node = {};
                        node.author = item.author;
                        node.pubTime = dateUtil.dateUtil.formatDate(new Date(item.pubTime), "yyyy-MM-dd hh:mm:ss");
                        node.id = item.id;
                        node.type = typeParam.typeUtil.articleType(item.type);
                        node.emotion = typeParam.typeUtil.sentimentType(item.nlp.sentiment.label);
                        node.source = item.source;
                        node.title = utils.utils.heightLightKeywords(item.title, 30, '...', self.heightLightWords);
                        if(item.content && item.content != null) {
                            node.content = utils.utils.heightLightKeywords(item.content, 120, '...', self.heightLightWords);
                        }else {
                            node.content = "暂无数据";
                        }
                        node.url = item.url;
                        node.site = item.site;
                        seriesData.push(node);
                    });
                    renderData.seriesData = seriesData;
                    resolve(renderData);
                }
            });
        });
    }
}
export default {
    actions
}
