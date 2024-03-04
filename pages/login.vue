<template>
  <div class="login-container">
    <h1>Login</h1>
    <div class="form">
      <div class="form-group">
        <label for="username">Username</label>
        <InputText id="username" v-model="user.username" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <InputText id="password" v-model="user.password" />
      </div>
      <Button label="Login" @click="login()" />
    </div>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import { ref } from 'vue'

const user = ref({
  username: '',
  password: ''
})

const login = () => {
  fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(user.value)
  }).then((response) => {
    if (response.ok) {
      console.log('User logged in!')
      navigateTo('/listOfFilm')
    } else {
      console.log('User not logged in')
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

button {
  width: 100%;
}
</style>
