<template>
    <div class="timeChange">
        <el-row>
            <el-col :span="20" :offset="2" style=" margin-top:15px;">
                监测时间:
                <el-date-picker
                    v-model="value1"
                    type="date"
                    :placeholder="timeChange.startDate"
                    :default-value="timeChange.startDate"
                    @change = "changeStartTime"
                    :picker-options="pickerOptions0">
                </el-date-picker>
                <el-date-picker
                    v-model="value2"
                    type="date"
                    :placeholder="timeChange.endDate"
                    @change = "changeEndTime"
                    :default-value="timeChange.endDate"
                    :picker-options="pickerOptions1">
                </el-date-picker>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        props: ['timeChange'],
        data () {
            return {
                startTimeDefault:'2016-01-01',
                endTimeDefault:'2017-06-01',
                value1: '',
                value2: '',
                pickerOptions0: {},
                pickerOptions1: {}
            }
        },
        computed: {

        },
        methods: {
            changeStartTime: function (item) {
                var self = this;
                self.timeChange.startDate = item;
                return this.$emit('data', self.timeChange);
            },
            changeEndTime: function (item) {
                var self = this;
                self.timeChange.endDate = item;
                return this.$emit('data',self.timeChange);
            }
        }

    }
</script>
