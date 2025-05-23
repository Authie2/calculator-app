<template>
  <div class="w-screen h-screen bg-gradient-to-b from-black to-blue-500/100 from-80% flex items-center justify-center relative overflow-hidden">
    <div class="flex w-full h-full p-6 space-x-4">
      <!-- Drawing Area -->
      <div
        class="flex-1 bg-transparent rounded-lg bg-gradient-to-b from-white to-blue-500/100 from-80%"
        :class="position === 'left' ? 'order-1' : 'order-2'"
      >
        <DrawingArea @updateDisplay="updateDisplay" />
      </div>

      <!-- Calculator -->
      <div
        class="w-96 bg-transparent rounded-lg"
        :class="position === 'left' ? 'order-2' : 'order-1'"
      >
        <div
          class="bg-gray-800 text-white text-right text-3xl p-4 rounded mb-4 h-20 flex items-center justify-end"
        >
          {{ display }}
        </div>
        <div class="grid grid-cols-4 gap-4">
          <button
            v-for="button in buttons"
            :key="button"
            @click="onButtonClick(button)"
            :class="getButtonClass(button)"
          >
            {{ button }}
          </button>
        </div>
        <div class="mt-4 flex justify-center space-x-4">
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-5 rounded"
            @click="setPosition('left')"
          >
            Left
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-5 rounded"
            @click="setPosition('right')"
          >
            Right
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DrawingArea from "./drawing.vue";

const display = ref("0");
const position = ref("left");

const buttons = [
  "7",
  "8",
  "9",
  "C",
  "4",
  "5",
  "6",
  "÷",
  "1",
  "2",
  "3",
  "×",
  "0",
  ".",
  "=",
  "+"
];

const onButtonClick = (button) => {
  if (button === "C") {
    display.value = "0";
  } else if (button === "=") {
    try {
      display.value = eval(display.value.replace("÷", "/").replace("×", "*"));
    } catch {
      display.value = "Error";
    }
  } else {
    if (display.value === "0" && button !== ".") {
      display.value = button;
    } else {
      display.value += button;
    }
  }
};

const setPosition = (newPosition) => {
  position.value = newPosition;
};

const updateDisplay = (text) => {
  display.value = text;
};

const getButtonClass = (button) => {
  if (button === "C") {
    return "bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-5 rounded";
  } else if (button === "=") {
    return "bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded col-span-2";
  } else if (["÷", "×", "+"].includes(button)) {
    return "bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-5 rounded";
  } else {
    return "bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-5 rounded";
  }
};
</script>

<style scoped>
.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>
