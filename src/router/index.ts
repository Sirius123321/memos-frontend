// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Content from '../views/Content.vue'
import Editor from '../components/Editor.vue'
import Search from '../views/Search.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name:'Register',
        component: Register
    },
    {
        path : '/content',
        name: 'Content',
        component: Content
    },
    {
        path : '/editor',
        name: 'Editor',
        component: Editor
    },
    {
        path : '/search',
        name: 'Search',
        component: Search
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
