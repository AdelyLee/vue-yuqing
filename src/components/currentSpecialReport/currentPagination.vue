<template>
    <div class="block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="myListPagination.currentPage4"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="myListPagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="myListPagination.total">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        props: ['myListPagination'],
        data () {
            return {}
        },
        methods: {
            handleSizeChange(val) {
                var self = this;
                self.myListPagination.pageSize = val;
                this.$emit('data', this.myListPagination);
            },
            handleCurrentChange(val) {
                var self = this;
                self.myListPagination.currentPage4 = val;
                this.$emit('data', this.myListPagination);
            }
        }
    }
</script>

