<template>

    <div class="content" id="keyWords">
        <common-header></common-header>
        <!--<div class="ceartspecial" @click="establish()"> <span>关键词设置</span></div>-->
        <div  class="model">
            <span class="close" @click="close()"><i class="el-icon-circle-cross"></i></span>
            <p class="pTitle">关键词设置</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item class="m_b50" label="关键词" prop="mustWord">
                    <el-input :span="4" v-model="ruleForm.mustWord" placeholder="关键词之间用@隔开"></el-input>
                </el-form-item>
                <el-form-item  class="m_b50" label="同现词" required prop="shouldWord">
                    <el-input  placeholder="同现词之间用@隔开" v-model="ruleForm.shouldWord"></el-input>
                </el-form-item>
                <el-form-item  class="m_b50" label="排除词" prop="mustNotWord" >
                    <el-input placeholder="排除词之间用@隔开" v-model="ruleForm.mustNotWord"></el-input>
                </el-form-item>
                <el-form-item class="m_b50 f_l" >
                    <el-button type="primary" @click="submitForm()">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
    import $ from 'jquery';
    import common from '../../vuex/common';
    import Header from '@/components/commons/header';
    export default {
        data() {
            return {
                ruleForm: {
                    id:"",
                    mustWord: '',
                    mustNotWord:'',
                    shouldWord:'',
                },
                rules: {
                    mustWord: [
                        { required: true, message: '请输入关键词', trigger: 'blur' }
                    ],
                    shouldWord: [
                        { required: true, message: '请输入同现词', trigger: 'blur' }
                    ],
                }
            };
        },
        mounted () {
            var self = this;
            $.ajax({
                url: common.url.webserviceUrl + '/keywords/findByUser',
//                contentType: "application/json; charset=utf-8",
                type: 'get',
                success: function (data) {
                    console.log(data)
                    if(data.mustWord&&data.shouldWord){
                        self.ruleForm.mustWord=data.mustWord;
                        self.ruleForm.shouldWord=data.shouldWord;
                    }
                    self.ruleForm.mustNotWord=data.mustNotWord;
                    self.ruleForm.id=data.id;
                },
                error: function (error) {
                    console.error('出错了', error);
                }
            });
        },
        components: {
            'common-header': Header,
        },
        methods: {
            submitForm:function() {
                var self = this;
                var param={
                    id:self.ruleForm.id,
                    mustWord: self.ruleForm.mustWord,
                    mustNotWord: self.ruleForm.mustNotWord,
                    shouldWord: self.ruleForm.shouldWord,
                };
                $.ajax({
                    url: common.url.webserviceUrl + '/keywords/'+self.ruleForm.id,
                    data:JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    type: 'PUT',
                    success: function (data) {
                        window.location.reload();
                    },
                    error: function (error) {
                        console.error('出错了', error);
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            establish: function (){
                $('.model').show();
            },
            close: function () {
                $('.model').hide();
            },
        }
    }
</script>
