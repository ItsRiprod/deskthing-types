import { DeskThingToAppData } from "../deskthing/deskthingTransit.js"
import { Key, EventMode, Action } from "../deskthing/mappings.js"
import { AgentMessage } from "../deskthing/voiceAgent.js"
import { Log, LOGGING_LEVELS } from "../meta/logging.js"
import { SongData } from "../meta/music.js"
import { NotificationMessage } from "../meta/notifications.js"
import { GenericTransitData } from "../meta/transit.js"
import { AppDataInterface } from "./appData.js"
import { AuthScopes } from "./appDeprecated.js"
import { SavedData } from "./appInstance.js"
import { AppSettings, SettingOption } from "./appSettings.js"
import { Task, Step } from "./appTasks.js"


/**
 * Events sent from the App Server to the DeskThing Server
 */
export enum APP_REQUESTS { // v0.10.4.2
  /**
   * Default handler for unknown or unspecified data types.
   * Will log a warning message about the unknown data type.
   */
  DEFAULT = "default",

  /**
   * Retrieves data from the server. Supports multiple request types:
   * - 'data': Gets app-specific stored data
   * - 'config': Gets configuration (deprecated)
   * - 'settings': Gets application settings
   * - 'input': Requests user input via a form
   *
   * @remarks Use {@link DeskThing.getData}, {@link DeskThing.getConfig}, {@link DeskThing.getSettings}, or {@link DeskThing.getUserInput} instead
   *
   * @example
   * DeskThing.sendData(APP_REQUESTS.GET, { request: 'settings' })
   */
  GET = "get",

  /**
   * Sets data inside the server for your app that can be retrieved with DeskThing.getData()
   * Data is stored persistently and can be retrieved later.
   *
   * @remarks Use {@link DeskThing.saveData} instead
   *
   * @example
   * DeskThing.sendData(APP_REQUESTS.SET, { payload: { key: 'value' }})
   */
  SET = "set",

  /**
   * Deletes data inside the server for your app that can be retrieved with DeskThing.getData()
   *
   * @remarks Use {@link DeskThing.deleteSettings} or {@link DeskThing.deleteData} instead
   *
   * @example
   * DeskThing.sendData(APP_REQUESTS.DELETE, { payload: ['key1', 'key2'] }, "settings")
   * DeskThing.sendData(APP_REQUESTS.DELETE, { payload: ['key1', 'key2'] }, "data")
   */
  DELETE = "delete",

  /**
   * Opens a URL to a specific address on the server.
   * This gets around any CORS issues that may occur by opening in a new window.
   * Typically used for authentication flows.
   *
   * @remarks Use {@link DeskThing.openUrl} instead
   *
   * @example
   * DeskThing.sendData(APP_REQUESTS.OPEN, { payload: 'https://someurl.com' })
   */
  OPEN = "open",

  /**
   * Sends data to the front end client.
   * Can target specific client components or send general messages.
   * Supports sending to both the main client and specific app clients.
   *
   * @remarks Use {@link DeskThing.send} instead
   *
   * @example
   * DeskThing.sendData(APP_REQUESTS.SEND, { type: 'someData', payload: 'value' })
   *
   * @example
   * DeskThing.send({ type: 'someData', payload: 'value', clientId: '18274923402' })
   */
  SEND = "send",

  /**
   * Sends data to another app in the system.
   * Allows inter-app communication by specifying target app and payload.
   * Messages are logged for debugging purposes.
   *
   * @remarks Use {@link DeskThing.sendDataToOtherApp} instead
   *
   * @example
   * DeskThing.sendData(APP_REQUESTS.TOAPP, { request: 'spotify', payload: { type: 'get', data: 'music' }})
   */
  TOAPP = "toApp",

  /**
   * Logs messages to the system logger.
   * Supports multiple log levels: DEBUG, ERROR, FATAL, LOGGING, MESSAGE, WARNING
   * Messages are tagged with the source app name.
   *
   * @remarks Use {@link DeskThing.log} instead
   *
   * @example
   * DeskThing.sendData(APP_REQUESTS.LOG, { request: 'ERROR', payload: 'Something went wrong' })
   */
  LOG = "log",

  /**
   * Manages key mappings in the system.
   * Supports operations: add, remove, trigger
   * Keys can have multiple modes and are associated with specific apps.
   *
   * @remarks Use {@link DeskThing.registerKeyObject} instead
   *
   * @example
   * DeskThing.sendData(APP_REQUESTS.KEY, { request: 'add', payload: { id: 'myKey', modes: ['default'] }})
   */
  KEY = "key",

  /**
   * Manages actions in the system.
   * Supports operations: add, remove, update, run
   * Actions can have values, icons, and version information.
   *
   * @remarks
   * It is recommended to use {@link DeskThing.registerAction} instead of sending data directly.
   *
   * @example
   * DeskThing.sendData(APP_REQUESTS.ACTION, { request: 'add', payload: { id: 'myAction', name: 'My Action' }})
   */
  ACTION = "action",

  /**
   * Manages tasks in the system.
   * Supports operations: get, update, delete, add, complete, restart, start, and end
   *
   * @remarks
   * It is recommended to use {@link DeskThing.tasks.addTask} instead of sending data directly.
   *
   * @example
   * DeskThing.sendData(APP_REQUESTS.TASK, { request: 'add', payload: { id: 'myAction', name: 'My Action' }})
   */
  TASK = "task",

  /**
   * Manages actions in the system.
   * Supports operations: get, update, delete, add, complete, restart, start, and end
   *
   * @remarks
   * It is recommended to use {@link DeskThing.tasks.addStep} instead of sending data directly.
   *
   * @example
   * DeskThing.sendData(APP_REQUESTS.ACTION, { request: 'add', payload: { id: 'myAction', name: 'My Action' }})
   */
  STEP = "step",

  /**
   * Sends song data to the server
   * Payload should be type {@link SongData}
   *
   * @example
   * DeskThing.send({ type: APP_REQUESTS.SONG, request: 'add', payload: { id: 'mySong', title: 'My Song', artist: 'Artist Name' }})
   */
  SONG = "song",

  /**
   * Sends a notification to the server
   * Payload should be type {@link NotificationMessage}
   *
   * @example
   * const result = await DeskThing.once({
   *        type: APP_REQUESTS.MESSAGE,
   *        request: 'send',
   *        payload: {
   *            id: 'myMessage',
   *            type: "text",
   *            title: 'My Message',
   *            description: 'This is a message',
   *            link: 'https://example.com'
   *        }
   *    }, { type: APP_REQUESTS.MESSAGE, request: 'myMessage' }
   * )
   * 
   * console.log(result.payload.response) // will log the response from the user
   */
  MESSAGE = "message",


  /**
   * Added in v0.11.17 and requires having the AGENT flag and being configured as an agent
   * 
   * Used to send messages to the voice agent system
   * Payload should be type {@link AgentMessage}
   * 
   */
  AGENT = "agent",

  /**
   * All setting-related CRUD operations. The rest are now deprecated in favor of using the AppSettings API
   */
  SETTINGS = "settings"
}

export type AppProcessWrapper = {
  version: string;
};

/**
 * Data Transit Format for data being sent from an App Process
 * @since 0.11.0
 */
export type AppProcessData<T extends GenericTransitData = never> = AppProcessWrapper &
  (
    | { type: "data"; payload: AppToDeskThingData | T }
    | { type: "binary"; payload: {
      payload: ArrayBuffer
      clientId?: string
      app: string
    } }
    | { type: "started" }
    | { type: "stopped"; reason?: string }
    | { type: "server:error"; payload: Error }
    | { type: "server:log"; payload: Log }
  );

/**
 * Acceptable types of data that get sent to the AppProcess
 * @since 0.11.0
 */
export type DeskThingProcessData =
  | { type: "data"; payload: DeskThingToAppData }
  | { type: "start" }
  | { type: "stop" }
  | { type: "purge" };

export type SendToDeskThingFn = (appData: AppToDeskThingData) => void;

/**
 * Data sent from the App Server to the DeskThing Server
 */
export type AppToDeskThingData = {
  legacy?: boolean;
  version?: string;
  source?: string
} & // GET requests
  (| { type: APP_REQUESTS.GET; request: "data"; payload?: never }
    | { type: APP_REQUESTS.GET; request: "appData"; payload?: never }
    | { type: APP_REQUESTS.GET; request: "config"; payload?: never }
    | { type: APP_REQUESTS.GET; request: "settings"; payload?: never }
    | { type: APP_REQUESTS.GET; request: "input"; payload: AuthScopes }
    | { type: APP_REQUESTS.GET; request: "connections"; payload?: never }

    // SET requests
    | { type: APP_REQUESTS.SET; request: "settings"; payload: AppSettings }
    | { type: APP_REQUESTS.SET; request: "settings-init"; payload: AppSettings }
    | { type: APP_REQUESTS.SET; request: "data"; payload: SavedData }
    | { type: APP_REQUESTS.SET; request: "appData"; payload: AppDataInterface }
    
    // DELETE requests
    | { type: APP_REQUESTS.DELETE; request: "settings"; payload: string | string[] }
    | { type: APP_REQUESTS.DELETE; request: "data"; payload: string | string[] }
    
    // Setting operations
    | { type: APP_REQUESTS.SETTINGS; request: "init"; payload: AppSettings }
    | { type: APP_REQUESTS.SETTINGS; request: "set"; payload: AppSettings }
    | { type: APP_REQUESTS.SETTINGS; request: "get"; payload?: never }
    | { type: APP_REQUESTS.SETTINGS; request: "set-value"; payload: { key: string; value: any } }
    | { type: APP_REQUESTS.SETTINGS; request: "set-options"; payload: { key: string; value: SettingOption[] } }
    | { type: APP_REQUESTS.SETTINGS; request: "delete"; payload: string | string[] }    

    // OPEN requests
    | { type: APP_REQUESTS.OPEN; request?: string; payload: string }

    // SEND requests (to client)
    | { type: APP_REQUESTS.SEND; request: 'json'; payload: GenericTransitData }
    | { type: APP_REQUESTS.SEND; request: 'binary'; payload: ArrayBuffer }

    // TOAPP requests
    | { type: APP_REQUESTS.TOAPP; request: string; payload: any }

    // LOG requests
    | { type: APP_REQUESTS.LOG; request: LOGGING_LEVELS; payload: string | object }

    // KEY requests
    | { type: APP_REQUESTS.KEY; request: "add"; payload: Partial<Key> }
    | { type: APP_REQUESTS.KEY; request: "remove"; payload: { id: string } }
    | {
      type: APP_REQUESTS.KEY;
      request: "trigger";
      payload: { id: string; mode: EventMode };
    }

    // ACTION requests
    | { type: APP_REQUESTS.ACTION; request: "add"; payload: Partial<Action> }
    | { type: APP_REQUESTS.ACTION; request: "remove"; payload: { id: string } }
    | {
      type: APP_REQUESTS.ACTION;
      request: "update";
      payload: { id: string; icon: string };
    }
    | {
      type: APP_REQUESTS.ACTION;
      request: "run";
      payload: { id: string; source?: string };
    }
    | {
      type: APP_REQUESTS.ACTION;
      request: "init";
      payload: Action[];
    }

    // TASK requests
    | {
      type: APP_REQUESTS.TASK;
      request: "init";
      payload: { tasks: Record<string, Task> };
    }
    | { type: APP_REQUESTS.TASK; request: "get"; payload?: { source?: string } }
    | {
      type: APP_REQUESTS.TASK;
      request: "update";
      payload: { taskId: string; task: Partial<Task> };
    }
    | { type: APP_REQUESTS.TASK; request: "delete"; payload: { taskId: string } }
    | { type: APP_REQUESTS.TASK; request: "add"; payload: { task: Task } }
    | {
      type: APP_REQUESTS.TASK;
      request: "complete";
      payload: { source?: string; taskId: string };
    }
    | {
      type: APP_REQUESTS.TASK;
      request: "restart";
      payload: { source?: string; taskId: string };
    }
    | {
      type: APP_REQUESTS.TASK;
      request: "start";
      payload: { source?: string; taskId: string };
    }
    | {
      type: APP_REQUESTS.TASK;
      request: "end";
      payload: { source?: string; taskId: string };
    }

    // STEP requests
    | {
      type: APP_REQUESTS.STEP;
      request: "get";
      payload: { source?: string; taskId: string; stepId: string };
    }
    | {
      type: APP_REQUESTS.STEP;
      request: "update";
      payload: { taskId: string; stepId: string; step: Partial<Step> };
    }
    | {
      type: APP_REQUESTS.STEP;
      request: "delete";
      payload: { taskId: string; stepId: string };
    }
    | {
      type: APP_REQUESTS.STEP;
      request: "add";
      payload: { taskId: string; step: Step };
    }
    | {
      type: APP_REQUESTS.STEP;
      request: "complete";
      payload: { taskId: string; stepId: string };
    }
    | {
      type: APP_REQUESTS.STEP;
      request: "restart";
      payload: { taskId: string; stepId: string };
    }
    
    // Music Data
    | { type: APP_REQUESTS.SONG; request?: string; payload: SongData; app?: "client" }
    | { type: APP_REQUESTS.MESSAGE; request: 'send'; payload: NotificationMessage }
    | {
      type: APP_REQUESTS.AGENT;
      request: "response";
      payload: AgentMessage & { clientId: string }; // assert that you need the client id to be present
    }
    | {
      type: APP_REQUESTS.AGENT;
      request: "token";
      /** The token that should be appended */
      payload: { messageId: string; token: string; clientId: string }; // assert that you need the client id to be present
    }
    | {
      type: APP_REQUESTS.AGENT;
      request: "disconnect";
      payload?: string;
    }
    | {
      type: APP_REQUESTS.AGENT;
      request: "context";
      payload?: (AgentMessage & { clientId: string })[]; // this should delete the existing client context and replace with this
    }
  );
