<template>
    <div id="presentation">
        <common-header></common-header>
        <el-row :gutter="5" class="list">
            <el-col :span="3">
                <common-menu></common-menu>
            </el-col>
            <el-col :span="21">
                <div class="card-body" id="content">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <!--<div slot="header" class="panel-height">-->
                        <!--<span style="line-height: 40px;"><i class="el-icon-document"></i> 舆情报告</span>-->
                    <!--</div>-->
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane name="往期月报" value="月报">
                            <span slot="label"><i class="el-icon-date"></i> 月报</span>
                            <div class="list-header">
                                <div class="title">{{reportListHeader}}</div>
                            </div>
                            <el-row type="flex" class="row-bg" justify="space-around">
                                <list-presentation :reportList="reportList"></list-presentation>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane name="往期周报" value="周报">
                            <span slot="label"><i class="el-icon-date"></i> 周报</span>
                            <div class="list-header">
                                <div class="title">{{reportListHeader}}</div>
                            </div>
                            <el-row type="flex" class="row-bg" justify="space-around">
                                <list-presentation :reportList="reportList"></list-presentation>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                    <list-page :pager="pager" @data="getPager"></list-page>
                </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import CommonMenu from '@/components/commons/menu';
    import Paging from '@/components/commons/paging';
    import ListPresentation from '@/components/presentationList/list-presentation';

    import service from '../../vuex/module/report.js'
    export default {
        name: 'presentationList',
        data () {
            return {
                activeName: '往期月报',
                reportList: [],
                pager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 1
                },
                reportListHeader: '往期月报',
                reportType: "MONTHLY"
            }
        },
        components: {
            'common-header': Header,
            'common-menu': CommonMenu,
            'list-presentation': ListPresentation,
            'list-page': Paging
        },
        mounted () {
            this.getReportList();
        },
        methods: {
            getReportList: function () {
                var self = this;
                service.actions.getReportList(self.reportType, self.pager.pageSize, self.pager.currentPage).then(function (data) {
                    self.pager.totalElements = data.totalElements;
                    self.reportList = data.content;
                });
            },
            getPager(pager) {
                this.pager = pager;
                this.getReportList();
            },
            handleClick(tab, event) {
                console.log(tab, event);
                var self = this;
                self.reportListHeader = tab.name;
                if (self.reportListHeader == "往期月报") {
                    self.reportType = "MONTHLY";
                } else if (self.reportListHeader == "往期周报"){
                    self.reportType = "WEEKLY";
                }
                self.pager.pageSize = 10;
                self.pager.currentPage = 1;

                this.getReportList();
            },
        }
    }
</script>

