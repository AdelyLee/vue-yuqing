import Vue from 'vue'
import $ from 'jquery'
import commons from './commons'
const actions = {
    getPresentationList: function () {
        var param = {
            "date": {
                "startDate": "2017-01",
                "endDate": "2018"
            },
            "page": {
                "limit": 10,
                "page": 1
            },
            "type": "MONTHLY"
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: commons.url.esUrl + '/briefing/search',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(param),
                type: 'post',
                success: function (data) {
                    var datas=data.content;
                    var seriesData = [];
                    var lengeds = [];
                    $.each(datas, function (i, item) {
                        var node = {};
                        node.title = item.title;
                        node.time = item.dateCreated;
                        seriesData.push(node);
                        lengeds.push(node.title)
                    });
                    //var vm=new Vue({
                    //    el:"#listpresentation",
                    //    data:{
                    //        items:seriesData
                    //    }
                    //});
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }
}
export default {
    actions
}
