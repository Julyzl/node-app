<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div class="container">
      <router-link class="navbar-brand" to="/">July</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#mobile-nav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mobile-nav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/profiles">开发者 </router-link>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
            <router-link class="nav-link" v-show="isLogin" to="/posts"
              >留言</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-show="isLogin" to="/dashboard"
              >Person</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-show="!isLogin" to="/register"
              >注册</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-show="!isLogin" to="/login"
              >登录</router-link
            >
          </li>
          <li class="nav-item" v-show="isLogin">
         
            <a @click.prevent="logout" class="nav-link">
              <img
                :src="user.avatar"
                :alt="user.name"
                class="rounded-circle headerImg"
              />
              退出
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  computed: {
    isLogin() {
      if (this.$store.getters.isAuthenticated) {
        return true;
      } else {
        return false;
      }
    },
        user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    logout() {
      // 清空储存
      localStorage.removeItem("token");
      // 删除请求头,取消登录认证
      // this.$store.dispatch("setIsAuthenticated", false);
      // this.$store.dispatch("setUser", {});
      this.$store.dispatch("clearCurrentState", {});

      // 跳转登录
      this.$router.push("/login");
    },

  }
};
</script>

<style scoped>
.headerImg {
  width: 25px;
  margin-right: 5px;
}
</style>
