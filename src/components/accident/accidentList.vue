<template>
    <div class="list-box">
        <ul class="article-list" v-for="(item, index) in accidentData" v-if="index<3">
            <li>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <span v-html="item.companyName" class="title"><i class="el-icon-more"></i>{{item.companyName}}</span>
                    </el-col>
                    <el-col :span="24" class="cont">{{item.content}}</el-col>
                </el-row>
            </li>
        </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['accidentData'],
        data () {
            return {}
        },
        computed: {

        },
        methods: {
        }

    }
</script>
<style lang="scss" scoped>
    @import "./scss/accidentList.scss";
</style>
