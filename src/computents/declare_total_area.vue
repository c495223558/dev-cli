<template>
    <div>
        <el-input
                placeholder=""
                v-model="count"
                :disabled="true">
        </el-input>    </div>
</template>
<script>

    export default {
        name:'declare_total_area',
        props: {
            inject: [],
            // 主子表的值
            dataInfo: {
                type: Object,
                default: {}
            },
            paramsKey: {
                type: Object,
                default: () => {}
            },
        },
        data(){
            return {
                count: 0
            }
        },
        watch: {
            paramsKey : {
                handler: function(newval, oldval) {
                    console.log(newval,11111111112545, this.$store.state)
                    this.count = this.$store.state.single_project_dio
                },
                deep: true
            }
        },
        mounted(){}
    }
</script>