const child_process = require('child_process');
const path = require('path');
const readline = require('readline');

// Start json-server in a separate process
console.log('Starting mock API server...');
const apiServer = child_process.spawn('npx', [
  'json-server',
  '--watch',
  'mock-api/db.json',
  '--port',
  '3001'
], { 
  stdio: 'pipe',
  shell: true
});

apiServer.stdout.on('data', (data) => {
  console.log(`API Server: ${data}`);
  if (data.toString().includes('resources')) {
    startDemo();
  }
});

apiServer.stderr.on('data', (data) => {
  console.error(`API Server Error: ${data}`);
});

// Simulate StreamDeck button presses
function startDemo() {
  console.log('\n\n==== ClinicStreamDeck Assistant Demo ====');
  console.log('This demo simulates button presses on the StreamDeck');
  console.log('\nAvailable commands:');
  console.log('1) Press Check-In button');
  console.log('2) Press Room Readiness button');
  console.log('3) Press Alert button');
  console.log('4) Hold Alert button (to cycle alert types)');
  console.log('q) Quit demo');
  console.log('\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Import the compiled plugin
  const { plugin } = require('../dist/index');

  // Create a function to find actions by UUID
  const findAction = (uuid) => {
    // This is a simplification - in the real SDK you'd have a proper way to access actions
    // For demo purposes we're just importing the plugin directly
    return plugin.streamDeck.actions.get(uuid);
  };

  // Run the demo interface
  function promptCommand() {
    rl.question('Enter command: ', async (answer) => {
      switch (answer.trim().toLowerCase()) {
        case '1':
          console.log('Simulating Check-In button press...');
          // Access the private property for demo only
          const checkinAction = findAction('com.example.clinicstreamdeck.checkin');
          if (checkinAction) checkinAction.onKeyUp();
          break;
          
        case '2':
          console.log('Simulating Room Readiness button press...');
          const roomAction = findAction('com.example.clinicstreamdeck.room');
          if (roomAction) roomAction.onKeyUp();
          break;
          
        case '3':
          console.log('Simulating Alert button press...');
          const alertAction = findAction('com.example.clinicstreamdeck.alert');
          if (alertAction) alertAction.onKeyUp();
          break;
          
        case '4':
          console.log('Simulating Alert button hold...');
          const alertHoldAction = findAction('com.example.clinicstreamdeck.alert');
          if (alertHoldAction) alertHoldAction.onKeyDown();
          break;
          
        case 'q':
          console.log('Quitting demo...');
          apiServer.kill();
          rl.close();
          process.exit(0);
          return;
          
        default:
          console.log('Unknown command');
      }
      
      // Continue prompt loop
      setTimeout(promptCommand, 1000);
    });
  }

  promptCommand();
}

// Handle cleanup
process.on('SIGINT', () => {
  console.log('Stopping demo...');
  if (apiServer) apiServer.kill();
  process.exit(0);
});