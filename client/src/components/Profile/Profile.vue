<template>
  <div class="profile">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <a class="btn btn-light mb-3 float-left"
            @click.prevent="$router.go(-1)">返回个人信息</a>
          </div>
        </div>
        <ProfileHeader v-if="profile" :profile="profile"></ProfileHeader>
        <ProfileAbout v-if="profile" :profile="profile"></ProfileAbout>
     <ProfileExpEdu 
        v-if="profile && (profile.education || profile.experience)"
        :experience="profile.experience"
        :education="profile.education"
        ></ProfileExpEdu>
           <ProfileGithub v-if="profile && profile.githubusername" :username="profile.githubusername"></ProfileGithub>
      </div>
    </div>
</template>

<script>
import ProfileAbout from './ProfileAbout'
import ProfileExpEdu from './ProfileExpEdu'
import ProfileGithub from './ProfileGithub'
import ProfileHeader from './ProfileHeader'
export default {
  data() {
    return {
        profile:null
    };
  },
  components:{
      ProfileAbout,ProfileExpEdu,ProfileGithub,ProfileHeader

  },
  methods: {
      getProfileByHandle(handle){
          this.$axios.get(`/api/profile/handle/${handle}`)
          .then((data) => {
             this.profile=data.data
          }).catch((err) => {
              this.profile=null
          });
      }
  },
  beforeRouteEnter (to, from, next) {
      next(vm=>{
          vm.getProfileByHandle(to.params.handle)
      })
  }
};
</script>

<style scoped></style>
