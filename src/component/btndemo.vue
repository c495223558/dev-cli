<template>
  <div>
    <el-button @click="handleClick">测试</el-button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  inject: ['parentPage', 'formPage'],
  data() {
    return {}
  },
  methods: {
    handleClick() {
      console.log('axios', axios)
    }
  }
}
</script>