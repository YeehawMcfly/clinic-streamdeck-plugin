/**
 * Utility functions for the ClinicStreamDeck Assistant
 */

/**
 * Formats a timestamp for display in the UI
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Generates a patient reference code using the patient ID
 * In a real system, this would follow specific medical record numbering conventions
 * @param patientId - The numeric patient identifier
 * @returns Formatted patient reference code
 */
export function generatePatientReference(patientId: number): string {
  const prefix = 'PT';
  const padded = patientId.toString().padStart(6, '0');
  const year = new Date().getFullYear();
  
  return `${prefix}${year}-${padded}`;
}

/**
 * Validates if a room ID exists in the system
 * @param roomId - The room identifier to check
 * @returns Promise resolving to boolean indicating if room exists
 */
export async function validateRoomId(roomId: number): Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:3001/rooms/${roomId}`);
    return response.status === 200;
  } catch (error) {
    console.error('Room validation error:', error);
    return false;
  }
}

/**
 * Determines alert priority based on type and content
 * @param alertType - The type of alert
 * @param message - The alert message
 * @returns Priority level (high, medium, low)
 */
export function determineAlertPriority(alertType: string, message: string): string {
  if (alertType === 'medical' || message.toLowerCase().includes('emergency')) {
    return 'high';
  } else if (alertType === 'assistance') {
    return 'medium';
  } else {
    return 'low';
  }
}