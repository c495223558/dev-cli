<template>
  <div class="selectFloor">
    <template v-if="searchType == 'form'">
      <el-select v-model="floorNum" placeholder="请选择" @change="handleChangeFloorNum">
        <el-option
          v-for="(item,index) in floorNumList"
          :key="index"
          :label="item.name"
          :value="item.floorNum"
        ></el-option>
      </el-select>
    </template>
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
// const BASE_URL = 'https://dev-gateway.vgo.live/merchant/'

export default {
  name: 'selectFloor',
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
  data() {
    return {
      floorNum: '',
      floorNumList: [],
      form: '',
      partValue: '',
      name: '',
      noVal: ''
    }
  },
  watch: {
    value: {
      deep: true,
      handler(newVal, oldVal) {
        this.getById(newVal)
        this.form.value = ''
        this.noVal.value = ''
      }
    },
    partVal: {
      deep: true,
      handler(newVal, oldVal) {
        this.handleAddCode()
      }
    },
    noValue: {
      deep: true,
      handler(newVal, oldVal) {
        this.handleAddCode()
      }
    },
    floorValue: {
      deep: true,
      handler(newVal, oldVal) {
        this.floorNum = newVal
        this.handleAddCode()
      }
    }
  },
  computed: {
    token() {
      return window.localStorage.getItem('Token')
    },
    value() {
      this.partValue = this.$COMPONENTCUNSTOM.getFromData()
        ? this.$COMPONENTCUNSTOM.getFromData()[1].columns[0].columns[0]
        : {}
      return this.partValue.value
    },
    partVal() {
      const value = this.$COMPONENTCUNSTOM.getFromData()
        ? this.$COMPONENTCUNSTOM.getFromData()[1].columns[0].columns[0]
        : {}
      return value.value
    },
    floorValue() {
      const value = this.$COMPONENTCUNSTOM.getFromData()
        ? this.$COMPONENTCUNSTOM.getFromData()[1].columns[1].columns[0]
        : {}
      return value.value
    },
    noValue() {
      const value = this.$COMPONENTCUNSTOM.getFromData()
        ? this.$COMPONENTCUNSTOM.getFromData()[1].columns[2].columns[0]
        : {}
      return value.value
    }
  },
  methods: {
    //铺位添加编号
    handleAddCode() {
      if (this.floorNum && this.value && this.noValue) {
        this.$COMPONENTCUNSTOM.getFromData()[0].columns[0].columns[0].value =
          this.name + '-' + this.floorNum + '-' + this.noValue
      }
    },
    //获取一级菜单
    getById(id) {
      const headers = {
        headers: {
          token: this.token
        }
      }
      const data = {
        id: id
      }
      const qs = require('qs')
      this.httpRequest(
        '/api/platform/counterPart/getById',
        qs.stringify(data),
        headers
      ).then(res => {
        const floorNum = res.data.data.floorNum
        this.name = res.data.data.name
        this.addFloorList(floorNum)
      })
    },
    handleChangeFloorNum() {
      this.$COMPONENTCUNSTOM.getFromData()[1].columns[1].columns[0].value = this.floorNum
    },
    //axios 封装
    httpRequest(url, data, header) {
      const requestUrl = process.env.BASE_API + url
      return new Promise((res, rej) => {
        axios
          .post(requestUrl, data, header)
          .then(data => {
            res(data)
          })
          .catch(err => {
            console.error('发生了错误')
            rej(err)
          })
      })
    },
    //添加楼层列表
    addFloorList(listNum) {
      this.floorNumList = []
      for (let index = 1; index < listNum + 1; index++) {
        this.floorNumList.push({
          floorNum: index,
          name: index + '楼'
        })
      }
    },
    //获取店铺id
    getPart() {
      if (this.partValue.value) {
        this.getById(this.partValue.value)
      }
    },
    //回显获取
    getDeail() {
      // this.form.value = Number(this.form.value)
      this.floorNum = Number(this.form.value)
    }
  },
  mounted() {
    if (this.searchType === 'form') {
      this.form = this.$COMPONENTCUNSTOM.getFromData()[1].columns[1].columns[0]
      this.noVal = this.$COMPONENTCUNSTOM.getFromData()[1].columns[2].columns[0]
      this.getPart()
      if (this.$route.query.action === 'edit' || 'info') {
        this.getDeail()
      }
    }

    // this.getById()
  }
}
</script>

<style lang="scss">
</style>