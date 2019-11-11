<script>
// import vuex from 'vuex'
export default {
  name: 'demo',
  props: {
    id: {
      type: Number,
      default: 1
    }
  },
  render() {
    return(
       <div class='a'>组件测试2</div>
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