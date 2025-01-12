/* eslint-disable @typescript-eslint/no-explicit-any */
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

class SignalRService {
  private connection: HubConnection | null = null;

  constructor(private readonly hubUrl: string) {}

  // Initialize the connection
  public async startConnection(): Promise<void> {
    try {
      this.connection = new HubConnectionBuilder().withUrl(this.hubUrl).withAutomaticReconnect().configureLogging(LogLevel.Debug).build();

      this.registerEventHandlers();
      console.log("connection connect to: ", this.hubUrl);

      await this.connection.start();
      console.log("SignalR connection established.");
    } catch (error) {
      console.error("Error starting SignalR connection:", error);
    }
  }

  // Register handlers for connection events
  private registerEventHandlers(): void {
    if (!this.connection) return;

    this.connection.onreconnecting(() => {
      console.warn("SignalR connection lost. Reconnecting...");
    });

    this.connection.onreconnected(() => {
      console.log("SignalR reconnected successfully.");
    });

    this.connection.onclose(async () => {
      console.log("SignalR connection closed.");
    });
  }

  // Subscribe to a server event
  public on(eventName: string, callback: (...args: any[]) => void): void {
    this.connection?.on(eventName, callback);
  }

  // Unsubscribe from a server event
  public off(eventName: string, callback?: (...args: any[]) => void): void {
    if (callback) {
      this.connection?.off(eventName, callback);
    } else {
      this.connection?.off(eventName); // Removes all handlers for the event
    }
  }

  // Send a message to the server
  public async send(eventName: string, ...args: any[]): Promise<void> {
    if (!this.connection) {
      console.error("SignalR connection is not established.");
      return;
    }

    try {
      await this.connection.invoke(eventName, ...args);
      console.log(`Message sent: ${eventName}`, args);
    } catch (error) {
      console.error(`Error sending message "${eventName}":`, error);
    }
  }

  // Stop the connection
  public async stopConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      console.log("SignalR connection stopped.");
    }
  }
}

export default SignalRService;
