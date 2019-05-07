<template>
  <div>
    <div class="form-frame">
      <h2>查看信息</h2>
      <el-form label-position="left" v-loading="loading" label-width="80px">
        <el-form-item class="form-item" v-for="(value,key) of details" :label="key" :key="key">{{ value }}</el-form-item>
      </el-form>
      <router-link to="/">
        <el-button size="medium" class="button-to-home" icon="el-icon-s-home" type="primary">返回主页</el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      details: null,
      loading: false,
      type: this.$route.type
    }
  },
  created() {
    this.$root.$on("details", data => {
      this.details = data
    })
    if (this.type == "success") {
      this.$notify({
        title: '成功',
        message: '操作成功',
        type: 'success'
      })
    }
  },


}
</script>
<style scoped>
.button-to-home {
  margin: auto;
}
.form-item{
  text-align:left;
}
</style>


