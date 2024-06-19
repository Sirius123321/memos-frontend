<template>
  <div class="search-container">
    <el-input v-model="searchQuery" placeholder="输入搜索内容" class="search-input"></el-input>
    <el-button type="primary" @click="handleSearch" class="search-button">搜索</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Search',
  emits: ['close'],
  setup(_, { emit }) {
    const searchQuery = ref('');

    const handleSearch = () => {
      console.log('搜索内容:', searchQuery.value);
      emit('close');
    };

    return {
      searchQuery,
      handleSearch,
    };
  },
});
</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-input {
  flex: 1;
  margin-right: 10px;
}

.search-button {
  margin-left: 10px;
}
</style>
