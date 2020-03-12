#  axios封装

引入axios

```js
import axios from 'axios';
```

配置请求头

```js
import axios from 'axios';
// 引入vuex ，加载动画
import store from '../store'

// 请求拦截
axios.interceptors.request.use(
    config => {
        store.dispatch("setLoading", true)
        if (localStorage.jwtToken) {
            let token = JSON.parse(localStorage.jwtToken).token
            config.headers.Authorization = token
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }

)

// 响应拦截
axios.interceptors.response.use(
    response => {
        store.dispatch("setLoading", false)
        return response
    },
    error => {
        store.dispatch("setLoading", false)
        return Promise.reject(error)
    }


)

export default axios;
```

```js

```

