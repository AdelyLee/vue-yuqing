<template>
    <div id="report">
        <common-header></common-header>
        <el-row :gutter="5">
            <el-col :span="3">
                <common-menu></common-menu>
            </el-col>
            <el-col :span="21">
                <div class="card-body" id="content">
                    <el-card class="box-card" :body-style="{ padding: '10px' }">
                        <div class="card-body">
                            <report-header :briefingJson="briefingJson"></report-header>
                            <report-content :briefingJson="briefingJson"
                                            :briefingCells="briefingCells"></report-content>
                            <report-summary :briefingJson="briefingJson"></report-summary>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import Menu from '@/components/commons/menu';
    import ReportHeader from '@/components/report/report-header';
    import ReportContent from '@/components/report/report-content';
    import ReportSummary from '@/components/report/report-summary';

    import service from '../../vuex/module/report.js';
    import typeUtil from '../../vuex/typeUtil.js';

    export default{
        name: 'report',
        data () {
            return {
                briefingJson: {},
                briefingCells: []
            }
        },
        components: {
            'common-header': Header,
            'common-menu': Menu,
            'report-header': ReportHeader,
            'report-content': ReportContent,
            'report-summary': ReportSummary
        },
        mounted () {
            // get briefing json data from mongodb
            this.getBriefingJson();
        },
        methods: {
            getBriefingJson: function () {
                var self = this;
                service.actions.getBriefingJson().then(function (briefingJson) {
                    briefingJson.type = typeUtil.typeUtil.briefingType(briefingJson.type);

                    // render briefing json
                    if (briefingJson.briefingBody) {
                        self.renderBriefingJson(briefingJson.briefingBody);
                    }
                    // delete briefing json briefing body
                    delete briefingJson.briefingBody;
                    self.briefingJson = briefingJson;
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            renderBriefingJson: function (briefingBody) {
                var self = this, briefingCells = [];

                function analysisArray(briefingBody) {
                    briefingBody.forEach(function (item) {
                        briefingCells.push(item);
                        if (item.children != undefined && item.children.length > 0) {
                            analysisArray(item.children)
                        }
                    });
                }

                analysisArray(briefingBody);

                self.briefingCells = briefingCells;
            }
        }
    }
</script>
