<template>
 <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
            <h1 class="display-4">Dashboard</h1>
            <p v-if="user !== null" class="lead text-muted">
              Welcome 
              <router-link v-if="profile == null" to="/profiles">{{user.name}}</router-link> 
              <router-link v-else :to="`/profile/${profile.handle}`">{{user.name}}</router-link>
              </p>
        
             <div v-if="profile != null">
              <!-- 编辑个人信息  添加个人经历 添加教育经历 -->
              <ProfileActived />
              
              <!-- 展示个人经历 -->
              <Experience @deleteExperience="deleteExperience" :experience="profile.experience"/>

              <!-- 展示教育经历 -->
              <Education @deleteEducation="deleteEducation" :education="profile.education"/>

              <!-- 删除账户按钮 -->
              <div style="margin-bottom: 60px">
                <button class="btn btn-danger" @click="deleteClick">删除当前账户</button>
              </div>
            </div>
            <div v-else>
              <p>没有任何相关的个人信息,请添加您的个人信息</p>
              <router-link to="/create-profile" class="btn btn-lg btn-info">添加个人信息</router-link>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileActived from './common/ProfileActived';
import Experience from './common/Experience';
import Education from './common/Education';
export default {
  data() {
    return {
        profile:null
    };
  },
  components:{
      ProfileActived,
      Experience,
      Education
  },
  computed: {
      user(){
          return this.$store.getters.user
      }
  },
  methods: {
    deleteExperience(del_id){
       let id =this.$store.getters.user.id
       this.$axios.post(`/api/profile/experience/del`,{id:id,del_id:del_id})
       .then(res=>{
       this.profile=res.data
       })
       .catch(err=>{
         console.log(res.response.data);
       })
    },
    getProfileData() {
        const params={
            id:this.$store.getters.user.id
        }
       
      this.$axios.get("/api/profile",{
          params:{
              id:this.$store.getters.user.id
          }
          })
      .then(res => {
      
       this.profile=res.data
       this.$store.dispatch('setProfile',res.data)
      }).catch(err=>{
          console.log(err.response);
      })
    },
    deleteClick(){
        let id=this.$store.getters.user.id
        this.$axios.post('/api/profile/del',{id:id})
        .then(data=>{
           this.$store.dispatch('clearCurrentState')
           this.$router.push('/login')
        })
    }
  },
  created() {
    this.getProfileData();
  },
  // 导航守卫，进入此路由前要做的事情
  beforeRouteEnter (to, from, next) {
      next(vm=>{
          vm.getProfileData() // 每次进入都执行这个函数
      })
  }
};
</script>

<style scoped></style>
