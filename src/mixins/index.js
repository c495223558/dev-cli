// 混入的公共方法
export const plugMixins = {
  data() {
    return {
      decorator: null,
      auther: {
        see: true, // 可见
        write: true, // 可写
        must: false // 必填
      },
    }
  },
  props: {
    dataInfo:{
      type:Object,
      required:true
    },
    type: {
      type: String,
      default: 'form'
    }
  },
  created () {
    this.formTyep = this.$store.state.formTyep;
    if(this.info[this.formTyep] && this.info[this.formTyep].rules){
      this.decorator={
        fileName:"info.value",
        rules:this.info[this.formTyep].rules
      }
    }
  },
  watch: {
    '$store.state.formTyep'(newValue) {
      if(newValue == 'valueAdd') {
        this.auther = this.dataInfo.valueAdd;
      }
      if(newValue == 'valueEdit') {
        this.auther = this.dataInfo.valueEdit;
      }
      if(newValue == 'valueDetail') {
        this.auther = this.dataInfo.valueDetail;
      }
    },
    'info.funcValueList':{
      deep: true,
      handler:function() {
        if(this.info.options.js_content && this.info.funcValueList) this.hideOrShow();
      }
    }
  },
  mounted() {
    /**
     * 表单类型  不同的表单类型  组件里的可读 可写  可见等不同
     * 1:valueAdd  新增时候的表单
     * 2:valueEdit 编辑时候的表单
     * 3:valueDetail 查看详情的表单，全部控件为只读状态
     */
    if(this.formTyep == 'valueAdd') {
      this.auther = this.dataInfo.valueAdd;
    }
    if(this.formTyep == 'valueEdit') {
      this.auther = this.dataInfo.valueEdit;
    }
    if(this.formTyep == 'valueDetail') {
      this.auther = this.dataInfo.valueDetail;
    }
    // 当查询的时候 【this.info.options】值为string 用下面方法修改为正常数据
    if(typeof this.info.options === 'string') this.info.options = JSON.parse(this.info.options);
    // 组件的显示隐藏控制的方法
    if(this.info.options.js_content && this.info.funcValueList) this.hideOrShow();
  },
  methods: {
    // 统一的重置表单的方法
    reset() {
      if( typeof this.info.value === 'string') {
        this.info.value = ''
      } else if(this.info.value instanceof Array) {
        this.info.value = [];
      } else if(this.info.value instanceof Object) {
        this.info.value = {};
      } else {
        // 当为开关的时候为布尔值
        this.info.value = this.defultValue;
      }
      if(this.showData) this.showData = '';
    },
    hideOrShow() {
      let func = this.info.options.js_content;
      let reg = '';
      this.info.funcValueList.forEach(val => {
        reg = new RegExp(`this.paramsKey.${val.model}`,'g')
        func = func.replace(reg , `'${val.value}'`);
      })
      this.auther.see = !eval(func);
    }
  }
  
}
// 混入一个未处理的dataInfo
export const defultComputedMixin = {
  computed: {
    info(){
      return this.dataInfo
    }
  }
}
// 混入一个返回初始value值为数组
export const arrComputedMixin = {
  computed: {
    info(){
      this.dataInfo.value = this.dataInfo.value == '' ? [] : this.dataInfo.value;
      return this.dataInfo
    }
  }
}