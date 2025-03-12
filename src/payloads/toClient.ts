import { Action, ActionReference } from "../actions.js";
import { AppDataInterface, SavedData, ServerEvent } from "../app.js";
import { AppSettings } from "../settings.js";
import { Step, Task } from "../tasks.js";

export type EventPayload = 
  // Tasks events
  | { type: ServerEvent.TASKS; request: 'update'; payload: Record<string, Task> }
  | { type: ServerEvent.TASKS; request: 'step'; payload: Step }
  | { type: ServerEvent.TASKS; request: 'task'; payload: Task }
  
  // Settings events
  | { type: ServerEvent.SETTINGS; request?: string; payload: AppSettings }
  
  // Action events
  | { type: ServerEvent.ACTION; request: string; payload: Action | ActionReference }
  
  // Message events
  | { type: ServerEvent.MESSAGE; request: string; payload: string }
  
  // Data events
  | { type: ServerEvent.DATA; request?: string; payload: SavedData }
  
  // AppData events
  | { type: ServerEvent.APPDATA; request?: string; payload: AppDataInterface }
  
  // Get events
  | { type: ServerEvent.GET; request: string; payload: any }
  
  // Set events
  | { type: ServerEvent.SET; request: string; payload: any }
  
  // Callback events
  | { type: ServerEvent.CALLBACK_DATA; request?: string; payload: string }
  
  // Start events
  | { type: ServerEvent.START }
  
  // Stop events
  | { type: ServerEvent.STOP; request?: undefined; payload?: undefined }
  
  // Purge events
  | { type: ServerEvent.PURGE; request: undefined; payload?: undefined }
  
  // Input events
  | { type: ServerEvent.INPUT; request: string; payload: Record<string, string> }
  
  // Config events
  | { type: ServerEvent.CONFIG; request?: string; payload: any }
  
  // Fallback
  | { type: string; request?: string; payload: any };