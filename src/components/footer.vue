<template>
  <div class="footer-box">
    <div class="site">
      <div class="site-img"><img alt="暂无图片"></div>
      <div class="text">微信公众号</div>
      <div class="account">
        <div class="txt-img"><img alt="暂无图片" class="txt-img" src=""></div>
        <p class="txt">重庆邮电大学</p></div>
      <div class="account">
        <div class="txt-img"><img alt="暂无图片" class="txt-img" src=""></div>
        <p class="txt">生物信息学院</p></div>
      <div class="account">
        <div class="txt-img"><img alt="暂无图片" class="txt-img" src=""></div>
        <p class="txt">大数据实验室</p></div>
    </div>
    <ul class="about"><a href="">关于我们</a></ul>
    <div class="site">
      <div class="text">友情链接：</div>
      <div class="account"><a class="txt" href="http://www.cqupt.edu.cn/">重庆邮电大学</a></div>
      <div class="account"><a class="txt" href="http://swxy.cqupt.edu.cn/">生物信息学院</a></div>
      <div class="account"><a class="txt" href="https://www.iprox.org/">iPox</a></div>
      <div class="account"><a class="txt" href="https://www.omicsdi.org/">OmicsDi</a></div>
      <div class="account"><a class="txt" href="http://172.16.98.98/liufaping/world/index/index.php">原网页</a></div>
    </div>
    <div class="icp">
      <ul>
        <li><a href="" target="_blank"><img alt="" src="https://lapp.xinli001.com/images/website-www/guohui.png">
          渝公网安备：xxxxxx</a></li>
        <li><a href="" target="_blank">渝ICP备:xxxxx</a></li>
      </ul>
      <p class="bottom">Copyright © 2022-2022 重庆大数据实验室 版权所有</p></div>
  </div>
</template>

<script>
export default {
  name: "foot"
}
</script>

<style scoped>
ul {
  list-style: none;
}

.footer-box {
  background-color: #DCDFE6;
  font-size: 13px;
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: 14px;
}

.site {
  display: flex;
  justify-content: center;
}
a{
  color: black;
  text-decoration-line: none;
}
</style>
