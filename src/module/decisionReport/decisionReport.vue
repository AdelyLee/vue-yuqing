<template>
    <div id="decision">
        <common-header></common-header>
        <el-row :gutter="5">
            <el-col :span="24">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <div slot="header" class="panel-height">
                        <span style="line-height: 40px;">與情{{briefingJson.type}}</span>
                    </div>
                    <div class="card-body">
                        <report-header :briefingJson="briefingJson"></report-header>
                        <report-content :briefingJson="briefingJson" :briefingCells="briefingCells"></report-content>
                        <report-summary :briefingJson="briefingJson"></report-summary>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import ReportHeader from '@/components/decisionReport/report-header';
    import ReportContent from '@/components/decisionReport/report-content';
    import service from '../../vuex/module/decisionReport.js'
    export default{
        name: 'decisionReport',
        data () {
            return {
                briefingJson: {},
                briefingCells: []
            }
        },
        components: {
            'common-header': Header,
            'report-header': ReportHeader,
            'report-content': ReportContent,
        },
        mounted () {
            // get briefing json data from mongodb
            this.getBriefingJson();
        },
        methods: {
            getBriefingJson: function () {
                var self = this;
                service.actions.getBriefingJson().then(function (briefingJson) {
                    self.briefingJson = briefingJson;

                    // render briefing json
                    self.renderBriefingJson(self.briefingJson.briefingBody);
                }, function (error) {
                    console.error('出错了', error);
                })
            },
            renderBriefingJson: function (briefingBody) {
                var briefingCells = [];

                function analysisArray(briefingBody) {
                    briefingBody.forEach(function (item) {
                        briefingCells.push(item);
                        if (item.children != undefined && item.children.length > 0) {
                            analysisArray(item.children)
                        }
                    });
                }

                analysisArray(briefingBody);

                this.briefingCells = briefingCells;
            }

        }
    }
</script>


