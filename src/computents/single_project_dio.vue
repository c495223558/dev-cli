<template>
    <div class="single_project_dio">
        <div style="margin-top: 15px;" @click="open">
            <el-input placeholder="请输入内容" :disabled="true" v-model="showname">
                <template slot="append" @click="open">选择单体</template>
            </el-input>
        </div>
        <el-dialog title="单项工程名称" :visible.sync="dialogTableVisible">
            <el-table
                    ref="multipleTable"
                    :data="gridData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="单项工程名称"
                >
                    <template slot-scope="scope">{{ scope.row.dantiName }}</template>
                </el-table-column>
                <el-table-column
                        prop="totalArea"
                        label="总建筑面积(㎡)"
                        >
                </el-table-column>
                <el-table-column
                        prop="aboveArea"
                        label="地上建筑面积(㎡)"
                >
                </el-table-column>
                <el-table-column
                        prop="underArea"
                        label="地下建筑面积(㎡)"
                >
                </el-table-column>
                <el-table-column
                        label="缴费状态"
                >
                    <template slot-scope="scope">{{ scope.row.state || '--'}}</template>

                </el-table-column>
            </el-table>

            <span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="confirm">确 认</el-button>
			    <el-button type="primary" @click="cancel">取消</el-button>
			  </span>
        </el-dialog>
    </div>
</template>
<script>

    export default {
        name:'single_project_dio',
        inject: [],
        props: {
            // 主子表的值
            dataInfo: {
                type: Object,
                default: {}
            }
        },

        data () {
            return {
                boshi: 'http://118.31.117.243/support', //博士的测试地址
                token: '', //local中的token
                base_url: '', //全局域名
                dialogTableVisible:false,
                multipleSelection:[],
                gridData: [],
                pid:'',
                showname:''
            }
        },
        mounted() {
            this.token = localStorage.getItem('Token')
            this.base_url = window.MainHeader
            console.log('token：', this.token)
            console.log('window.MainHeader:', this.base_url)
            console.log('dataInfo', this.dataInfo)

        },
        methods: {
            //进来获取数据
            updata(pid) {
                axios
                    .post(
                        `${this.boshi}/api/thrid/monomer/information/listByParentId`, {
                            pid: pid
                        }, {
                            headers: {
                                token: this.token
                            }
                        }
                    )
                    .then(res => {
                        console.log('请求之后res是啥：', res)
                        this.gridData = res.data.data
                    })
                    .catch(error => {
                        console.log('错误了：', error);
                    });
            },
            // 确认按钮
            confirm() {
                // var new_data = JSON.stringify(newval)
                // this.dataInfo.value = new_data
                let addArea = 0;
                console.log(this.multipleSelection)
                this.multipleSelection.forEach(function (item) {
                    addArea += (item.totalArea)*100
                })
                this.dataInfo.value = this.multipleSelection;
                this.dialogTableVisible = false;
                this.$store.state.single_project_dio = addArea/100;
                this.showname = this.multipleSelection.map(function (item) {
                        return item.dantiName
                }).join(',')
            },
            //选择按钮
            handleSelectionChange(val){
                console.log(val)
                this.multipleSelection = val;
            },
            open(){
                console.log(this.dataInfo)

                this.pid = this.$store.state.aboutData.rowID
                this.updata(this.pid)


                this.dialogTableVisible = true;
            },
            cancel(){
                this.dialogTableVisible = false
            }
        }
    }
</script>