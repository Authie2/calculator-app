<template>
  <div class="bg-transparent rounded-lg relative" style="width: 1500px; height: 700px;">
    <canvas
      ref="canvas"
      class="w-full h-full rounded-lg"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
    ></canvas>
    <button
      class="absolute bottom-4 left-4 bg-red-500 text-white font-bold px-4 py-2 rounded shadow hover:bg-red-600 transition-colors"
      @click="clearCanvas"
    >
      Clear
    </button>
    <button
      class="absolute bottom-4 left-32 bg-blue-500 text-white font-bold px-4 py-2 rounded shadow hover:bg-blue-600 transition-colors"
      @click="toggleColorPicker"
    >
      Brush Color
    </button>
    <!-- Save Button -->
    <button
      class="absolute bottom-4 left-64 bg-green-500 text-white font-bold px-4 py-2 rounded shadow hover:bg-green-600 transition-colors"
      @click="saveCanvas"
    >
      Save
    </button>

    <!-- Custom Color Picker Modal -->
    <div
      v-if="showColorPicker"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-96"
    >
      <h3 class="text-lg font-bold text-gray-800 mb-4">Select Brush Color</h3>
      <div class="flex items-center justify-center space-x-4">
        <input
          type="color"
          class="w-16 h-16 border border-gray-300 rounded-full shadow"
          v-model="brushColor" :style="{ backgroundColor: brushColor, borderColor: brushColor }"
        />
        <div
          class="w-16 h-16 rounded-full shadow"
          :style="{ backgroundColor: brushColor }"
        ></div>
      </div>
      <div class="mt-6 flex justify-end space-x-4">
        <button
          class="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded shadow hover:bg-gray-300 transition-colors"
          @click="toggleColorPicker"
        >
          Cancel
        </button>
        <button
          class="bg-blue-500 text-white font-bold px-4 py-2 rounded shadow hover:bg-blue-600 transition-colors"
          @click="applyBrushColor"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import undoRedoSystem from "../assets/js/undoRedo";
import useKeybinds from "../assets/js/useKeybinds";
import { initializeHandRecognition, processHandwrittenMath } from "../assets/js/handRecognition";  // Import hand recognition logic

const emit = defineEmits(["updateDisplay"]);

const canvas = ref(null);
const ctx = ref(null);
const isDrawing = ref(false);
const brushColor = ref("#ffffff"); // Default brush color
const showColorPicker = ref(false); // State to show/hide color picker modal

// Initialize undo/redo system
const UndoRedoSystem = new undoRedoSystem();

// Store the current state of the canvas
const saveCanvasState = () => {
  const canvasState = ctx.value.getImageData(0, 0, canvas.value.width, canvas.value.height);
  UndoRedoSystem.saveState(canvasState);
};

// Drawing functions
const startDrawing = (event) => {
  isDrawing.value = true;
  const rect = canvas.value.getBoundingClientRect();
  ctx.value.beginPath();
  ctx.value.moveTo(event.clientX - rect.left, event.clientY - rect.top);
};

const draw = (event) => {
  if (!isDrawing.value) return;
  const rect = canvas.value.getBoundingClientRect();
  ctx.value.lineTo(event.clientX - rect.left, event.clientY - rect.top);
  ctx.value.stroke();
};

const stopDrawing = () => {
  isDrawing.value = false;
  ctx.value.closePath();
  saveCanvasState(); // Save state after each drawing action
};

const clearCanvas = () => {
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  saveCanvasState(); // Save state after clearing canvas
};

const toggleColorPicker = () => {
  showColorPicker.value = !showColorPicker.value;
};

const applyBrushColor = () => {
  ctx.value.strokeStyle = brushColor.value;
  toggleColorPicker();
};

const undoAction = () => {
  const lastState = UndoRedoSystem.undo();
  if (lastState) {
    ctx.value.putImageData(lastState, 0, 0);
  }
};

const redoAction = () => {
  const redoState = UndoRedoSystem.redo();
  if (redoState) {
    ctx.value.putImageData(redoState, 0, 0);
  }
};

// Save the canvas content as an image
const saveCanvas = async () => {
  const dataUrl = canvas.value.toDataURL("image/png");
  const text = await processHandwrittenMath(dataUrl);

  emit("updateDisplay", text);

  // const link = document.createElement("a");
  // link.href = dataUrl;
  // link.download = "drawing.png"; // Change the name if needed
  // link.click();
};

onMounted(() => {
  const canvasElement = canvas.value;
  canvasElement.width = canvasElement.offsetWidth;
  canvasElement.height = canvasElement.offsetHeight;

  ctx.value = canvasElement.getContext("2d", { willReadFrequently: true }); // Enable performance optimization for readbacks
  ctx.value.strokeStyle = brushColor.value; // Initialize with default color
  ctx.value.lineWidth = 2;

  // Initialize hand recognition
  initializeHandRecognition(canvasElement, ctx.value);
});

// Add keybinds (e.g., "c" for Clear, "p" for Color Picker)
useKeybinds({
  c: clearCanvas, // Press "C" to clear the canvas
  p: toggleColorPicker, // Press "P" to toggle the color picker
  z: undoAction,  // Press "Z" for Undo
  y: redoAction,  // Press "Y" for Redo
  escape: () => (showColorPicker.value = false), // Close color picker with "Escape"
});
</script>

<style scoped>
canvas {
  cursor: crosshair;
}
</style>
