<template>
    <div class="content" id="keyWords">
        <common-header></common-header>
        <el-row :gutter="5" class="list">
            <el-col :span="24">
                <el-card class="box-card" :body-style="{ padding: '10px' }">
                    <div slot="header" class="panel-height">
                        <span style="line-height: 40px;"><i class="el-icon-document"></i>报告设置</span>
                    </div>
                    <div class="card-body">
                        <div class="model">
                            <!--<span class="close" @click="close()"><i class="el-icon-circle-cross"></i></span>-->
                            <p class="pTitle">报告设置</p>

                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                                     class="demo-ruleForm">
                                <el-form-item class="m_b50" label="是否启用" prop="use">
                                    <el-radio-group v-model="ruleForm.use">
                                        <el-radio label="是" value="1"></el-radio>
                                        <el-radio label="否" value="2"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <!--<el-form-item class="m_b50" label="是否启用" prop="radio">-->
                                    <!--<el-radio class="radio" v-model="radio" label="1">是</el-radio>-->
                                    <!--<el-radio class="radio" v-model="radio" label="2">否</el-radio>-->
                                <!--</el-form-item>-->
                                <el-form-item class="m_b50" label="生成时间" prop="region">
                                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域" :disabled="isDisable">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>

                                <!--<el-form-item class="m_b50" label="生成时间">-->
                                    <!--<el-select v-model="value" placeholder="请选择" :disabled="isDisable">-->
                                        <!--<el-option-->
                                            <!--v-for="item in options"-->
                                            <!--:key="item.value"-->
                                            <!--:label="item.label"-->
                                            <!--:value="item.value">-->
                                        <!--</el-option>-->
                                    <!--</el-select>-->
                                <!--</el-form-item>-->
                                <el-form-item class="m_b50" label="预警时间">
                                    <el-time-picker :disabled="isDisable"
                                        v-model="warnTime"
                                        :picker-options="{selectableRange: '00:00:01 - 23:59:59'}"
                                        placeholder="请选择时间点">
                                    </el-time-picker>
                                </el-form-item>
                                <el-form-item class="f_l">
                                    <el-button type="primary" @click="submitForm()">保存</el-button>
                                    <el-button @click="resetForm('ruleForm')">重置</el-button>
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
    import $ from 'jquery';
    import common from '../../vuex/common';
    import Header from '@/components/commons/header';
    export default {
        data() {
            return {
                ruleForm: {
                    use:'',
                    region:"",

                },
                options: [{
                    value: '31',
                    label: '倒数第一天'
                },{
                    value: '30',
                    label: '倒数第二天'
                },{
                    value: '29',
                    label: '倒数第三天'
                },{
                    value: '28',
                    label: '28'
                },{
                    value: '27',
                    label: '27'
                },{
                    value: '26',
                    label: '26'
                },{
                    value: '25',
                    label: '25'
                },{
                    value: '24',
                    label: '24'
                },{
                    value: '23',
                    label: '23'
                },{
                    value: '22',
                    label: '22'
                },{
                    value: '21',
                    label: '21'
                },{
                    value: '20',
                    label: '20'
                },{
                    value: '19',
                    label: '19'
                },{
                    value: '18',
                    label: '18'
                },{
                    value: '17',
                    label: '17'
                },{
                    value: '16',
                    label: '16'
                },{
                    value: '15',
                    label: '15'
                },{
                    value: '14',
                    label: '14'
                },{
                    value: '13',
                    label: '13'
                },{
                    value: '12',
                    label: '12'
                },{
                    value: '11',
                    label: '11'
                },{
                    value: '10',
                    label: '10'
                },{
                    value: '9',
                    label: '9'
                },{
                    value: '8',
                    label: '8'
                },{
                    value: '7',
                    label: '7'
                },{
                    value: '6',
                    label: '6'
                },{
                    value: '5',
                    label: '5'
                },{
                    value: '4',
                    label: '4'
                },{
                    value: '3',
                    label: '3'
                },{
                    value: '2',
                    label: '2'
                },{
                    value: '1',
                    label: '1'
                }],
                value1: '',
                isDisable:false,
                warnTime:new Date(2017, 9, 10, 18, 40),

                rules: {
                    mustWord: [
                        {required: true, message: '请输入关键词', trigger: 'blur'}
                    ],
                    shouldWord: [
                        {required: true, message: '请输入同现词', trigger: 'blur'}
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                }
            };
        },
        mounted () {
            var self = this;
            console.log(self.ruleForm.use)
//            $.ajax({
//                url: common.url.webserviceUrl + '/keywords/findByUser',
////                contentType: "application/json; charset=utf-8",
//                type: 'get',
//                success: function (data) {
//                    console.log(data)
//                    if (data.mustWord && data.shouldWord) {
//                        self.ruleForm.mustWord = data.mustWord;
//                        self.ruleForm.shouldWord = data.shouldWord;
//                    }
//                    self.ruleForm.mustNotWord = data.mustNotWord;
//                    self.ruleForm.id = data.id;
//                },
//                error: function (error) {
//                    console.error('出错了', error);
//                }
//            });
        },
        components: {
            'common-header': Header,
        },
        methods: {
//            submitForm: function () {
//                var self = this;
//                var param = {
//                    id: self.ruleForm.id,
//                    mustWord: self.ruleForm.mustWord,
//                    mustNotWord: self.ruleForm.mustNotWord,
//                    shouldWord: self.ruleForm.shouldWord,
//                };
//                $.ajax({
//                    url: common.url.webserviceUrl + '/keywords/' + self.ruleForm.id,
//                    data: JSON.stringify(param),
//                    contentType: "application/json; charset=utf-8",
//                    type: 'PUT',
//                    success: function (data) {
//                        window.location.reload();
//                    },
//                    error: function (error) {
//                        console.error('出错了', error);
//                    }
//                });
//            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            establish: function () {
                $('.model').show();
            },
            close: function () {
                $('.model').hide();
            },
        },
        watch: {
//            radio: function (val, oldVal) {
////                console.log(this.checkedItems)
//                var self=this;
//                  self.ruleForm.use=val;
//                  if(self.ruleForm.use==2){
//                      self.isDisable=true
//                  }else{
//                      self.isDisable=false
//                  }
//                console.log('new: %s, old: %s', val, oldVal)
//            },
            options: function (val, oldVal) {
//                console.log(this.checkedItems)
                console.log('new: %s, old: %s', val, oldVal)
            },
        },
    }
</script>


