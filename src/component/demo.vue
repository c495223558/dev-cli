  <template>
    <div>
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
    methods: {},
    mounted() {}
  }
  </script>