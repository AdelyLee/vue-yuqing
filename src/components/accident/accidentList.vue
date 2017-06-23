<template>
    <div class="list-box">
        <div class="title-bj">重特大事故</div>
        <ul class="article-list" v-for="(item, index) in accidentData" v-if="index<3">
            <li>
                <el-row :gutter="15">
                    <el-col :span="18" class="tit">
                        <el-col :span="1"><span class="small-article-image accidentlogoSrc"></span></el-col>  <span v-html="item.companyName" class="title">{{item.companyName}}</span>
                    </el-col>
                    <el-col :span="22" class="cont">{{item.content}}</el-col>
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
