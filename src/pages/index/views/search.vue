<template>
  <div id="search">
    <el-row type="flex" class="row-image-body" justify="center">
      <el-col :md="18" :sm="24">
      <get-height>
        <transition :name="transitionName">
          <div class="image-win search-image-win" v-if="show" key="a">
            <el-card
              :body-style="{ padding: '0px'}"
              v-for="item in currentContent"
              :key="item.id"
              class="image-card"
              shadow="hover"
            >
              <el-button class="button-open-img" type="text" @click="openImg(item.value)">
                <img :src="item.value" class="image">
              </el-button>
            </el-card>
          </div>
          <div class="image-win search-image-win" v-else key="b">
            <el-card
              :body-style="{ padding: '0px'}"
              v-for="item in currentContent"
              :key="item.id"
              class="image-card"
              shadow="hover"
            >
              <el-button class="button-open-img" type="text" @click="openImg(item.value)">
                <img :src="item.value" class="image">
              </el-button>
            </el-card>
          </div>
        </transition>
        </get-height>
      </el-col>
    </el-row>

    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="totalElements"
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        @current-change="show=!show"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import imgURLProcess from "../../../assets/js/imgURLProcessUtil.js"

export default {
  name: 'search',
  data() {
    return {
      show: true,
      currentPage: 1,//给其设置默认值
      currentContent: [],
      // imageWinHeight: null,
      totalElements: null,
      transitionName: "fade",
      pageSize: 20
    }
  },
  methods: {
    fetchData() {
      this.axios
        .get("img/query", {
          params: {
            tag: this.$route.query.tag,
            size: this.pageSize,
            page: this.currentPage - 1
          }
        })
        .then(response => {
          imgURLProcess(response.data.content, this.currentContent)
          this.totalElements = response.data.totalElements
        })
    },

    openImg(src) {
      this.$alert(<img class="message-image" src={src}>查看图片</img>,"查看图片")
    }
  },

  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },

  mounted() {

  },

  watch: {
    "$route.query.tag"(to, from) {
      this.currentContent = []
      this.fetchData()
    },

    "$route.query.page"(to, from) {
      //将currentPage改变后交给下面去处理
      //这里url参数默认为string类型，所以需要进行转换
      //且要判定参数是否存在（即是否为null），如果为null，将其设置为默认值
      this.currentPage = parseInt((this.$route.query.page != null) ? this.$route.query.page : 1)

      const toPage = parseInt(to)
      const fromPage = parseInt(from)
      // this.transitionName = toPage > fromPage ? 'slide-fade-right' : 'slide-fade-left'

    },

    currentPage() {
      this.$router.push({
        query: { tag: this.$route.query.tag, page: this.currentPage }
      }  //如果currentPage不设置默认值，而为null，将会引发奇怪的bug
      )

      this.currentContent.length = 0
      this.fetchData()
    },

  },

}

</script>


<style>
#search {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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
