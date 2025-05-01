<template>
  <div class="home">
    <h1>Amazon Product Saver</h1>
    <div class="status">
      Extension is active. Buttons will appear next to Amazon products.
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  chrome.runtime.sendMessage({ action: 'checkStatus' }, (response) => {
    if (response && response.status === 'active') {
      console.log('Extension is active')
    } else {
      console.log('Extension is not active')
    }
  })
})
</script>

<style lang="scss" scoped>
.home {
  width: 300px;
  padding: 10px;
  font-family: Arial, sans-serif;

  h1 {
    font-size: 18px;
    color: #232F3E;
    margin-bottom: 15px;
  }

  .status {
    margin-top: 10px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 4px;
  }
}
</style> 