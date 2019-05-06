<template>
<div>
  <el-form
    label-position="left"
    v-loading="loading"
    label-width="80px"
  >
    <el-form-item v-for="(value,key) of details" :label="key" :key="key">
      {{ value }}
    </el-form-item>

    <el-form-item>
      <el-button >取消</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      details: null,
      loading: false
    }
  },
  created() {
    this.$root.$on("details",data =>{
        this.details = data
        console.log(123)
    })
  },


}
</script>

