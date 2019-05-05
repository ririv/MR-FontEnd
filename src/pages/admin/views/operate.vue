<template>
  <div id="edit">
    <el-form label-position="left" v-loading="loading" v-if="className == 'user'" :model="formData.user" label-width="80px">
      <el-form-item label="id">
        <el-input :disabled="$route.params.operateType!='edit'" v-model="formData.user.id"></el-input>
      </el-form-item>

      <el-form-item label="username">
        <el-input v-model="formData.user.username"></el-input>
      </el-form-item>

      <el-form-item label="password">
        <el-input v-model="formData.user.password"></el-input>
      </el-form-item>

      <el-form-item label="email">
        <el-input v-model="formData.user.email"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{$route.params.operateType=="edit"?"立即更新":"立即创建"}}</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>

    <el-form label-position="left" v-loading="loading" v-if="className == 'img'" :model="formData.img" label-width="80px">
      <el-form-item label="id">
        <el-input :disabled="!$route.params.operateType!='edit'" v-model="formData.img.id"></el-input>
      </el-form-item>

      <el-form-item label="name">
        <el-input v-model="formData.img.name"></el-input>
      </el-form-item>

      <el-form-item label="tag">
        <el-input v-model="formData.img.tag"></el-input>
      </el-form-item>

      <el-form-item label="description">
        <el-input v-model="formData.img.description"></el-input>
      </el-form-item>

      <el-form-item label="owner">
        <el-input v-model="formData.img.owner"></el-input>
      </el-form-item>

      <el-form-item label="sourcename">
        <el-input v-model="formData.img.sourcename"></el-input>
      </el-form-item>

      <el-form-item label="subDir">
        <el-input v-model="formData.img.subDir"></el-input>
      </el-form-item>

      <el-form-item label="subId">
        <el-input v-model="formData.img.subId"></el-input>
      </el-form-item>

      <el-form-item label="enabled">
        <el-switch v-model="formData.img.enabled"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{$route.params.operateType=="edit"?"立即更新":"立即创建"}}</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>

    <el-form label-position="left" v-loading="loading" v-if="className == 'model'" :model="formData.model" label-width="80px">
      <el-form-item label="id">
        <el-input :disabled="!$route.params.operateType!='edit'" v-model="formData.model.id"></el-input>
      </el-form-item>

      <el-form-item label="name">
        <el-input v-model="formData.model.name"></el-input>
      </el-form-item>

      <el-form-item label="tag">
        <el-input v-model="formData.model.path"></el-input>
      </el-form-item>

      <el-form-item label="description">
        <el-input type="textarea" v-model="formData.model.description"></el-input>
      </el-form-item>

      <el-form-item label="channels">
        <el-input v-model="formData.model.channels"></el-input>
      </el-form-item>

      <el-form-item label="height">
        <el-input v-model="formData.model.height"></el-input>
      </el-form-item>

      <el-form-item label="updateTime">
        <el-input v-model="formData.model.updateTime"></el-input>
      </el-form-item>

      <el-form-item label="labels">
        <el-input type="textarea" v-model="formData.model.labels"></el-input>
      </el-form-item>

      <el-form-item label="enabled">
        <el-switch v-model="formData.model.enabled"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit($route.params.operateType)">{{$route.params.operateType=="edit"?"立即更新":"立即创建"}}</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "edit",
  data() {
    return {
      className: this.$route.params.class,
      id: this.$route.params.id,
      formData: {
        user: { "id": null, "username": null, "email": null },
        img: { "id": null, "name": null, "tag": null, "description": null, "owner": null, "sourcename": null, "subDir": null, "subId": null, "enabled": null },
        model: {
          "id": null,
          "name": null,
          "path": null,
          "description": null,
          "channels": null,
          "height": null,
          "updateTime": null,
          "labels": null,
          "enabled": null,
        }
      },
      loading:true
    }
  },

  methods: {
    fetchData() {
      this.axios
        .get("admin/" + this.className + "/operate/" + this.id)
        .then(response => {
          switch (this.className) {
            case "user":
              this.formData.user = response.data
              break
            case "img":
              this.formData.img = response.data
              break
            case "model":
              this.formData.model = response.data
              break
          }
          this.loading = false
        })
    },
    onSubmit(operateType) {
      let submitData
      switch (this.className) {
        case "user":
          submitData = this.formData.user
          break
        case "img":
          submitData = this.formData.img
          break
        case "model":
          submitData = this.formData.model
          break
      }

      let submitURL = "admin/" + this.className + "/operate/"
      if (operateType == "edit") {
        this.axios
          .put(submitURL, this.id, submitData)
          .then(resposne => console.log(response))
      }
      else {
        this.axios
          .post(submitURL, this.id, submitData)
          .then(resposne => console.log(response))
      }
    },

    goBack(){
        window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }

  },
  created() {
    if (this.$route.params.operateType === "edit") {
      this.fetchData()
    }
    else{
      this.loading = false //创建没必要加载数据
    }
  },

}


</script>

