<template>
  <div class="carousel">
    <el-carousel>
      <el-carousel-item v-for="item in items" :key="item">
        <el-image :src="item" class="img" fit="fill"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items:[
        "http://localhost:8080/api/v1/file/img/home/1.jpeg",
        "http://localhost:8080/api/v1/file/img/home/2.jpeg",
        "http://localhost:8080/api/v1/file/img/home/3.jpeg",
        "http://localhost:8080/api/v1/file/img/home/4.jpeg",
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
    width:400px;
    height:300px;
  }

  .img{
    width:inherit;
    height:inherit;
  }
</style>