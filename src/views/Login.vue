<template>
    <div class="login-container">
      <el-form :model="loginForm" class="login-form">
        <el-form-item>
          <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
          <el-button type="info" @click="handleRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { useUserStore } from '@/stores'; // 引入 useUserStore
  const userStore = useUserStore(); // 使用 useUserStore
      const loginForm = reactive({
        username: '',
        password: ''
      });
  
      const handleLogin = () => {
        console.log('登录', loginForm);
        // 模拟登录逻辑
        const user = { username: loginForm.username };
        userStore.login(user); // 调用 Pinia action
      };
  
      const handleRegister = () => {
        console.log('注册');
        // 处理注册逻辑
      };
  
      const handleForgotPassword = () => {
        console.log('忘记密码');
        // 处理忘记密码逻辑
      };
  
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .login-form {
    width: 300px;
  }
  
  .el-form-item {
    display: flex;
    justify-content: space-between;
  }
  
  .el-button + .el-button {
    margin-left: 10px;
  }
  </style>
  