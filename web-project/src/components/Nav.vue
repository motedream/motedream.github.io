<script setup lang="ts">
import '../../public/web/plugins/bulma/bulma.min.css'
import '../../public/web/plugins/themify-icons/themify-icons.css'
import '../../public/web/css/style.css'
</script>

<template>
    <div>
    <!-- 导航栏 -->
  <nav class="navigation navbar is-fixed-top is-align-items-center is-transparent" role="navigation" aria-label="主导航">
    <div class="container">

      <div class="navbar-brand">
        <a class="navbar-item" href="index.html">
          <img class="img-fluid" width="100px" src="../assets/logo.png" alt="logo">
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start mx-auto">

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link is-arrowless" href="/" target="_parent">藏茶研发成果展示</a>
          </div>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link is-arrowless" href="/#/main" target="_parent">降脂预测模型入口</a>
          </div>

          <li class="navbar-item">
            <a class="navbar-link is-arrowless" href="https://spxy.sicau.edu.cn/index.htm" target="_parent">专家咨询</a>
          </li>

          <li class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" href="contact.html">用户论坛</a>
          </li>

        </div>
    
        <div class="navbar-end is-align-items-center ml-0">
          <select class="m-2 border-0 is-transparent is-border-0" id="select-language">
            <option id="en" value="" selected>中文</option>
            <option id="fr" value="">英文</option>
            <option id="gr" value="">日语</option>
            <option id="hr" value="">韩语</option>
          </select>
          
          <form class="search-bar">
            <input id="search-query" name="s" type="search" placeholder="smiles Hit Enter..." style="width:400px; height:40px;">
          </form>
        </div>
      </div>
    </div>
  </nav>
    </div>
</template>

<style scoped>
.navigation{
    height: 106px;
    background: rgba(255, 255, 255, 0.9);
}
.navbar-item img {
  max-height: initial!important;;
}
a.navbar-link{
    font-size: 15px;
}
.navbar-link:not(.is-arrowless)::after {
  margin-top: -0.375em;
  right: 0.7em;
  border: 2px solid #333;
  border-top: 0;
  border-right: 0;
}
</style>