import { StreamDeck } from './mock-streamdeck-sdk';
import { CheckInAction, RoomReadinessAction, AlertAction } from './actions';
import { validateRoomId } from './utils';

console.log('ClinicStreamDeck Assistant initializing...');

/**
 * Main StreamDeck plugin initialization
 * Sets up the plugin and registers clinical workflow actions
 */
class ClinicStreamDeckPlugin {
  public streamDeck: StreamDeck; // Changed to public for demo access
  private initTime: Date;

  constructor() {
    this.streamDeck = new StreamDeck();
    this.initTime = new Date();
    this.initialize();
  }

  private initialize(): void {
    console.log(`ClinicStreamDeck Assistant starting at ${this.initTime.toISOString()}`);
    
    // Register clinical workflow actions
    this.registerActions();
    
    // Connect to the StreamDeck software
    this.streamDeck.connect();
    
    console.log('ClinicStreamDeck Assistant registered all actions and connected');
  }

  private registerActions(): void {
    // Register patient check-in workflow
    this.streamDeck.registerAction(
      'com.example.clinicstreamdeck.checkin', 
      CheckInAction
    );
    console.log('Registered Patient Check-In action');
    
    // Register room readiness workflow
    this.streamDeck.registerAction(
      'com.example.clinicstreamdeck.room', 
      RoomReadinessAction
    );
    console.log('Registered Room Readiness action');
    
    // Register alert dispatching workflow
    this.streamDeck.registerAction(
      'com.example.clinicstreamdeck.alert', 
      AlertAction
    );
    console.log('Registered Alert Dispatching action');
    
    // Other actions could be registered here as the plugin expands
  }
}

// Create plugin instance
const plugin = new ClinicStreamDeckPlugin();

// Handle errors gracefully
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
});

// Export for testing purposes
export { plugin };

// Mock API data for testing purposes
const mockApiData = {
  checkins: [
    {
      id: 1,
      patientId: 423,
      patientReference: "PT2025-000423",
      time: "2025-05-11T10:15:32Z",
      status: "checked-in",
      staffId: "user-107",
      notes: "Patient arrived early for appointment"
    },
    {
      id: 2,
      patientId: 156,
      patientReference: "PT2025-000156",
      time: "2025-05-11T10:35:17Z",
      status: "checked-in",
      staffId: "user-212",
      notes: "Follow-up appointment"
    }
  ],
  rooms: [
    { 
      id: 1, 
      name: "Exam Room 1",
      ready: false,
      lastCleaned: "2025-05-11T09:30:00Z",
      lastPatient: 143,
      equipment: ["Standard", "EKG"],
      notes: "Needs supply restock"
    },
    { 
      id: 2, 
      name: "Exam Room 2",
      ready: true,
      lastCleaned: "2025-05-11T10:45:00Z",
      lastPatient: 156,
      equipment: ["Standard", "Otoscope"],
      notes: ""
    },
    {
      id: 3,
      name: "Procedure Room",
      ready: true,
      lastCleaned: "2025-05-11T08:15:00Z",
      lastPatient: null,
      equipment: ["Standard", "Advanced", "Ultrasound"],
      notes: "Reserved for Dr. Johnson at 11:30"
    }
  ],
  alerts: [
    {
      id: 1,
      type: "assistance",
      message: "Assistance needed in Room 3",
      time: "2025-05-11T09:45:23Z",
      priority: "medium",
      sender: "user-145",
      requiresAcknowledgment: true,
      acknowledgedBy: "user-212",
      acknowledgedAt: "2025-05-11T09:46:02Z"
    },
    {
      id: 2,
      type: "medical",
      message: "Medical emergency in Room 1",
      time: "2025-05-11T10:12:07Z",
      priority: "high",
      sender: "user-107",
      requiresAcknowledgment: true,
      acknowledgedBy: null,
      acknowledgedAt: null
    }
  ],
  staff: [
    {
      id: "user-107",
      name: "Dr. Sarah Chen",
      role: "Physician",
      specialty: "Family Medicine",
      status: "available"
    },
    {
      id: "user-145",
      name: "Michael Rodriguez",
      role: "Nurse",
      specialty: "General",
      status: "with-patient"
    },
    {
      id: "user-212",
      name: "Jessica Taylor",
      role: "Medical Assistant",
      specialty: null,
      status: "available"
    }
  ],
  patients: [
    {
      id: 143,
      reference: "PT2025-000143",
      name: "John Smith",
      dob: "1985-06-22",
      lastVisit: "2025-04-03"
    },
    {
      id: 156,
      reference: "PT2025-000156",
      name: "Emily Johnson",
      dob: "1978-11-14",
      lastVisit: "2025-05-11"
    },
    {
      id: 423,
      reference: "PT2025-000423",
      name: "Robert Williams",
      dob: "1992-03-08",
      lastVisit: "2025-05-11"
    }
  ],
  settings: {
    clinicName: "Woodside Medical Center",
    alertTimeoutMinutes: 5,
    autoCloseCheckins: true,
    requireRoomSanitization: true
  }
};

export { mockApiData };