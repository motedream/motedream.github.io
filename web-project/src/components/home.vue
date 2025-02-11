<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const iframeRef = ref<HTMLIFrameElement | null>(null)
let observer: MutationObserver | null = null

// 监听 URL 变化的回调函数
const handleUrlChange = (newUrl: string) => {
  console.log('URL changed:', newUrl)
  // 这里可以添加你的处理逻辑
}

// 初始化监听
const initListener = () => {
  const iframe = iframeRef.value
  if (!iframe) return

  // 方法1：监听 load 事件（首次加载和刷新）
  iframe.addEventListener('load', () => {
    handleUrlChange(iframe.contentWindow?.location.href || '')
  })

  // 方法2：使用 MutationObserver 监听属性变化
  observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'src') {
        handleUrlChange(iframe.contentWindow?.location.href || '')
      }
    })
  })
  
  observer.observe(iframe, {
    attributes: true,
    attributeFilter: ['src']
  })
}

onMounted(() => {
  initListener()
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="web-view">
    <iframe
      ref="iframeRef"
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
