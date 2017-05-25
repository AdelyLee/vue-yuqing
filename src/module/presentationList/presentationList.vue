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
                        <el-tab-pane>
                            <span slot="label"><i class="el-icon-date"></i> 月报</span>
                            <list-header></list-header>
                            <el-row type="flex" class="row-bg" justify="space-around">
                                <list-presentation :id="listPresentation"></list-presentation>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label"><i class="el-icon-date"></i> 周报</span>
                            <list-header></list-header>
                            <el-row type="flex" class="row-bg" justify="space-around">
                                <list-presentation :id="listPresentation"></list-presentation>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label"><i class="el-icon-date"></i> 专报</span>
                            <list-header></list-header>
                            <el-row type="flex" class="row-bg" justify="space-around">
                                <list-presentation :id="listPresentation"></list-presentation>
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
    export default {
        name: 'presentationList',
        data () {
            return {
                activeName: 'second'
            }
        },
        components: {
            'common-header': Header,
            'list-header': ListHeader,
            'list-presentation': ListPresentation,
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }

</script>

