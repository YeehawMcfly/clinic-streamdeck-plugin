const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Creating simulation bundle...');

// Create output directories
const bundleDir = path.join(__dirname, '../bundle');
const assetsDir = path.join(bundleDir, 'assets');
const propertyInspectorDir = path.join(bundleDir, 'propertyinspector');

// Create directories if they don't exist
if (!fs.existsSync(bundleDir)) fs.mkdirSync(bundleDir, { recursive: true });
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
if (!fs.existsSync(propertyInspectorDir)) fs.mkdirSync(propertyInspectorDir, { recursive: true });

// Copy manifest.json
fs.copyFileSync(
  path.join(__dirname, '../manifest.json'), 
  path.join(bundleDir, 'manifest.json')
);

// Copy compiled JS
if (fs.existsSync(path.join(__dirname, '../dist'))) {
  copyDir(path.join(__dirname, '../dist'), bundleDir);
}

// Create simple assets (simulated icons)
createSimpleAssets();

// Create property inspector HTML files
createPropertyInspectors();

console.log('Bundle created successfully!');

// Helper function to copy directory recursively
function copyDir(src, dest) {
  const files = fs.readdirSync(src);
  
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.lstatSync(srcPath).isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Helper function to create simple placeholder assets using text files
function createSimpleAssets() {
  console.log('Asset creation skipped as icons are not used by the core plugin.');
  // Optionally, create a single placeholder if the directory must exist and not be empty for some tools
  fs.writeFileSync(path.join(assetsDir, '.gitkeep'), ''); 
}

// Create basic property inspector HTML files
function createPropertyInspectors() {
  const checkinHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Patient Check-In Settings</title>
  <meta charset="utf-8" />
  <style>
    body { font-family: sans-serif; margin: 1em; }
    .form-group { margin-bottom: 1em; }
    label { display: block; margin-bottom: 0.5em; }
    input { width: 100%; padding: 0.5em; }
  </style>
</head>
<body>
  <h2>Patient Check-In Settings</h2>
  <div class="form-group">
    <label for="staffId">Staff ID:</label>
    <input type="text" id="staffId" value="current-user-123">
  </div>
  <div class="form-group">
    <label for="notes">Default Notes:</label>
    <input type="text" id="notes" placeholder="Enter default notes here">
  </div>
</body>
</html>
  `;

  const roomHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Room Readiness Settings</title>
  <meta charset="utf-8" />
  <style>
    body { font-family: sans-serif; margin: 1em; }
    .form-group { margin-bottom: 1em; }
    label { display: block; margin-bottom: 0.5em; }
    input, select { width: 100%; padding: 0.5em; }
  </style>
</head>
<body>
  <h2>Room Readiness Settings</h2>
  <div class="form-group">
    <label for="roomId">Room ID:</label>
    <select id="roomId">
      <option value="1">Exam Room 1</option>
      <option value="2">Exam Room 2</option>
      <option value="3">Procedure Room</option>
    </select>
  </div>
  <div class="form-group">
    <label for="staffId">Staff ID:</label>
    <input type="text" id="staffId" value="current-user-123">
  </div>
</body>
</html>
  `;

  const alertHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Alert Dispatching Settings</title>
  <meta charset="utf-8" />
  <style>
    body { font-family: sans-serif; margin: 1em; }
    .form-group { margin-bottom: 1em; }
    label { display: block; margin-bottom: 0.5em; }
    input, select { width: 100%; padding: 0.5em; }
  </style>
</head>
<body>
  <h2>Alert Dispatching Settings</h2>
  <div class="form-group">
    <label for="alertType">Default Alert Type:</label>
    <select id="alertType">
      <option value="medical">Medical Emergency</option>
      <option value="assistance">Assistance Needed</option>
      <option value="supplies">Supplies Needed</option>
    </select>
  </div>
  <div class="form-group">
    <label for="staffId">Staff ID:</label>
    <input type="text" id="staffId" value="current-user-123">
  </div>
  <div class="form-group">
    <label for="requireAck">Require Acknowledgment:</label>
    <input type="checkbox" id="requireAck" checked>
  </div>
</body>
</html>
  `;

  fs.writeFileSync(path.join(propertyInspectorDir, 'checkin.html'), checkinHtml);
  fs.writeFileSync(path.join(propertyInspectorDir, 'room.html'), roomHtml);
  fs.writeFileSync(path.join(propertyInspectorDir, 'alert.html'), alertHtml);
  
  console.log('Created property inspector HTML files');
}