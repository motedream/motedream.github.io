<script setup lang="ts">
import Nav from './Nav.vue'
import Below from './Below.vue';
</script>

<template>
    <div class="main">
        <Nav></Nav>
        <router-view></router-view>
        <Below></Below>
    </div>
</template>

<style scoped>
.main{
    padding-top:106px;
}
</style>
