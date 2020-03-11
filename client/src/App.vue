<template>
  <div id="app">
    <NavBar />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Footer />
    <Loading v-show="loading"/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Loading from "./components//common/Loading";
import jwt_decode from "jwt-decode";
export default {
  name: "App",
  components: {
    NavBar,
    Landing,
    Footer,
    Loading
  },
  computed: {
    loading(){
      return this.$store.getters.loading
    }
  },
  created() {
    if (localStorage.token) {
      const decode = jwt_decode(localStorage.token);

      // 检测token是否过期
      const nowDate = Date.now() / 1000;
      if (decode.exp < nowDate) {  // token过期
        this.$store.dispatch("clearCurrentState", {});
        // 跳转登录
        this.$router.push("/login");
      }else{
      // 利用vuex的actions 更改store的state
      // 进行认证,认证成功 IsAuthenticated 为真true
      this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decode));
      // 认证成功存储用户数据并且跳转页面
      if (this.$store.getters.isAuthenticated) {
        this.$store.dispatch("setUser", decode);
      }
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
  }
};
</script>

<style></style>
