// src/utils/undoRedo.js

export default class undoRedoSystem {
    constructor() {
      this.undoStack = []; // Stack to store undo history
      this.redoStack = []; // Stack to store redo history
    }
  
    /**
     * Save the current state of the canvas to the undo stack
     * @param {ImageData} canvasState - The current state of the canvas
     */
    saveState(canvasState) {
      this.undoStack.push(canvasState);
      this.redoStack = []; // Clear redo stack when a new action is performed
    }
  
    /**
     * Undo the last action
     * @returns {ImageData | null} The last saved canvas state or null if there is no state to undo
     */
    undo() {
      if (this.undoStack.length > 0) {
        const lastState = this.undoStack.pop();
        this.redoStack.push(lastState);
        return lastState;
      }
      return null;
    }
  
    /**
     * Redo the last undone action
     * @returns {ImageData | null} The last undone canvas state or null if there is no state to redo
     */
    redo() {
      if (this.redoStack.length > 0) {
        const redoState = this.redoStack.pop();
        this.undoStack.push(redoState);
        return redoState;
      }
      return null;
    }
  }
  