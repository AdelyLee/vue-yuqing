<template>
    <div id="warningList">
        <common-header></common-header>
        <el-card class="box-card">
            <div>
                <warningDetails-list :yujingDetailsList = "warningDetailsList"></warningDetails-list>
                <list-page :pager="pager" @data="getPager"></list-page>
            </div>
        </el-card>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import Paging from '@/components/commons/paging';
    import warningDetailsListData from '@/components/currentSpecialReport/warningDetailsList';
    import service from '../../vuex/module/warningDetailsList.js';
    export default {
        name: 'presentationList',
        data () {
            return {
                warningDetailsList:{
                    items: [],
                    loading2: false
                },
                pager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 10
                }
            }
        },
        components: {
            'common-header': Header,
            'list-page':Paging,
            'warningDetails-list':warningDetailsListData
        },
        mounted () {
            this.getWarningDetailsList();
        },
        methods: {
            getWarningDetailsList:function () {
                var self = this;
                service.actions.getWarningDetailsList(self.pager.pageSize, self.pager.currentPage).then(function (renderData) {
                    self.warningDetailsList.items = renderData.seriesData;
                    self.pager.totalElements = renderData.total;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getPager:function (pager) {
                this.pager = pager;
                this.getWarningDetailsList();
            }
        }
    }
</script>

