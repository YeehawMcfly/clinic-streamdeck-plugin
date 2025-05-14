# ClinicStreamDeck Assistant (Simulated)

A professional StreamDeck plugin that simulates clinical workflow automation using TypeScript and mock RESTful APIs. This solution streamlines common clinic operations through quick-access macro buttons, reducing administrative overhead and improving staff efficiency.

## Key Features

### Patient Check-in Automation
- One-touch patient check-in process
- Automatic timestamp and patient ID assignment
- Visual feedback confirming successful check-in
- Error handling with user notifications

### Room Management System
- Real-time room readiness confirmation
- Status updates for cleaning and preparation completion
- Integration with simulated room availability database
- Supports multiple rooms with different states

### Critical Alert Dispatching
- Urgent staff notification system
- Timestamped alert logging
- Customizable alert message system
- Designed for rapid response scenarios

## Technical Implementation

### Architecture
The project follows a modular architecture with clear separation of concerns:
- Action handlers for each clinical workflow
- StreamDeck SDK integration layer
- Mock API service layer
- Feedback and error handling system

### Technologies Used
- **TypeScript**: Type-safe implementation with modern ES features
- **StreamDeck SDK**: Hardware-software integration with button mapping and feedback
- **Node.js**: Runtime environment for the plugin logic
- **Axios**: Promise-based HTTP client for API communication
- **JSON Server**: Mock REST API for simulating clinical systems
- **Webpack**: Module bundling for production deployment

## Setup and Installation

### Prerequisites
- Node.js v14+ and npm
- Elgato StreamDeck Software (Physical device optional - simulator works)
- Modern IDE (VS Code recommended)

### Development Environment
1. Clone this repository
2. Install dependencies: `npm install`
3. Start the mock API: `npm run start`
4. Build the plugin: `npm run build`
5. Install the `.streamDeckPlugin` file in the StreamDeck application

### Testing
Run the mock clinical systems with:
```bash
npm run start
```

## Clinical Workflow Integration

### Integration Points
The assistant connects to the following simulated clinical systems:
- Patient Management System (check-ins, appointments)
- Room Status Management System (cleaning, preparation)
- Staff Alert Network (urgent notifications, requests for assistance)

### Efficiency Improvements
This solution demonstrates potential for:
- Reducing check-in time by approximately 30 seconds per patient
- Streamlining room turnover processes
- Accelerating urgent communication channels

## Enhanced UI Features

### Visual Analytics Dashboard
- Real-time patient flow metrics visualization
- Room utilization charts with historical trends
- Alert response time tracking with performance indicators
- Color-coded status indicators for at-a-glance monitoring

### Interactive Clinic Floor Plan
- Dynamic visualization of room status and availability
- Color-coded rooms indicating readiness (green), occupied (yellow), needs attention (red)
- Interactive room selection for targeted operations
- Hover details showing room equipment and last cleaning time

### Alert Management System
- Priority-based alert queue with visual classification
- Acknowledgment workflow with staff assignment tracking
- Timed escalation for unaddressed high-priority alerts
- Notification history with resolution statistics

### Staff Coordination Features
- Staff availability indicators linked to room assignments
- Drag-and-drop task assignment interface
- Synchronized notifications across multiple StreamDeck devices
- Shift change summary with outstanding tasks visualization

## Future Enhancements
- Integration with real EHR systems via FHIR API
- Customizable alert templates for different emergency scenarios
- Advanced room management with equipment tracking
- Staff location awareness for targeted alerts
- Mobile companion app for remote status monitoring
- Voice command integration for hands-free operation
- Predictive analytics for patient volume forecasting
- Integration with IoT medical devices for automated alerts

## License
MIT