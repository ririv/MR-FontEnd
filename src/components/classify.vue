<template>
  <div id="classify">
    <el-row>
      <el-upload
        ref="uploadBody"
        class="upload-body"
        :action="url"
        :headers="headers"
        :auto-upload="false"
        :on-success="handleSuccess"
        :on-progress="handleProgress"
        :on-remove="handleRemove"
        drag
        :multiple="false"
        accept="image/*"
        :limit="1"
        list-type="picture"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
    </el-row>
    <el-row type="flex" justify="center" align="middle" class="row-button">
      <el-button
        :plain="true"
        size="small"
        type="primary"
        v-show="!loadingFlag"
        @click="clickUpload()"
      >
        识别
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
      <i class="el-icon-loading" v-show="loadingFlag"></i>
    </el-row>
  </div>
</template>

<script>
import { baseURL } from "../assets/js/axiosConfig.js"

export default {
  data() {
    return {
      url: baseURL + "api/v1/img/upload",
      relatedImgs: [],
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      resData: null,
      openMessageType: null,
      openMessageInfo: null,
      loadingFlag: false
    }
  },

  methods: {
    handleSuccess(res) {
      // console.log(res)
      this.resData = res;
      if (res.isSuccess === true) {
        this.openMessageInfo = "识别成功" + "\n" + res.tag
        this.openMessageType = "success"

        this.$bus.$emit("classifyResult", res.tag)
        this.$bus.$emit("showWin", true)
      }
      else {
        this.openMessageInfo = "识别失败"
        this.openMessageType = "warning"
      }
      this.openMessage()
      this.loadingFlag = false

    },

    handleRemove() {
      this.$bus.$emit("showWin", false)
    },

    clickUpload() {
      this.$refs.uploadBody.submit();
      // this.loadingFlag = true
    },

    handleProgress(event, file, fileList) {
      this.loadingFlag = true
    },

    openMessage() {
      this.$message({
        message: this.openMessageInfo,
        type: this.openMessageType
      })
    },

    // customSubmit(file) {
    //   // event.preventDefault();
    //   let formData = new FormData();
    //   formData.append("file", file.file);
    //   let config = {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   }
    //   console.log(file)
    //   this.axios
    //     .post("api/v1/img/upload", formData, config)
    //     .then(response => {
    //       // console.log(response.data);
    //       this.result = response.data;
    //       this.relatedImgs = [] //清空上次的结果
    //       for (let item of this.result.relatedImgs) {
    //         this.relatedImgs.push(imgBaseUrl + item.subDir + item.sourcename)
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error)
    //       this.errored = true
    //     })
    //     .finally(() => (this.loading = false));
    // }
  },

  mounted() {
  },
}
</script>
<style>
.upload-body ul {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  display: table;
  overflow: hidden;
}

.row-button {
  height: 40px;
}
</style>
