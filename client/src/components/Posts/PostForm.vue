<template>
  <div class="post-form mb-3">
        <div class="card card-info">
            <div class="card-header bg-info text-white">
            说点啥...
            </div>
	          <form @submit.prevent="submit">
               <TextArea 
                name="text"
                placeholder="随便写点啥"
                v-model="text"
                :error="errors.text"
               />
               <input type="submit" class="btn btn-dark" />
            </form>
            <div class="card-body">
            </div>
        </div>
    </div>
</template>

<script>
import TextArea from '../common/TextAreaGroup';
export default {
  data() {
    return {
        text:"",
        errors:{}
    };
  },
  components:{
      TextArea
  },
  methods: {
      submit(){
          let newPost={
              id:this.$store.getters.user.id,
              text:this.text,
              name:this.$store.getters.user.name,
              avatar:this.$store.getters.user.avatar,
          }
          this.$axios.post("/api/posts",newPost)
          .then((res) => {
              this.errors={}
              this.text=''
            this.$emit('update')
          }).catch((err) => {
              if(err.response.data){
                  this.errors=err.response.data
              }
          });
      }
  },
};
</script>

<style scoped></style>
