<template>
   <div class="feed">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
 <!-- 添加留言 -->
  <PostForm  @update="getPost"/>
<!-- 展示留言 -->
     <PostFeed v-for="(post) in posts" :key="post._id" :post='post'   @update="getPost"/>
          
         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostForm from './PostForm'
import PostFeed from './PostFeed'
export default {
  data() {
    return {
        posts:[],
        errors:{}
    };
  },
  methods: {
      getPost(){
          this.$axios.get('/api/posts')
          .then((res) => {
            this.posts=res.data
            console.log(this.posts);
          }).catch((err) => {
              if(err.response.data){
                  this.errors=err.response.data
              }
          });
      }
  },
  components:{
      PostForm,
      PostFeed
  },
  beforeRouteEnter (to, from, next) {
      next(vm=>{
          vm.getPost()
      })
  }
};
</script>

<style scoped></style>
