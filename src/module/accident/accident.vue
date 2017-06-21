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
                                    <el-option label="北京" value="beijing"></el-option>
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
                                    placeholder="选择年">
                                </el-date-picker>
                            </el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="12" class="lists">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <div slot="header" class="clearfix">
                                        <span class="chart-text">高发事故图</span>
                                    </div>
                                    <bar-chart :chartConfig="highAccident"></bar-chart>
                                </el-card>
                            </el-col>
                        </el-row>
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
    import typeUtil from '../../vuex/typeUtil';
    import dateUtil from '../../vuex/dateUtil';
    import service from '../../vuex/module/accident.js';

    import $ from 'jquery';

    export default {
        name: 'accident',
        data () {
            var self = this;
            return {
                formInline: {
                    area: 'all',
                    Presentation: 'year',
                    date: ''
                },
                highAccident: {
                    chartId: 'highAccident',
                    option: {},
                    events: {
                        'click': function (param) {

                        }
                    }
                },
            }
        },
        components: {
            'common-header': Header,
            'common-menu': CommonMenu,
            'bar-chart': LineBarChart,
            'pie-chart': PieChart,
        },
        mounted () {
           this.getTimes();
            this.getYearReport();
        },
        methods: {
            getTimes: function () {
                var self = this;
                var date = new Date();
                self.formInline.date =dateUtil.dateUtil.addDate(date, 'y', 0);
            },
            getYearReport: function () {
                debugger;
                var self = this;
                service.actions.getYearReport(self.formInline.area,self.formInline.Presentation,self.formInline.date).then(function (data) {
//                    self.highAccident.option = option;
                });
            },
            onSubmit() {
                console.log('submit!');
            }
        },
        watch: {

        }
    }
</script>


