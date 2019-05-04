<template>
  <div id="image-view">
    <el-row type="flex" class="row-image-body" justify="center">
      <el-col :md="18" :sm="24">
        <get-height :keep-alive="true">
          <transition :name="transitionName">
            <div class="image-win related-image-win image-1" v-if="flag==0||flag==1" key="a">
              <el-card
                :body-style="{ padding: '0px'}"
                v-for="img in imgs1"
                :key="img.id"
                class="image-card"
                shadow="hover"
              >
                <el-button class="button-open-img" type="text" @click="openImg(img.value)">
                  <img :src="img.value" class="image">
                </el-button>
              </el-card>
            </div>
            <div class="image-win related-image-win image-2" v-else-if="flag==2" key="b">
              <el-card
                :body-style="{ padding: '0px'}"
                v-for="img in imgs2"
                :key="img.id"
                class="image-card"
                shadow="hover"
              >
                <el-button class="button-open-img" type="text" @click="openImg(img.value)">
                  <img :src="img.value" class="image">
                </el-button>
              </el-card>
            </div>
          </transition>
        </get-height>
      </el-col>
    </el-row>

    <el-row type="flex" justify="end">
      <el-col :span="3" :pull="3">
        <transition name="slide-fade-right">
          <el-button
            v-show="showShiftButton"
            type="success"
            round
            icon="el-icon-refresh"
            @click="shiftImgs()"
          >换一批</el-button>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import imgURLProcess from "../assets/js/imgURLProcessUtil.js"

export default {
  data: () => ({
    imgs1: [],
    imgs2: [],
    flag: 0, //0为第一次加载，1为当前活动为imgs1，2为当前活动为imgs2
    transitionName: "slide-fade-right", //初始fade效果为fade
    tag: "",
    showShiftButton: false //标记一个获得数据的flag
  }),

  methods: {
    fetchImgs(imgs) {
      this.axios
        .get("api/v1/img/related-query", {
          params:
            { tag: this.tag, num: "10" }
        })
        .then(response => {
          imgURLProcess(response.data, imgs)
          setTimeout(() => this.showShiftButton = true, 200)


        }
        )
    },

    shiftImgs() {
      if (this.flag === 0) { //第一次加载，imgs1和imgs2的数据都要进行获取
        this.fetchImgs(this.imgs1)
        this.fetchImgs(this.imgs2)
        this.flag = 1
        this.transitionName = 'slide-fade-right' //fade效果变更

      }
      else if (this.flag === 1) {//=1,切换为imgs2，刷新imgs1数据
        this.imgs1 = []
        this.fetchImgs(this.imgs1)
        this.flag = 2
      }
      else if (this.flag === 2) {//=2,切换为imgs1，刷新imgs2数据
        this.imgs2 = []
        this.fetchImgs(this.imgs2)
        this.flag = 1
      }
    },

    openImg(src) {
      this.$alert('<img class="message-image" src="' + src + '"/>', '查看图片', {
        dangerouslyUseHTMLString: true
      });
    }
  },

  mounted() {

  },

  created() {
    this.$bus.$on("classifyResult",
      tag => {
        if (tag != null) {
          this.tag = tag
          if (this.flag != 0) { //当不是第一次加载组件时，再下载一次图片，防止因为缓存问题，导致显示上次的结果
            this.shiftImgs()
          }
          this.shiftImgs()
        }

      }
    )
  },

  updated() {

  },


}
</script>
<style>
.row-image-body {
  position: relative;
}

.image-card {
  display: -webkit-inline-box;
  /* width: 160px; */
  /* height: 120px; */
  border-radius: 4px;
  /* background-color: #409eff; */
  text-align: center;
  color: #fff;
  padding: 4px 4px 4px 4px;
  box-sizing: border-box;
  margin: 5px 10px;
}

.image {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 160px;
  height: 130px;
  margin: auto;
}

.image-win {
  left: 0;
  right: 0;
  position: absolute;
  margin: auto;
  width: inherit;
}

.el-message-box {
  width: fit-content !important;
}

.message-image {
  max-height: 600px;
}

.button-open-img {
  padding: 0;
  margin-right: auto;
}
</style>