# peony-ui

> Peony UI elements for Vue 2.0-(芍药UI)基于vue的UI组件

## Install(安装)

You can install it via NPM:(您可以通过NPM安装它)

``` bash
npm install --save peony-ui
```

## Usage(使用)

Import all components.

``` js
import Vue from 'vue'
import PeonyUI from 'peony-ui'
// 或者 const PeonyUI = require('peony-ui')
// 或者 <script src="..."></script>
Vue.use(PeonyUI)
```

Or import specified component.

``` js
import { Affix, Circle } from 'peony-ui'

Vue.component(Affix.name, Affix)
Vue.component(Circle.name, Circle)
```

## Development(开发)

``` bash
# git clone ...
git clone https://github.com/nongshuqiner/peony-ui.git

# enter
cd peony-ui

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build:dist
npm run build:theme
```

## Contact me(联系我)

Just Contact Me At:
- Email: ym1185509297@163.com
- 简书: [言墨儿](https://www.jianshu.com/u/319464da1cc1)

## License

[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2018 - forever Naufal Rabbani
