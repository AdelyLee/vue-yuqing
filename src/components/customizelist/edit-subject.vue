<template>
    <div class="edit-subject">
        <!--修改界面-->
        <el-dialog title="修改专题" v-model="editDialog.editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="专题名称" prop="name">
                    <el-input v-model="editForm.name" placeholder="请输入专题名称" readonly></el-input>
                </el-form-item>
                <el-form-item label="关键词" prop="mustWord">
                    <el-input v-model="editForm.mustWord" placeholder="关键词使用@隔开"></el-input>
                </el-form-item>
                <el-form-item label="同现词" prop="shouldWord">
                    <el-input v-model="editForm.shouldWord" placeholder="同现词使用@隔开"></el-input>
                </el-form-item>
                <el-form-item label="排除词" prop="mustNotWord">
                    <el-input v-model="editForm.mustNotWord" placeholder="排除词使用@隔开"></el-input>
                </el-form-item>
                <el-form-item label="专题时间" required>
                    <el-col :span="11">
                        <el-form-item prop="startDate">
                            <el-date-picker type="date" placeholder="选择专题开始时间" v-model="editForm.startDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="endDate">
                            <el-date-picker type="date" placeholder="选择专题结束时间" v-model="editForm.endDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="editForm.description" placeholder="专题描述"></el-input>
                </el-form-item>
                <div class="estimate-content">预计数据量：<span class="estimate">{{estimate}}</span></div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editDialog.editFormVisible = false">取消</el-button>
                <el-button type="success" @click="estimateSubject(editForm)">预估</el-button>
                <el-button type="primary" @click.native="editFormSubmit(editForm)">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import dateUtil from '../../vuex/dateUtil.js'
    import utils from '../../vuex/utils.js'

    export default {
        props: ['editDialog'],
        data: function () {
            return {
                estimate: '',
                editForm: {
                    name: '',
                    mustWord: '',
                    shouldWord: '',
                    mustNotWord: '',
                    startDate: '',
                    endDate: '',
                    description: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入专题名称', trigger: 'blur'}
                    ],
                    mustWord: [
                        {required: true, message: '请输入关键词', trigger: 'blur'}
                    ],
                    startDate: [
                        { type: "date", required: true, message: '选择专题开始时间', trigger: 'change' }
                    ],
                    endDate: [
                        { type: "date", required: true, message: '选择专题结束时间', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            estimateSubject: function (subject) {
                subject.startDate = utils.utils.preSubjectValidateDate(subject).startDate;
                subject.endDate = utils.utils.preSubjectValidateDate(subject).endDate;
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        console.log("estimateSubject", subject);
                        var data = {};
                        data.action = "estimateSubject";
                        data.subject = subject;

                        this.$emit('data', data);
                    }
                });
            },
            editFormSubmit: function (subject) {
                subject.startDate = utils.utils.preSubjectValidateDate(subject).startDate;
                subject.endDate = utils.utils.preSubjectValidateDate(subject).endDate;
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        console.log("editSubjectSubmit", subject);
                        var data = {};
                        data.action = "editSubjectSubmit";
                        data.subject = subject;

                        this.$emit('data', data);
                    }
                });

            }
        },
        watch: {
            editDialog: {
                handler: function (val, oldVal) {
                    this.estimate = '';
                    this.editForm = val.editForm;
                    if (val.editForm.estimate != undefined) {
                        this.estimate = val.editForm.estimate;
                    }
                },
                deep: true
            }
        }
    }
</script>
