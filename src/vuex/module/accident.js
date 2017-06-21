/**
 * Created by Administrator on 2017/6/21.
 */
import jquery from '../api';
const $ = jquery.jQuery;
import common from '../common'
import dateUtil from '../dateUtil'
import typeUtil from '../typeUtil'
import utils from '../utils'
import Mquery from '../MQuery'

const actions = {
    getYearReport: function (area, Presentation,date) {
        return new Promise(function (resolve) {
        var param = new Mquery.Mquery.MQueryParam();
        param.from = 'acc';
        param.select = [{
            k: 'deathnumber',
            v: 'sum'
        }, {
            k: 'times',
            v: 'count'
        }];
        param.groupBy = [{
            k: 'adate',
            v: 'adate',
            o:'month',
            t:'date'
        }];
        param.sortBy = [{
            k: 'times',
            v: '-1',
        },{
            k: 'deathnumber',
            v: '-1',
        }];

        var successCallBack = function (data) {
            console.log(data);
            resolve(data);
        };
        var failedCallBack = function () {
        };
        new Mquery.Mquery.MQuery(param, successCallBack, failedCallBack,false).query();
        });
    },
};
export default {
    actions
}
