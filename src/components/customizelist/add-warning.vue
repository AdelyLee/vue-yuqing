<template>
    <div class="add-warning">
        <!--添加界面-->
        <el-dialog title="添加预警" v-model="warningDialog.addFormVisible" :close-on-click-modal="false">
            <el-form :inline="true" :model="contactForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                <el-form-item label="联系人" prop="name">
                    <el-input v-model="contactForm.name" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="account">
                    <el-input v-model="contactForm.account" placeholder="请输入联系人邮箱"></el-input>
                </el-form-item>
                <el-button type="primary" @click.native="addContactSubmit(contactForm)">添加</el-button>
            </el-form>
            <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-ruleForm">
                <el-table ref="multipleTable" :data="warningDialog.contacts.content" border height="150"
                          tooltip-effect="dark"
                          style="width: 80%; margin-left: 10%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="name" label="联系人" width="180"></el-table-column>
                    <el-table-column prop="account" label="邮箱" min-width="180"></el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button size="small" type="danger" @click="handleDeleteContact(scope.$index, scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-form-item class="pager">
                    <list-page :pager="pager" @data="getPager"></list-page>
                </el-form-item>
                <el-form-item label="接收时间">
                    <el-time-select placeholder="起始时间" v-model="addForm.receiveStartTime"
                                    :picker-options="{ start: '00:00', step: '01:00', end: '23:00'}">
                    </el-time-select>
                    <el-time-select placeholder="结束时间" v-model="addForm.receiveEndTime"
                                    :picker-options="{start: '00:00', step: '01:00',end: '23:00',minTime: startTime}">
                    </el-time-select>
                </el-form-item>
                <el-form-item label="预警间隔">
                    <el-slider v-model="addForm.hours" :min="1" :max="12" :step="1" show-stops></el-slider>
                </el-form-item>
                <el-form-item label="周末预警">
                    <el-radio-group v-model="addForm.atWeekends">
                        <el-radio label="true">是</el-radio>
                        <el-radio label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="预警内容" :inline="true" >
                    <el-checkbox :indeterminate="isIndeterminateSentiment" v-model="sentimentCheckAll"
                                 @change="handleSentimentCheckAllChange">全部
                    </el-checkbox>
                    <el-checkbox-group v-model="addForm.sentimentLabel" @change="handleCheckedSentimentChange">
                        <el-checkbox v-for="sentiment in sentimentTypes" :label="sentiment" :key="sentiment">
                            {{sentiment}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="预警来源">
                    <el-checkbox :indeterminate="isIndeterminateType" v-model="typeCheckAll"
                                 @change="handleTypeCheckAllChange">全部
                    </el-checkbox>
                    <el-checkbox-group v-model="addForm.type" @change="handleCheckedTypesChange">
                        <el-checkbox v-for="type in articleTypes" :label="type" :key="type">{{type}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="warningDialog.addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addFormSubmit(addForm)">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Paging from '@/components/commons/paging';

    export default {
        props: ['warningDialog'],
        data: function () {
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
                    contacts: [],
                    receiveStartTime: '',
                    receiveEndTime: '',
                    hours: 1,
                    atWeekends: true,
                    sentimentLabel: [],
                    type: []
                },
                sentimentTypes: ['正面', '负面', '中性'],
                isIndeterminateSentiment: false,
                sentimentCheckAll: false,
                articleTypes: ['新闻', '微博', '论坛', '贴吧'],
                isIndeterminateType: false,
                typeCheckAll: false
            }
        },
        components: {
            'list-page': Paging,
        },
        methods: {
            addContactSubmit: function (contact) {
                console.log("addContactSubmit", contact);
                var data = {};
                data.action = "addContactSubmit";
                data.contact = contact;

                this.$emit('data', data);
            },
            handleDeleteContact: function (index, row) {
                console.log("handleDeleteContact", row);
                var data = {};
                data.action = "handleDeleteContact";
                data.contact = row;

                this.$emit('data', data);
            },
            addFormSubmit: function (warning) {
                console.log("addWarningFormSubmit", warning);
                // 获取选中的联系人，
                warning.contacts = this.multipleSelection;
                warning.contacts.forEach(function (item) {
                    item.type = "EMAIL";
                });
                var data = {};
                data.action = "addWarningFormSubmit";
                data.subject = this.warningDialog.subject;
                data.subject.warning = warning;

                this.$emit('data', data);

            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row, true);
                    });
                }
            },
            handleSelectionChange(val) {
                this.concatSelectedClick = true;
                this.multipleSelection = val;
            },
            handleSentimentCheckAllChange(event) {
                this.addForm.sentimentLabel = event.target.checked ? this.sentimentTypes : [];
                this.isIndeterminateSentiment = false;
            },
            handleCheckedSentimentChange(value) {
                var checkedCount = value.length;
                this.sentimentCheckAll = checkedCount === this.sentimentTypes.length;
                this.isIndeterminateSentiment = checkedCount > 0 && checkedCount < this.sentimentTypes.length;
            },
            handleTypeCheckAllChange(event) {
                this.addForm.type = event.target.checked ? this.articleTypes : [];
                this.isIndeterminateType = false;
            },
            getPager(pager) {
                var data = {};
                data.action = "clickAddWaringContactsPager";
                data.addWaringContactsPager = pager;

                this.$emit('data', data);
            },
            handleCheckedTypesChange(value) {
                let checkedCount = value.length;
                this.typeCheckAll = checkedCount === this.articleTypes.length;
                this.isIndeterminateType = checkedCount > 0 && checkedCount < this.articleTypes.length;
            }
        },
        watch: {
            warningDialog: {
                handler: function (val, oldVal) {
                    var self = this;
                    this.addForm = val.addForm;
                    if (val.addForm) {
                        var sentimentLabelLength = val.addForm.sentimentLabel.length;
                        var articleTypesLength = val.addForm.type.length;
                        self.sentimentCheckAll = sentimentLabelLength === self.sentimentTypes.length;
                        self.isIndeterminateSentiment = sentimentLabelLength > 0 && sentimentLabelLength < self.sentimentTypes.length;

                        self.typeCheckAll = articleTypesLength === self.articleTypes.length;
                        self.isIndeterminateType = articleTypesLength > 0 && articleTypesLength < self.articleTypes.length;

                        self.pager.totalElements = self.warningDialog.contacts.totalElements;
                        var rows = [];
                        self.warningDialog.contacts.content.forEach(function (item) {
                            self.warningDialog.addForm.contacts.forEach(function (obj) {
                                if (item.id == obj.id) {
                                    rows.push(item);
                                }
                            });
                        });
                        self.$nextTick(function () {
                            // DOM 现在更新了
                            // `this` 绑定到当前实例
                            self.toggleSelection(rows);
                        })
                    }
                },
                deep: true
            }
        }
    }
</script>
