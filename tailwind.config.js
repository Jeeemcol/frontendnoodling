// Extract custom colors into a separate object
const customColors = {
  'primary': {
    'base': '#024161',
    'light': '#326B83',
    'dark': '#012F4D'
  },
  'secondary': {
    'base': '#D16A28',
    'light': '#D9814C',
    'dark': '#B54E1B'
  },
  'tertiary': {
    'base': '#A9A9A9',
    'light': '#C2C2C2',
    'dark': '#7F7F7F'
  },
  'background': '#F7F7F7',
  'text-primary': '#FFFFFF',
  'text-bg': '#333333'
};

// as in python (this file == a module)
// (mapping of keys and values)
// tailwind imports this module + its keys/values
// module.exports is an obj (={}) which 
// the above tailwind import uses
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: customColors
    },
  },
  variants: {},
  plugins: [],
};

// --- Generate SCSS variables from customColors: ---

// First, we need access to the File System module (fs) in Node.js
// This allows us to write to files.
const fs = require('fs');

// We're initializing an empty string that will hold our SCSS variable declarations.
let scssVariables = '$sm: 640px;\n$md: 768px;\n$lg: 1024px;\n$xl: 1280px;\n$xxl: 1536px;\n';
//default Tailwind breakpoints

// Iterate over each key in our customColors object.
Object.keys(customColors).forEach(key => {
  
  // Check if the value associated with the current key is an object.
  // For example, primary is an object with base, light, and dark as its keys.
  if (typeof customColors[key] === 'object') {
    
    // If it's an object, iterate over its keys.
    Object.keys(customColors[key]).forEach(subKey => {
      
      // For each sub-key, generate a SCSS variable.
      // E.g., $primary-base: #024161;
      scssVariables += `$${key}-${subKey}: ${customColors[key][subKey]};\n`;
    });
  } else {
    // If the current key in customColors is not an object but a direct color value,
    // generate a SCSS variable for it.
    // E.g., $background: #F7F7F7;
    scssVariables += `$${key}: ${customColors[key]};\n`;
  }
});

// Write the generated SCSS variables to a file named _variables.scss.
// The './src/styles/_variables.scss' is the path where this file will be saved.
fs.writeFileSync('./src/styles/_variables.scss', scssVariables);