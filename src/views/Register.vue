<template>
  <div class="register-container">
    <el-form :model="registerForm" :rules="rules" ref="registerFormRef" class="register-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="registerForm.confirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleRegister">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import {ElForm} from 'element-plus';

const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const registerFormRef = ref<InstanceType<typeof ElForm>>();

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== registerForm.password) {
    callback(new Error('密码和确认密码不一致'));
  } else {
    callback();
  }
};

const rules = {
  username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}],
  confirmPassword: [
    {required: true, message: '请确认密码', trigger: 'blur'},
    {validator: validateConfirmPassword, trigger: 'blur'}
  ],
};

const handleRegister = () => {
  registerFormRef.value?.validate((valid) => {
    if (valid) {
      console.log('注册信息', registerForm);
      // 处理注册逻辑，例如 API 调用
    } else {
      console.log('表单验证失败');
    }
  });
};

</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-form {
  width: 400px;
}

.el-form-item {
  display: flex;
  justify-content: space-between;
}

.el-button + .el-button {
  margin-left: 10px;
}
</style>
  