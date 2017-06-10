<template>
    <div class="search-list">
        <div class="article" v-for="item in searchList">
            <el-row :gutter="15">
                <el-col :span="4">
                    <div class="img"><img :src="logoSrc"></div>
                </el-col>
                <el-col :span="17">
                    <li class="title">{{item.title}}</li>
                    <li>{{item.content}}</li>
                </el-col>
                <el-col :span="3">
                    <span class="cont">73.1</span>
                    <span>影响力指数</span>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>

    export default {
        props: ['searchList'],
        data () {
            return {
                logoSrc: '../../../static/img/an_newlogo.png'
            }
        },
        methods: {}
    }
</script>
