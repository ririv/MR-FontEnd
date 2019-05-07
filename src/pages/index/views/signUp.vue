<template>
  <div id="sign-up">
    <div class="login">
      <div class="login-top">注册</div>
      <div class="login-center clearfix">
        <div class="login-center-icon">
          <i class="el-icon-user"></i>
        </div>
        <div class="login-center-input">
          <input
            type="text"
            v-model="info.username"
            placeholder="请输入您的用户名"
            onfocus="this.placeholder=''"
            onblur="this.placeholder='请输入您的用户名'"
          >
          <div class="login-center-input-text">用户名</div>
        </div>
      </div>

      <div class="login-center clearfix">
        <div class="login-center-icon">
          <i class="el-icon-message"></i>
        </div>
        <div class="login-center-input">
          <input
            type="text"
            v-model="info.email"
            placeholder="请输入您的邮箱"
            onfocus="this.placeholder='请输入您的邮箱'"
            onblur="this.placeholder='请输入您的邮箱'"
          >
          <div class="login-center-input-text">邮箱</div>
        </div>
      </div>

      <div class="login-center clearfix">
        <div class="login-center-icon">
          <i class="el-icon-lock"></i>
        </div>
        <div class="login-center-input">
          <input
            type="password"
            v-model="info.password"
            placeholder="请输入您的密码"
            onfocus="this.placeholder=''"
            onblur="this.placeholder='请输入您的密码'"
          >
          <div class="login-center-input-text">密码</div>
        </div>
      </div>
      <div class="login-button" @click="submit">注册</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "signIn",

  data() {
    return {
      info: {
        username: null,
        email:null,
        password: null
      }
    }
  },

  methods: {

    submit() {
      this.axios
        .post("user/create", this.info)
        .then(response => {
          this.$message({
            message: '注册成功，将为您自动登录',
            type: 'success'
          })
          let self = this
          setTimeout(() => {
            sessionStorage.username = response.data.username
            self.$bus.$emit("login")
          })
        })
        .catch(error =>this.$message.error('注册失败'))
    }
  }

}
</script>

<style scoped>
#sign-up {
  width: 100%;
  height: 100%;
}

* {
  box-sizing: content-box;
}
a:hover,
a:focus {
  text-decoration: none;
}
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
form,
fieldset,
input,
textarea,
p,
blockquote,
th,
td {
  margin: 0;
  padding: 0;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
body {
  -webkit-text-size-adjust: none;
}
fieldset,
icon {
  border: 0;
}
icon {
  vertical-align: top;
  max-width: 100%;
}
address,
caption,
cite,
code,
dfn,
em,
th,
var {
  font-style: normal;
  font-weight: normal;
}
ol,
ul {
  list-style: none;
}
caption,
th {
  text-align: left;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}
q:before,
q:after {
  content: "";
}
abbr,
acronym {
  border: 0;
}
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
* html .clearfix {
  zoom: 1;
} /* IE6 */
*:first-child + html .clearfix {
  zoom: 1;
} /* IE7 */
.cli {
  clear: both;
  font-size: 0;
  height: 0;
  overflow: hidden;
  display: block;
}
.lclear {
  clear: left;
  font-size: 0;
  height: 0;
  overflow: hidden;
}
.fl {
  float: left;
}
.fr {
  float: right;
}

.sk-rotating-plane {
  display: none;
  width: 80px;
  box-shadow: 0px 0px 5px #333333;
  height: 80px;
  margin: auto;
  background-color: white;
  -webkit-animation: sk-rotating-plane 1.2s infinite ease-in-out;
  animation: sk-rotating-plane 1.2s infinite ease-in-out;
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -40px;
  margin-top: -80px;
}

.login {
  z-index: 2;
  position: absolute;
  width: 350px;
  border-radius: 5px;
  height: 500px;
  background: white;
  box-shadow: 0px 0px 5px #333333;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -175px;
  transition: all 1s;
  -moz-transition: all 1s; /* Firefox 4 */
  -webkit-transition: all 1s; /* Safari 和 Chrome */
  -o-transition: all 1s; /* Opera */
}
.login-top {
  font-size: 24px;
  margin-top: 100px;
  padding-left: 40px;
  box-sizing: border-box;
  color: #333333;
  margin-bottom: 50px;
  text-align: left;
}
.login-center {
  width: 100%;
  box-sizing: border-box;
  padding: 0 40px;
  margin-bottom: 30px;
}
.login-center-icon {
  width: 20px;
  height: 20px;
  float: left;
  margin-top: 5px;
}

.login-center-input {
  float: left;
  width: 230px;
  margin-left: 15px;
  height: 30px;
  position: relative;
}
.login-center-input input {
  z-index: 2;
  transition: all 0.5s;
  padding-left: 10px;
  color: #333333;
  width: 100%;
  height: 30px;
  border: 0;
  border-bottom: 1px solid #cccccc;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #ffffff;
  box-sizing: border-box;
  outline: none;
  position: relative;
}
.login-center-input input:focus {
  border: 1px solid dodgerblue;
}
.login-center-input-text {
  background: white;
  padding: 0 5px;
  position: absolute;
  z-index: 0;
  opacity: 0;
  height: 20px;
  top: 50%;
  margin-top: -10px;
  font-size: 14px;
  left: 5px;
  color: dodgerblue;
  line-height: 20px;
  transition: all 0.5s;
  -moz-transition: all 0.5s; /* Firefox 4 */
  -webkit-transition: all 0.5s; /* Safari 和 Chrome */
  -o-transition: all 0.5s; /* Opera */
}
.login-center-input input:focus ~ .login-center-input-text {
  top: 0;
  z-index: 3;
  opacity: 1;
  margin-top: -15px;
}
.login.active {
  -webkit-animation: login-small 0.8s;
  animation: login-small 0.8s;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
}
.login-button {
  cursor: pointer;
  width: 250px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: dodgerblue;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 50px;
  color: white;
}
</style>
