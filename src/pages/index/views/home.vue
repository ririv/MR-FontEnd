<template>
  <div id="Home">
    <classify ref="classify"></classify>
    <transition name="fade">
      <images-view v-show="show"></images-view>
    </transition>
  </div>
</template>


<script>
import classify from "../../../components/classify.vue"
import imagesView from "../../../components/imagesView.vue"

export default {
  name: "Home",
  data() {
    return {
      show: false
    }
  },
  components: {
    classify,
    imagesView
  },

  mounted() {
    this.$bus.$on("showWin",
      msg => this.show = msg
    )
  },
}
</script>
