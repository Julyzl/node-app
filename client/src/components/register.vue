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

                <TextField
                  type="text"
                  placeholder="Name"
                  v-model="newUser.name"
                  :error="errors.name"
                  name="name"
                  required
                />

                <TextField
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  v-model="newUser.email"
                  :error="errors.email"
                />

                <TextField
                  type="password"
                  placeholder="Password"
                  name="password"
                  v-model="newUser.password"
                  :error="errors.password"
                />

                <TextField
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  v-model="newUser.password2"
                  :error="errors.password2"
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
import TextField from './common/TextFieldGroup'
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
  components:{
    TextField
  },
  methods: {
    submit() {
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
