import { Action, StreamDeck } from './mock-streamdeck-sdk';
import axios from 'axios';
import { formatTimestamp, generatePatientReference } from './utils';

const API_BASE_URL = 'http://localhost:3001';

/**
 * Patient Check-In Action
 * Handles the workflow for checking in patients to the clinic
 * Simulates integration with patient management system
 */
export class CheckInAction extends Action {
  constructor(streamDeck: StreamDeck, actionUUID: string) {
    super(streamDeck, actionUUID);
    this.initializeAction();
  }

  private initializeAction(): void {
    // Set initial button appearance
    this.streamDeck.setFeedback({ 
      title: 'Check-In'
    });
  }

  async onKeyUp() {
    try {
      // Visual feedback during API call
      this.streamDeck.setFeedback({ 
        title: 'Processing...'
      });
      
      // Generate realistic patient data
      const patientId = Math.floor(Math.random() * 1000);
      const patientReference = generatePatientReference(patientId);
      const timestamp = new Date().toISOString();
      
      // Call simulated patient management system API
      const response = await axios.post(`${API_BASE_URL}/checkins`, {
        patientId,
        patientReference,
        time: timestamp,
        status: 'checked-in',
        staffId: 'current-user-123', // Would be retrieved from authenticated session
        notes: ''
      });
      
      // Success feedback
      this.streamDeck.setFeedback({ 
        title: `Patient\n#${patientId}\nChecked In`
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        this.initializeAction();
      }, 3000);
      
    } catch (error) {
      console.error('Check-in API error:', error);
      this.streamDeck.setFeedback({ 
        title: 'Check-In\nFailed'
      });
      
      // Reset after error display
      setTimeout(() => {
        this.initializeAction();
      }, 5000);
    }
  }
}

/**
 * Room Readiness Action
 * Handles room preparation status updates
 * Provides visual confirmation of room state changes
 */
export class RoomReadinessAction extends Action {
  private roomId: number = 1;
  private isReady: boolean = false;

  constructor(streamDeck: StreamDeck, actionUUID: string) {
    super(streamDeck, actionUUID);
    this.initializeAction();
  }

  private async initializeAction(): Promise<void> {
    try {
      // Get current room status
      const response = await axios.get(`${API_BASE_URL}/rooms/${this.roomId}`);
      this.isReady = response.data.ready;
      
      // Set button appearance based on room status
      this.updateButtonState();
    } catch (error) {
      console.error('Failed to fetch room status:', error);
      this.streamDeck.setFeedback({ 
        title: 'Room Status\nError'
      });
    }
  }
  
  private updateButtonState(): void {
    this.streamDeck.setFeedback({
      title: this.isReady ? 'Room\nReady' : 'Room\nNot Ready'
    });
  }

  async onKeyUp() {
    try {
      // Toggle room state
      this.isReady = !this.isReady;
      
      // Visual feedback during API call
      this.streamDeck.setFeedback({ 
        title: 'Updating...'
      });
      
      // Call room management system API
      await axios.patch(`${API_BASE_URL}/rooms/${this.roomId}`, { 
        ready: this.isReady,
        updatedAt: new Date().toISOString(),
        updatedBy: 'current-user-123', // Would be retrieved from authenticated session
      });
      
      // Update button to reflect new state
      this.updateButtonState();
      
    } catch (error) {
      console.error('Room status update error:', error);
      this.streamDeck.setFeedback({ 
        title: 'Update\nFailed'
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        this.initializeAction();
      }, 3000);
    }
  }
}

/**
 * Alert Dispatching Action
 * Handles urgent communications to staff
 * Simulates integration with clinic notification systems
 */
export class AlertAction extends Action {
  private alertTypes = [
    { id: 'medical', title: 'Medical\nEmergency', message: 'Medical emergency in Room 1' },
    { id: 'assistance', title: 'Assistance\nNeeded', message: 'Assistance needed in Room 2' },
    { id: 'supplies', title: 'Supplies\nNeeded', message: 'Supplies needed in Room 3' }
  ];
  
  private currentAlertIndex: number = 0;

  constructor(streamDeck: StreamDeck, actionUUID: string) {
    super(streamDeck, actionUUID);
    this.initializeAction();
  }

  private initializeAction(): void {
    // Set initial button appearance
    const currentAlert = this.alertTypes[this.currentAlertIndex];
    this.streamDeck.setFeedback({ 
      title: currentAlert.title
    });
  }
  
  // Long press cycles through alert types
  async onKeyDown() {
    this.currentAlertIndex = (this.currentAlertIndex + 1) % this.alertTypes.length;
    this.initializeAction();
  }

  async onKeyUp() {
    const currentAlert = this.alertTypes[this.currentAlertIndex];
    
    try {
      // Visual feedback during API call
      this.streamDeck.setFeedback({ 
        title: 'Sending\nAlert...'
      });
      
      // Send alert to notification system
      await axios.post(`${API_BASE_URL}/alerts`, {
        type: currentAlert.id,
        message: currentAlert.message,
        time: new Date().toISOString(),
        priority: 'high',
        sender: 'current-user-123', // Would be retrieved from authenticated session
        requiresAcknowledgment: true
      });
      
      // Success feedback
      this.streamDeck.setFeedback({ 
        title: 'Alert\nSent'
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        this.initializeAction();
      }, 3000);
      
    } catch (error) {
      console.error('Alert dispatch error:', error);
      this.streamDeck.setFeedback({ 
        title: 'Alert\nFailed'
      });
      
      // Reset after error display
      setTimeout(() => {
        this.initializeAction();
      }, 5000);
    }
  }
}