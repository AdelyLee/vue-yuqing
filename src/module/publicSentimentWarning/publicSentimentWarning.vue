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
                        <warning-list :yujingList="warningList"></warning-list>
                        <yujing-pager :pager="yujignPager" @data="getPager"></yujing-pager>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import CommonMenu from '@/components/commons/menu';
    import yujingPagerData from '@/components/commons/paging';
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
                yujignPager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 10
                }
            }
        },
        components: {
            'common-menu': CommonMenu,
            'common-header': Header,
            'warning-list': warningListData,
            'yujing-pager': yujingPagerData
        },
        mounted () {
            this.getpublicSentimentListData();
        },
        methods: {
            getpublicSentimentListData: function () {
                var self = this;
                service.actions.getpublicSentimentListData(self.yujignPager.pageSize, self.yujignPager.currentPage).then(function (renderData) {
                    self.warningList.tableData3 = renderData.seriesData;
                    self.yujignPager.totalElements = renderData.total;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getPager(pager) {
                var self = this;
                self.yujignPager = pager;
                self.getpublicSentimentListData();
            }
        }
    }
</script>

