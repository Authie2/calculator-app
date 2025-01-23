<template>
  <div
    class="w-screen h-screen bg-gradient-to-b from-black to-blue-500/30 from-80% flex items-center justify-center relative overflow-hidden"
  >
    <div
      class="absolute bg-blue-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-3xl"
      :style="{
        opacity,
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`
      }"
    ></div>

    <a
      ref="logo"
      href="https://github.com/Nxium-Developments/NextLanguage"
      :style="{
        maskImage: logoGradient
      }"
    >
      <Logo />
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Logo from '../components/logo.vue';
import { useMouse, useWindowSize } from '@vueuse/core';

// Mouse and window size data
const { x, y } = useMouse();
const { width, height } = useWindowSize();

// Computed properties
const dx = computed(() => Math.abs(x.value - width.value / 2));
const dy = computed(() => Math.abs(y.value - height.value / 2));
const distance = computed(() =>
  Math.sqrt(dx.value * dx.value + dy.value * dy.value)
);

const size = computed(() => Math.max(300 - distance.value / 3, 150));
const opacity = computed(() => Math.min(Math.max(size.value / 300, 0.7), 1));

// Logo gradient
const logo = ref<HTMLElement | null>(null);
const logoGradient = computed(() => {
  let rect = logo.value?.getBoundingClientRect();
  const xPos = x.value - (rect?.left ?? 0);
  const yPos = y.value - (rect?.top ?? 0);

  return `radial-gradient(circle at ${xPos}px ${yPos}px, black 30%, transparent 100%)`;
});

// Redirect after 3 seconds
const router = useRouter();
onMounted(() => {
  setTimeout(() => {
    router.push('/menu');
  }, 6000);
});
</script>

<style scoped>
/* Add any scoped styles for the component */
</style>
