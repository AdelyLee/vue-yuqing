<template>
    <div class="block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size='limit'
            layout="prev, pager, next, jumper"
            :total='pages'>
        </el-pagination>
    </div>
</template>
<script>
    export default {
        props: ['pageList','page'],
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        data() {
            return {
                limit: 10,
                pages: 100,
            };
        },
        mounted () {
            var self = this;
                self.limit = self.pageList;
                self.pages = self.page;
        },
        watch: {
            pageList: function (val, oldVal) {
                console.log(this.pageList);
                console.log('new: %s, old: %s', val, oldVal);
            },
            page: function (val, oldVal) {
                console.log(this.page);
                console.log('new: %s, old: %s', val, oldVal);
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
    margin-top: 30px;
    text-align: center;
   }
</style>
