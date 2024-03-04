<!-- eslint-disable no-undef -->
<template>
  <div class="container">
    <Button label="Sign up" @click="registerUser()" />
    <div class="space"></div>
    <Button label="Sign in" @click="login()" />
  </div>
</template>

<script setup>
const registerUser = () => {
  navigateTo('/registerUser')
}

const login = () => {
  navigateTo('/login')
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.space {
  margin: 10px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
