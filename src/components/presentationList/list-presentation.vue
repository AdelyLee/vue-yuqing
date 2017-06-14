<template>
    <el-table :data="reportList" highlight-current-row v-loading="loading" style="width: 100%;">
        <el-table-column prop="createTime" label="创建时间">
        </el-table-column>
        <el-table-column prop="title" label="专题名称">
        </el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
                <el-button
                    size="small"
                    prop="id"
                    @click="previewReport(scope.$index,scope.row.id)">预览
                </el-button>
                <el-button
                    size="small"
                    prop="attachment"
                    type="danger"
                    @click="downloadFile(scope.$index,scope.row.attachment)">下载
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <!--<el-row class="content">-->
        <!--<div class="list-presentation" v-for="item in reportList">-->
            <!--<div class="list-presentation_bor">-->
                <!--<div class="times_bt">{{item.createTime}}</div>-->
                <!--<el-row>-->
                    <!--<el-col :span="16" class="title">-->
                        <!--{{item.title}}-->
                    <!--</el-col>-->
                    <!--<el-col :span="8" class="img"></el-col>-->
                <!--</el-row>-->
                <!--<el-row type="flex" class="row-bg" justify="start">-->
                    <!--<el-col :span="4" class="button_color">-->
                        <!--<span :id="item.id" @click="previewReport(item.id)">{{preview}}</span></el-col>-->
                    <!--<el-col :span="4" class="button_colorred">-->
                        <!--<span :attachment="item.attachment" @click="downloadFile(item.attachment)">{{download}}</span>-->
                    <!--</el-col>-->
                <!--</el-row>-->
            <!--</div>-->
        <!--</div>-->
    <!--</el-row>-->
</template>
<script>
    export default {
        props: ['reportList'],
        data () {
            return {
                preview: '预览',
                download: '下载'
            }
        },
        methods: {
            previewReport: function (index,id) {
                window.open('../module/report.html?id=' + id);
            },
            downloadFile: function (index,attachment) {
                debugger;
                if (attachment.length > 1) {
                    var file = attachment[0].substring(0, attachment[0].length - 4);
                    window.open("http://192.168.0.29:8888/yuqing/file/download/doc/" + file);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./scss/list-presentation.scss";
</style>
