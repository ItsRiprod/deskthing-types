import { App, AppDataInterface } from "../apps/appData.js";
import { SavedData } from "../apps/appInstance.js";
import { AppSettings } from "../apps/appSettings.js";
import { Task, Step } from "../apps/appTasks.js";
import { ClientConfigurations, Client } from "../clients/clientData.js";
import { SongData, MusicEventPayloads } from "../meta/music.js";
import { TimePayload } from "../meta/time.js";
import { TransitDataExtras, GenericTransitData } from "../meta/transit.js";
import { MappingProfile, Action, ActionReference } from "./mappings.js";

/**
 * All data that is sent from the DeskThing Server to the Client
 * @package DeskThingServer + DeskThingClient
 */
export enum DESKTHING_DEVICE {
  /** Will never be emitted to your client. Only exists on device */
  GLOBAL_SETTINGS = "global_settings",
  /** Will never be emitted to your client. Only exists on device */
  MAPPINGS = "button_mappings",
  /** Will never be emitted to your client. Only exists on device */
  CONFIG = "configuration",
  /** Will never be emitted to your client. Only exists on device */
  GET = "get",
  /** Will never be emitted to your client. Only exists on device */
  ERROR = "error",
  PONG = "pong",
  PING = "ping",
  SETTINGS = "settings",
  APPS = "apps",
  TIME = "time",
  HEARTBEAT = "heartbeat",
  META_DATA = "meta_data",
  MUSIC = "music",
  ICON = "icon",
}

/**
 * All data that is being sent from the DeskThing Server to the Client
 */
export type DeskThingToDeviceCore = { app: 'client' } & (
  | {
      type: DESKTHING_DEVICE.GLOBAL_SETTINGS;
      request?: string;
      payload: Record<string, AppSettings>;
    }
  | {
      type: DESKTHING_DEVICE.MAPPINGS;
      request?: string;
      payload: MappingProfile;
    }
  | {
      type: DESKTHING_DEVICE.CONFIG;
      request: 'set';
      payload: ClientConfigurations;
    }
  | { type: DESKTHING_DEVICE.GET; request: "manifest"; payload?: string }
  | { type: DESKTHING_DEVICE.ERROR; request?: string; payload?: string }
  | { type: DESKTHING_DEVICE.PONG; request?: string; payload?: string }
  | { type: DESKTHING_DEVICE.PING; request?: string; payload?: string }
  | { type: DESKTHING_DEVICE.TIME; request?: string; payload?: TimePayload }
  | {
      type: DESKTHING_DEVICE.SETTINGS;
      request?: string;
      payload?: { settings: AppSettings; app: string }; 
    }
  | { type: DESKTHING_DEVICE.APPS; request?: string; payload?: App[] }
  | { type: DESKTHING_DEVICE.MUSIC; request?: string; payload?: SongData }
  | {
      type: DESKTHING_DEVICE.ICON;
      request: "set";
      payload?: { action: Action; icon: string; source: string };
    }
  | {
      type: DESKTHING_DEVICE.HEARTBEAT;
      request?: string;
      payload?: string;
    }
  | {
      type: DESKTHING_DEVICE.META_DATA;
      request?: string;
      payload: ClientMetaData;
    }    
)

export type ClientMetaData = {
  clientId: string;
  currentConfiguration?: ClientConfigurations;
  currentMapping?: MappingProfile;
};

/**
 * Enum representing the different types of events that can be emitted by the DeskThing class.
 * @readonly
 * @since 0.10.4
 * @enum {string}
 */
export enum DESKTHING_EVENTS {
  /**
   * @deprecated - No longer used
   * Raw message event from the server
   */
  MESSAGE = "message",
  /**
   * Data response from getData()
   * Triggered whenever data is updated on the server
   * @remark Does not trigger when settings update. Use {@link DESKTHING_EVENTS.SETTINGS} instead
   * */
  DATA = "data",
  /**
   * The full appDataInterface object
   * Triggered whenever data is updated on the server
   * */
  APPDATA = "appdata",
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
   * @deprecated - Use {@link DESKTHING_EVENTS.SETTINGS} instead
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

  /**
   * Connection data. Will be triggered when a client connects or disconnects
   * request includes "connected", "disconnected", "opened", "closed"
   */
  CLIENT_STATUS = "client_status",
}

/**
 * Generic event payload
 *
 * Used for events that are sent from the DeskThing Server to the App Server
 * @template T - The type of the payload
 * @param {T} data - The payload data
 * @returns {T} - The payload data
 * @example
 * const data = { type: "hello", request: "world", payload: { name: "John" } } as EventPayload<{ type: "hello"; request: "world"; payload: { name: string } }>;
 * if (data.type === "hello") {
 *   console.log(data.payload.name);
 * }
 *
 * @example
 * const data = { type: "hello", request: "world", payload: { name: "John" } } as EventPayload<{ type: "hello"; request: "world"; payload: { name: string } }>;
 * if (data.type === "hello") {
 *   console.log(data.payload.name);
 * }
 */
export type DeskThingToAppCore = TransitDataExtras & // Tasks events
  (
    | {
        type: DESKTHING_EVENTS.TASKS;
        request: "update";
        payload: Record<string, Task>;
      }
    | { type: DESKTHING_EVENTS.TASKS; request: "step"; payload: Step }
    | { type: DESKTHING_EVENTS.TASKS; request: "task"; payload: Task }

    // Client status events
    | {
        type: DESKTHING_EVENTS.CLIENT_STATUS;
        request: "connected";
        payload: Client;
      }
    | {
        type: DESKTHING_EVENTS.CLIENT_STATUS;
        request: "connections";
        payload: Client[];
      }
    | {
        type: DESKTHING_EVENTS.CLIENT_STATUS;
        request: "disconnected";
        payload: string;
      }
    | {
        type: DESKTHING_EVENTS.CLIENT_STATUS;
        request: "opened";
        payload: Client;
      }
    | {
        type: DESKTHING_EVENTS.CLIENT_STATUS;
        request: "closed";
        payload: Client;
      }

    // Settings events
    | {
        type: DESKTHING_EVENTS.SETTINGS;
        request?: string;
        payload: AppSettings;
      }

    // Action events
    | {
        type: DESKTHING_EVENTS.ACTION;
        request: string;
        payload: Action | ActionReference;
      }

    // Message events
    | { type: DESKTHING_EVENTS.MESSAGE; request: string; payload: string }

    // Data events
    | { type: DESKTHING_EVENTS.DATA; request?: string; payload: SavedData }

    // AppData events
    | {
        type: DESKTHING_EVENTS.APPDATA;
        request?: string;
        payload: AppDataInterface;
      }

    // Callback events
    | {
        type: DESKTHING_EVENTS.CALLBACK_DATA;
        request?: string;
        payload: string;
      }

    // Start events
    | { type: DESKTHING_EVENTS.START; request?: string; payload?: string }

    // Stop events
    | { type: DESKTHING_EVENTS.STOP; request?: string; payload?: string }

    // Purge events
    | { type: DESKTHING_EVENTS.PURGE; request?: string; payload?: string }

    // Input events
    | {
        type: DESKTHING_EVENTS.INPUT;
        request: string;
        payload: Record<string, string>;
      }

    // Config events
    | { type: DESKTHING_EVENTS.CONFIG; request?: string; payload: any }
    | MusicEventPayloads
  );

export type DeskThingToAppData<T extends GenericTransitData = never> =
  | DeskThingToAppCore
  | T;

export type DeskThingToDeviceData<T extends GenericTransitData = never> =
  | DeskThingToDeviceCore
  | T;
