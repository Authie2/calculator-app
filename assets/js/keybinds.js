export default class KeybindSystem {
    constructor() {
      this.keybinds = {}; // Object to store key-action pairs
      this.listeners = []; // Track active event listeners
    }
  
    /**
     * Register a keybind with an associated action
     * @param {string} key - The key to bind (e.g., "c", "p", "Escape").
     * @param {Function} action - The function to execute when the key is pressed.
     */
    registerKeybind(key, action) {
      this.keybinds[key.toLowerCase()] = action;
    }
  
    /**
     * Unregister a keybind
     * @param {string} key - The key to remove from the keybinds.
     */
    unregisterKeybind(key) {
      delete this.keybinds[key.toLowerCase()];
    }
  
    /**
     * Initialize the keybind listener
     */
    start() {
      const handler = (event) => {
        const key = event.key.toLowerCase();
        if (this.keybinds[key]) {
          event.preventDefault(); // Prevent default browser behavior
          this.keybinds[key](); // Execute the associated action
        }
      };
  
      window.addEventListener("keydown", handler);
      this.listeners.push(handler);
    }
  
    /**
     * Stop listening for keybinds
     */
    stop() {
      this.listeners.forEach((handler) => {
        window.removeEventListener("keydown", handler);
      });
      this.listeners = [];
    }
  }
  