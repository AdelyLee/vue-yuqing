<template>
    <div class="add-subject">
        <!--添加界面-->
        <el-dialog title="添加专题" v-model="addDialog.addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="专题名称" prop="name">
                    <el-input v-model="addForm.name" placeholder="请输入专题名称"></el-input>
                </el-form-item>
                <el-form-item label="关键词" prop="mustWord">
                    <el-input v-model="addForm.mustWord" placeholder="关键词使用@隔开"></el-input>
                </el-form-item>
                <el-form-item label="同现词" prop="shouldWord">
                    <el-input v-model="addForm.shouldWord" placeholder="同现词使用@隔开"></el-input>
                </el-form-item>
                <el-form-item label="排除词" prop="mustNotWord">
                    <el-input v-model="addForm.mustNotWord" placeholder="排除词使用@隔开"></el-input>
                </el-form-item>
                <el-form-item label="专题时间" required>
                    <el-col :span="11">
                        <el-form-item prop="startDate">
                            <el-date-picker type="date" placeholder="选择专题开始时间" v-model="addForm.startDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="endDate">
                            <el-date-picker type="date" placeholder="选择专题结束时间" v-model="addForm.endDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="addForm.description" placeholder="专题描述"></el-input>
                </el-form-item>
                <div class="estimate-content">预计数据量：<span class="estimate">{{estimate}}</span></div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addDialog.addFormVisible = false">取消</el-button>
                <el-button type="info" @click="resetAddForm()">重置</el-button>
                <el-button type="success" @click="estimateSubject(addForm)">预估</el-button>
                <el-button type="primary" @click.native="addFormSubmit(addForm)">创建</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: ['addDialog', 'estimate'],
        data: function () {
            return {
                addForm: {
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
                        { type: 'date', required: true, message: '选择专题开始时间', trigger: 'change' }
                    ],
                    endDate: [
                        { type: 'date', required: true, message: '选择专题结束时间', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            resetAddForm: function () {
                this.$refs['addForm'].resetFields();
            },
            estimateSubject: function (subject) {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        var data = {};
                        data.action = "estimateSubject";
                        data.subject = subject;

                        this.$emit('data', data);
                    }
                });
            },
            addFormSubmit: function (subject) {
                console.log("addSubjectSubmit", subject);
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        var data = {};
                        data.action = "addSubjectSubmit";
                        data.subject = subject;

                        this.$emit('data', data);
                    }
                });
            }
        },
        watch: {
            estimate: function (val, oldVal) {
                console.log("estimate", val);
                this.estimate = val;
            }
        }

    }
</script>
