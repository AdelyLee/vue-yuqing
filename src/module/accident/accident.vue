<template>
    <div id="accident">
        <common-header></common-header>
        <el-row :gutter="5">
            <el-col :span="3">
                <common-menu></common-menu>
            </el-col>
            <el-col :span="21">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <div class="card-body" id="content">
                        <el-row :gutter="15">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="地区:">
                                <el-select v-model="formInline.area" placeholder="地区">
                                    <el-option label="全国" value="all"></el-option>
                                    <el-option v-for="option in province" :label="option" :value="option">
                                    {{ option}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="煤矿类型:">
                                <el-select v-model="formInline.atype2" placeholder="煤矿类型">
                                    <el-option label="全部" value="all"></el-option>
                                    <el-option v-for="option in atype2" :label="option" :value="option">
                                        {{ option}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="报告类型:">
                                <el-select v-model="formInline.Presentation" placeholder="报告类型">
                                    <el-option label="年报" value="year"></el-option>
                                    <el-option label="月报" value="month"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="年份:">
                                <el-date-picker
                                    v-model="formInline.date"
                                    align="right"
                                    type="year"
                                    :picker-options="pickerOptions0"
                                    placeholder="选择年份">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item v-if="formInline.Presentation=='month'" label="月份:">
                                <el-select v-model="formInline.month" placeholder="月份">
                                    <el-option v-for="option in times" :label="option"  :value="option">
                                        {{ option}}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-button type="primary" @click="onSubmit(formInline)">查询</el-button>
                        </el-form>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="14" class="lists">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span class="chart-text">高发事故图</span>
                                    </div>
                                    <bar-chart :chartConfig="highAccident" v-loading="loading"></bar-chart>
                                </el-card>
                            </el-col>
                            <el-col :span="10" class="lists">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span class="chart-text">高发事故图</span>
                                    </div>
                                    <bar-chart :chartConfig="weeklyhighAccident" v-loading="loading"></bar-chart>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="10" class="lists">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span class="chart-text">行业领域事故图</span>
                                    </div>
                                    <pie-chart :chartConfig="industryHighAccident" v-loading="loading"></pie-chart>
                                </el-card>
                            </el-col>
                            <el-col :span="14" class="lists">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span class="chart-text">地区事故分析图</span>
                                    </div>
                                    <bar-chart :chartConfig="areaHighAccident" v-loading="loading"></bar-chart>
                                </el-card>
                            </el-col>
                        </el-row>
                        <accident-list :accidentData="accidentData" :sgjb="sgjb" v-loading="loading"></accident-list>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Header from '@/components/commons/header';
    import CommonMenu from '@/components/commons/menu';
    import LineBarChart from '@/components/commons/charts/line-bar';
    import PieChart from '@/components/commons/charts/pie';
    import Accident from '@/components/accident/accidentList';
    import typeUtil from '../../vuex/typeUtil';
    import dateUtil from '../../vuex/dateUtil';
    import service from '../../vuex/module/accident.js';

    import $ from 'jquery';

    export default {
        name: 'accident',
        data () {
            return {
                loading: true,
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() ;
                    }
                },
                formInline: {
                    area: 'all',
                    atype2: 'all',
                    Presentation: 'year',
                    date: '',
                    startTime:'',
                    endTime:'',
                    month:'1'
                },
                highAccident: {
                    chartId: 'highAccident',
                    option: {},
                    events: {
                        'click': function (param) {

                        }
                    }
                },
                weeklyhighAccident: {
                    chartId: 'weeklyhighAccident',
                    option: {},
                    events: {
                        'click': function (param) {

                        }
                    }
                },
                industryHighAccident: {
                    chartId: 'industryHighAccident',
                    option: {},
                    events: {
                        'click': function (param) {

                        }
                    }
                },
                areaHighAccident: {
                    chartId: 'areaHighAccident',
                    option: {},
                    events: {
                        'click': function (param) {

                        }
                    }
                },
                accidentData:[],
                province:[],
                atype2:[],
                times:[],
                sgjb:''
            }
        },
        components: {
            'common-header': Header,
            'common-menu': CommonMenu,
            'bar-chart': LineBarChart,
            'pie-chart': PieChart,
            'accident-list': Accident,
        },
        mounted () {
            this.getTimes();
            this.getYearReport();
            this.getWeekReport();
            this.getTypeAccident();
            this.getProvinceAccident();
            this.getAccidentList();
        },
        methods: {
            getTimes: function () {
                setTimeout(() => {
                    var self = this;
                self.loading = false;
                }, 2000);
                var self = this;
                var date = new Date();
                self.formInline.date =dateUtil.dateUtil.addDate(date, 'y', 0);
                self.province= ['北京', '天津', '上海', '重庆', '河北', '河南', '云南', '辽宁', '黑龙江', '湖南', '安徽', '山东', '新疆', '江苏', '浙江', '江西', '湖北', '广西', '甘肃', '山西', '内蒙古', '陕西', '吉林', '福建', '贵州', '广东', '青海', '西藏', '四川', '宁夏', '海南'];
                self.atype2= ['瓦斯爆炸', '冒顶片帮', '机械伤害', '车辆伤害', '触电', '中毒和窒息', '淹溺', '火灾', '其他伤害'];
                self.times= ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
//                var nowTime=date.getMonth()+1;
//                for(var i=1;i<self.times.length;i++){
//                    if(self.times[i] > nowTime) {
////                        $(self.times).attr("disabled","disabled");
//                    }
//                }

            },
            getYearReport: function () {
                var self = this;
                service.actions.getYearReport(self.formInline.area,self.formInline.Presentation,self.formInline.date,self.formInline.month,self.formInline.atype2).then(function (option) {
                    self.highAccident.option = option;
                });
            },
            getWeekReport: function () {
                var self = this;
                service.actions.getWeekReport(self.formInline.area,self.formInline.Presentation,self.formInline.date,self.formInline.month,self.formInline.atype2).then(function (option) {
                    self.weeklyhighAccident.option = option;
                });
            },
            getTypeAccident: function () {
                var self = this;
                service.actions.getTypeAccident(self.formInline.area,self.formInline.Presentation,self.formInline.date,self.formInline.month,self.formInline.atype2).then(function (option) {
                    self.industryHighAccident.option = option;
                });
            },
            getProvinceAccident: function () {
                var self = this;
                service.actions.getProvinceAccident(self.formInline.area,self.formInline.Presentation,self.formInline.date,self.formInline.month,self.formInline.atype2).then(function (option) {
                    self.areaHighAccident.option = option;
                });
            },
            getAccidentList: function () {
                var self = this;
                service.actions.getAccidentList(self.formInline.area,self.formInline.Presentation,self.formInline.date,self.formInline.month,self.formInline.atype2).then(function (data) {
                    self.accidentData = data;
                    self.sgjb=data[0].sgjb;
                });
            },
            onSubmit(formInline) {
                debugger;
                var self = this;
                var date = new Date();
                var nowTime=date.getMonth()+1;
                if(formInline.month <= nowTime){
                    self.formInline.area = formInline.area;
                    self.formInline.date = formInline.date;
                    self.getYearReport(self.formInline.area,self.formInline.Presentation,self.formInline.date,self.formInline.month,self.formInline.atype2);
                    self.getWeekReport(self.formInline.area,self.formInline.Presentation,self.formInline.date,self.formInline.month,self.formInline.atype2);
                    self.getTypeAccident(self.formInline.area,self.formInline.Presentation,self.formInline.date,self.formInline.month,self.formInline.atype2);
                    self.getProvinceAccident(self.formInline.area,self.formInline.Presentation,self.formInline.date,self.formInline.month,self.formInline.atype2);
                    self.getAccidentList(self.formInline.area,self.formInline.Presentation,self.formInline.date,self.formInline.month,self.formInline.atype2);
                }else{
                    alert("选择月份错误！");
                }

            }
        },
        watch: {

        }
    }
</script>


