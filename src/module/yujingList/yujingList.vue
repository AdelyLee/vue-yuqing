<template>
    <div id="yujingList">
        <common-header></common-header>
        <el-card class="box-card">
            <div>
                <yujingDetails-list :yujingDetailsList = "yujingDetailsList"></yujingDetails-list>
                <list-page :pager="pager" @data="getPager"></list-page>
            </div>
        </el-card>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import Paging from '@/components/commons/paging';
    import yujingDetailsListData from '@/components/currentSpecialReport/yujingDetailsList'
    import service from '../../vuex/module/yujingDetailsList.js';
    export default {
        name: 'presentationList',
        data () {
            return {
                yujingDetailsList:{
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
            'yujingDetails-list':yujingDetailsListData
        },
        mounted () {
            this.getYujingDetailsList();
        },
        methods: {
            getYujingDetailsList:function () {
                var self = this;
                service.actions.getYujingDetailsList(self.pager.pageSize, self.pager.currentPage).then(function (renderData) {
                    self.yujingDetailsList.items = renderData.seriesData;
                    self.pager.totalElements = renderData.total;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            getPager:function (pager) {
                this.pager = pager;
                this.getYujingDetailsList();
            }
        }
    }
</script>

