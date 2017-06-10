/**
 * Created by lyc on 17-6-1.
 */

const typeUtil = {
    briefingType: function (type) {
        var briefingType = "";
        type = type.toUpperCase();
        switch (type) {
            case 'DAILY':
                briefingType = "日报";
                break;
            case 'WEEKLY':
                briefingType = "周报";
                break;
            case 'MONTHLY':
                briefingType = "月报";
                break;
            case 'QUARTERLY':
                briefingType = "季报";
                break;
            case 'SEMIANNUAL':
                briefingType = "半年报";
                break;
            case 'ANNUAL':
                briefingType = "年报";
                break;
            case 'SPECIAL':
                briefingType = "专报";
                break;
        }

        return briefingType;
    },

    sentimentType: function (type) {
        var sentimentType = "";
        type = type.toLowerCase();
        switch (type) {
            case 'pos':
                sentimentType = "正面";
                break;
            case 'neg':
                sentimentType = "负面";
                break;
            case 'neu':
                sentimentType = "中性";
                break;
        }

        return sentimentType;
    },

    encodeSentimentType: function (type) {
        var sentimentType = "";
        switch (type) {
            case '正面':
                sentimentType = "POS";
                break;
            case '负面':
                sentimentType = "NEG";
                break;
            case '中性':
                sentimentType = "NEU";
                break;
        }

        return sentimentType;
    },

    articleType: function (type) {
        var articleType = '';
        type = type.toLowerCase();
        switch (type) {
            case 'news':
                articleType = '新闻';
                break;
            case 'weibo':
                articleType = '微博';
                break;
            case 'bbs':
                articleType = '论坛';
                break;
            case 'bar':
                articleType = '贴吧';
                break;
            case 'comments':
                articleType = '评论';
                break;
        }

        return articleType;
    },

    encodeArticleType: function (type) {
        var articleType = '';
        switch (type) {
            case '新闻':
                articleType = 'news';
                break;
            case '微博':
                articleType = 'weibo';
                break;
            case '论坛':
                articleType = 'bbs';
                break;
            case '贴吧':
                articleType = 'bar';
                break;
            case '评论':
                articleType = 'comments';
                break;
        }

        return articleType;
    }
};

export default {
    typeUtil
}
