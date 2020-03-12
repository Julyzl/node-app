<template>
    <div>
          <div class="card card-body bg-light mb-3">
              <div class="row">
                <div class="col-2">
                  <img
                    class="rounded-circle"
                    :src="profileItem.user.avatar"
                    alt=""
                    v-if="profileItem.user"
                  />
                </div>
                <div class="col-lg-6 col-md-4 col-8">
                  <h3>{{profileItem.user.name}}</h3>
                  <p>{{profileItem.status}}</p>
                  <p>{{profileItem.location}}</p>
                  <router-link :to="`/profile/${profileItem.handle}`" class="btn btn-info">更多信息</router-link>
                </div>
                <div class="col-md-4 d-none d-lg-block">
                  <h4>技能</h4>
                  <ul class="list-group">
                    <li class="list-group-item" v-for="(item, index) in profileItem.skills" :key="index">
                      <i class="fa fa-check pr-1"></i>{{item}}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

    </div>
</template>

<script>
export default {
    props:{
        profileItem:Object
    }
}
</script>