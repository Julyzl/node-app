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
              <router-link class="nav-link" to="/register">注册</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">登录</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>

</style>
