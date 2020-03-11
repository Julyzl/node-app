<template>
   <!-- 个人经验 -->
          <div>
            <h4 class="mb-2">个人经验</h4>
            <table class="table">
              <thead>
                <tr>
                  <th>公司</th>
                  <th>工作内容</th>
                  <th>工作时间</th>
                  <th />
                </tr>
              </thead>
              <tbody v-for="(item, index) in experience" :key="index">
                <tr>
                  <td>{{item.company}}</td>
                  <td>{{item.location}}</td>
                  <td>
                  {{item.from}}-{{item.to}}
                  </td>
                  <td>
                    <button @click="deleteExp(item._id)" class="btn btn-danger">
                      删除
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:{
    experience:{
      type:Array
    }
  },
  methods: {
    deleteExp(del_id){
//  let id =this.$store.getters.user.id
//        this.$axios.post(`/api/profile/experience/del`,{id:id,del_id:del_id})
//        .then(res=>{
//          console.log(res);
//        })
//        .catch(err=>{
//          console.log(res.response.data);
//        })
this.$emit("deleteExperience",del_id)
    }
  },
};
</script>

<style scoped></style>