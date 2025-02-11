/**
 * @depreciated - use {@link ServerEvent} instead and use it as an Enum
 */
export type IncomingEvent = {};

/**
 * Enum representing the different types of events that can be emitted by the DeskThing class.
 * @readonly
 * @since 0.10.4
 * @enum {string}
 */
export enum ServerEvent {
    /**
     * @depreciated - No longer used
     * Raw message event from the server
     */
    MESSAGE = "message",
    /**
     * Data response from getData()
     * Triggered whenever data is updated on the server
     * @remark Does not trigger when settings update. Use {@link ServerEvent.SETTINGS} instead
     * */
    DATA = "data",
    /**
     * Response from get requests (data/config/settings)
     * Only ever triggered by clients
     *
     * Contains requested data from the server based on the get request type
     */
    GET = "get",
    /**
     * Set requests are usually triggered by the client and not the server
     * Use the "request" property to determine the type of data being returned
     */
    SET = "set",
    
    /**
     * Response data from callback functions
     * Usually from oAuth flows
     */
    CALLBACK_DATA = "callback-data",
    /**
     * Server signals app to start
     * Triggered when the server initializes the app
     */
    START = "start",
    /**
     * Server signals app to stop
     * Triggered when the server needs to shutdown the app
     */
    STOP = "stop",
    /**
     * Server signals to purge app data
     * Triggered when all app data should be deleted
     */
    PURGE = "purge",
    /**
     * User input form response data
     * Contains data submitted by users through forms
     */
    INPUT = "input",
    /**
     * Response from user action/interaction
     * Contains data from user-triggered events or interactions
     * @param data.payload is the triggering {@link Action}. Use the action.id to determine the action
     */
    ACTION = "action",
    /**
     * App configuration data (deprecated)
     * Legacy configuration system, use SETTINGS instead
     * @deprecated - Use {@link ServerEvent.SETTINGS} instead
     */
    CONFIG = "config",
    /**
     * App settings data
     * Contains current application settings and preferences
     * Can sometimes be partial. So be warned.
     */
    SETTINGS = "settings",

    /**
     * Updated task data. Will be triggered with the task data
     * Requests include "update", "task", and "step"
     */
    TASKS = "tasks",
  }

  // Events that can be sent back to the server
export enum SEND_TYPES { // v0.10.4.2
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
     * DeskThing.sendData(SEND_TYPES.GET, { request: 'settings' })
     */
    GET = "get",
  
    /**
     * Sets data inside the server for your app that can be retrieved with DeskThing.getData()
     * Data is stored persistently and can be retrieved later.
     *
     * @remarks Use {@link DeskThing.saveData} instead
     *
     * @example
     * DeskThing.sendData(SEND_TYPES.SET, { payload: { key: 'value' }})
     */
    SET = "set",
  
    /**
     * Deletes data inside the server for your app that can be retrieved with DeskThing.getData()
     *
     * @remarks Use {@link DeskThing.deleteSettings} or {@link DeskThing.deleteData} instead
     *
     * @example
     * DeskThing.sendData(SEND_TYPES.DELETE, { payload: ['key1', 'key2'] }, "settings")
     * DeskThing.sendData(SEND_TYPES.DELETE, { payload: ['key1', 'key2'] }, "data")
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
     * DeskThing.sendData(SEND_TYPES.OPEN, { payload: 'https://someurl.com' })
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
     * DeskThing.sendData(SEND_TYPES.SEND, { type: 'someData', payload: 'value' })
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
     * DeskThing.sendData(SEND_TYPES.TOAPP, { request: 'spotify', payload: { type: 'get', data: 'music' }})
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
     * DeskThing.sendData(SEND_TYPES.LOG, { request: 'ERROR', payload: 'Something went wrong' })
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
     * DeskThing.sendData(SEND_TYPES.KEY, { request: 'add', payload: { id: 'myKey', modes: ['default'] }})
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
     * DeskThing.sendData(SEND_TYPES.ACTION, { request: 'add', payload: { id: 'myAction', name: 'My Action' }})
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
     * DeskThing.sendData(SEND_TYPES.TASK, { request: 'add', payload: { id: 'myAction', name: 'My Action' }})
     */
      TASK = 'task',
  
      /**
       * Manages actions in the system.
       * Supports operations: get, update, delete, add, complete, restart, start, and end
       *
       * @remarks
       * It is recommended to use {@link DeskThing.tasks.addStep} instead of sending data directly.
       *
       * @example
       * DeskThing.sendData(SEND_TYPES.ACTION, { request: 'add', payload: { id: 'myAction', name: 'My Action' }})
       */
      STEP = 'step'
  }

// Sub-types for the 'get' event
export type GetTypes = "data" | "config" | "input" | "settings";