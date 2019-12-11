<template>
  <div class="demo4">
    <el-table-column
      v-if="searchType == 'details'"
      :prop="dataInfo.model"
      :label="dataInfo.columnComment"
      :width="dataInfo.options.width===''?'auto':dataInfo.options.width"
    >
      <template slot-scope="scope">
        这是tabe里的自定义组件跳转打到
        <a href="www.baidu.com">百度</a>
      </template>
    </el-table-column>
    <div v-else-if="searchType=='searchType'">我这是查询条件里的自定义组件</div>
    <div v-else-if="searchType==='table'">我这是子表里的自定义组件</div>
    <div v-else>我这是table里的的自定义组件</div>
  </div>
</template>
<script>
export default {
  name:'demo5',
  props: {
    // 主子表的值
    valueCom: {},
    dataInfo: {
      type: Object,
      default: {}
    },
    disabled: {
      type: Boolean,
      default: true
    },
    searchType: {
      type: String,
      default: "form"
    },
    poolDate: {},
    editand: {},
    edit: {},
    editNow: {
      type: Object,
      default: () => {}
    },
  }
}
</script>