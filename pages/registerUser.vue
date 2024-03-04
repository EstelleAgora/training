<!-- eslint-disable no-undef -->
<template>
  <div>
    <h1>Register User</h1>
    <form @submit="registerUser">
      <label for="username">Username:</label>
      <InputText type="text" id="username" v-model="user.username" required />

      <label for="password">Password</label>
      <Password id="password" v-model="user.password" />

      <Button type="submit" @click="registerUser()">Register</Button>
    </form>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { ref } from 'vue'

const user = ref({
  username: '',
  password: ''
})

const registerUser = () => {
  // Get values from form

  fetch('http://localhost:3001/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(user.value)
  }).then((response) => {
    if (response.ok) {
      navigateTo('/login')
    }
  })

  user.value = { username: '', password: '' }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 50%;
}
</style>
