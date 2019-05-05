 <template>
  <div id="my-header">
    <el-row type="flex" class="row-bg" justify="space-between" align="middle">
      <el-col :xs="12" :sm="8">
        <router-link to="/">
          <i class="el-icon-s-home icon-home"></i>
        </router-link>

        <div class="search">
          <el-input placeholder="请输入内容" v-model="input">
            <el-button slot="append" @click="search">
              <!-- <router-link :to="'/search'+input"> -->
              <i class="el-icon-search"></i>
              <!-- </router-link> -->
            </el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :xs="10" :sm="6">
        <transition name="fade">
          <div v-if="!session.isLoggedIn">
            <router-link to="/login">
              <el-button class="sign">sign in</el-button>
            </router-link>
            <router-link to="/register">
              <el-button class="sign">sign up</el-button>
            </router-link>
            <!--<div v-if="isSignedIn" class="sign">sign out</div> -->
          </div>
          <div v-else>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-user-solid"></i>
                {{ session.username }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                  <!-- <el-dropdown-item>
                  <span @click="updatePassword">
                    <i class="el-icon-key"></i>修改密码
                  </span>
                </el-dropdown-item> -->
                <el-dropdown-item>
                  <span @click="logout">
                    <i class="el-icon-switch-button"></i>退出
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "myHeader",

  data() {
    return {
      input: null,
      session: {
        username: null,
        isLoggedIn: false
      },

    }
  },
  methods: {
    search() {
      this.$router.push({
        path: 'search', query: { tag: this.input }
      })
    },

    getSession() {
      if ("undefined" != typeof sessionStorage.username) {
        this.session.username = sessionStorage.username
        this.session.isLoggedIn = true
      }
    },

    logout() {
      this.axios
        .get("logout", {
          baseURL: this.rootURL
        })
        .then(response => {
          this.session.isLoggedIn = false
          this.session.username = null
          sessionStorage.clear()
        })
    },

    fetchUserInfo() { //暂时用不到
      this.axios.get("user/current")
        .then(response => {
          sessionStorage.username = response.data.username
          this.getSession()
        })
        .catch(error => { })
    }
  },


  created() {
    this.getSession() //创建组件即获取session值
    this.$bus.$on("login", () => { //监听登录事件
      this.getSession() //接收事件再获取session值
      this.$router.push("/") //登录成功则跳转页面
    })
  }
}

</script>
 
 <style>
.search {
  display: inline-block;
}
.icon-home {
  margin-right: 10%;
  color: #038bfa;
  font-size: larger;
}

.sign {
  margin-left: 10px !important;
}
</style>
 
