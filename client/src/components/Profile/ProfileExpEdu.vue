<template>
  <!-- Profile -->
  <div class="row">
    <div class="col-md-6">
      <h3 class="text-center text-info">经验</h3>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="(item, index) in experience"
          :key="index"
        >
          <h4>{{ experience.company }}</h4>
          <p>{{ experience.from }} - {{ experience.to }}</p>
          <p>
            <strong>职位:</strong>
            {{ experience.title }}
          </p>
          <p v-if="item.location">
            <strong>地点:</strong>
            {{ item.location }}
          </p>
          <p v-if="exp.description">
            <strong>岗位职责:</strong>
            {{ exp.description }}
          </p>
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <h3 class="text-center text-info">教育</h3>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="(item, index) in education"
          :key="index"
        >
          <h4>{{item.school}}</h4>
          <p>{{ item.from }} - {{ item.to }}</p>
          <p><strong>学历:</strong>{{ item.degree }}</p>
          <p v-if="item.fieldofstudy">
            <strong>专业:</strong>{{ item.fieldofstudy }}
          </p>

          <p v-if="item.description">
            <strong>描述:</strong>
            {{ item.description }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    experience: Array,
    education: Array
  }
};
</script>

<style scoped></style>
