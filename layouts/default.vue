<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header>
    <div></div>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
    </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</template>

<style scoped>
    header {
        background-color: blueviolet;
        padding: 10px;
        color: white;
        text-align: center;
    }
    footer {
        background-color: burlywood;
        padding: 10px;
        color: white;
        text-align: center;
    }  
</style>
