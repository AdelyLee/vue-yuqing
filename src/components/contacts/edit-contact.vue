<template>
    <div class="add-contact">
        <!--添加界面-->
        <el-dialog title="添加联系人" v-model="editDialog.editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="150px" class="demo-ruleForm">
                <el-form-item label="联系人" prop="name">
                    <el-input v-model="editForm.name" placeholder="请输入联系人名称"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="type">
                    <el-select v-model="editForm.type" placeholder="请选择">
                        <el-option
                            v-for="item in types"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系邮箱／号码" prop="account">
                    <el-input v-model="editForm.account" placeholder="请输入联系人邮箱或手机号码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editDialog.editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editFormSubmit(editForm)">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: ['editDialog'],
        data: function () {
            return {
                editForm: {
                    name: '',
                    type: '',
                    account: ''
                },
                types: [{
                    value: 'EMAIL',
                    label: '邮箱'
                }
//                , {
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
            editFormSubmit: function (contact) {
                console.log("editContactSubmit", contact);
                var data = {};
                data.action = "editContactSubmit";
                data.contact = contact;

                this.$emit('data', data);
            }
        },
        watch: {
            editDialog: {
                handler: function (val, oldVal) {
                    this.editForm = val.editForm;
                },
                deep: true
            }
        }

    }
</script>
