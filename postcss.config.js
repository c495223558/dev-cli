module.exports = ({file}) => {
  let rootValue;
  // 判断条件 请自行调整 我使用的是 mand-mobile ui 没有对vant引入进行测试 
  if (file && file.dirname && file.dirname.indexOf("vant") != -1) {
    rootValue = 37.5;
  } else {
    rootValue = 75;
  }
  return {
    plugins: {
      'postcss-pxtorem': {
        rootValue: rootValue,//iphone6设计 设计图出多少就写多少px
        propList: ['*'],
        minPixelValue: 2
      }
    }
  }
}