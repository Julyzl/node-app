<template>
  <div class="profiles">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4 text-center">开发者信息</h1>
          <p class="lead text-center">更多信息</p>
          <ProfileItem
            v-for="(item, index) in profiles"
            :key="index"
            :profileItem="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileItem from "./common/ProfileItem";
export default {
  data() {
    return {
      profiles: []
    };
  },
  components: {
    ProfileItem
  },
  methods: {
    getProfiles() {
      this.$axios
        .get("/api/profile/all")
        .then(res => {
          this.profiles = res.data;
          this.$store.dispatch("setProfiles", res.data);
        })
        .catch(err => {
          this.profiles = [];
          this.$store.dispatch("setProfiles", []);
        });
    }
  },
  created() {
    this.getProfiles();
  }
};
</script>

<style scoped></style>
