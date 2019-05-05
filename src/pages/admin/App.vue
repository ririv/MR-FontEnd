<template>
  <div id="app">
    <transition name="fade">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
import imgURLProcess from "../../assets/js/imgURLProcessUtil.js"

export default {
  name: "app",
  data() {
    return {

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
</style>
