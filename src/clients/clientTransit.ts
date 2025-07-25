import { App } from "../apps/appData.js"
import { AppSettings, SettingsType } from "../apps/appSettings.js"
import { KeyReference, Action, ActionReference } from "../deskthing/mappings.js"
import { LOGGING_LEVELS, Log } from "../meta/logging.js"
import { MusicEventPayloads, SongData } from "../meta/music.js"
import { TimePayload } from "../meta/time.js"
import { GenericTransitData } from "../meta/transit.js"
import { ClientConfigurations, ClientManifest } from "./clientData.js"
import { ClientPreferences } from "./clientDeprecated.js"

/**
 * You generally do not have to worry about this
 */
export enum CLIENT_REQUESTS {
  GET = "get",
  ACTION = "action",
  BUTTON = "button",
  KEY = "key",
  LOG = "log",
}

/**
 * You generally do not have to worry about this
 *
 */
export enum DEVICE_CLIENT {
  MANIFEST = "manifest",
  MUSIC = "music",
  SETTINGS = "settings",
  APPS = "apps",
  ACTION = "action",
  TIME = "time",
  ICON = "icon",
}

export type ClientToDeviceCore = {
  app: 'client'
} & (
    | { type: CLIENT_REQUESTS.GET; request: "manifest"; payload?: string }
    | { type: CLIENT_REQUESTS.GET; request: "music"; payload?: string }
    | { type: CLIENT_REQUESTS.GET; request: "settings"; payload?: string }
    | { type: CLIENT_REQUESTS.GET; request: "apps"; payload?: string }
    | { type: CLIENT_REQUESTS.GET; request: "key"; payload: KeyReference }
    | {
        type: CLIENT_REQUESTS.GET;
        request: "action";
        payload: Action | ActionReference;
      }
    | {
        type: CLIENT_REQUESTS.ACTION;
        request?: undefined;
        payload: Action | ActionReference;
      }
    | { type: CLIENT_REQUESTS.KEY; request?: string; payload: KeyReference }
    | {
        type: CLIENT_REQUESTS.LOG;
        request: LOGGING_LEVELS;
        payload?: { message: string; data?: any[] };
      }
  );

/**
 * A generic data type for app-defined unspecified data being sent from the Device (from the app server) to the App Client
 * @param app cannot equal 'client'
 */
export type ClientToDeviceGeneric = {
  app: string;
  type: string;
  payload?: any;
  request?: string;
};

export type ClientToDeviceData = ClientToDeviceCore | MusicEventPayloads

/**
 * All data that is sent from the Device to the Client
 * @package DeskThingClient + App Client
 */
export type DeviceToClientCore = {
  app: 'client';
} & (
    | {
        type: DEVICE_CLIENT.MANIFEST;
        request?: string;
        payload: ClientManifest;
      }
    | { type: DEVICE_CLIENT.MUSIC; request?: string; payload: SongData }
    | {
        type: DEVICE_CLIENT.SETTINGS;
        request?: string;
        payload: AppSettings & { app?: string };
      }
    | { type: DEVICE_CLIENT.APPS; request?: string; payload: App[] }
    | { type: DEVICE_CLIENT.ACTION; request?: string; payload: Action }
    | {
        type: DEVICE_CLIENT.TIME;
        request: "set";
        payload: string | TimePayload;
      }
    | {
        type: DEVICE_CLIENT.ICON;
        request: "set";
        payload: { action: Action; icon: string; source: string };
      }
  );

export enum DEVICE_DESKTHING {
  /** Triggering an action */
  ACTION = "action",
  /** General set payload */
  SET = "set",
  /** General get payload */
  GET = "get",
  /** Request to ping the server */
  PING = "ping",
  /** Response from a ping */
  PONG = "pong",
  /** Logging from the client */
  LOG = "log",
  /** Updates regarding the current view */
  VIEW = "view",
  /** Payloads intended for apps */
  APP_PAYLOAD = "app_payload",
  /** Getters / setters for the current manifest */
  MANIFEST = "manifest",
  /** Getters / setters for the current settings */
  SETTINGS = "settings",
  /** Getters / setters for the current configuration */
  CONFIG = "config",
}

/**
 * Intended for being sent from the DeskThing Server to the Client
 * @deprecated - why are you using this and nto Client2DeskThingData?
 */
export type DeviceToClientData = DeviceToClientCore

/**
 * All data that is being sent from the Device to the DeskThing Server
 * @package DeskThingClient + App Client
 */
export type DeviceToDeskthingData = { deviceId?: string } & (
  | ({ app: "client" } & {
      type: DEVICE_DESKTHING.PING | DEVICE_DESKTHING.PONG;
    })
  | ({ app: "server" } & (
      | {
          type: DEVICE_DESKTHING.SET;
          request: "update_pref_index";
          payload: { app: string; index: number };
        }
      | {
          type: DEVICE_DESKTHING.GET;
          request: "initialData";
        }
      | {
          type: DEVICE_DESKTHING.ACTION;
          request?: string;
          payload: Action | ActionReference;
        }
      | {
          type: DEVICE_DESKTHING.MANIFEST;
          request?: string;
          payload: ClientManifest;
        }
      | { type: DEVICE_DESKTHING.PING | DEVICE_DESKTHING.PONG }
      | { type: DEVICE_DESKTHING.LOG; request?: string; payload: Log }
      | {
          type: DEVICE_DESKTHING.VIEW;
          request?: "change";
          payload: { currentApp: string; previousApp: string };
        }
      | {
          type: DEVICE_DESKTHING.CONFIG;
          request: "set";
          payload: ClientConfigurations
        }
      | {
          type: DEVICE_DESKTHING.CONFIG;
          request: "get";
          /** Profile ID */
          payload?: string
        }
    ))
  | MusicEventPayloads
  | ({ app: string } & (
      | {
          type: DEVICE_DESKTHING.ACTION;
          request?: string;
          payload: Action | ActionReference;
        }
      | {
          type: DEVICE_DESKTHING.SETTINGS;
          request: "update";
          payload: { id: string; value: SettingsType["value"] };
        }
      | {
          type: DEVICE_DESKTHING.SETTINGS;
          request: "set";
          payload: AppSettings;
        }
      | { type: DEVICE_DESKTHING.APP_PAYLOAD; payload?: GenericTransitData }
    ))
);
