<!--
 * @Author: your name
 * @Date: 2020-05-20 17:32:44
 * @LastEditTime: 2020-05-26 11:45:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /dev-cli/src/component/kpi-test.vue
--> 
<template>
  <div>
    <el-form ref="form" :inline="true" label-width="80px" v-if="searchType == 'form'">
      <el-form-item label="kpi-test">
        <el-input v-model="kpiTest" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'kpitest',
  props: {
    dataInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    searchType: {
      type: String,
      default: 'form'
    }
  },
  data() {
    return {
      kpiTest: ''
    }
  },
  mounted() {
    console.log(this.$COMPONENTCUNSTOM.getEditData())
  }
}
</script>