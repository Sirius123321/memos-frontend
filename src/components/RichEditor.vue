<script setup lang="ts">
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import {EditorContent, useEditor} from "@tiptap/vue-3";
import { WebsocketProvider } from 'y-websocket'

const yDoc = new Y.Doc() // Initialize Y.Doc for shared editing
const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    Document,
    Paragraph,
    Text,
    Collaboration.configure({
      document: yDoc // Configure Y.Doc for collaboration
    })
  ],
})
const yText = yDoc.getText("")
yText.insert(0,"Hello World")
yText.observe((event:Y.YTextEvent,transaction)=>{
  console.log(transaction.origin)
})
const wsProvider = new WebsocketProvider('ws://localhost:1234/', 'path', yDoc)
wsProvider.on('status', event => {
  console.log(event.status) // logs "connected" or "disconnected"
})

</script>

<template>
  <EditorContent :editor="editor"/>
</template>
