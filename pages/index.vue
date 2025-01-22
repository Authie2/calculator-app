<template>
  <div>
    <UButton
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
    />
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
