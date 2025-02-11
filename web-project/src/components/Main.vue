<script setup lang="ts">
import Nav from './Nav.vue'
</script>

<template>
    <div class="main">
        <Nav></Nav>
        <router-view></router-view>
    </div>
</template>

<style scoped>
.main{
    padding-top:106px;
}
</style>
