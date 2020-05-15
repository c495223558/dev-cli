<template>
    <div>
        <template v-if="searchType == 'form'">
            <el-button type="success" @click="aaa">成功按钮</el-button>
        </template>
        <template v-else-if="searchType == 'table'">我是子表中的自定义组件</template>
        <template v-else-if="searchType == 'searchType'">我是查询条件中的自定义组件</template>
        <el-table-column
            v-if="searchType == 'details'"
            :prop="dataInfo.model"
            :label="dataInfo.columnComment"
            :width="dataInfo.options.width===''?'auto':dataInfo.options.width"
        >
            <template>我是列表中的自定义组件</template>
        </el-table-column>
    </div>
</template>
<script>
export default {
  name: 'ch0418',
  inject: ['parentPage', 'formPage'],
  props: {
    dataInfo: {
      type: Object,
      default: {}
    },
    searchType: {
      type: String,
      default: 'form'
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    aaa() {
      console.log(this.$COMPONENTCUNSTOM.getFromData())
    }
  },
  mounted() {
    // 不符合的前端模块化规范的库 引用方式
    let test = require('exports-loader?window.test!../assets/js/test.js')
    console.log('test', test)
  }
}
</script>