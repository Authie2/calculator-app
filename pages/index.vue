<template>
  <div>
    <!-- <UButton
      disabled
      :loading="loading"
      color="jade"
      label="Button Label"
      class="rounded-lg"
      :ui="{
        strategy: 'override',
        base: 'focus:outline-dashed',
        rounded: 'rounded-full',
      }"
    /> -->
    <h1 class="absolute text-3xl font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" :style="{ color: 'white' }">Initializing NuxtUI</h1>
  </div>
</template>

<script>
const loading = ref(true);
export default {
  name: "App",
  mounted() {
    // Redirect to the loading page on app initialization
    this.$router.push('/loading');
  },
};
</script>

<style lang="scss" scoped></style>
