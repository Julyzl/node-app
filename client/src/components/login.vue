<template>
  <div>
    <!-- 登录 -->
    <div class="login">
      <div class="container">
        <div class="row">
          <div class="col-md-8 m-auto">
            <h1 class="display-4 text-center">登录</h1>
            <p class="lead text-center">用正确的账号登录</p>
            <form @submit.prevent="submit" autocomplete="off">
             <TextField 
             type='email'
             placeholder="邮箱地址"
             name='email'
             v-model="user.email"
             :error='errors.email'
             />
               <TextField 
             type='password'
             placeholder="请输入你的密码"
             name='password'
             v-model="user.password"
             :error='errors.password'
             info='密码不可以为空'
             />
  
              <input type="submit" class="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import TextField from './common/TextFieldGroup'
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      errors: {}
    };
  },
  components:{
    TextField
  },
  methods: {
    submit() {
      this.$axios
        .post("/api/user/login", this.user)
        .then(res => {
          let IdToken = JSON.stringify(res.data);
          window.localStorage.setItem("jwtToken", IdToken);
          window.localStorage.setItem("token", res.data.token);

          // 解析token ，解析结果为一个空对象
          const decode = jwt_decode(res.data.token);

          // 利用vuex的actions 更改store的state
          // 进行认证,认证成功 IsAuthenticated 为真true
          this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decode));
          // 认证成功存储用户数据并且跳转页面
          if (this.$store.getters.isAuthenticated) {
            this.$store.dispatch("setUser", decode);
            this.$router.push("/dashboard");
          }
        })
        .catch(err => {
          if (err.response.data) {
            this.errors = err.response.data;
          }
        });
    },
    isEmpty(value) {
      // 判断是否为空对象
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

<style scoped></style>
