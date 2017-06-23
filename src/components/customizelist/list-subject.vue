<template>
    <el-row class="list-subject">
        <div class="ceartspecial" @click="addSubject()"><i class="el-icon-edit"></i> <span>创建专题</span></div>
        <table id="tab">
            <tr>
                <th class="number">编号</th>
                <th class="number">关键词</th>
                <th class="name">专题名称</th>
                <th class="number">时间</th>
                <th class="number">状态</th>
                <th class="operation">操作</th>
                <th class="number">是否预警</th>
            </tr>
            <tr class="list-specialReport" v-for="subject in subjectList" :id="subject.id" @click="viewSpecialReport(subject)" style="height: 50px;">
                <td class="number-none">{{subject.number}}</td>
                <td class="number-none">{{subject.mustWord}}</td>
                <td class="name-none">{{subject.name}}</td>
                <td class="number-none">{{subject.startDate}} - {{subject.endDate}}
                </td>
                <td class="number-none">
                    <span class="complete">{{subject.state}}</span>
                </td>
                <td class="operation-none">
                    <span @click="showSubject(subject)" class="ssjc">实时监测</span>
                    <span @click="updateReport(subject)" class="up">更新报告</span>
                    <span @click="editSubject(subject)" class="edit">修改</span>
                    <span @click="deleteSubject(subject)" class="del">删除</span>
                </td>
                <td class="number-none">
                    <el-switch v-model="subject.enableWarning" on-color="#13ce66" off-color="#ff4949"
                               @change="handleEnableWarningChange(subject)"></el-switch>
                    <span @click="editWarning(subject)"> 预警编辑</span>
                </td>
            </tr>
        </table>
    </el-row>
</template>

<script>
    import $ from 'jquery';

    export default {
        props: ['subjectList'],
        data: function () {
            return {}
        },
        methods: {
            addSubject: function () {
                var data = {};
                data.action = "addSubject";
                this.$emit('data', data);
            },
            showSubject: function (subject) {
                var data = {};
                data.action = "showSubject";
                data.subject = subject;

                this.$emit('data', data);
            },
            editSubject: function (subject) {
                var data = {};
                data.action = "editSubject";
                data.subject = subject;

                this.$emit('data', data);
            },
            updateReport: function (subject) {
                var data = {};
                data.action = "updateReport";
                data.subject = subject;
                subject.state = "分析中";

                this.$emit('data', data);
            },
            deleteSubject: function (subject) {
                var data = {};
                data.action = "deleteSubject";
                data.subject = subject;

                this.$emit('data', data);
            },
            handleEnableWarningChange: function (subject) {
                // 如果专题没有预警规则，该专题不能预警
                if (subject.warning) {
                    var data = {};
                    data.action = "handleEnableWarningChange";
                    data.subject = subject;

                    this.$emit('data', data);
                } else {
                    this.$confirm('请先添加预警规则?', '提示', {type: 'warning'}).then(() => {
                    }).catch(() => {
                    });
                    subject.enableWarning = false;
                }
            },
            editWarning: function (subject) {
                var data = {};
                data.action = "editWarning";
                data.subject = subject;
                console.log("editWarning", subject.id);

                this.$emit('data', data);
            },
            viewSpecialReport: function(subject) {
                // 获取当前行，设置为以选中的状态
                var selectedItem = $("#" + subject.id);
                if ($(selectedItem).hasClass("selected")) {
                    $(".list-specialReport").removeClass("selected");
                    subject = null;
                } else {
                    $(".list-specialReport").removeClass("selected");
                    $(selectedItem).addClass("selected");
                }
                var data = {};
                data.action = "viewSpecialReport";
                data.subject = subject;

                this.$emit('data', data);
            }
        }
    }
</script>
