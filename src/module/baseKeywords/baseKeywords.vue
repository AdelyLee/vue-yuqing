<template>

    <div class="content" id="keyWords">
        <common-header></common-header>
        <el-row :gutter="5" class="list">
            <el-col :span="3">
                <common-menu></common-menu>
            </el-col>
            <el-col :span="21" class="card-body_20">
                <el-card class=" box_card box-card" :body-style="{ padding: '10px' }">
                    <div class="card-body" id="content">
                        <div class="model">
                            <p class="pTitle">关键词设置</p>
                            <div class="message" :class="result.type">{{result.message}}</div>
                            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
                                <el-form-item class="m_b50" label="关键词" prop="mustWord">
                                    <el-input type="textarea" v-model="editForm.mustWord"
                                              placeholder="关键词之间用@隔开"></el-input>
                                </el-form-item>
                                <el-form-item class="m_b50" label="同现词" required prop="shouldWord">
                                    <el-input type="textarea" v-model="editForm.shouldWord"
                                              placeholder="同现词之间用@隔开"></el-input>
                                </el-form-item>
                                <el-form-item class="m_b50" label="排除词">
                                    <el-input type="textarea" v-model="editForm.mustNotWord"
                                              placeholder="排除词之间用@隔开"></el-input>
                                </el-form-item>
                                <el-form-item class="f_l">
                                    <el-button type="primary" @click="submitForm(editForm)">保存</el-button>
                                    <el-button @click="resetForm('editForm')">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import Header from '@/components/commons/header';
    import CommonMenu from '@/components/commons/menu';

    import service from '../../vuex/module/baseKeywords.js';
    import utils from '../../vuex/utils.js'

    export default {
        data () {
            return {
                result: {
                    type: "",
                    message: ""
                },
                editForm: {},
                rules: {
                    mustWord: [
                        {required: true, message: '请输入关键词', trigger: 'blur'}
                    ],
                    shouldWord: [
                        {required: true, message: '请输入同现词', trigger: 'blur'}
                    ]
                }
            };
        },
        mounted () {
            this.getUserBaseKeyword();
        },
        components: {
            'common-header': Header,
            'common-menu': CommonMenu
        },
        methods: {
            getUserBaseKeyword: function () {
                this.editForm = utils.utils.getUserBaseKeyword();
            },
            submitForm: function (keywords) {
                var self = this;
                service.actions.editUserBaseKeywords(keywords).then(function () {
                    // 重置localStorage　baseKeywords
                    self.result.type = "success";
                    self.result.message = "保存关键词成功！";
                    var config = utils.utils.getUserBaseKeyword();
                    localStorage.setItem("baseKeywords", config);
                    self.getUserBaseKeyword();
                }).catch(() => {
                    self.result.type = "error";
                    self.result.message = "保存关键词失败！";
                })
            },
            resetForm(editForm) {
                this.$refs[editForm].resetFields();
            }
        }
    }
</script>


