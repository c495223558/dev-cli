<template>
  <button @click="handleclick" class="customerBtn">提交</button>
</template>
<script>
export default {
  methods: {
    handleclick() {}
  }
}
</script>
<style lang="scss" scoped>
.customerBtn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.customerBtn:active {
  background: #3a8ee6;
  border-color: #3a8ee6;
  color: #fff;
}
.customerBtn:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
</style>

