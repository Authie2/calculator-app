<template>
  <div class="container">
    <Calculator />
  </div>
</template>

<script setup>
import Calculator from "~/components/calculator.vue";
</script>

<style scoped>
.container {
  size-adjust: -20%;
}

h1 {
  text-align: center;
  margin-top: 20px;
}
</style>
