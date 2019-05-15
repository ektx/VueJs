# Vue use 插件开发

[toc]

插件开发为了解决：

相对于组件，我们具体更加灵活的处理与使用方式，可以不局限在 webpack 中使用，相对轻量的页面开发工作也可以用 HTML 来处理。

可以对目前的组件进行统一的管理，方便维护与迭代。


# 项目创建

## 创建文件

首先我们创建一个插件项目,其基本的目录如下：
```bash
V5-----
  |-- src 组件目录
  |-- package.json 
```

## 完善 package.json 内容
```json
{
    "name": "v5",
    "version": "0.0.1",
    "license": "MIT"
}
```

# 组件开发

## 入口文件
首先，我们要在我们的 src 目录下添加一个 **index.js** 文件，用于提供整个插件的webpack 入口

index.js 内容可以 [参考这里](https://cn.vuejs.org/v2/guide/plugins.html) 进行开发

```js
const version = '0.0.1'

const install = (Vue, opts = {}) => {
    if (install.installed) return
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    version,
    install
}
```

## 添加组件
在 **src/** 目录下，我们创建一个 **components** 用于统一存放组件，我们先创建一个简单的 vue 组件

- 在 components 下创建 hello 文件夹
- 添加 `index.js` 用于提供组件的出口
- 添加 `hello.vue` 用于组件实体开发

**index.js 内容:**
```js
export { default } from './hello.vue'
```

**hello.vue 内容：**
```html
<template>
    <h1>{{mes}}</h1>
</template>

<script>
export default {
    name: 'v5-hello',
    data () {
        return {
            mes: 'Hello V5'
        }
    }
}
</script>
```

> 需要注意的是 index.js 内容基本保持一致;hello.vue 具体内容以你自己的组件开发需要，要注意的是，这里没有样式。

## 样式文件夹
你可能也发现，我们的组件中，没有样式，这是为什么？

> 组件添加样式是可以的，我们在这里不添加它的原因是，我们在 example 中需要对它进行演示示例，这里如果添加了样式会导致，演示无法正常运行，所以，我们在样式分离开，同时也方便我们对样式单独的打包处理。

在 src 目录下，我们创建一个 styles 文件夹，用于存放我们的样式文件。

其结构如下：
```diff
V5-----
   |-- src 组件目录
   |-- package.json
+  |-- src 组件目录
+    |-- styles/ 样式目录
+      |-- components/ 组件样式目录
+      |-- index.scss  主样式入口
```

> index.scss 为主样式入口，其它的样式都是通过它来引用的。后面的 example 中，我们将告诉你如何使用它。


## 集成组件
有了组件后，我们把组件集成到我们的插件中，修改 **src/index.js**

```diff
+ import v5Hello form './components/hello'

+ const components = {
    v5Hello
  }

  const v5 = {
+     ...components
  }

  const install = function (Vue, opts = {}) {
      if (install.installed) return
      
+     Object.keys(v5).forEach(key => {
+         Vue.component(key, v5[key])
+     }
  }

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    version: process.env.VERSION,
    install
}
```
现在，V5 插件已经有了第一个组件了。


# 示例页面

## 添加示例页面

先为示例页面进行项目的安装
```bash
cd V5
vue create example
```
按照 vue-cli 运行完成后，你的页面应该如下：

```diff
V5-----
+  |-- example 
   |-- src 组件目录
   |-- package.json 
```

## 使用组件样式

我们在 **V5/example/src/App.vue** 中添加如下代码：
```diff
...
<style lang="scss">
+ @import '../../src/styles/index.scss';

  #app { ... }
```

## 引用组件
我们在 **V5/example/src/main.js** 添加如下代码：
```diff
+ import V5 from '../../src/index.js'

+ Vue.use(V5)
```

## 使用组件
现在，我们使用一下我们刚才制作的 hello 组件。

我们修改一下 **V5/src/App.vue** 文件：
```diff
<template>
  <div id="app">
+	<v5-hello />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
```

查看页面效果，出现 Hello V5. 则表示已经完成了。


# Webpack

## Vue 文件打包

添加 webpack 功能，让我们的组件可以打包成插件，并生成在 `V5/dist` 目录中  

需要完成这个功能，我们需要为我们的项目添加 webpack ，这里我们采用官方的建议，安装在本地，不进行全局的包安装：

```bash
yarn add webpack webpack-cli -D
```

添加了webpack后，我们需要添加一个 webpack的配制文件，用于方便我们进行 webpack 的操作：
- 在 V5 目录下添加一个 build 目录
- 在 build 目录中，添加一个 **webpack.config.js**

### webpack 配制
在webpack.config.js 中，我们添加如下内容：
```js
const path = require('path')

module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'V5.js',
        library: 'V5',
        libraryTarget: 'umd'
    }
}
```

### 命令配制

完成之后，我们需要添加一个 npm 命令，用于方便我们进行打包，我们在 package.json 中添加如下代码：

```diff
{
   "veersion": "0.0.1",
+  "scripts": {
+    "build": "webpack --config build/webpack.config.js"
+  },
   "license": "MIT"
}
```

### 处理 ES6+

快捷命令也有了，我们还要添加 babel ,它可以帮助我们使用 ES6 的功能，而不当心浏览器为支持：

```bash
yarn add babel-loader @babel/core @babel/preset-env
```

然后修改一下 webpack.confog.js 添加对 babel 的支持
```diff
   output: { ... },
+  module: {
+      rules: [
+      {
+          test: /\.js$/,
+          use: {
+              loader: 'babel-loader'
+          },
+          exclude: /node_modules/
+      }
+      ]
+  }
```

#### 添加 babel.config.js
在 V5 目录下，我们添加一个名为 **.babelrc** 的文件，内容如下:

```js
module.exports = {
    "presets": ["@babel/preset-env"]
}
```

### 处理 vue 文件
现在，我们需要对 vue 文件进行处理了，以满足我们生成插件的需要，而 webpacck 对 vue 文件原生并不支持，我们需要安装几个 loader

```bash
yarn add vue-loader vue-template-compiler -D
```

然后我们修改一下 **webpack.config.js**
```diff
  const path = require('path')
+ const { VueLoaderPlugin } = require('vue-loader')

  module.exports = {
      // 忽略其它代码  
      module: {
          rules: [
+             {
+                 test: /\.vue$/,
+                 use: ['vue-loader']
+             },
              // 忽略其它代码
          ]
-      }       
+      },
+      plugins: [
+          new VueLoaderPlugin(),
+      ]
  }
```

### 生成

至此，我们完成了基本的插件配置工作了。让我们试试：
```bash
yarn run build
```

dist/V5.js 生成了，我们第一步完成了。

# 样式生成

## gulp

```bash
# 安装 gulp
yarn add gulp -D

# 安装 sass 处理
yarn add gulp-sass -D

# 安装样式自动处理 
yarn add gulp-autoprefixer -D

# 安装重命名
yarn add gulp-rename -D

# 简写
yarn add gulp gulp-sass gulp-autoprefixer gulp-rename -D
```

### 命令文件
我们新建一个 style.js
```js
const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')

sass.compiler = require('node-sass')

gulp.task('sass', function () {
    return gulp.src('../src/styles/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie > 8']
        }))
        .pipe(rename('v5.css'))
        .pipe(gulp.dest('../dist'))
})

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 sass 任务
gulp.task('default', ['sass'])
```

### 修改 package.json
```diff
  "scripts": {
    "es5": "webpack --config build/webpack.config.js",
    "es6": "rollup --config build/rollup.config.js",
+   "style": "gulp --gulpfile build/style.js"
  },

```

生成
```bash
yarn run style
```

## webpack 样式处理

对于样式，通常我们可以让 webpack 自己处理，webpack 也可以帮助我们对 vue 文件中的内容进行样式的提取工作，我们先看看如何配制吧。

## 参考
https://www.kancloud.cn/thinkphp/gulp-guide/44000

# Rollup
前面我们的包已经可以打出对不支持 ES6 module 的浏览器使用。

下面，我们打包ES 6的模式。

```sh
yarn add rollup rollup-plugin-vue rollup-plugin-uglify vue-template-compiler -D
```
- rollup 打包工具
- rollup-plugin-vue 打包 vue 的插件
- rollup-plugin-uglify 代码压缩插件
- vue-template-compiler Vue文件解析组件 

更新 package.json
```diff
{
    "scripts": {
+        "es6": "rollup --config build/rollup.config.js"
    },
-   "main": "dist/V5.min.js"
+   "main": "dist/v5.es6.js"
}
```

## 配置 rollup.config.js

创建 **build/rollup.config.js** 添加以下内容：

```js
import VuePlugin from 'rollup-plugin-vue'

export default {
    input: './src/index.js',
    output: {
        file: './dist/v5.es6.js',
        format: 'esm'
    },
    plugins: [VuePlugin()]
}
```

## 生成

```sh
yarn run es6
```

## 参考
[教程：如何通过 Rollup 来打包 JavaScript
](https://zcfy.cc/article/how-to-bundle-javascript-with-rollup-step-by-step-tutorial-1254.html)


# 高级进阶

## 按需引用
按需引用指定的模块，减少代码的大小。

### babel-plugin-import

首先，在你的项目中，添加 **babel-plugin-import** 插件：

```bash
yarn add babel-plugin-import -D
```

## 配置 .babelrc

然后，在你的项目中，添加 **.babelrc** 文件，如果已经有了就只要添加如下内容：

```json
{
    "plugins": [["import", {
        "libraryName": "V5",
        "libraryDirectory": "src/components"
    }]]
}
```

## 使用
在你的项目中可以通过如下方式使用了：
```js
import { v5Field } from 'V5'

Vue.component('V5Field', v5Field)
```