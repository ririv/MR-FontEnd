<template>
  <div id="home">
    <div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="用户管理" name="user"></el-tab-pane>
        <el-tab-pane label="图片管理" name="img"></el-tab-pane>
        <el-tab-pane label="模型管理" name="model"></el-tab-pane>
      </el-tabs>
    </div>

    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="currentContent"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column
        v-for="item in computedKeys"
        :key="item"
        :label="item"
        :prop="item"
        show-overflow-tooltip
      ></el-table-column>

      <el-table-column
        v-if="activeName!='user'"
        label="enabled"
        prop="enabled"
        :formatter="formatter"
      ></el-table-column>

      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="toEditView(scope.row.id)" size="small">编辑</el-button>
          <el-button @click="openDeleteMessage(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--image暂时不提供创建接口-->
    <el-row type="flex" justify="end" v-if="activeName!='img'">
      <router-link :to="activeName+'/create'">
        <el-button circle icon="el-icon-plus" type="primary" size="small" class="button-create"></el-button>
      </router-link>
    </el-row>

    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="totalElements"
        :current-page.sync="currentPage"
        @current-change="handleCurrentPageChange"
        hide-on-single-page
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import imgURLProcess from "../../../assets/js/imgURLProcessUtil.js"

export default {
  name: "home",
  data() {
    return {
      activeName: "",
      currentContent: [],
      currentPage: 1,
      totalElements: null,

      url: {
        targetQueryUrl: "",
        adminUserQueryUrl: "admin/user/query",
        adminImgQueryUrl: "admin/img/query",
        adminModelQueryUrl: "admin/model/query",
      },
      loading: true

    }
  },
  methods: {
    fetchData(url, page) {
      this.axios
        .get(url, {
          params: {
            page: page - 1
          }
        })
        .then(response => {
          this.currentContent = response.data.content
          this.totalElements = response.data.totalElements
          this.loading = false
        }
        )
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    },

    formatter(row, column, cellValue, index) {
      if (row.enabled === true)
        return "√"
      else if (row.enabled === false)
        return "×"
      else
        return null
    },

    handleCurrentPageChange() {
      this.fetchData(this.url.targetQueryUrl, this.currentPage)
    },

    handleSelectionChange(val) {
    },

    toEditView(id) {
      this.$router.push({
        name: "operate",
        params: {
          class: this.activeName,
          id,
          operateType: "edit"
        }
      })
    },

    openDeleteMessage(id) {
      this.$confirm(
        (<div><span>此操作将永久删除该数据，是否继续？</span><div> id: {id}</div></div>), '提示', { //使用jsx语法
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios
            .delete("admin/" + this.activeName + "/operate/" + id)
            .then(resposne => {              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.fetchData(this.url.targetQueryUrl, this.currentPage)
            })
            .catch(error => this.$message.error('删除失败!'))

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },

  mounted() {
    this.activeName = "user"
    this.fetchData(this.url.adminUserQueryUrl, 1)
  },

  computed: {
    computedKeys() {
      let keys = []
      for (let key in this.currentContent[0]) {
        if (key != "enabled") {
          keys.push(key)
        }
      }
      return keys
    }
  },
  watch: {
    activeName(val) {
      if (val === "user") {
        this.url.targetQueryUrl = this.url.adminUserQueryUrl
      }
      else if (val === "img") {
        this.url.targetQueryUrl = this.url.adminImgQueryUrl
      }
      else if (val === "model") {
        this.url.targetQueryUrl = this.url.adminModelQueryUrl
      }
      this.fetchData(this.url.targetQueryUrl, 1)
      this.currentPage = 1
    }
  }
}

</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.page-center {
  text-align: center;
}

.tab-table > .active {
  display: table;
}

.table > thead > tr > th {
  text-align: center;
}

.button-create {
  margin-top: 20px;
  margin-right: 60px;
}
</style>
