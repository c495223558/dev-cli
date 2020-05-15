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
