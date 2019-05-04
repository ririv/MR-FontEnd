<template>
  <div id="parent" :style="{height:height+'px'}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      height: null
    }
  },

  props:{
    keepAlive:{
      type:Boolean,
      default:false
    }
  },

  methods: {
    getHeight() {
      let offsetHeight = document.getElementById("parent").firstElementChild.offsetHeight
      if (offsetHeight != 0) { //防止出现数据刷新过快（频繁点击事件），元素未渲染好，height为0的bug
        this.height = offsetHeight
        // console.log(offsetHeight)
      }
    }
  },

  mounted() {
    if(this.keepAlive===false){
    // 定义窗口大小变更通知事件
    // 注意第二个参数为一个函数，但并非让你去执行它，所以不可以有()
    // 且最好不要传入匿名函数，否则不好remove
      window.addEventListener('resize', this.getHeight)
    }
  },

  activated(){
    if(this.keepAlive===true){
      window.addEventListener('resize', this.getHeight)
    }
  },

  deactivated(){
    window.removeEventListener('resize', this.getHeight)
  },

  updated() {
    this.getHeight()
  },

  beforeDestroy() {
    //需要手动销毁它，参数得一致
    window.removeEventListener('resize', this.getHeight)
  },


}
</script>
<style scoped>
#parent {
  width: inherit;
}
</style>