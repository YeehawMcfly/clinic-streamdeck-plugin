/**
 * Mock implementation of StreamDeck SDK for simulation purposes
 */

export interface FeedbackOptions {
  title?: string;
  icon?: string; // Icon remains optional
}

export class Action {
  protected streamDeck: StreamDeck;
  protected actionUUID: string;
  
  constructor(streamDeck: StreamDeck, actionUUID: string) {
    this.streamDeck = streamDeck;
    this.actionUUID = actionUUID;
  }
  
  // Methods intended to be overridden by subclasses
  async onKeyDown(): Promise<void> {}
  async onKeyUp(): Promise<void> {}
  async onWillAppear(): Promise<void> {}
}

export class StreamDeck {
  public actions: Map<string, any> = new Map(); // Changed to public for demo access
  
  constructor() {
    console.log('Initialized mock StreamDeck SDK');
  }
  
  connect(): void {
    console.log('Connected to mock StreamDeck');
  }
  
  registerAction(actionUUID: string, actionClass: any): void {
    const action = new actionClass(this, actionUUID);
    this.actions.set(actionUUID, action);
    console.log(`Registered action: ${actionUUID}`);
  }
  
  setFeedback(options: FeedbackOptions): void {
    console.log('Button feedback updated:', options);
    // In a real implementation, this would update the button's appearance
    this.logButtonChange(options);
  }
  
  // Helper method to simulate button changes in console
  private logButtonChange(options: FeedbackOptions): void {
    const titleText = options.title || "No Title";
    let iconText = "[No Icon]";
    if (options.icon) {
      iconText = `[${options.icon.split('/').pop()}]`;
    }

    console.log(`┌───────────────────┐`);
    console.log(`│                   │`);
    console.log(`│    ${iconText.padEnd(14).substring(0,14)} │`); // Adjusted padding
    console.log(`│                   │`);
    // Handle multi-line titles better for console
    const titleLines = titleText.split('\n');
    titleLines.forEach(line => {
      console.log(`│     ${line.padEnd(9).substring(0,9)}     │`);
    });
    for (let i = titleLines.length; i < 3; i++) { // Assuming max 3 lines for title for simplicity
         console.log(`│                   │`);
    }
    console.log(`└───────────────────┘`);
  }
}