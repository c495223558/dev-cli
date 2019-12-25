<template>
  <div>
    <el-button type="primary" @click="handleclick">测试按钮</el-button>
  </div>
</template>
<script>
export default {
  name:'parentPage',
  inject:['parentPage'],
  methods: {
    handleclick(){
      alert(1)
    }
  }
}
</script>