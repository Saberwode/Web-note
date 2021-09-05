<template>
  <div class="welcome-content">
    <div class="text-left">
      <div class="welcome">欢迎体验</div>
      <div class="title">通用后台管理系统</div>
      <div class="desc">- 专属于您的后台管理系统~</div>
    </div>
    <div class="img-right"></div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
};
</script>

<style lang="scss">
.welcome-content {
  display: flex;
  justify-content: center;
  align-items: center;
  // max-height: calc(100vh - 40px);
  // height: 100%;
  height: calc(100vh - 100px);
  // margin-bottom: 40px;

  background: #fff;
  overflow: hidden;
  .text-left {
    position: relative;
    bottom: 40px;
    .welcome {
      font-size: 30px;
      line-height: 42px;
      color: #333;
    }
    .title {
      font-size: 40px;
      line-height: 62px;
      color: #409eff;
    }
    .desc {
      padding-top: 10px;
      text-align: right;
      color: #999;
    }
  }
  .img-right {
    margin-left: 105px;
    width: 371px;
    height: 438px;
    background-image: url("../assets/images/welcome.png");
  }
}
</style>
