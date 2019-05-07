<template>
  <div class="carousel">
    <el-carousel>
      <el-carousel-item v-for="item in items" :key="item">
        <img :src="item" class="small">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items:[
        
      ]
    }
  },
}
</script>


<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }


  .carousel{
    width:700px;
    height:200px;
  }
</style>