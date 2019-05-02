<template>
    <div id="parent" :style="{height:height+'px'}">
      <slot></slot>
    </div>
</template>
<script>
export default {
    data() {
        return {
            height:null
        }
    },
    methods: {
        getHeight(){
            let offsetHeight= document.getElementById("parent").firstElementChild.offsetHeight
            if (offsetHeight!=0){ //防止出现数据刷新过快（频繁点击事件），元素未渲染好，height为0的bug
                this.height= offsetHeight
                console.log(offsetHeight)
            }
        }
    },
    mounted() {
        window.addEventListener('resize',() => { // 定义窗口大小变更通知事件
            this.getHeight()
            // console.log(this.height)
        })
        // this.getHeight()
    },
    updated() {
        this.getHeight()
    },

}
</script>
<style scoped>
#parent{
    width:inherit;

}

#abc{
    position: absolute;
    text-align: center;
    margin: auto;
    left: 0;
    right: 0;
}

</style>