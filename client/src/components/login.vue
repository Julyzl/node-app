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
              <div class="form-group">
                <input
                  type="email"
                  class="form-control form-control-lg"
                  placeholder="Email Address"
                  name="email"
                  v-model="user.email"
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  v-model="user.password"
                />
              </div>
              <input type="submit" class="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    user:{
        email:'',
        password:''
    }
    };
  },
  methods: {
      submit(){}
  },
};
</script>

<style scoped></style>
