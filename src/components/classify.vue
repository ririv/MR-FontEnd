<template>
  <div id="classify">
    <el-row>
      <el-upload
        ref="upload"
        class="upload-body"
        :action="url"
        :data="params"
        :headers="headers"
        :auto-upload="false"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-progress="handleProgress"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :on-change="handleChange"
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
    <el-row style="height:40px" type="flex" justify="center" align="middle">
      <el-col :span="4">
        <transition name="el-fade-in" mode="out-in">
          <keep-alive>
            <el-select v-if="activeName=='free'" v-model="modelId" clearable placeholder="默认模型">
              <el-option v-for="item in models" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <span v-else-if="activeName=='result'" class="classify-result">
              <span v-if="respType=='success'">
                <i class="el-icon-check icon-result icon-result-success" />
                识别结果：{{result.tag}} {{result.proba}}
              </span>
              <span v-else-if="respType=='warning'" class="classify-result">
                <i class="el-icon-warning icon-result icon-result-warning" />
                无法识别
              </span>
            </span>
          </keep-alive>
        </transition>
      </el-col>
      <el-col :span="2">
        <el-button
          :plain="true"
          size="small"
          type="primary"
          v-show="activeName=='free'"
          @click="clickUpload()"
        >
          识别
          <i class="el-icon-upload"></i>
        </el-button>
        <i class="el-icon-loading" v-show="activeName=='load'"></i>
        <el-button
          :plain="true"
          size="small"
          type="danger"
          v-show="activeName=='result'"
          @click="clearFiles()"
        >
          清空
          <i class="el-icon-delete"></i>
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      url: this.baseURL + "img/classify",
      params: {
        flag: 0
      },
      relatedImgs: [],
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      respType: "",
      respInfo: "",
      loadingFlag: false,
      activeName: "free",
      modelId: null,
      models: {},
      result: {
        tag: '',
        proba: null
      },
      isEmpty: true
    }
  },

  methods: {
    handleSuccess(res) {
      // console.log(res)
      if (res.isSuccessful === true) {
        this.respInfo = "识别成功" + "\n" + res.tag
        this.respType = "success"
        this.result = res

        this.$bus.$emit("classify", true, res.tag)
      }
      else {
        this.respInfo = "无法识别"
        this.respType = "warning"
      }
      this.openMessage()
      this.activeName = "result"
    },

    handleError(err) {
      this.respInfo = "请求失败"
      this.respType = "error"
      this.openMessage()
      this.activeName = "free"
    },

    handleRemove() {
      this.$bus.$emit("classify", false)
      this.activeName = "free"
      this.isEmpty = true
    },

    handleProgress(event, file, fileList) {
      this.activeName = "load"
    },

    handleChange(file, fileList) {
      if (fileList.length != 0) {
        this.isEmpty = false
      }
    },

    handleExceed(files, fileList) {

    },

    clearFiles() {
      this.$refs.upload.clearFiles()
      this.handleRemove()
    },

    clickUpload() {
      if (this.isEmpty) {
        this.$message.error("请先选择一张图片")
      }
      this.$refs.upload.submit()
      // this.loadingFlag = true
    },

    openMessage() {
      this.$message({
        message: this.respInfo,
        type: this.respType
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
    //     .post("img/upload", formData, config)
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

    fetchModelData() {
      this.axios
        .get("model/all")
        .then(response => this.models = response.data)
    }
  },

  created() {
    this.fetchModelData()
  },

  mounted() {
  },

  watch: {
    modelId(val) {
      if (val != null) {
        this.params.modelId = val;
        this.params.flag = 1
      }
      else {
        this.params.flag = 0
      }
    }
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

.icon-result {
  margin-right: 10px;
  font-size: large;
}

.icon-result-success {
  color: #13ce66;
}

.icon-result-warning {
  color: #F56C6C;
}

.absolute {
  position: absolute;
}
</style>
