<template>
    <el-row class="content">
    <div class="list-presentation" v-for="list in items">
        <div class="list-presentation_bor">
             <div class="times_bt">{{list.time}}</div>
             <el-row>
                <el-col :span="16" class="title">
                  {{list.title}}
                </el-col>
                <el-col :span="8" class="img"></el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="start">
                <el-col :span="4" class="button_color"><span :id="list.id" @click="changer(list.id)">{{preview}}</span></el-col>
                <el-col :span="4" class="button_colorred">{{download}}</el-col>
            </el-row>
        </div>
    </div>
    </el-row>
</template>
<script>
    //import service from '../../vuex/module/presentation.js'
    import $ from 'jquery'
    import commons from '../../vuex/module/common'
    export default {
        data () {
               return{
                preview: '预览',
                download: '下载',
                   items:[],
//                presentation: {
//                    Id: 'listpresentation',
//                    events: {
//                        'click': function (param) {
//                            console.log(param.name);
//                        }
//                    }
//                },
               }
        },
        mounted () {
            debugger;
                var self = this;
                var param = {
                    "date": {
                        "startDate": "2017-01",
                        "endDate": "2018"
                    },
                    "page": {
                        "limit": 10,
                        "page": 1
                    },
                    "type": "MONTHLY"
                };
                $.ajax({
                    url: commons.url.esUrl + '/briefing/search',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(param),
                    type: 'post',
                    success: function (data) {
                        var datas = data.content;
                        var seriesData = [];
                        var lengeds = [];
                        var newDate = new Date();
                        $.each(datas, function (i, item) {
                            var node = {};
                            node.title = item.title;
                            node.time = item.dateCreated;
                            node.id = item.id;
                            formatDateTime(node.time);
                            seriesData.push(node);
                            lengeds.push(node.title)
                        });
                        console.log(seriesData);
                        self.items = seriesData;
                    }.bind(this),
                    error: function (error) {
                        console.error('出错了', error);
                    }
                });
               function formatDateTime(time) {
                var date = new Date(time);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d;

            };
        },
        methods: {
            changer: function (id) {
                window.open('../module/decisionReport.html#id=' + id);
            },
            target: function (name) {
                window.open('https://www.baidu.com#name=' + name);
            }
        }
    }
</script>

<style lang="scss" scoped>
   $border-radius: 45px 0px 45px 0px;
   $background-color: #f29b76;
   $color:#ffffff;
   $text-align:center;
   $font-size:18px;
   $font-family:微软雅黑;
   .content{
       width:100%;
  .list-presentation{
      float: left;
      margin-left: 7%;
      margin-top: 2%;
      width:25%;
      height: 170px;
      box-shadow: inset 0 0 1em rgba(0, 170, 170, 0.5), 0 0 1em rgba(0, 170, 170, 0.5);
      -moz-border-radius:$border-radius;
      -webkit-border-radius:$border-radius;
      -o-border-radius:$border-radius;
      border-radius:$border-radius;
      .list-presentation_bor{
          width:90%;
          float: left;
          height: 130px;
          margin-left: 20px;
          margin-top: 20px;
          margin-right: 20px;
          border:1px solid #4997e7;
          -moz-border-radius:$border-radius;
          -webkit-border-radius:$border-radius;
          -o-border-radius:$border-radius;
          border-radius: $border-radius;
         .times_bt{
             width:40%;
             height: 40px;
             background-color:$background-color;
             -moz-border-radius:$border-radius;
             -webkit-border-radius:$border-radius;
             -o-border-radius:$border-radius;
             border-radius:$border-radius;
             color:$color;
             text-align:$text-align;
             font-size:$font-size;
             line-height: 40px;
          }
         .title{
             padding: 15px;
             font-size:$font-size;
             text-align:$text-align;
             font-weight: 600;
             font-family:$font-family ;
         }
         .img{
             width:95px;
             height: 81px;
             background-image: url("../../../static/img/news_bj.png");
             margin-top: -18px;
             margin-left: 10px;
         }
         .button_color{
             line-height: 20px;
             color:$color ;
             text-align:$text-align;
             background-color: #4a96e1;
             margin-left: 10px;
             font-size: 14px;
             margin-top: -20px;
             cursor: pointer;

         }
        .button_colorred{
            line-height: 20px;
            color:$color ;
            text-align:$text-align;
            font-size: 14px;
            background-color: #ec6941;
            margin-left: 10px;
            margin-top: -20px;
            cursor: pointer;
        }
      }
  }
   }
</style>
