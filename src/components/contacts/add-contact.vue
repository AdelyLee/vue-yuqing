<template>
    <div class="add-contact">
        <!--添加界面-->
        <el-dialog title="添加联系人" v-model="addDialog.addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="150px" class="demo-ruleForm">
                <el-form-item label="联系人" prop="name">
                    <el-input v-model="addForm.name" placeholder="请输入联系人名称"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="type">
                    <el-select v-model="addForm.type" placeholder="请选择">
                        <el-option
                            v-for="item in types"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系邮箱／号码" prop="account">
                    <el-input v-model="addForm.account" placeholder="请输入联系人邮箱或手机号码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addDialog.addFormVisible = false">取消</el-button>
                <el-button type="info" @click="resetAddForm()">重置</el-button>
                <el-button type="primary" @click.native="addFormSubmit(addForm)">添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: ['addDialog'],
        data: function () {
            return {
                addForm: {
                    name: '',
                    type: '',
                    account: ''
                },
                types: [{
                    value: 'EMAIL',
                    label: '邮箱'
                }
//                    {
//                    value: 'SMS',
//                    label: '短信'
//                }
                ],
                rules: {
                    name: [
                        {required: true, message: '请输入联系人名称', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请输入选择联系方式', trigger: 'blur'}
                    ],
                    account: [
                        {required: true, message: '请输入联系人邮箱或手机号码', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
                    ]
                }
            }
        },
        methods: {
            resetAddForm: function () {
                this.$refs['addForm'].resetFields();
            },
            addFormSubmit: function (contact) {
                console.log("addContactSubmit", contact);
                var data = {};
                data.action = "addContactSubmit";
                data.contact = contact;

                this.$emit('data', data);
            }
        }

    }
</script>
