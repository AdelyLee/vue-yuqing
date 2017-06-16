<template>
    <div id="customize">
        <common-header></common-header>
        <el-row :gutter="5" class="list">
            <el-col :span="3">
                <common-menu></common-menu>
            </el-col>
            <el-col :span="21">
                <div class="card-body" id="content">
                    <el-card class="box-card" :body-style="{ padding: '10px' }">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane class="special" name="monthlyReport" value="专题管理">
                                <span slot="label"><i class="el-icon-menu"></i> 专题管理</span>
                                <list-subject :subjectList="subjectList" @data="getData"></list-subject>
                                <list-page :pager="pager" @data="getPager"></list-page>
                                <add-subject :addDialog="addDialog" :estimate="estimate" @data="getData"></add-subject>
                                <edit-subject :editDialog="editDialog" @data="getData"></edit-subject>
                                <add-warning :warningDialog="warningDialog" @data="getData"></add-warning>
                            </el-tab-pane>
                            <el-tab-pane name="specialReport" value="已生成报告">
                                <span slot="label"><i class="el-icon-document"></i> 已生成报告</span>
                                <div class="list-header">
                                    <div class="title">{{reportListHeader}}</div>
                                </div>
                                <el-row type="flex" class="row-bg" justify="space-around">
                                    <list-presentation :id="specialReport" :reportList="reportList"></list-presentation>
                                </el-row>
                                <list-page :pager="specialReportPager" @data="getSpecialReportPager"></list-page>
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import CommonMenu from '@/components/commons/menu';
    import Paging from '@/components/commons/paging';
    import SubjectList from '@/components/customizelist/list-subject';
    import AddSubject from '@/components/customizelist/add-subject';
    import EditSubject from '@/components/customizelist/edit-subject';
    import AddWarning from '@/components/customizelist/add-warning';
    import PresentationList from '@/components/presentationList/list-presentation';

    import service from '../../vuex/module/customSubject.js'

    export default {
        name: 'presentationList',
        data () {
            return {
                activeName: 'monthlyReport',
                reportListHeader: '专报',
                pager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 1
                },
                addWaringContactsPager: {
                    pageSize: 5,
                    currentPage: 1,
                    totalElements: 1
                },
                specialReportPager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 1
                },
                subjectList: [],
                subject: {},
                addDialog: {
                    addFormVisible: false,
                    addForm: {}
                },
                estimate: '',
                editDialog: {
                    editFormVisible: false,
                    editForm: {estimate: 0}
                },
                defaultWarning: {
                    contacts: [],
                    receiveStartTime: '',
                    receiveEndTime: '',
                    hours: 1,
                    atWeekends: "false",
                    sentimentLabel: [],
                    type: []
                },
                warningDialog: {
                    addFormVisible: false,
                    contacts: {
                        content: [] //当前用户的预警联系人
                    },
                    subject: {},
                    addForm: {}
                },
                reportList: []
            }
        },
        components: {
            'common-header': Header,
            'common-menu': CommonMenu,
            'list-subject': SubjectList,
            'list-page': Paging,
            'add-subject': AddSubject,
            'edit-subject': EditSubject,
            'add-warning': AddWarning,
            'list-presentation': PresentationList
        },
        mounted () {
            this.getSubjectList();
        },
        methods: {
            getSubjectList: function () {
                var self = this;
                service.actions.getCustomSubjectList(self.pager.pageSize, self.pager.currentPage).then(function (data) {
                    self.pager.totalElements = data.totalElements;
                    self.subjectList = data.content;
                });
            },
            getUserContacts: function () {
                var self = this;
                service.actions.getUserContacts(self.addWaringContactsPager.pageSize, self.addWaringContactsPager.currentPage).then(function (data) {
                    self.warningDialog.contacts = data;
                });
            },
            createUserContacts: function (contact) {
                var self = this;
                service.actions.createUserContacts(contact).then(function () {
                    // 重新渲染专题列表，展示第一页数据
                    self.pager.currentPage = 1;
                    self.getUserContacts();
                })
            },
            deleteUserContacts: function (contact) {
                var self = this;
                service.actions.deleteUserContacts(contact).then(function () {
                    self.addWaringContactsPager.currentPage = 1;
                    self.getUserContacts();
                }).catch(error => {
                    this.$confirm('删除记录失败！', '错误', {type: 'error'}).then(() => {
                    });
                });
            },
            createSubject: function (subject) {
                var self = this;
                service.actions.createCustomSubject(subject).then(function () {
                    // 重新渲染专题列表，展示第一页数据
                    self.pager.currentPage = 1;
                    self.getSubjectList();
                });
            },
            deleteSubject: function (subject) {
                var self = this;
                service.actions.deleteCustomSubject(subject).then(function () {
                    // 重新渲染专题列表，展示第一页数据
                    self.pager.currentPage = 1;
                    self.getSubjectList();
                });
            },
            editSubject: function (subject) {
                var self = this;
                service.actions.editCustomSubject(subject).then(function () {
                    self.getSubjectList();
                });
            },
            updateReport: function (subject) {
                var self = this;
                service.actions.updateCustomSubjectReport(subject).then(function () {
                    self.getSubjectList();
                });
            },
            getSpecialReportList: function () {
                var self = this;
                service.actions.getSpecialReportList(self.specialReportPager.pageSize, self.specialReportPager.currentPage).then(function (data) {
                    self.reportList = data.content;
                    self.specialReportPager.totalElements = data.totalElements;
                });
            },
            getSpecialReport: function (subject) {
                var self = this;
                service.actions.getSpecialReport(self.specialReportPager.pageSize, self.specialReportPager.currentPage, subject).then(function (data) {
                    self.reportList = data.content;
                    self.specialReportPager.totalElements = data.totalElements;
                });
            },
            getSubjectEstimate: function (subject) {
                var self = this;
                service.actions.getSubjectEstimate(subject).then(function (data) {
                    subject.estimate = data;
                    self.editDialog.editForm = {};
                    self.editDialog.editForm = subject;
                    self.estimate = data;
                });
            },
            handleClick(tab, event) {
                var self = this;
                // 先清空reportList
                self.reportList = [];
                if (tab.name == "specialReport") {
                    if (self.subject && self.subject.id) {
                        self.getSpecialReport(self.subject);
                    } else {
                        self.getSpecialReportList();
                    }
                }
            },
            getPager(pager) {
                this.pager = pager;
                this.getSubjectList();
            },
            getSpecialReportPager (pager) {
                var self = this;
                self.specialReportPager = pager;
                if (self.subject && self.subject.id) {
                    self.getSpecialReport(self.subject);
                } else {
                    self.getSpecialReportList();
                }
            },
            getData(data) {
                var self = this;
                self.subject = data.subject;
                switch (data.action) {
                    case 'showSubject':
                        window.open('../module/currentSpecialReport.html?id=' + data.subject.id);
                        break;
                    case 'addSubject':
                        self.addDialog.addFormVisible = true;
                        break;
                    case 'deleteSubject':
                        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
                            // delete the subject and get the new subject list
                            self.deleteSubject(data.subject);
                        });
                        break;
                    case 'addSubjectSubmit':
                        self.addDialog.addFormVisible = false;
                        self.addDialog.addForm = {};
                        self.createSubject(data.subject);
                        break;
                    case 'estimateSubject':
                        // 获取专题预估量
                        self.getSubjectEstimate(data.subject);
                        break;
                    case 'editSubject':
                        self.editDialog.editFormVisible = true;
                        self.editDialog.editForm = data.subject;
                        break;
                    case 'editSubjectSubmit':
                        // 点击保存按钮
                        self.editDialog.editFormVisible = false;
                        // 判断时间类型，将时间类型转换为Date,
                        self.editSubject(data.subject);
                        break;
                    case 'updateReport':
                        // 更新报告
                        self.updateReport(self.subject);
                        console.log("update report ...");
                        setTimeout(function () {
                            console.log("update report success");
                            self.getSubjectList()
                        }, 5000);
                        break;
                    case 'handleEnableWarningChange':
                        // 修改是否预警
                        self.editSubject(data.subject);
                        break;
                    case 'editWarning':
                        self.warningDialog.addFormVisible = true;
                        self.getUserContacts(); // 获取当前用户的预警联系人
                        self.warningDialog.subject = data.subject;
                        if (data.subject.warning) {
                            self.warningDialog.addForm = data.subject.warning;
                        } else {
                            self.warningDialog.addForm = self.defaultWarning;
                        }
                        break;
                    case 'clickAddWaringContactsPager':
                        self.addWaringContactsPager = data.addWaringContactsPager;
                        self.getUserContacts();
                        break;
                    case 'addContactSubmit':
                        self.createUserContacts(data.contact);
                        break;
                    case 'handleDeleteContact':
                        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
                            self.deleteUserContacts(data.contact);
                        }).catch(error => {
                            this.$confirm('删除记录失败！', '错误', {type: 'error'});
                        });
                        break;
                    case 'addWarningFormSubmit':
                        data.subject.enableWarning = true;
                        if (data.subject.warning) {
                            data.subject.warning.briefingType = 'SPECIAL';
                        }
                        self.editSubject(data.subject);
                        self.warningDialog.addFormVisible = false;
                        break;
                    case 'viewSpecialReport':
                        // 如果选中了某个专题, 不需要任何操作，在点击切换按钮时查询数据
                        break;
                }
            }
        }
    }

</script>

