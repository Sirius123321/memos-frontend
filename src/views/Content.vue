<script setup lang="ts">
import { defineComponent, reactive, ref, onMounted, onUnmounted } from 'vue';
import Editor from '../components/Editor.vue';
import Search from './Search.vue';
import RichEditor from "@/App.vue";
import { useRouter } from 'vue-router';
import {Article} from "@/components/article";

// interface Article {
//   id: string;
//   title: string;
//   summary: string;
//   content: string;
//   tags: string[];
// }

interface Folder {
  name: string;
  articles: Article[];
}

const router = useRouter();
const folders = reactive<Folder[]>([
  { name: '备忘录本 A', articles: generateArticles() },
  { name: '备忘录本 B', articles: generateArticles() },
  { name: '备忘录本 C', articles: generateArticles() },
  { name: '备忘录本 D', articles: generateArticles() },
]);

const selectedFolder = reactive<Folder>(folders[0]);
const selectedArticle = ref<Article | null>(null);
const showSearch = ref(false);
const isSmallScreen = ref(window.innerWidth < 768);

function generateArticles(): Article[] {
  const articles: Article[] = [];
  for (let i = 1; i <= 9; i++) {
    articles.push({
      id: "uuidv4()",
      title: `文章标题 ${i}`,
      summary: `这是文章 ${i} 的摘要内容，摘要内容不超过100字。`,
      content: `这是文章 ${i} 的完整内容，包含更详细的信息。`,
      tags: [`标签${i}-1`, `标签${i}-2`, `标签${i}-3`]
    });
  }
  return articles;
}

const handleSelectFolder = (index: string) => {
  const folderIndex = parseInt(index);
  Object.assign(selectedFolder, folders[folderIndex]);
  selectedArticle.value = null; // 切换文件夹时清除选中的文章
};

const addArticle = () => {
  // 此处传一个默认的article对象，或者在editor中定义一个默认article对象即可正确load
  router.push({ path: '/editor' });
};

const handleSelectArticle = (article: Article) => {
  selectedArticle.value = article;
};
const toggleSearch = () => {
  showSearch.value = !showSearch.value;
};

const addFolder = () => {
  folders.push({ name: `备忘录本 ${folders.length + 1}`, articles: generateArticles() });
};

const deleteFolder = (index: number) => {
  folders.splice(index, 1);
  if (folders.length > 0) {
    Object.assign(selectedFolder, folders[0]);
  } else {
    selectedFolder.name = '';
    selectedFolder.articles = [];
  }
  selectedArticle.value = null;
};

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});
</script>
<template>
  <div class="content-container">
    <el-container>
      <!-- 左侧边栏 -->
      <el-aside width="auto" class="sidebar">
        <div class="sidebar-header">
          备忘录本
          <el-button type="primary" size="mini" @click="addFolder">新增</el-button>
        </div>
        <el-scrollbar class="sidebar-content">
          <el-menu
              class="el-menu-vertical-demo"
              @select="handleSelectFolder"
          >
            <el-menu-item
                v-for="(folder, index) in folders"
                :key="index"
                :index="index.toString()"
            >
              <div class="folder-item">
                <span class="folder-title">{{ folder.name }}</span>
                <el-button type="danger" size="mini" @click.stop="deleteFolder(index)">删除</el-button>
              </div>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <!-- 右侧内容展示区 -->
      <el-container>
        <el-header class="content-header">
          <div class="content-header-title">备忘录</div>
          <el-button type="primary" size="mini" @click="toggleSearch">搜索</el-button>
        </el-header>
        <el-main>
          <el-row :gutter="20" class="content-grid" v-if="!selectedArticle">
            <el-col
                v-for="(article) in selectedFolder.articles"
                :key="article.id"
                :span="8"
            >
              <div class="article-card" @click="handleSelectArticle(article)">
                <h4>{{ article.title }}</h4>
                <p class="article-summary">{{ article.summary }}</p>
                <div class="article-tags">
                  <el-tag
                      v-for="(tag, tagIndex) in article.tags"
                      :key="tagIndex"
                      type="info"
                  >{{ tag }}</el-tag>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="article-card new-article" @click="addArticle">
                <h4>新增文章</h4>
              </div>
            </el-col>
          </el-row>
          <Editor v-if="selectedArticle" :article="selectedArticle" />
        </el-main>
      </el-container>
    </el-container>
    <div v-if="showSearch" class="search-overlay" @click="toggleSearch">
      <div class="search-dialog" @click.stop>
        <Search @close="toggleSearch" />
      </div>
    </div>
  </div>
</template>



<style scoped>
.content-container {
  height: 100vh;
}

.sidebar {
  display: flex;
  flex-direction: column;
  width: 16.67%; /* 固定宽度为页面的六分之一 */
  border-right: 1px solid #dcdcdc;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
  background-color: #f5f5f5;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
}

.folder-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.folder-title {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
  background-color: #f5f5f5;
  border-bottom: 1px solid #dcdcdc;
  text-align: center;
}

.content-grid {
  padding: 20px;
}

.article-card {
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background-color: #ffffff;
  cursor: pointer;
  height: 100%;
}

.article-card h4 {
  display: inline-block;
  align-content: center;
  flex-wrap: wrap;
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: bold;
}

.article-card .article-summary {
  margin: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.article-tags {
  margin-top: 10px;
}

.article-tags .el-tag {
  margin: 5px;
}
.content-header-title{
  display: flex;
  width: 100%;
  justify-content: center;
}
.el-col-8{
  margin: 10px;
  flex: 0 0 27.77777777%;
  max-width: 27.77777777%;
}
.new-article{
  display: flex;
  justify-content: center;
  height: 100px;
  flex-wrap: wrap;
  align-content: center;
}
.el-button--danger{
  align-content: end;
}
.folder-item{
  display: contents;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.search-dialog {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  width: 33%;
  max-height: 80%;
  overflow: auto;
}
</style>