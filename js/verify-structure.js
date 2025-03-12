// Save this as verify-structure.js in your project root
// Run with: node verify-structure.js

const fs = require('fs');
const path = require('path');

// Expected structure
const expectedStructure = {
  'css': ['style.css', 'dark-mode.css', 'animations.css'],
  'js': ['main.js'],
  'images/projects/employee-turnover': [
    'employee-turnover-banner.jpg',
    'data_distribution.jpg',
    'correlation_matrix.jpg',
    'confusion_matrix.jpg',
    'learning_curve.jpg',
    'roc_curve.jpg',
    'feature_importance.jpg'
  ],
  'projects/salifort-motors': ['index.html']
};

// Check if paths exist
function checkPaths() {
  let allPathsExist = true;
  
  for (const dir in expectedStructure) {
    const dirPath = path.join(__dirname, dir);
    
    if (!fs.existsSync(dirPath)) {
      console.log(`❌ Directory not found: ${dir}`);
      allPathsExist = false;
      continue;
    }
    
    for (const file of expectedStructure[dir]) {
      const filePath = path.join(dirPath, file);
      
      if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${path.join(dir, file)}`);
        allPathsExist = false;
      } else {
        console.log(`✅ Found: ${path.join(dir, file)}`);
      }
    }
  }
  
  if (allPathsExist) {
    console.log("\n✅ All expected files found!");
  } else {
    console.log("\n❌ Some files are missing. Please create the missing files or update the paths.");
    console.log("\nSuggested Directory Structure:");
    suggestStructure();
  }
}

// Create basic structure suggestion
function suggestStructure() {
  console.log(`
portfolio-website/
├── index.html
├── css/
│   ├── style.css
│   ├── dark-mode.css
│   └── animations.css
├── js/
│   └── main.js
├── images/
│   └── projects/
│       └── employee-turnover/
│           ├── employee-turnover-banner.jpg
│           ├── data_distribution.jpg
│           ├── correlation_matrix.jpg
│           ├── confusion_matrix.jpg
│           ├── learning_curve.jpg
│           ├── roc_curve.jpg
│           └── feature_importance.jpg
└── projects/
    └── salifort-motors/
        └── index.html
  `);
}

// Run checks
checkPaths();