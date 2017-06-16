<template>
    <div>
        <el-card class="box-card my-card">
            <el-row :gutter="15">
                <el-col :span="18" :offset="3">
                    <el-input placeholder="请输入内容" v-model="input5" @blur="getSearchWord">
                        <!--<el-select v-model="select" slot="prepend" placeholder="请选择">-->
                            <!--<el-option label="全文" value="1"></el-option>-->
                            <!--&lt;!&ndash;<el-option label="作者" value="2"></el-option>&ndash;&gt;-->
                        <!--</el-select>-->
                        <el-button slot="append" icon="search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="20" :offset="2" style=" margin-top:15px;">
                    监测时间:
                    <el-date-picker
                        v-model="value1"
                        type="date"
                        :placeholder="listSearch.startDate"
                        :default-value="listSearch.startDate"
                        @change = "changeStartTime"
                        :picker-options="pickerOptions0">
                    </el-date-picker>
                    <el-date-picker
                        v-model="value2"
                        type="date"
                        :placeholder="listSearch.endDate"
                        @change = "changeEndTime"
                        :default-value="listSearch.endDate"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-col>
                <el-col :span="10" :offset="2">
                    信息排序:
                    <el-radio-group v-model="radio2" @change="changeSort(radio2)">
                        <el-radio :label="1">时间降序</el-radio>
                        <el-radio :label="2">时间升序</el-radio>
                        <el-radio :label="3">相关度降序</el-radio>
                    </el-radio-group>
                </el-col>
                <el-col :span="10" :offset="2">
                    匹配方式:
                    <el-radio-group v-model="radio4" @change="changeTitle(radio4)">
                        <el-radio :label="1">按全文</el-radio>
                        <el-radio :label="2">按正文</el-radio>
                        <el-radio :label="3">按标题</el-radio>
                    </el-radio-group>
                </el-col>
                <el-col :span="10" :offset="2">
                    情感属性:
                    <el-checkbox :indeterminate="isIndeterminateEmotion" v-model="checkAllEmotion"
                                 @change="handleCheckAllEmotionChange">全部
                    </el-checkbox>
                    <el-checkbox-group v-model="checkEmotion" @change="handleCheckedEmotionsChange"
                                       style="display: inline-block;">
                        <el-checkbox v-for="item in emotions" :label="item" :key="item">{{item}}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
                <el-col :span="10" :offset="2">
                    载体类型:
                    <el-checkbox :indeterminate="isIndeterminateType" v-model="checkAllType"
                                 @change="handleCheckAllTypeChange">全部
                    </el-checkbox>
                    <el-checkbox-group v-model="checkedType" @change="handleCheckedTypesChange"
                                       style="display: inline-block;">
                        <el-checkbox v-for="type in types" :label="type" :key="type">{{type}}</el-checkbox>
                    </el-checkbox-group>

                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
    import $ from 'jquery'
    import common from '../../vuex/common'
    import dateUtil from '../../vuex/dateUtil'
    const typeOptions = ['新闻', '微博', '贴吧', '论坛'];
    const emotionOptions = ['正面', '负面', '中性'];
    export default {
        props: ['listSearch'],
        data: function () {
            return {
                radio2: 1,
                radio3: 1,
                radio4: 1,
                input5: '',
                select: '',
                checkAllType: true,
                checkAllEmotion: true,
                checkEmotion: [],
                checkedType: [],
                types: typeOptions,
                emotions: emotionOptions,
                isIndeterminateType: true,
                isIndeterminateEmotion: true,
                pickerOptions0: {},
                pickerOptions1: {},
                value1: '',
                value2: ''
            }
        },
        mounted () {
        },
        methods: {
            getSearchWord(value) {
                var self = this;
                if (value.target.value && value.target.value != "") {
                    self.listSearch.searchWord = "";
                    self.listSearch.searchWord = value.target.value;
                } else {
                    self.listSearch.searchWord = "";
                }
                this.$emit('data', self.listSearch)
            },
            handleCheckAllTypeChange(event) {
                this.checkedType = event.target.checked ? typeOptions : [];
                this.isIndeterminateType = false;
                var self = this;
                if (self.checkedType.length == 0) {
                    self.listSearch.type = [];
                    self.listSearch.type = ["news", "weibo", "bar", "bbs"];
                } else {
                    self.listSearch.type = [];
                    self.listSearch.type = ["news", "weibo", "bar", "bbs"];
                }
                this.$emit('data', self.listSearch);
            },
            handleCheckAllEmotionChange(event) {
                this.checkEmotion = event.target.checked ? emotionOptions : [];
                this.isIndeterminateEmotion = false;
                var self = this;
                if (self.checkEmotion.length == 0) {
                    self.listSearch.searchKey = [];
                    self.listSearch.searchKey = [{
                        "key": "nlp.sentiment.label",
                        "value": "POS@NEG@NEU"
                    }]
                } else {
                    self.listSearch.searchKey = [];
                    self.listSearch.searchKey = [{
                        "key": "nlp.sentiment.label",
                        "value": "POS@NEG@NEU"
                    }]
                }
                this.$emit('data', self.listSearch);
            },
            handleCheckedTypesChange(value) {
                let checkedCount = value.length;
                this.checkAllType = checkedCount === this.types.length;
                this.isIndeterminateType = checkedCount > 0 && checkedCount < this.types.length;
                var self = this;
                if (value.length > 0) {
                    self.listSearch.changeType = []
                    $.each(value, function (i, item) {
                        if (item == "新闻") {
                            self.listSearch.changeType.push("news");
                        }
                        if (item == "微博") {
                            self.listSearch.changeType.push("weibo");
                        }
                        if (item == "贴吧") {
                            self.listSearch.changeType.push("bar");
                        }
                        if (item == "论坛") {
                            self.listSearch.changeType.push("bbs");
                        }
                    })

                } else {
                    self.listSearch.changeType = [];
                    self.listSearch.changeType = ["news", "weibo", "bar", "bbs"];
                }
                self.listSearch.type = [];
                self.listSearch.type = self.listSearch.changeType;
                this.$emit('data', self.listSearch);
            },
            handleCheckedEmotionsChange(value) {
                let checkedCount = value.length;
                this.checkAllEmotion = checkedCount === this.emotions.length;
                this.isIndeterminateEmotion = checkedCount > 0 && checkedCount < this.emotions.length;
                var self = this;
                self.listSearch.searchKey = [];
                switch (value.length) {
                    case 0:
                        self.listSearch.searchKey = [{
                            "key": "nlp.sentiment.label",
                            "value": "POS@NEG@NEU"
                        }]
                        return this.$emit('data', self.listSearch);
                        break;
                    case 1:
                        for (var i = 0; i < value.length; i++) {
                            if (value[i] == "正面")
                                self.listSearch.searchKey.push({
                                    "key": "nlp.sentiment.label",
                                    "value": "POS"
                                })
                            if (value[i] == "负面") {
                                self.listSearch.searchKey.push({
                                    "key": "nlp.sentiment.label",
                                    "value": "NEG"
                                })
                            }
                            if (value[i] == "中性") {
                                self.listSearch.searchKey.push({
                                    "key": "nlp.sentiment.label",
                                    "value": "NEU"
                                })
                            }
                        }
                        return this.$emit('data', self.listSearch);
                        break;
                    case 2:
                        var valueArray = [];
                        for (var i = 0; i < value.length; i++) {
                            if (value[i] == "正面") {
                                valueArray.push("POS");
                            }
                            if (value[i] == "负面") {
                                valueArray.push("NEG");
                            }
                            if (value[i] == "中性") {
                                valueArray.push("NEU");
                            }
                        }
                        var valueString = valueArray.join("@");
                        self.listSearch.searchKey.push({
                            "key": "nlp.sentiment.label",
                            "value": valueString
                        })
                        return this.$emit('data', self.listSearch);
                        break;
                    case 3:
                        var valueArray = [];
                        for (var i = 0; i < value.length; i++) {
                            if (value[i] == "正面") {
                                valueArray.push("POS");
                            }
                            if (value[i] == "负面") {
                                valueArray.push("NEG");
                            }
                            if (value[i] == "中性") {
                                valueArray.push("NEU");
                            }
                        }
                        var valueString = valueArray.join("@");
                        self.listSearch.searchKey.push({
                            "key": "nlp.sentiment.label",
                            "value": valueString
                        })
                        return this.$emit('data', self.listSearch);
                        break;
                    default:
                        self.listSearch.searchKey = [{
                            "key": "nlp.sentiment.label",
                            "value": "POS@NEG@NEU"
                        }]
                        return this.$emit('data', self.listSearch);
                        break;
                }
            },
            changeStartTime: function (item) {
                var self = this;
                self.listSearch.startDate = item;
                return this.$emit('data', self.listSearch);
            },
            changeEndTime: function (item) {
              var self = this;
              self.listSearch.endDate = item;
              return this.$emit('data',self.listSearch);
            },
            changeSort: function (item) {
                var self = this;
                var myOrders = [];
                if (item == 1) {
                    myOrders = [{
                        "direction": "DESC",
                        "orderBy": "pubTime"
                    }];
                } else if (item == 2) {
                    myOrders = [{
                        "direction": "ASC",
                        "orderBy": "pubTime"
                    }];
                } else {
                    myOrders = [];
                }
                self.listSearch.orders = [];
                self.listSearch.orders = myOrders;
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
