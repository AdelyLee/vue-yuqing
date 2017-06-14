/**
 * Created by lyc on 17-6-6.
 */
import jquery from '../api';
const $ = jquery.jQuery;
import common from '../common'
import dateUtil from '../dateUtil'
import typeUtil from '../typeUtil'

const actions = {
    getCustomSubjectList: function (pageSize, currentPage) {
        pageSize = pageSize == undefined ? 10 : pageSize;
        currentPage = currentPage == undefined ? 1 : currentPage;
        var param = {
            "limit": pageSize,
            "page": currentPage
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/customSubject/findByUser/',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    var subjectLst = [];
                    var skip = pageSize * (currentPage - 1);
                    data.content.forEach(function (item, i) {
                        var subject = util.decodeSubject(item);
                        subject.number = skip + i + 1;

                        subjectLst.push(subject);
                    });
                    data.content = subjectLst;
                    resolve(data);
                }
            });
        });
    },

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

    createUserContacts: function (contact) {
        console.log("addUserContacts", JSON.stringify(contact));
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/contact/',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(contact),
                type: 'post',
                success: function (data) {
                    console.log("create contact success");
                    resolve(data);
                }
            });
        });
    },

    deleteUserContacts: function (contact) {
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/contact/' + contact.id,
                contentType: "application/json; charset=utf-8",
                type: 'delete',
                success: function (data) {
                    console.log("delete contact success");
                    resolve(data);
                }
            });
        });
    },

    createCustomSubject: function (subject) {
        subject.startDate = subject.startDate.getTime();
        subject.endDate = subject.endDate.getTime();
        console.log("createCustomSubject", JSON.stringify(subject));
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/customSubject/',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(subject),
                type: 'post',
                success: function (data) {
                    console.log("create custom subject success");
                    resolve(data);
                }
            });
        });
    },

    deleteCustomSubject: function (subject) {
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/customSubject/' + subject.id,
                contentType: "application/json; charset=utf-8",
                type: 'delete',
                success: function (data) {
                    console.log("delete custom subject success");
                    resolve(data);
                }
            });
        });
    },

    editCustomSubject: function (subject) {
        subject = util.encodeSubject(subject);
        console.log("editCustomSubject", JSON.stringify(subject));
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/customSubject/' + subject.id,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(subject),
                type: 'put',
                success: function (data) {
                    console.log("edit custom subject success");
                    resolve(data);
                }
            });
        });
    },

    updateCustomSubjectReport: function (subject) {
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/customSubject/updateReport/' + subject.id,
                contentType: "application/json; charset=utf-8",
                type: 'get',
                success: function (data) {
                    console.log("update custom subject report success");
                    resolve(data);
                }
            });
        });
    },

    getSubjectEstimate: function (subject) {
        if (typeof subject.startDate != 'string') {
            subject.startDate = dateUtil.dateUtil.formatDate(subject.startDate, 'yyyy-MM-dd');
        }
        if (typeof subject.endDate != 'string') {
            subject.endDate = dateUtil.dateUtil.formatDate(subject.endDate, 'yyyy-MM-dd');
        }
        var param = {
            "groupName": "_type",
            "mustWord": subject.mustWord,
            "shouldWord": subject.shouldWord,
            "mustNotWord": subject.mustNotWord,
            "s_date": subject.startDate,
            "e_date": subject.endDate
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/es/filterAndGroupBy.json',
                contentType: "application/json; charset=utf-8",
                data: param,
                type: 'get',
                success: function (data) {
                    var estimateCount = 0;
                    if (data.length > 0) {
                        estimateCount = data[0].value;
                    }
                    resolve(estimateCount);
                }
            });
        });
    },

    getSpecialReportList: function (pageSize, currentPage) {
        pageSize = pageSize == undefined ? 10 : pageSize;
        currentPage = currentPage == undefined ? 1 : currentPage;
        var param = {
            "page": {
                "limit": pageSize,
                "page": currentPage,
                "orders": [{
                    "direction": "DESC",
                    "orderBy": "dateCreated"
                }]
            },
            "type": "SPECIAL"
        };
        console.log("getSpecialReportList", JSON.stringify(param));
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/briefing/searchByUser/',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    data.content.forEach(function (item) {
                        item.createTime = dateUtil.dateUtil.formatDate(new Date(item.dateCreated), 'yyyy/MM/dd');
                    });
                    resolve(data);
                }
            });
        });
    },

    getSpecialReport: function (pageSize, currentPage, subject) {
        pageSize = pageSize == undefined ? 10 : pageSize;
        currentPage = currentPage == undefined ? 1 : currentPage;
        var param = {
            "limit": pageSize,
            "page": currentPage,
            "orders": [{
                "direction": "DESC",
                "orderBy": "dateCreated"
            }]
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/briefing/subject/page/' + subject.id,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    data.content.forEach(function (item) {
                        item.createTime = dateUtil.dateUtil.formatDate(new Date(item.dateCreated), 'yyyy/MM/dd');
                    });
                    resolve(data);
                }
            });
        });
    },

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
            if (subject.warning.sentimentLabel) {
                subject.warning.sentimentLabel.forEach(function (item) {
                    sentimentLabel.push(typeUtil.typeUtil.sentimentType(item));
                });
            }
            subject.warning.sentimentLabel = sentimentLabel;
            if (subject.warning.type) {
                subject.warning.type.forEach(function (item) {
                    type.push(typeUtil.typeUtil.articleType(item));
                });
            }
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
