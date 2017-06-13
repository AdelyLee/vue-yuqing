<template>
    <div id="contacts">
        <common-header></common-header>
        <el-row :gutter="5">
            <el-col :span="4">
                <common-menu></common-menu>
            </el-col>
            <el-col :span="20">
                <div class="card-body" id="content">
                    <el-card class="box-card" :body-style="{ padding: '10px' }">
                        <div class="card-body">
                            <!--工具条-->
                            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                                <el-form :inline="true" :model="filters">
                                    <el-form-item>
                                        <el-button type="primary" @click="showAddDialog">添加</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <contact-list :contacts="contacts" @data="getData"></contact-list>
                            <add-contact :addDialog="addDialog" @data="getData"></add-contact>
                            <edit-contact :editDialog="editDialog" @data="getData"></edit-contact>
                            <list-page :pager="pager" @data="getPager"></list-page>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Header from '@/components/commons/header';
    import Menu from '@/components/commons/menu';
    import Paging from '@/components/commons/paging';
    import ContactList from '@/components/contacts/contact-list';
    import AddContact from '@/components/contacts/add-contact';
    import EditContact from '@/components/contacts/edit-contact';

    import service from '../../vuex/module/contacts.js';
    import typeUtil from '../../vuex/typeUtil.js';

    export default{
        name: 'contacts',
        data () {
            return {
                pager: {
                    pageSize: 10,
                    currentPage: 1,
                    totalElements: 1
                },
                contacts: [],
                editDialog: {
                    editFormVisible: false,
                    editForm: {}
                },
                addDialog: {
                    addFormVisible: false,
                    addForm: {}
                },
                contact: {}
            }
        },
        components: {
            'common-header': Header,
            'common-menu': Menu,
            'list-page': Paging,
            'contact-list': ContactList,
            'add-contact': AddContact,
            'edit-contact': EditContact,
        },
        mounted () {
            this.getContacts();
        },
        methods: {
            getContacts: function () {
                var self = this;
                service.actions.getContacts(self.pager.pageSize, self.pager.currentPage).then(function (data) {
                    self.contacts = data.content;
                    self.pager.totalElements = data.totalElements;
                });
            },
            addContact: function (contact) {
                var self = this;
                service.actions.addContact(contact).then(function (data) {
                    self.pager.currentPage = 1;
                    self.getContacts();
                });
            },
            deleteContact: function (contact) {
                var self = this;
                service.actions.deleteContact(contact).then(function (data) {
                    self.pager.currentPage = 1;
                    self.getContacts();
                });
            },
            editContact: function (contact) {
                var self = this;
                service.actions.editContact(contact).then(function (data) {
                    self.getContacts();
                });
            },
            showAddDialog: function () {
                this.addDialog.addFormVisible = true;
            },
            getPager (pager) {
                this.pager = pager;
                this.getContacts();
            },
            getData (data) {
                var self = this;
                self.contact = data.contact;
                switch (data.action) {
                    case 'addContactSubmit':
                        self.addContact(self.contact);
                        self.addDialog.addFormVisible = false;
                        break;
                    case 'editContact':
                        self.editDialog.editFormVisible = true;
                        self.editDialog.editForm = data.contact;
                        break;
                    case 'editContactSubmit':
                        self.editContact(self.contact);
                        self.editDialog.editFormVisible = false;
                        break;
                    case 'deleteContact':
                        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
                            self.deleteContact(self.contact);
                        }).catch(() => {
                            console.log("delete contact error");
                        });
                        break;
                    default:
                        break;
                }

            }

        }
    }
</script>
