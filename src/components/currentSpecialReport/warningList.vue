<template>
    <div>
        <el-table
            v-loading="yujingList.loading3"
            element-loading-text="拼命加载中"
            ref="multipleTable"
            :data="yujingList.tableData3"
            border
            tooltip-effect="dark"
            style="width: 100%"
            height="450">
            <el-table-column
                prop="subjectName"
                label="专题名称"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="keyWord"
                label="关键词"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="timeChange"
                label="预警时间范围"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="dateCreated"
                label="预警生成时间"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                label="操作"
                show-overflow-tooltip
            >
                <template scope="scope">
                    <el-button
                        size="small"
                        type="info"
                        @click="searchWarningId(scope.$index, scope.row)">查看预警</el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除预警</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    var basePath = localStorage.getItem('basePath');
    export default {
        props: ['yujingList'],
        data () {
            return{

            }
        },
        methods: {
            searchWarningId:function(a,b){
               window.open(basePath + '/module/warningList.html?id='+b.id)
            },
            handleDelete(index, row) {
                var data = {};
                data.action = "deleteWarning";
                data.warning = row;

                this.$emit('data', data);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
