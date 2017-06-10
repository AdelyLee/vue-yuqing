<template>
    <div class="block">
        <el-pagination v-if="pager"
            @current-change="handleCurrentChange"
            :current-page.sync="pager.currentPage"
            :page-size='pager.pageSize'
            layout="total, prev, pager, next, jumper"
            :total='pager.totalElements'>
        </el-pagination>
    </div>
</template>
<script>
    export default {
        props: ['pager'],
        data() {
            return {};
        },
        methods: {
            handleCurrentChange(val) {
                // 当改变页码时重新查询数据
                this.pager.currentPage = val;
                this.$emit('data', this.pager);
            }
        }
    }
</script>
<style lang="scss" scoped>
   .el-pagination {
    width: 100%;
    white-space: nowrap;
    padding: 2px 5px;
    color: #48576a;
    float: left;
    margin: 30px 10px;
    text-align: center;
   }
</style>
