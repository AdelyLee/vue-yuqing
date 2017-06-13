import jquery from '../api';
const $ = jquery.jQuery;
import common from '../common';
import dateUtil from '../dateUtil'
import utils from '../utils'

const actions = {
    getContacts: function (pageSize, currentPage) {
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
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/contact/findByUser',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    resolve(data);
                }
            });
        });
    },

    addContact: function (contact) {
        var param = {
            "account": contact.account,
            "name": contact.name,
            "type": contact.type,
        };
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/contact/',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    resolve(data);
                }
            });
        });
    },

    deleteContact: function (contact) {
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/contact/' + contact.id,
                contentType: "application/json; charset=utf-8",
                type: 'delete',
                success: function (data) {
                    resolve(data);
                }
            });
        });
    },

    editContact: function (contact) {
        var param = {
            "account": contact.account,
            "name": contact.name,
            "type": contact.type,
        };
        return new Promise(function (resolve) {
            $.ajax({
                url: common.url.webserviceUrl + '/contact/' + contact.id,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'put',
                success: function (data) {
                    resolve(data);
                }
            });
        });
    },
};
export default {
    actions
}
