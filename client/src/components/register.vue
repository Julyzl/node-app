<template>
  <div>
    <!-- Register -->
    <div class="register">
      <div class="container">
        <div class="row">
          <div class="col-md-8 m-auto">
            <h1 class="display-4 text-center">创建账户</h1>
            <p class="lead text-center">创建你的新账户</p>
            <form @submit.prevent="submit" autocomplete="off">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Name"
                  v-model="newUser.name"
                  :class="{ 'is-invalid': errors.name }"
                  name="name"
                  required
                />
                <div v-if="errors.name" class="invalid-feedback">
                  {{ errors.name }}
                </div>
              </div>

              <div class="form-group">
                <input
                  type="email"
                  class="form-control form-control-lg"
                  placeholder="Email Address"
                  name="email"
                  v-model="newUser.email"
                  :class="{ 'is-invalid': errors.email }"
                />
                <div v-if="errors.email" class="invalid-feedback">
                  {{ errors.email }}
                </div>
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  v-model="newUser.password"
                  :class="{ 'is-invalid': errors.password }"
                />
                <div v-if="errors.password" class="invalid-feedback">
                  {{ errors.password }}
                </div>
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  placeholder="Confirm Password"
                  name="password2"
                  v-model="newUser.password2"
                  :class="{ 'is-invalid': errors.password2 }"
                />
                <div v-if="errors.password2" class="invalid-feedback">
                  {{ errors.password2 }}
                </div>
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
      newUser: {
        name: "",
        email: "",
        password: "",
        password2: ""
      },
      errors: {}
    };
  },
  methods: {
    submit() {
      console.log(11);
      this.$axios
        .post("/api/user/register", this.newUser)
        .then(res => {
          console.log(res.data);
        //   this.$store.commit('setUser',res.data)
        this.$store.dispatch('setUser',res.data)
        alert('登录成功')
        this.$router.push('/login');
         console.log( this.$store.getters.user);
        })
        .catch(err => {
          console.log(1);
          this.errors = err.response.data;
          console.log(this.errors);
        });
    }
  },
  created() {
      console.log(this.$store.getters.user)
  },
};
</script>

<style scoped></style>
