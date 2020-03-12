<template>
  <div>
  <hr />
  <h3 class="mb-4">Github仓库信息</h3>
  <div v-for="repo in repos" :key="repo.id" class="card card-body mb-2">
        <div class="row">
          <div class="col-md-6">
            <h4>
              <a :href="repo.html_url" class="text-info" target="_blank"> 
                  {{repo.name}}
              </a>
            </h4>
            <p>{{repo.description}}</p>
          </div>
          <div class="col-md-6">
            <span class="badge badge-info mr-1">
              Stars: {{repo.stargazers_count}}
            </span>
            <span class="badge badge-secondary mr-1">
              Watchers: {{repo.watchers_count}}
            </span>
            <span class="badge badge-success">
              Forks: {{repo.forks_count}}
            </span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
data() {
    return {
        clientId:'16b332451209d01b0ed9',
        client_secret:'2399395bd3e9cb556cdf2f57d017404afb3f87f8',
        count:0,
        sort:"created desc",
        repos:[]
    }
},
 props:{
     username:String
 },
 created() {
     this.$axios.get(`https://api.github.com/users/${this.username}/repos?per_page=${this.count}&sort=${this.sort}&client_id=${this.clientId}&client_secret=${this.client_secret}`)
     .then((res) => {
       this.repos=res.data
     }).catch((err) => {
         
     });
 },
};
</script>

<style scoped></style>
