<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import RichEditor from "@/components/RichEditor.vue";
</script>

<template>
  <div id="app">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/">Home</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/about">About</router-link>
      </el-menu-item>
    </el-menu>
    <router-view/>
  </div>
  <main>
    <RichEditor/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
