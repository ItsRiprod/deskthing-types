import { Action, AppDataInterface, AppSettings, AuthScopes, EventMode, Key, LOGGING_LEVELS, SavedData, SEND_TYPES, Step, Task } from "../index"

/**
 * Data sent from the App Server to the DeskThing Server
 */
export type ToServerData = 
  // GET requests
  | { type: SEND_TYPES.GET; request: 'data'; payload?: never }
  | { type: SEND_TYPES.GET; request: 'appData'; payload?: never }
  | { type: SEND_TYPES.GET; request: 'config'; payload?: never }
  | { type: SEND_TYPES.GET; request: 'settings'; payload?: never }
  | { type: SEND_TYPES.GET; request: 'input'; payload: AuthScopes }
  
  // SET requests
  | { type: SEND_TYPES.SET; request: 'settings'; payload: AppSettings }
  | { type: SEND_TYPES.SET; request: 'data'; payload: SavedData }
  | { type: SEND_TYPES.SET; request: 'appData'; payload: AppDataInterface }
  
  // DELETE requests
  | { type: SEND_TYPES.DELETE; request: 'settings'; payload: string | string[] }
  | { type: SEND_TYPES.DELETE; request: 'data'; payload: string | string[] }
  
  // OPEN requests
  | { type: SEND_TYPES.OPEN; request?: string; payload: string }
  
  // SEND requests (to client)
  | { type: SEND_TYPES.SEND; request?: string; payload: { app?: string; type: string; payload: any; request?: string } }
  
  // TOAPP requests
  | { type: SEND_TYPES.TOAPP; request: string; payload: any }
  
  // LOG requests
  | { type: SEND_TYPES.LOG; request: LOGGING_LEVELS; payload: string | object }
  
  // KEY requests
  | { type: SEND_TYPES.KEY; request: 'add'; payload: Partial<Key> }
  | { type: SEND_TYPES.KEY; request: 'remove'; payload: { id: string } }
  | { type: SEND_TYPES.KEY; request: 'trigger'; payload: { id: string; mode: EventMode } }
  
  // ACTION requests
  | { type: SEND_TYPES.ACTION; request: 'add'; payload: Partial<Action> }
  | { type: SEND_TYPES.ACTION; request: 'remove'; payload: { id: string } }
  | { type: SEND_TYPES.ACTION; request: 'update'; payload: { id: string; icon: string } }
  | { type: SEND_TYPES.ACTION; request: 'run'; payload: { id: string, source?: string } }
  
  // TASK requests
  | { type: SEND_TYPES.TASK; request: 'init'; payload: { tasks: Record<string, Task> } }
  | { type: SEND_TYPES.TASK; request: 'get'; payload?: { source?: string } }
  | { type: SEND_TYPES.TASK; request: 'update'; payload: { taskId: string; task: Task } }
  | { type: SEND_TYPES.TASK; request: 'delete'; payload: { taskId: string } }
  | { type: SEND_TYPES.TASK; request: 'add'; payload: { task: Task } }
  | { type: SEND_TYPES.TASK; request: 'complete'; payload: { source?: string; taskId: string } }
  | { type: SEND_TYPES.TASK; request: 'restart'; payload: { source?: string, taskId: string } }
  | { type: SEND_TYPES.TASK; request: 'start'; payload: { source?: string, taskId: string } }
  | { type: SEND_TYPES.TASK; request: 'end'; payload: { source?: string, taskId: string } }
  
  // STEP requests
  | { type: SEND_TYPES.STEP; request: 'get'; payload: { source?: string; taskId: string; stepId: string } }
  | { type: SEND_TYPES.STEP; request: 'update'; payload: { taskId: string; stepId: string; step: Step } }
  | { type: SEND_TYPES.STEP; request: 'delete'; payload: { taskId: string; stepId: string } }
  | { type: SEND_TYPES.STEP; request: 'add'; payload: { taskId: string; step: Step } }
  | { type: SEND_TYPES.STEP; request: 'complete'; payload: { taskId: string; stepId: string } }
  | { type: SEND_TYPES.STEP; request: 'restart'; payload: { taskId: string; stepId: string } }
  
  // DEFAULT (fallback)
  | { type: string; request?: unknown; payload?: unknown };
