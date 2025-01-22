import { onMounted, onUnmounted } from "vue";
import KeybindSystem from "./keybinds";

const keybindSystem = new KeybindSystem();

export default function useKeybinds(actions) {
  onMounted(() => {
    // Register actions to specific keys
    Object.entries(actions).forEach(([key, action]) => {
      keybindSystem.registerKeybind(key, action);
    });

    // Start listening to key events
    keybindSystem.start();
  });

  onUnmounted(() => {
    // Stop keybind system and clean up
    keybindSystem.stop();
  });
}