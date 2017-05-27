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
    import ReportSummary from '@/components/decisionReport/report-summary';
    import service from '../../vuex/module/decisionReport.js';
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
                    briefingJson.type = self.briefingType(briefingJson.type);

                    // render briefing json
                    self.renderBriefingJson(briefingJson.briefingBody);
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
                        // if item.option is {} there is error to parse json string to object.
                        if (item.option && typeof item.option != "object") {
                            item.option = JSON.parse(item.option);
                        }
                        briefingCells.push(item);
                        if (item.children != undefined && item.children.length > 0) {
                            analysisArray(item.children)
                        }
                    });
                }

                analysisArray(briefingBody);

                self.briefingCells = briefingCells;
            },

            briefingType: function (type) {
                var briefingType = "";
                switch (type) {
                    case 'DAILY':
                        briefingType = "日报";
                        break;
                    case 'WEEKLY':
                        briefingType = "周报";
                        break;
                    case 'MONTHLY':
                        briefingType = "月报";
                        break;
                    case 'QUQRTERLY':
                        briefingType = "季报";
                        break;
                    case 'ASEMIANNUAL':
                        briefingType = "半年报";
                        break;
                    case 'ANNUAL':
                        briefingType = "年报";
                        break;
                    case 'SPICEL':
                        briefingType = "专报";
                        break;
                }

                return briefingType;
            }

        }
    }
</script>


