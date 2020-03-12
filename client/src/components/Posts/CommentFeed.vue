<template>
            <div class="posts">
            <div class="card card-body mb-3">
              <div class="row">
                <div class="col-md-2">
                  <a href="profile.html">
                    <img class="rounded-circle d-none d-md-block" :src="comm.avatar"
                      alt="" />
                  </a>
                  <br />
                  <p class="text-center">{{comm.name}}</p>
                </div>
                <div class="col-md-10">
                  <p class="lead">
                      {{comm.text}}
                  </p>

                  <button v-if="user!=null& user.id==comm.user" type="button" class="btn btn-danger mr-1" @click='deletePost(comm._id)'>
                    <i class="fas fa-times" />
                  </button>
                </div>
              </div>
            </div>

          </div>
</template>

<script>
export default {
  name: 'comFeed',
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  props: {
    comm: Object,
    showAction: Boolean,
    postId:String
  },
  methods: {
deletePost(delId){
    console.log(delId)
 this.$axios.delete(`/api/posts/comment/${this.postId}/${delId}`)
 .then((res) => {
  this.$emit("update")
 }).catch((err) => {
     if(err.response.data){
         console.log(err.response.data)
     }
 });    
},

  },
  created() {
      console.log(this.post);
  },
};
</script>

<style scoped>
</style>r

