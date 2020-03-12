#  Token

解析token

安装第三方包并且引入

cnpm i jwt-decode --save

```js
import jwt_decode from 'jwt-decode';

 const decode=jwt_decode(res.data.token)
 // 解析出来对象
```



在app.vue 中实现刷新解析token ，vuex状态重新存储

App.vue

```js
import jwt_decode from 'jwt-decode';

  created() {
     if(localStorage.token){
       const decode =jwt_decode(localStorage.token)
                 // 利用vuex的actions 更改store的state
          // 进行认证,认证成功 IsAuthenticated 为真true
          this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decode));
          // 认证成功存储用户数据并且跳转页面
          if (this.$store.getters.isAuthenticated) {
            this.$store.dispatch("setUser", decode);
            this.$router.push("/dashboard");
          }
     }
  },
  methods: {
        isEmpty(value) {
      // 判断是否为空对象
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  },
```

