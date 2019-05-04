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
              <el-dropdown-item><span @click="logout"><i class="el-icon-switch-button"></i>退出</span></el-dropdown-item>
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

    getUsername() {
      if ("undefined" != typeof sessionStorage.username){
        this.session.username = sessionStorage.username
        this.session.isLoggedIn = true
        this.$router.push("/")
      }
    },

    logout() {
      this.axios
        .get("logout")
        .then(response => {
          this.session.isLoggedIn = false
          this.session.username = null
          sessionStorage.clear()
        })
    }

  },


  created() {
    this.$bus.$on("login", () => this.getUsername())
    this.getUsername()
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
 
