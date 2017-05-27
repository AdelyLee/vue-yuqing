<template>
    <div id="presentation">
        <common-header></common-header>
        <el-row :gutter="5" class="list">
            <el-col :span="24">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <div slot="header" class="panel-height">
                        <span style="line-height: 40px;"><i class="el-icon-document"></i> 舆情报告</span>
                    </div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane name="monthlyReport" value="月报">
                            <span slot="label"><i class="el-icon-date"></i> 月报</span>
                            <list-header :wqName="wqyb"></list-header>
                            <el-row type="flex" class="row-bg" justify="space-around">
                                <list-presentation :id="listPresentation" :checkedName="ybname"></list-presentation>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane name="weeklyReport" value="周报">
                            <span slot="label"><i class="el-icon-date"></i> 周报</span>
                            <list-header :wqName="wqzoub"></list-header>
                            <el-row type="flex" class="row-bg" justify="space-around">
                                <weekly-presentation :id="weeklyPresentation" :checkedName="ybname"></weekly-presentation>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane name="specialReport" value="专报">
                            <span slot="label"><i class="el-icon-date"></i> 专报</span>
                            <list-header :wqName="wqzb"></list-header>
                            <el-row type="flex" class="row-bg" justify="space-around">
                                <special-presentation :id="specialPresentation" :checkedName="ybname"></special-presentation>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import ListHeader from '@/components/presentationList/list-header';
    import ListPresentation from '@/components/presentationList/list-presentation';
    import weeklyPresentation from '@/components/presentationList/list-weeklypresentation';
    import specialPresentation from '@/components/presentationList/list-specialpresentation';
    export default {
        name: 'presentationList',
        data () {
            return {
                activeName: 'monthlyReport',
                ybname:'monthlyReport',
                wqyb:'往期月报',
                wqzoub:'往期周报',
                wqzb:'往期专报',
            }
        },
        components: {
            'common-header': Header,
            'list-header': ListHeader,
            'list-presentation': ListPresentation,
            'weekly-presentation': weeklyPresentation,
            'special-presentation': specialPresentation,
        },
//        mounted () {
//           this.handleClick();
//        },
        methods: {
            handleClick(tab, event) {
                debugger;
                console.log(tab, event);
                var self = this;
                self.ybname = tab.name;
                //self.$set('ybname',tab.name);
            },
        },
        watch: {
            ybname: function (val, oldVal) {
                console.log(this.ybname);
                console.log('new: %s, old: %s', val, oldVal);
            }
        }
    }

</script>

