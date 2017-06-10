<template>
    <el-table
        ref="multipleTable"
        :data="currentList"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            label="标题"
            min-width="300">
            <template scope="scope">
                <div class = "title-content" title = "点击查看详情" style = "cursor: pointer" @click = "getChange(scope.row.id)">
                    <img src="../../../static/img/default_avatar_male_50.gif" alt="暂无图片" >
                    <h3 >{{scope.row.title}}</h3>
                    <div class = "p-box" >
                        <p>{{scope.row.content}}</p>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column
            prop="source"
            label="采集自">
        </el-table-column>
        <el-table-column
            prop="pubTime"
            label="时间"
            show-overflow-tooltip>
        </el-table-column>
    </el-table>
</template>
<script>
    export default {
        props: ['currentList'],
        data() {
            return {

            }
        },

        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getChange:function (id) {
              window.open('../module/detail.html?id='+id);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .title-content {
        img {
            display:inline-block;
            margin-top:10px;
        }
        h3 {
            margin-top:0;
            margin-bottom:0;
            display:inline-block;
        }
    }


</style>
