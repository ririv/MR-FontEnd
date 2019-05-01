 <template>
  <div id="my-header">
    <el-row type="flex" class="row-bg" justify="space-between" align="middle">
      <el-col :xs="12" :sm="8">
        <router-link to="/">                <i class="el-icon-s-home icon-home"></i></router-link>

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
        <el-button v-if="!isSignedIn" class="sign" @click="open">sign in</el-button>
        <el-button v-if="!isSignedIn" class="sign">sign up</el-button>
        <!--<div v-if="isSignedIn" class="sign">sign out</div> -->
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
      isSignedIn: false,
      loginAction: this.baseURL + "login"
    }
  },
  methods: {
    search() {
      this.$router.push({
        path: 'search', query: { tag: this.input }
      }
      )
    },
    open() {
      this.$alert('<form id="login-form" action="' + this.loginAction + '"method="post">'
        + '用户名<input name="username"></input></br>'
        + '密码<input type="password" name="password" required></input></br>'
        + '</form>',
        '登录', {
          dangerouslyUseHTMLString: true,
          showCancelButton: true,
          confirmButtonText: '登录',
          cancelButtonText: '取消',
        })
        .then(() => {
          document.getElementById("login-form").submit()
        }
        )
    }
  },
  // watch: {
  //   "$router"(){
  //     this.search()
  //   }
  // }

}
</script>
 
 <style>
.search{
  display:inline-block
}
.icon-home{
  margin-right: 10%;
  color: #038bfa;
  font-size: larger;
}


</style>
 
