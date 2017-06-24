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
    //月份统计
    getYearReport: function (area, Presentation,date,month,atype2) {
        var now = new Date();
        var startTime="",endTime="";
        var dataTimes = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', 0), 'yyyy');
        if(Presentation === 'year'){
            startTime = new Date(dataTimes,0, 1).getTime() / 1000;
            endTime = new Date(dataTimes,11, 31).getTime() / 1000;
        }else{
            startTime = new Date(dataTimes,parseInt(month)-1, 1).getTime() / 1000;
            endTime = new Date(dataTimes,month,0).getTime() / 1000;
        }

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
        param.where = [{
            k:'atype',
            v:'煤矿'
        },{
            k: 'atime',
            v: startTime,
            o: '>='
        }, {
            k: 'atime',
            v: endTime,
            o: '<='
        }];
        if(area != 'all'){
           param.where.push({
              k:'province',
              v:area
           });
        };
        if(atype2 != 'all'){
          param.where.push({
             k:'atype2',
             v:atype2
          });
        };
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
            var timesseriesData = [];
            var deathnumberData = [];
            var xAxisData =[];
            $.each(data, function (i, item) {
                xAxisData.push(item._id.adate.month +'月份');
                timesseriesData.push(item.deathnumber);
                deathnumberData.push(item.times)

            });
            var option = {
                legend: {
                    data:['事故起数','死亡人数'],
                    align: 'left'
                },
                grid: {
                    //bottom: 100,
                    //left: 120
                },
                xAxis: {
                    data: xAxisData,
                    name: '月份',
                    axisLine: {
                        lineStyle: {
                            color: '#000000'
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        //rotate: 30,
                        textStyle: {
                            fontSize: 14
                        }
                    },
                },
                yAxis: [{
                    name: '数量',
                    axisLine: {
                        lineStyle: {
                            color: '#000000'
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        textStyle: {
                            fontSize: 14
                        }
                    }
                }],
                color : ['#0092ff', '#eba954', '#21b6b9', '#d74e67'],
                series: [
                    {
                        name: '事故起数',
                        type: 'bar',
                        data: timesseriesData,
                    },{
                        name: '死亡人数',
                        type: 'bar',
                        data: deathnumberData,
                    }
                ]
            };
            resolve(option);
        };
        var failedCallBack = function () {
        };
        new Mquery.Mquery.MQuery(param, successCallBack, failedCallBack,false).query();
        });
    },
    getWeekReport: function (area, Presentation,date,month,atype2) {
        var startTime="",endTime="";
        var dataTimes = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', 0), 'yyyy');
        if(Presentation === 'year'){
            startTime = new Date(dataTimes,0, 1).getTime() / 1000;
            endTime = new Date(dataTimes,11, 31).getTime() / 1000;
        }else{
            startTime = new Date(dataTimes,parseInt(month)-1, 1).getTime() / 1000;
            endTime = new Date(dataTimes,month,0).getTime() / 1000;
        }
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
            param.where = [{
                k:'atype',
                v:'煤矿'
            },{
                k: 'atime',
                v: startTime,
                o: '>='
            }, {
                k: 'atime',
                v: endTime,
                o: '<='
            }];
            if(area != 'all'){
                param.where.push({
                    k:'province',
                    v:area
                });
            };
            if(atype2 != 'all'){
                param.where.push({
                    k:'atype2',
                    v:atype2
                });
            };
            param.groupBy = [{
                k: 'adate',
                v: 'adate',
                o:'dayOfWeek',
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
                var weeks = [];
                var timesseriesData = [];
                var deathnumberData = [];
                $.each(data, function (i, item) {
                    switch (item._id.adate.dayOfWeek) {
                        case 1:
                            item._id.adate.dayOfWeek = '一';
                            break;
                        case 2:
                            item._id.adate.dayOfWeek = '二';
                            break;
                        case 3:
                            item._id.adate.dayOfWeek = '三';
                            break;
                        case 4:
                            item._id.adate.dayOfWeek = '四';
                            break;
                        case 5:
                            item._id.adate.dayOfWeek = '五';
                            break;
                        case 6:
                            item._id.adate.dayOfWeek = '六';
                            break;
                        case 7:
                            item._id.adate.dayOfWeek = '日';
                            break;

                    }
                    weeks.push('星期'+item._id.adate.dayOfWeek);
                    timesseriesData.push(item.deathnumber);
                    deathnumberData.push(item.times)

                });
                var option = {
                    legend: {
                        data:['事故起数','死亡人数'],
                        align: 'left'
                    },
                    xAxis: {
                        data: weeks,
                        name: '周',
                        axisLine: {
                            lineStyle: {
                                color: '#000000'
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            //rotate: 30,
                            textStyle: {
                                fontSize: 14
                            }
                        },
                    },
                    yAxis: [{
                        name: '数量',
                        axisLine: {
                            lineStyle: {
                                color: '#000000'
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            textStyle: {
                                fontSize: 14
                            }
                        }
                    }],
                    color : ['#0092ff', '#eba954', '#21b6b9', '#d74e67'],
                    series: [
                        {
                            name: '事故起数',
                            type: 'bar',
                            data: timesseriesData,
                        },{
                            name: '死亡人数',
                            type: 'bar',
                            data: deathnumberData,
                        }
                    ]
                };
                resolve(option);
            };
            var failedCallBack = function () {
            };
            new Mquery.Mquery.MQuery(param, successCallBack, failedCallBack,false).query();
        });
    },
    getTypeAccident: function (area, Presentation,date,month,atype2) {
        var startTime="",endTime="";
        var dataTimes = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', 0), 'yyyy');
        if(Presentation === 'year'){
            startTime = new Date(dataTimes,0, 1).getTime() / 1000;
            endTime = new Date(dataTimes,11, 31).getTime() / 1000;
        }else{
            startTime = new Date(dataTimes,parseInt(month)-1, 1).getTime() / 1000;
            endTime = new Date(dataTimes,month,0).getTime() / 1000;
        }
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
            param.where = [{
                k:'atype',
                v:'煤矿'
            },{
                k: 'atime',
                v: startTime,
                o: '>='
            }, {
                k: 'atime',
                v: endTime,
                o: '<='
            }];
            if(area != 'all'){
                param.where.push({
                    k:'province',
                    v:area
                });
            };
            if(atype2 != 'all'){
                param.where.push({
                    k:'atype2',
                    v:atype2
                });
            };
            param.groupBy = [{
                k: 'atype2',
                v: 'atype2'
            }];
            param.sortBy = [{
                k: 'times',
                v: '-1',
            },{
                k: 'deathnumber',
                v: '-1',
            }];
            var successCallBack = function (data) {
                var timesseriesData = [];
                var deathnumberData = [];
                var legend = [];
                $.each(data, function (i, item) {
                    var node = {},nodes={};
                    node.name = item._id.atype2;
                    node.value = item.times;
                    nodes.name =item._id.atype2;
                    nodes.value = item.deathnumber;
                    timesseriesData.push(node);
                    deathnumberData.push(nodes)
                    legend.push(node.name);

                });
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:legend
                    },
                        color : ['#0092ff', '#eba954', '#21b6b9', '#d74e67','#27727B',
                        '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                        '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'],
                    series: [
                        {
                            name:'事故起数',
                            type:'pie',
                            selectedMode: 'single',
                            radius: [0, '30%'],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            label: {
                                normal: {
                                    show: false
                                }
                            },
                            data:timesseriesData
                        },
                        {
                            name:'死亡人数',
                            type:'pie',
                            radius: ['40%', '55%'],
                            data:deathnumberData
                        }
                    ]
                };
                resolve(option);
            };
            var failedCallBack = function () {
            };
            new Mquery.Mquery.MQuery(param, successCallBack, failedCallBack,false).query();
        });
    },
    getProvinceAccident: function (area, Presentation,date,month,atype2) {
        var startTime="",endTime="";
        var dataTimes = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', 0), 'yyyy');
        if(Presentation === 'year'){
            startTime = new Date(dataTimes,0, 1).getTime() / 1000;
            endTime = new Date(dataTimes,11, 31).getTime() / 1000;
        }else{
            startTime = new Date(dataTimes,parseInt(month)-1, 1).getTime() / 1000;
            endTime = new Date(dataTimes,month,0).getTime() / 1000;
        }
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
            param.where = [{
                k:'atype',
                v:'煤矿'
            },{
                k: 'atime',
                v: startTime,
                o: '>='
            }, {
                k: 'atime',
                v: endTime,
                o: '<='
            }];
            if(area != 'all'){
                param.where.push({
                    k:'province',
                    v:area
                });
            };
            if(atype2 != 'all'){
                param.where.push({
                    k:'atype2',
                    v:atype2
                });
            };
            param.groupBy = [{
                k: 'province',
                v: 'province'
            }];
            param.sortBy = [{
                k: 'times',
                v: '-1',
            },{
                k: 'deathnumber',
                v: '-1',
            }];

            var successCallBack = function (data) {
                var timesseriesData = [];
                var deathnumberData = [];
                var xAxisData =[];
                $.each(data, function (i, item) {
                    xAxisData.push(item._id.province);
                    timesseriesData.push(item.deathnumber);
                    deathnumberData.push(item.times)

                });
                var option = {
                    legend: {
                        data:['事故起数','死亡人数'],
                        align: 'left'
                    },
                    grid: {
                        bottom: 100,
                        left: 120
                    },
                    xAxis: {
                        data: xAxisData,
                        name: '地区',
                        axisLine: {
                            lineStyle: {
                                color: '#000000'
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            rotate: 30,
                            textStyle: {
                                fontSize: 14
                            }
                        },
                    },
                    yAxis: [{
                        name: '数量',
                        axisLine: {
                            lineStyle: {
                                color: '#000000'
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            textStyle: {
                                fontSize: 14
                            }
                        }
                    }],
                    color : ['#0092ff', '#eba954', '#21b6b9', '#d74e67'],
                    series: [
                        {
                            name: '事故起数',
                            type: 'bar',
                            stack: '事故',
                            data: timesseriesData,
                        },{
                            name: '死亡人数',
                            type: 'bar',
                            stack: '事故',
                            data: deathnumberData,
                        }
                    ]
                };
                resolve(option);
            };
            var failedCallBack = function () {
            };
            new Mquery.Mquery.MQuery(param, successCallBack, failedCallBack,false).query();
        });
    },
    getAccidentList: function (area, Presentation,date,month,atype2) {
        var startTime="",endTime="";
        var dataTimes = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(date, 'M', 0), 'yyyy');
        if(Presentation === 'year'){
            startTime = new Date(dataTimes,0, 1).getTime() / 1000;
            endTime = new Date(dataTimes,11, 31).getTime() / 1000;
        }else{
            startTime = new Date(dataTimes,parseInt(month)-1, 1).getTime() / 1000;
            endTime = new Date(dataTimes,month,0).getTime() / 1000;
        }
        return new Promise(function (resolve) {
            var param = new Mquery.Mquery.MQueryParam();
            param.from = 'acc';
            //param.limit = 5;
            param.where = [{
                k:'atype',
                v:'煤矿'
            },{
                k: 'atime',
                v: startTime,
                o: '>='
            }, {
                k: 'atime',
                v: endTime,
                o: '<='
            },{
                k: 'sgjb',
                v: '重大事故,特大事故',
                o: 'in'
            }];
            if(area != 'all'){
                param.where.push({
                    k:'province',
                    v:area
                });
            };
            if(atype2 != 'all'){
                param.where.push({
                    k:'atype2',
                    v:atype2
                });
            };
            param.sortBy = [{
                k: 'times',
                v: '-1',
            },{
                k: 'deathnumber',
                v: '-1',
            }];
            var successCallBack = function (data) {
                data.forEach(function (item) {
                    item.atime = dateUtil.dateUtil.formatDate(new Date(item.atime), 'yyyy/MM/dd');
                });
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
