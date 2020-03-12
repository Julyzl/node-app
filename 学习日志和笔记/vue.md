#  配置路由 

import router from 'vue-router'

```shell
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes=[
{path:'/',name:'home',component:()=>import ('./././')}
]
export default new Router({
mode:"history",
routes
})
```



#  配置vuex

```js
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
Vue.use(Vuex)

const state = {
    isAuthenticated: false,
    user: {
        name: 'hsak'
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
```



#  在main.js中引用

```js
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import store from './store';
Vue.config.productionTip = false
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
```



#  全局守卫以及组件守卫

在router文件夹  index.js文件中配置全局守卫

```js
// 全局守卫
route.beforeEach((to, from, next) => {
  // 获取token
  const isLogin = localStorage.jwtToken ? true : false;

  if (to.path == '/login' || to.path == '/register' || to.path == '/') {
    next();
  } else {
    isLogin ? next() : next('/login');
  }
});

```

组件路由 ,进入路由前，重新加载获取消息方法。

```js
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getPost(to.params.id);
    });
  },
```

