<template>
  <div id="operate">
    <div class="form-frame">
      <el-form
        label-position="left"
        v-loading="loading"
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

        <el-form-item label="email">
          <el-input v-model="formData.user.email"></el-input>
        </el-form-item>

        <el-form-item label="roleNames">
          <el-input :disabled="true" v-model="formData.user.roleNames"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >{{$route.params.operateType=="edit"?"立即更新":"立即创建"}}</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>

      <!--image暂时不提供创建接口-->
      <el-form
        label-position="left"
        v-loading="loading"
        v-if="className == 'img'&&$route.params.operateType!='create'"
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

        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >{{$route.params.operateType=="edit"?"立即更新":"立即创建"}}</el-button>
          <el-button @click="goBack">取消</el-button>
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

        <el-form-item
          class="model-upload-item"
          label="model"
          v-if="$route.params.operateType=='create'"
        >
          <el-upload
            ref="modelUpload"
            action
            :on-change="handleChange"
            :limit="1"
            :auto-upload="false"
          >
            <el-button style=" margin-right:20px" size="small" type="primary">点击选取</el-button>
            <span slot="tip">目前只支持keras模型，文件格式：XXX.h5</span>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="openConfirm"
          >{{$route.params.operateType=="edit"?"立即更新":"立即创建"}}</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from "querystring"

export default {
  name: "operate",
  data() {
    return {
      className: this.$route.params.class,
      id: this.$route.params.id,
      formData: {
        user: { "id": null, "username": null, "email": null, "roleNames": null },
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
          this.loading = false
        })
    },

    handleSuccess(respData) {

      this.$router.push({
        name: "details",
        params: {
          type: "success"
        }
      })
      this.$nextTick(() => this.$root.$emit("details", respData))

    },

    openConfirm() {
      this.$confirm(<span>确定提交？</span>, "确认", {
        confirmButtonText: '再看看',
        cancelButtonText: '取消'      })
        .then(() => this.onSubmit()
        )
    },

    onSubmit() {
      let operateType = this.$route.params.operateType
      let submitData
      let submitURL = operateType == "edit" ? "admin/" + this.className + "/operate/" + this.id : "admin/" + this.className + "/operate/"
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

      if (operateType == "create" && this.$route.params.class == "model") {
        let self = this

        self.axios.all([() => self.axios.post(submitURL,submitData), () => self.axios.post("admin/" + self.className + "/upload/",this.file)])
          .then(self.axios.spread((func1, func2) => {
            console.log(func1)
            // func1.then(res => console.log(res))
            // func2.then(res => console.log(res))
            // this.$refs.upload.clearFiles()
          }));


      }
      else {
        this.axios
          .post(submitURL, submitData)
          .then(response => {
            this.handleSuccess(response.data)
          })
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
    if (this.$route.params.operateType === "edit") {
      this.fetchData()
    }
    else {
      this.loading = false //创建没必要加载数据
    }
  },

}


</script>
<style>
#operate {
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
  height: 25px;
}
</style>


