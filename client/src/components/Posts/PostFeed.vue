<template>
            <div class="posts">
            <div class="card card-body mb-3">
              <div class="row">
                <div class="col-md-2">
                  <a href="profile.html">
                    <img class="rounded-circle d-none d-md-block" :src="post.avatar"
                      alt="" />
                  </a>
                  <br />
                  <p class="text-center">{{post.name}}</p>
                </div>
                <div class="col-md-10">
                  <p class="lead">
                      {{post.text}}
                  </p>
                  <button @click="addlike(post._id)" type="button" class="btn btn-light mr-1">
                    <i class="text-info fas fa-thumbs-up"></i>
                    <span class="badge badge-light">{{post.likes.length}}</span>
                  </button>
                  <button  @click="dellike(post._id)" type="button" class="btn btn-light mr-1">
                    <i class="text-secondary fas fa-thumbs-down"></i>
                  </button>
                  <router-link :to='`/post/${post._id}`' class="btn btn-info mr-1">
                    留言
                  </router-link>
                  <button v-if="user!=null& user.id==post.user" type="button" class="btn btn-danger mr-1" @click='deletePost(post._id)'>
                    <i class="fas fa-times" />
                  </button>
                </div>
              </div>
            </div>

          </div>
</template>

<script>
export default {
  name: 'postFeed',
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  props: {
    post: Object,
    showAction: Boolean
  },
  methods: {
deletePost(delId){
    console.log(delId)
 this.$axios.post(`/api/posts/del`,{id:this.$store.getters.user.id,del_id:delId})
 .then((res) => {
  this.$emit("update")
 }).catch((err) => {
     if(err.response.data){
         console.log(err.response.data)
     }
 });    
},
addlike(id){
    this.$axios.post(`/api/posts/like/${id}`,{id:this.$store.getters.user.id})
    .then((res) => {
        console.log(res);
        this.$emit("update")
    }).catch((err) => {
        console.log(res.response.data);
    });
},
dellike(id){
        this.$axios.post(`/api/posts/unlike/${id}`,{id:this.$store.getters.user.id})
    .then((res) => {
        console.log(res);
        this.$emit("update")
    }).catch((err) => {
        console.log(res.response.data);
    });
}
  },
  created() {
      console.log(this.post);
  },
};
</script>

<style scoped>
</style>r

