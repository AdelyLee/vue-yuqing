<template>
    <div class="content" id="keyWords">
        <common-header></common-header>
        <el-row :gutter="5" class="list" style="margin-left:auto; margin-right:auto;height: 100%;width:100% ">
            <el-col :span="3">
                <common-menu></common-menu>
            </el-col>
            <el-col :span="21" class="card-body_20">
                <el-card class="box_card box-card">
                    <div slot="header" class="panel-height box_card">
                        <span style="line-height: 40px;"><i class="el-icon-document"></i>报告设置</span>
                    </div>
                    <div class="card-body">
                        <div class="model">
                            <!--<span class="close" @click="close()"><i class="el-icon-circle-cross"></i></span>-->
                            <p class="pTitle">报告设置</p>
                            <el-form :inline="true" :model="contactForm" :rules="rules" label-width="80px"
                                     class="demo-ruleForm">
                                <el-form-item label="联系人" prop="name" class="m_r form_item">
                                    <el-input v-model="contactForm.name" placeholder="请输入联系人"
                                              class="input_item"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱" prop="account" class="form_item">
                                    <el-input v-model="contactForm.account" placeholder="请输入联系人邮箱"
                                              class="input_item"></el-input>
                                </el-form-item>
                                <el-button type="primary" @click.native="createUserContacts(contactForm)"
                                           class="button_item">添加
                                </el-button>
                            </el-form>
                            <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-ruleForm">
                                <el-table class="table_item" ref="multipleTable" :data="contacts" border height="200"
                                          tooltip-effect="dark"
                                          style="width: 80%; margin-left: 10%"
                                          @selection-change="handleSelectionChange">
                                    <el-table-column type="selection" width="55"></el-table-column>
                                    <el-table-column prop="name" label="联系人" width="180"></el-table-column>
                                    <el-table-column prop="account" label="邮箱" min-width="180"></el-table-column>
                                    <el-table-column label="操作">
                                        <template scope="scope">
                                            <el-button size="small" type="danger"
                                                       @click="deleteUserContacts(scope.$index, scope.row)">
                                                删除
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-form-item class="pager pager_m_b">
                                    <list-page :pager="pager"></list-page>
                                </el-form-item>
                                <el-form-item label="是否启用" class="m_r form_item">
                                    <el-radio-group v-model="addForm.enable" class="displayIn">
                                        <el-radio :label="true">是</el-radio>
                                        <el-radio :label="false">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="报告接收日期" class="displayIn  m_r form_item">
                                    <el-select v-model="addForm.day" placeholder="请选择(几号)" class="input_item2">
                                        <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="报告接收小时" class="displayIn  m_r form_item">
                                    <el-time-select class="input_item2" placeholder="报告接收小时" v-model="addForm.hours"
                                                    :picker-options="{start: '00:00', step: '01:00',end: '23:00',minTime: startTime}">
                                    </el-time-select>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer save_button">
                                <el-button type="primary" @click.native="addFormSubmit(addForm)" class="button_item">
                                    保存
                                </el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </div>

</template>

<script>
    import Paging from '@/components/commons/paging';
    import $ from 'jquery';
    import common from '../../vuex/common';
    import CommonMenu from '@/components/commons/menu';
    import Header from '@/components/commons/header';
    import service from '../../vuex/module/setReport.js'
    import contactService from '../../vuex/module/customSubject.js'

    var optionData = [];
    optionData.push({value: "-1", label: '倒数第一天'});
    optionData.push({value: "-2", label: '倒数第二天'});
    optionData.push({value: "-3", label: '倒数第三天'});
    for (var i = 28; i > 0; i--) {
        var node = {};
        node.value = i;
        node.label = i;
        optionData.push(node);
    }
    export default {
        data () {
            return {
                contactForm: {
                    name: "",
                    account: ""
                },
                rules: {
                    name: [{required: true, message: '请输入联系人名称', trigger: 'blur'}],
                    account: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
                    ]
                },
                concatSelectedClick: true,
                multipleSelection: [],
                pager: {
                    pageSize: 5,
                    currentPage: 1,
                    totalElements: 1
                },
                addForm: {
                    enable: false,
                    briefingType: "",
                    contacts: [],
                    hours: '',
                    day: ''
                },
                contacts: [],// 所有联系人
                options: optionData,
            };
        },
        mounted () {
            this.getMonthlyReportInfo();  //获取默认参数
            this.getUserContacts();  //获取联系人
        },
        components: {
            'common-header': Header,
            'list-page': Paging,
            'common-menu': CommonMenu,
        },
        methods: {
            getMonthlyReportInfo: function () {
                var self = this;
                service.actions.getMonthlyReportInfo().then(function (data) {
                    self.addForm = data;
                })
            },

            handleSelectionChange(val) {
                this.concatSelectedClick = true;
                this.multipleSelection = val;
            },

            // 获取联系人参数
            getUserContacts: function () {
                var self = this;
                contactService.actions.getUserContacts(self.pager.pageSize, self.pager.currentPage).then(function (data) {
                    self.pager.totalElements = data.totalElements;
                    self.contacts = data.content;
                });
            },

            // 添加联系人
            createUserContacts: function (contact) {
                var self = this;
                contactService.actions.createUserContacts(contact).then(function () {
                    self.pager.currentPage = 1;
                    self.getUserContacts();
                });

            },
            // 删除联系人
            deleteUserContacts: function (index, row) {
                var self = this;
                this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
                    // delete the subject and get the new subject list
                    contactService.actions.deleteUserContacts(row).then(function () {
                        self.pager.currentPage = 1;
                        self.getUserContacts();
                    });
                }).catch(error => {
                    this.$confirm('删除记录失败！', '错误', {type: 'error'});
                });
            },

            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row, true);
                    });
                }
            },
            // 保存按钮
            addFormSubmit: function (briefingConfig) {
                var self = this;
                // 获取选中的联系人，
                briefingConfig.contacts = this.multipleSelection;
                briefingConfig.contacts.forEach(function (item) {
                    item.type = "EMAIL";
                });

                if (briefingConfig.id) {
                    service.actions.editMonthlyReportSetting(briefingConfig).then(function () {
                        self.getMonthlyReportInfo();
                    }).catch(error => {
                        this.$confirm('修改记录失败！', '错误', {type: 'error'});
                    });
                } else {
                    briefingConfig.briefingType = "MONTHLY";
                    service.actions.createMonthlyReportSetting(briefingConfig).then(function () {
                        self.getMonthlyReportInfo();
                    }).catch(error => {
                        this.$confirm('创建记录失败！', '错误', {type: 'error'});
                    });
                }


            },
        },
        watch: {
            addForm: {
                handler: function () {
                    var self = this;
                    var rows = [];
                    self.contacts.forEach(function (obj) {
                        self.addForm.contacts.forEach(function (item) {
                            if (item.id == obj.id) {
                                rows.push(obj);
                            }
                        });
                    });
                    self.$nextTick(function () {
                        // DOM 现在更新了
                        // `this` 绑定到当前实例
                        self.toggleSelection(rows);
                    })
                },
                deep: true
            },
            contacts: function () {
                var self = this;
                var rows = [];
                self.contacts.forEach(function (obj) {
                    self.addForm.contacts.forEach(function (item) {
                        if (item.id == obj.id) {
                            rows.push(obj);
                        }
                    });
                });
                self.$nextTick(function () {
                    // DOM 现在更新了
                    // `this` 绑定到当前实例
                    self.toggleSelection(rows);
                })
            }
        }
    }
</script>


