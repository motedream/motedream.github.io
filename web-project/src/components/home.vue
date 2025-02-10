<script setup lang="ts">

</script>

<template>
   <div class="web-view">
    <iframe
      src="/web/index.html"
      frameborder="0"
      width="100%"
      height="100%"
      scrolling="auto"
    ></iframe>
  </div>
</template>

<style scoped>
.web-view {
  width: 100%;
  height: 100vh; /* 设置 iframe 的高度为视口高度 */
}
</style>
