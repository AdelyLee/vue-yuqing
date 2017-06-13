<template>
    <div class="contact-list">
        <!--列表-->
        <el-table :data="contacts" highlight-current-row v-loading="loading" style="width: 100%;">
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="name" label="联系人" width="180" sortable>
            </el-table-column>
            <el-table-column prop="type" label="联系方式" width="180" :formatter="formatType" sortable>
            </el-table-column>
            <el-table-column prop="account" label="联系邮箱／号码" min-width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        props: ['contacts'],
        data() {
            return {};
        },
        methods: {
            formatType: function (row) {
                return row.type == 'EMAIL' ? '邮箱' : row.type == 'PHONE' ? '短信' : '未知';
            },
            handleEdit(index, row) {
                var data = {};
                data.action = "editContact";
                data.contact = row;

                this.$emit('data', data);
            },
            handleDelete(index, row) {
                var data = {};
                data.action = "deleteContact";
                data.contact = row;

                this.$emit('data', data);
            }
        }
    }
</script>
