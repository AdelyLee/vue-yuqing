<template>
    <div>
        <el-card class="box-card my-card">
            <el-row :gutter="15">
                <el-col :span="12">
                    监测时间:
                    <el-radio-group v-model="radio1" @change="changeTime(radio1)">
                        <el-radio :label="1">3天</el-radio>
                        <el-radio :label="2">7天</el-radio>
                        <el-radio :label="3">10天</el-radio>
                    </el-radio-group>
                    <div class="block">
                        <span class="demonstration">自定义时间:</span>
                        <el-date-picker
                            v-model="value7"
                            type="daterange"
                            align="right"
                            id = "myTimeChange"
                            placeholder="选择日期范围"
                            @change = "changeTime"
                            :picker-options="pickerOptions2">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="12">
                    信息排序:
                    <el-radio-group v-model="radio2" @change="changeSort(radio2)">
                        <el-radio :label="1">时间降序</el-radio>
                        <el-radio :label="2">时间升序</el-radio>
                        <el-radio :label="3">相关度降序</el-radio>
                    </el-radio-group>
                </el-col>
                <el-col :span="12">
                    情感属性:
                    <el-radio-group v-model="radio3" @change="changeEmotion(radio3)">
                        <el-radio :label="1">正面</el-radio>
                        <el-radio :label="2">负面</el-radio>
                        <el-radio :label="3">中性</el-radio>
                    </el-radio-group>
                </el-col>
                <el-col :span="12">
                    匹配方式:
                    <el-radio-group v-model="radio4" @change="changeTitle(radio4)">
                        <el-radio :label="1">按全文</el-radio>
                        <el-radio :label="2">按正文</el-radio>
                        <el-radio :label="3">按标题</el-radio>
                    </el-radio-group>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card my-card" style="margin-top:15px;">
            <el-row :gutter="15">
                <el-col :span="8" :offset="16">
                    <el-input placeholder="请输入内容" v-model="input5" @blur= "getSearchWord">
                        <el-select v-model="select" slot="prepend" placeholder="请选择">
                            <el-option label="全文" value="1"></el-option>
                            <!--<el-option label="作者" value="2"></el-option>-->
                        </el-select>
                        <el-button slot="append" icon="search"  ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="24">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全部
                    </el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>

                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
    import $ from 'jquery'
    import common from '../../vuex/module/common'
    import dateUtil from '../../vuex/dateUtil'
    const cityOptions = ['新闻', '微博', '贴吧', '论坛'];
    export default {
        props: ['listSearch'],
        data: function () {
            return {
                radio1: 3,
                radio2: 1,
                radio3: 1,
                radio4: 1,
                input5: '',
                select: '',
                checkAll: true,
                checkedCities: ['新闻', '微博'],
                cities: cityOptions,
                isIndeterminate: true,
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value7: ''
            }
        },
        mounted () {
        },
        methods: {
            getSearchWord(value) {
              var self = this;
              if(value.target.value && value.target.value != "") {
                self.listSearch.searchWord = "";
                self.listSearch.searchWord = value.target.value;
              }else {
                  self.listSearch.searchWord = "";
              };
                this.$emit('data', self.listSearch)
            },
            handleCheckAllChange(event) {
                this.checkedCities = event.target.checked ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                var self = this;
              if(value.length>0) {
                self.listSearch.changeType = []
                $.each(value,function (i,item) {
                  if(item == "新闻") {
                      self.listSearch.changeType.push("news");
                  }
                  if(item == "微博") {
                      self.listSearch.changeType.push("weibo");
                  }
                  if (item == "贴吧") {
                      self.listSearch.changeType.push("bar");
                  }
                  if (item == "论坛") {
                      self.listSearch.changeType.push("bbs");
                  }
                })

              }else {
                  self.listSearch.changeType = [];
                  self.listSearch.changeType = ["news","weibo","bar","bbs"];
              }
                self.listSearch.type = [];
                self.listSearch.type = self.listSearch.changeType;
                this.$emit('data', self.listSearch);
            },
            changeTime: function (item) {
                debugger;
                var self = this;
                var startDate = "";
                var endDate = "";
                if (item == 1) {
                    startDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(new Date(),"d",-3),"yyyy-MM-dd");
                    endDate = dateUtil.dateUtil.formatDate(new Date(),"yyyy-MM-dd");
                    self.listSearch.startDate = startDate;
                    self.listSearch.endDate = endDate;
                    this.$emit('data', self.listSearch);
                } else if (item == 2) {
                    startDate = dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(new Date(),"d",-7),"yyyy-MM-dd");
                    endDate = dateUtil.dateUtil.formatDate(new Date(),"yyyy-MM-dd");
                    self.listSearch.startDate = startDate;
                    self.listSearch.endDate = endDate;
                    this.$emit('data', self.listSearch);
                } else if (item == 3) {
                    startDate =dateUtil.dateUtil.formatDate(dateUtil.dateUtil.addDate(new Date(),"d",-10),"yyyy-MM-dd");
                    endDate = dateUtil.dateUtil.formatDate(new Date(),"yyyy-MM-dd");
                    self.listSearch.startDate = startDate;
                    self.listSearch.endDate = endDate;
                    this.$emit('data', self.listSearch);
                }else {
                    var timeArray = [];
                    timeArray = item.split("-")
                    startDate =$.trim(timeArray[0])+"-"+$.trim(timeArray[1])+"-"+$.trim(timeArray[2]);
                    endDate = $.trim(timeArray[3])+"-"+$.trim(timeArray[4])+"-"+$.trim(timeArray[5]);
                    self.radio1 = "";
                    self.listSearch.startDate = startDate;
                    self.listSearch.endDate = endDate;
                    this.$emit('data', self.listSearch);
                }
            },
            changeSort: function (item) {
                var self = this;
                var myOrders = [];
                if (item == 1) {
                    myOrders = [{ "direction": "DESC",
                        "orderBy": "pubTime"}];
                } else if (item == 2) {
                    myOrders = [{ "direction": "ASC",
                        "orderBy": "pubTime"}];
                } else {
                    myOrders = [];
                }
                self.listSearch.orders = [];
                self.listSearch.orders = myOrders;
                this.$emit('data', self.listSearch);
            },
            changeEmotion: function (item) {
                var self = this;
                self.listSearch.changeEmotion = [];
                if (item == 1) {
                    self.listSearch.changeEmotion = [{
                        "key" : "nlp.sentiment.label",
                        "value" : "POS"
                    }];
                } else if(item == 2){
                    self.listSearch.changeEmotion = [{
                        "key" : "nlp.sentiment.label",
                        "value" : "NEG"
                }];
                } else if(item == 3) {
                    self.listSearch.changeEmotion = [{
                        "key" : "nlp.sentiment.label",
                        "value" : "NEU"
                    }];
                }
                self.listSearch.searchKey = [];
                self.listSearch.searchKey = self.listSearch.changeEmotion;
                this.$emit('data', self.listSearch);
            },
            changeTitle: function (item) {
                var self = this;
                var filed = "";
                if (item == 1) {
                    filed = "";
                } else if (item == 2) {
                    filed = "content.cn";
                } else if (item == 3) {
                    filed = "title.cn";
                }
                self.listSearch.filed = "";
                self.listSearch.filed = filed;
                this.$emit('data', self.listSearch);
            }
        }

    }
</script>
