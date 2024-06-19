<script setup lang="ts">
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import {EditorContent, useEditor} from "@tiptap/vue-3";
import { WebsocketProvider } from 'y-websocket'
import {StarterKit} from "@tiptap/starter-kit";
import {Article} from "@/components/article";

const {article} = defineProps<{article: Article}>()
// const article = props.article as Article

const yDoc = new Y.Doc() // Initialize Y.Doc for shared editing
const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    StarterKit,
    // Collaboration.configure({
    //   document: yDoc // Configure Y.Doc for collaboration
    // })
  ],
})
// const yText = yDoc.getText("")
// yText.insert(0,"Hello World")
// yText.observe((event:Y.YTextEvent,transaction)=>{
//   console.log(transaction.origin)
// })
// const wsProvider = new WebsocketProvider('ws://localhost:1234/', 'path', yDoc)
// wsProvider.on('status', event => {
//   console.log(event.status) // logs "connected" or "disconnected"
// })


</script>

<template>
  <div class="editor-container">
    <h1>{{ article.title }}</h1>
    <div class="article-tags">
      <el-tag
          v-for="(tag, index) in article.tags"
          :key="index"
          type="info"
      >{{ tag }}</el-tag>
    </div>
<!--    <el-input-->
<!--        type="textarea"-->
<!--        v-model="article.content"-->
<!--        rows="10"-->
<!--        class="editor"-->
<!--    />-->
    <div v-if="editor">
      <bubble-menu
          class="bubble-menu"
          :tippy-options="{ duration: 100 }"
          :editor="editor"
      >
        <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
          加粗
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
          斜体
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
          删除线
        </button>
      </bubble-menu>

      <floating-menu
          class="floating-menu"
          :tippy-options="{ duration: 100 }"
          :editor="editor"
      >
        <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
          H1
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
          H2
        </button>
        <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
          条目
        </button>
      </floating-menu>
    </div>
    <EditorContent :editor="editor" class="editor"/>
  </div>
</template>

<style scoped lang="scss">
.editor-container {
  padding: 20px;
}

.editor-container h1 {
  margin-bottom: 20px;
}

.article-tags .el-tag {
  margin-right: 5px;
  margin-bottom: 10px;
}

.editor {
  width: 100%;
  height: 100%;
}
/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }
}

/* Bubble menu */
.bubble-menu {
  background-color: var(--white);
  border: 1px solid var(--gray-1);
  border-radius: 0.7rem;
  box-shadow: var(--shadow);
  display: flex;
  padding: 0.2rem;

  button {
    background-color: unset;

    &:hover {
      background-color: var(--gray-3);
    }

    &.is-active {
      background-color: var(--purple);

      &:hover {
        background-color: var(--purple-contrast);
      }
    }
  }
}

/* Floating menu */
.floating-menu {
  display: flex;
  background-color: var(--gray-3);
  padding: 0.1rem;
  border-radius: 0.5rem;

  button {
    background-color: unset;
    padding: 0.275rem 0.425rem;
    border-radius: 0.3rem;

    &:hover {
      background-color: var(--gray-3);
    }

    &.is-active {
      background-color: var(--white);
      color: var(--purple);

      &:hover {
        color: var(--purple-contrast);
      }
    }
  }
}
</style>
