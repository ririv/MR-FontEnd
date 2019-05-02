<template>
  <div id="app">
    <el-container>
      <el-header class="nav-mask">
        <my-header></my-header>
      </el-header>

      <el-main>
        <transition :name="transitionName">
          <router-view class="child-absolute-view" ref="childView"></router-view>
        </transition>
        <div class="page-component-up" style>
          <i class="el-icon-caret-top"></i>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import myHeader from "../../components/myHeader.vue"

export default {
  name: "app",
  data() {
    return {
      show: true,
      transitionName: 'fade'
    }
  },
  components: {
    myHeader
  },

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

header {
  position: fixed; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
  top: 0; /* 距离窗口顶部距离 */
  left: 0; /* 距离窗口左边的距离 */
  width: 100%; /* 宽度设置为100% */
  height: 40px !important;
  z-index: 99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
}

main{
  margin: 100px,0
}

.nav-mask {
    background-color: hsla(0,0%,100%,.4);
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
}

.page-component-up {
  background-color: #fff;
  position: fixed;
  right: 100px;
  bottom: 120px;
  width: 40px;
  height: 40px;
  size: 40px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  z-index: 5;
}

.page-component-up i {
  color: #409eff;
  display: block;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
}

main {
  margin-top: 20px;
}

.child-absolute-view{
  left: 0;
  right: 0;
  position: absolute;
  margin: auto;
  width: inherit;
  /* transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1); */
}
</style>
