<template>
    <transition name="fade">
    <keep-alive>
        <component :is="view" ></component>
    </keep-alive>
    </transition>
</template>
<script>
import save from "./save.vue"
import show from "./show.vue"
export default {
    computed: {
        view(){
            let operateType=this.$route.params.operateType
            if (operateType=="edit"||operateType=="create")
                return "save"
            else
                return "show"
        }
    },
    components:{
        save,
        show
    }
}
</script>

