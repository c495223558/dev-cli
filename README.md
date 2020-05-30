<!--
 * @Author: your name
 * @Date: 2020-04-13 15:59:22
 * @LastEditTime: 2020-05-30 15:07:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /dev-cli/README.md
-->

#### 所有的自定义组件 按钮 页面

- 都需要新建在 src/component 目录下

#### 测试环境打包（demo 组件）

```
npm run build:dev demo
```

#### 测试环境运行（demo 组件）

```
npm run start:dev demo
```

#### 打包自定义页面（customer 组件）

```
npm run build:customer customer
// 最后一个customer 为自定义页面的文件名称
```

#### config 目录下为后台接口地址配置

- dev.env.js 里的全局变量为接口地址

#### config/dev.env.js

> 可注入全局环境变量

#### 测试环境自定义列打包

- 所有的自定义列都要新建在 src/customColums 目录下
- 一级为文件夹
- 二级为自定义列文件
- 打包命令 npm run buildcolums:dev
- shell 终端中按照提示选择打包文件
