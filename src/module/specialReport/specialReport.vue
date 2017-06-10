<template>
    <div id="special">
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
    import ReportHeader from '@/components/report/report-header';
    import ReportContent from '@/components/report/report-content';
    import ReportSummary from '@/components/report/report-summary';

    import service from '../../vuex/module/specialReport.js';
    import typeUtil from '../../vuex/typeUtil.js';

    export default{
        name: 'specialReport',
        data () {
            return {
                briefingJson: {},
                briefingCells: [],
                briefingCellsTemp: []
            }
        },
        components: {
            'common-header': Header,
            'report-header': ReportHeader,
            'report-content': ReportContent,
            'report-summary': ReportSummary
        },
        mounted () {
            // 获取专报json 数据
            this.getBriefingJson();
        },
        methods: {
            getBriefingJson: function () {
                var self = this;
                service.actions.getBriefingJson().then(function (briefingJson) {
                    briefingJson.type = typeUtil.typeUtil.briefingType(briefingJson.type);

                    // render briefing json
                    self.renderBriefingJson(briefingJson.briefingBody);
                    // delete briefing json briefing body
                    delete briefingJson.briefingBody;

                    self.briefingJson = briefingJson;

                    // header the briefingCells
                    self.handleBriefingCells();
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
                self.briefingCellsTemp = briefingCells;
            },
            handleBriefingCells: function () {
                var self = this;
                // 获取briefingCell数据
                var briefingCellsTempArray = self.briefingCellsTemp;
                briefingCellsTempArray.forEach(function (item, i) {
                    var method = item.method;
                    if (method != "" && method != undefined) {
                        service.actions[method]().then(function (renderData) {
                            item.order = i;
                            item.option = renderData.option;
                            item.description = renderData.description;
                            self.briefingCells.push(item);
                        }, function (error) {
                            console.error('出错了', error);
                        }).then(function () {
                            self.briefingCells.sort(function (a, b) {
                                return a.order - b.order;
                            });
                        });
                    }
                });
            }
        }
    }
</script>

