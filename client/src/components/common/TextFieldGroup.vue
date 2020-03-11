<template>
  <div class="form-group">
    <input
      :type="type"
      class="form-control form-control-lg"
      :placeholder="placeholder"
      :value="value"
      :name="name"
     :disabled='disabled'
      :class="{ 'is-invalid': error }"
      @input="$emit('input',$event.target.value)"
    />
    <div v-if="error" class="invalid-feedback">
      {{ error }}
    </div>
     <small v-if="info" className="form-text text-muted">{{info}}</small>
  </div>
</template>

<script>
export default {
    name:'textFieldGroup',
    props:{
     type:{
         type:String,
         default:'text',
     },
     placeholder:{
          type:String,
     },
     name:String,
     disabled:Boolean,
     error:String,
     info:String,
     value:String
    },
  data() {
    return {};
  }
};
</script>

<style scoped></style>
