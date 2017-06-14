/**
 * Created by lyc on 17-6-6.
 */
import jquery from '../api';
const $ = jquery.jQuery;
import common from '../common'
import dateUtil from '../dateUtil'
import typeUtil from '../typeUtil'

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
    // 获取联系人
    getUserContacts: function (pageSize, currentPage) {
        pageSize = pageSize == undefined ? 5 : pageSize;
        currentPage = currentPage == undefined ? 1 : currentPage;
        var param = {
            "limit": pageSize,
            "page": currentPage
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/contact/findByUser/',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    resolve(data);
                }
            });
        });
    },
    //创建用户
    createUserContacts: function (contact) {
        console.log("addUserContacts", JSON.stringify(contact));
        $.ajax({
            url: common.url.webserviceUrl + '/contact/',
            contentType: "application/json; charset=utf-8",
            async: false,
            data: JSON.stringify(contact),
            type: 'post',
            success: function (data) {
                console.log("create contact success");
            }
        });
    },
    //删除用户
    deleteUserContacts: function (contact) {
        $.ajax({
            url: common.url.webserviceUrl + '/contact/' + contact.id,
            contentType: "application/json; charset=utf-8",
            async: false,
            type: 'delete',
            success: function (data) {
                console.log("delete contact success");
            }
        });
    },
    //保存
    saveSetting: function (subject) {
        subject = util.encodeSubject(subject);
        console.log("editCustomSubject", JSON.stringify(subject));
        $.ajax({
            url: common.url.webserviceUrl + '/customSubject/' + subject.id,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(subject),
            async: false,
            type: 'put',
            success: function (data) {
                console.log("edit custom subject success");
            }
        });
    }
};

const util = {
    decodeSubject: function (subject) {
        subject.startDate = dateUtil.dateUtil.formatDate(new Date(subject.startDate), 'yyyy-MM-dd');
        subject.endDate = dateUtil.dateUtil.formatDate(new Date(subject.endDate), 'yyyy-MM-dd');
        switch (subject.state) {
            case 'CREATING':
                subject.state = '分析中';
                break;
            case 'COMPLETED':
                subject.state = '已完成';
                break;
        }

        if (subject.warning) {
            subject.warning.receiveStartTime = subject.warning.receiveStartTime + ":00";
            subject.warning.receiveEndTime = subject.warning.receiveEndTime + ":00";
            subject.warning.atWeekends = subject.warning.atWeekends.toString();
            var sentimentLabel = [], type = [];
            subject.warning.sentimentLabel.forEach(function (item) {
                sentimentLabel.push(typeUtil.typeUtil.sentimentType(item));
            });
            subject.warning.sentimentLabel = sentimentLabel;
            subject.warning.type.forEach(function (item) {
                type.push(typeUtil.typeUtil.articleType(item));
            });
            subject.warning.type = type;
        }

        return subject;
    },
    encodeSubject: function (subject) {
        if (typeof subject.startDate === "string") {
            subject.startDate = dateUtil.dateUtil.parseDate(subject.startDate);
        }
        if (typeof subject.endDate === "string") {
            subject.endDate = dateUtil.dateUtil.parseDate(subject.endDate);
        }
        delete subject.number;
        subject.startDate = subject.startDate.getTime();
        subject.endDate = subject.endDate.getTime();
        switch (subject.state) {
            case '分析中':
                subject.state = 'CREATING';
                break;
            case '已完成':
                subject.state = 'COMPLETED';
                break;
        }

        if (subject.warning) {
            subject.warning.receiveStartTime = parseInt(subject.warning.receiveStartTime.split(":")[0]);
            subject.warning.receiveEndTime = parseInt(subject.warning.receiveEndTime.split(":")[0]);
            subject.warning.atWeekends = !(subject.warning.atWeekends == "false");

            var sentimentLabel = [], type = [];
            subject.warning.sentimentLabel.forEach(function (item) {
                sentimentLabel.push(typeUtil.typeUtil.encodeSentimentType(item));
            });
            subject.warning.sentimentLabel = sentimentLabel;
            subject.warning.type.forEach(function (item) {
                type.push(typeUtil.typeUtil.encodeArticleType(item));
            });
            subject.warning.type = type;
        }

        return subject;
    }
};

export default {
    actions
}
