// Import Tesseract.js and Math.js
import Tesseract from 'tesseract.js';
import * as math from 'mathjs';

// Function to initialize hand recognition (you can adjust this as needed)
export function initializeHandRecognition(canvasElement, context) {
  // Assuming hand recognition setup happens here
  console.log('Initializing hand recognition...');
  
  // For example, you can start by setting up the canvas for interaction or recognition
  canvasElement.addEventListener('click', (e) => {
    // Example logic for using the canvas
    const rect = canvasElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(`Clicked at: ${x}, ${y}`);
  });

  // Further setup related to hand recognition logic can go here...
}

// Function to extract text from an image using Tesseract.js
async function extractTextFromImage(imagePath) {
  const text = await new Promise((resolve, reject) => {
    Tesseract.recognize(
      imagePath,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    )
      .then(({ data: { text } }) => {
        resolve(text);
      })
      .catch((err) => {
        reject(err);
      });
  });
  console.log(text);
  return text;
}

// Function to solve the math expression
function solveMathExpression(expression) {
  try {
    return math.evaluate(expression);
  } catch (err) {
    return `Error in solving expression: ${err.message}`;
  }
}

export async function processHandwrittenMath(imagePath) {
  try {
    const extractedText = await extractTextFromImage(imagePath);
    const cleanedText = extractedText.replace(/\n/g, ' ').trim();
    console.log(`Extracted Text: ${cleanedText}`);
    
    const result = await solveMathExpression(cleanedText);
    console.log(`Solution: ${result}`);
  } catch (err) {
    console.error('Error processing the image:', err);
  }
}