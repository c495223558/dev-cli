<script>
export default {
  name: 'demo3',
  props: {
    id: {
      type: Number,
      default: 1
    }
  },
  render() {
    return(
       <div class='a'>组件测试21111</div>
    )
  },
  mounted () {
  }
}
</script>
<style lang="less">
  .a{
    border-bottom: 1px solid red;
  }
</style>