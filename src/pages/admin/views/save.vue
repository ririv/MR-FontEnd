<template>
  <div id="save">
    <div class="form-frame" v-loading="loading">
      <h2>{{operateType=="edit"?"修改":"创建"}}{{className}}</h2>
      <el-form
        label-position="left"
        v-if="className == 'user'"
        :model="formData.user"
        label-width="80px"
      >
        <el-form-item label="id">
          <el-input :disabled="true" placeholder="请不要填，你填了也没用^_^" v-model="formData.user.id"></el-input>
        </el-form-item>

        <el-form-item label="username">
          <el-input v-model="formData.user.username"></el-input>
        </el-form-item>

        <el-form-item label="password">
          <el-input
            :disabled="operateType=='edit'?true:false"
            placeholder="密码会被加密"
            v-model="formData.user.password"
          ></el-input>
        </el-form-item>

        <el-form-item label="email">
          <el-input v-model="formData.user.email"></el-input>
        </el-form-item>

        <el-form-item label="roleNames">
          <el-input :disabled="true" placeholder="不要想着动权限哦" v-model="formData.user.roleNames"></el-input>
        </el-form-item>
      </el-form>

      <!--image暂时不提供创建接口-->
      <el-form
        label-position="left"
        v-loading="loading"
        v-if="className == 'img'&& operateType!='create'"
        :model="formData.img"
        label-width="80px"
      >
        <el-form-item label="id">
          <el-input :disabled="true" placeholder="请不要填，你填了也没用^_^" v-model="formData.img.id"></el-input>
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
      </el-form>

      <el-form
        label-position="left"
        v-loading="loading"
        v-if="className == 'model'"
        :model="formData.model"
        label-width="80px"
      >
        <el-form-item label="id">
          <el-input :disabled="true" placeholder="请不要填，你填了也没用^_^" v-model="formData.model.id"></el-input>
        </el-form-item>

        <el-form-item label="name">
          <el-input v-model="formData.model.name"></el-input>
        </el-form-item>

        <el-form-item label="path">
          <el-input :disabled="true" v-model="formData.model.path"></el-input>
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
          <el-input :disabled="true" v-model="formData.model.updateTime"></el-input>
        </el-form-item>

        <el-form-item label="labels">
          <el-input type="textarea" v-model="formData.model.labels"></el-input>
        </el-form-item>

        <el-form-item label="enabled">
          <el-switch v-model="formData.model.enabled"></el-switch>
        </el-form-item>

        <el-form-item class="model-upload-item" label="model" v-if="operateType=='create'">
          <el-upload ref="upload" action :on-change="handleChange" :limit="1" :auto-upload="false">
            <el-button style=" margin-right:20px" size="small" type="primary">点击选取</el-button>
            <span slot="tip">目前只支持keras模型，文件格式：XXX.h5</span>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="openConfirm">{{operateType=="edit"?"立即更新":"立即创建"}}</el-button>
      <el-button @click="goBack">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "save",
  data() {
    return {
      className: this.$route.params.class,
      id: this.$route.params.id,
      operateType: this.$route.params.operateType,
      formData: {
        user: { "id": null, "username": null, "password": null, "email": null, "roleNames": null },
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
        },
      },
      file: null,
      loading: true,
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
        })
        .finally(() => this.loading = false)
    },

    handleSuccess(respData) {

      this.$router.push({
        name: "operate",
        params: {
          operateType: "save",
          id: "success"
        }
      })
      this.$nextTick(() => this.$root.$emit("details", respData))

    },

    openConfirm() {
      this.$confirm(<span>确定提交？</span>, "确认", {
        confirmButtonText: '我想好了',
        cancelButtonText: '再看看'      })
        .then(() => this.onSubmit()
        )
    },

    onSubmit() {
      this.loading = true
      let submitData
      let submitURL = this.operateType == "edit" ? "admin/" + this.className + "/operate/" + this.id : "admin/" + this.className + "/create"
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

      if (this.operateType == "create" && this.className == "model") {
        let fileData = new FormData()
        fileData.append("file", this.file)

        this.axios.all([
          this.axios.post("admin/model/create/upload", fileData, {
            headers: { "Content-Type": "multipart/form-data" }
          }),
          this.axios.post("admin/model/create/add", submitData),
        ])
          .then(this.axios.spread((resp1, resp2) => {
            this.handleSuccess(resp2.data)
          }))
          .catch(error=>this.$message.error('出错了，操作失败'))
                  .finally(() => this.loading = false)
      }
      else {
        this.axios
          .post(submitURL, submitData)
          .then(response => {
            this.handleSuccess(response.data)
          })
          .catch(error=>this.$message.error('出错了，操作失败'))
                  .finally(() => this.loading = false)
      }
    },

    handleChange(file) {
      this.file = file.raw
    },

    goBack() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
  },

  created() {
    if (this.operateType === "edit") {
      this.fetchData()
    }
    else {
      this.loading = false //创建没必要加载数据
    }
  },

}


</script>
<style>
#save {
  position: relative;
}

.form-frame {
  width: 50%;
  text-shadow: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 2px #333333;
  padding: 10px;
  text-align: center;
  margin: 20px auto 40px auto;
  left: 0;
  right: 0;
  position: absolute;
}

.el-upload-list {
  position: absolute;
  left: 0;
  right: 0;
}

.model-upload-item {
  position: relative;
}

.model-upload-item::after {
  height: 30px;
}
</style>


