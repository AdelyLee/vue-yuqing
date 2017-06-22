<template>
    <div id="warningList">
        <common-header></common-header>
        <el-row :gutter="5">
            <el-col :span = "3">
                <common-menu></common-menu>
            </el-col>
            <el-col :span = "21" :offset = "3">
                <el-card class="box-card my-card">
                    <div>
                        <warning-list :yujingList="warningList" @data="getData"></warning-list>
                        <pager :pager="pager" @data="getPager"></pager>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import CommonMenu from '@/components/commons/menu';
    import pagerData from '@/components/commons/paging';
    import warningListData from '@/components/currentSpecialReport/warningList';
    import service from '../../vuex/module/currentSpecialReport.js';
    export default {
        name: 'publicSentimentWarningList',
        data () {
            return {
                warningList: {
                    loading3: false,
                    tableData3: []
                },
                pager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 10
                },
                warning: {}
            }
        },
        components: {
            'common-menu': CommonMenu,
            'common-header': Header,
            'warning-list': warningListData,
            'pager': pagerData
        },
        mounted () {
            this.getpublicSentimentListData();
        },
        methods: {
            getpublicSentimentListData: function () {
                var self = this;
                service.actions.getpublicSentimentListData(self.pager.pageSize, self.pager.currentPage).then(function (renderData) {
                    self.warningList.tableData3 = renderData.seriesData;
                    self.pager.totalElements = renderData.total;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            deleteWarning: function (warning) {
                var self = this;
                service.actions.deleteWarning(warning).then(function (data) {
                    self.getpublicSentimentListData();
                });
            },
            getData (data) {
                var self = this;
                self.warning = data.warning;
                switch (data.action) {
                    case 'deleteWarning':
                        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
                            self.deleteWarning(self.warning);
                        }).catch(() => {
                            console.log("delete warning error");
                        });
                        break;
                    default:
                        break;
                }

            },
            getPager(pager) {
                var self = this;
                self.pager = pager;
                self.getpublicSentimentListData();
            }
        }
    }
</script>

