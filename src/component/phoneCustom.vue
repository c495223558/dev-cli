<template>
  <div class="phoneCustom">
   <!-- <mam-form-item 
    :decorator='decorator'
    :label="info.name"> -->
      <van-field  v-model="value" ></van-field>
      <div class="aaa">
        我有一只小毛驴我从来也不骑
      </div>
    <!-- </mam-form-item>  -->
  </div>
</template>
<script>
import { plugMixins , defultComputedMixin} from '../mixins';
export default {
  name: 'phoneCustom',
  // mixins: [plugMixins , defultComputedMixin],
  // inject:['mamAppForm'],
  data() {
    return {
      value: '111'
    }
  },
  mounted() {
    console.log('this.mamAppForm----',this.mamAppForm)
  }
}
</script>
<style lang="less" scoped>
.aaa{
  font-size: 30px;
  padding: 20px;
}
</style>