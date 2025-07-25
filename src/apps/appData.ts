import { DeskThingToAppData } from "../deskthing/deskthingTransit.js"
import { Key, Action } from "../deskthing/mappings.js"
import { startData } from "./appDeprecated.js"
import { SavedData } from "./appInstance.js"
import { AppSettings } from "./appSettings.js"
import { Task } from "./appTasks.js"
import { AppToDeskThingData } from "./appTransit.js"

/**
 * The saved file structure of apps
 * @since 0.11.0
 */
export interface AppDataInterface {
  version: string;
  settings?: AppSettings;
  data?: SavedData;
  tasks?: Record<string, Task>;
  keys?: Record<string, Key>;
  actions?: Record<string, Action>;
}

/**
 * Different supported platforms for the app
 */
export enum PlatformTypes {
  WINDOWS = "windows",
  LINUX = "linux",
  MAC = "mac",
  MAC64 = "mac64",
  MACARM = "macarm",
  ANDROID = "android",
  IOS = "ios",
  ARM64 = "arm64",
  X64 = "x64",
}

/**
 * The App Manifest interface that determines how apps are saved / loaded
 * @module
 */
export type AppManifest = {
  id: string;
  label?: string;
  requires: string[];
  version: string;
  description?: string;
  author?: string;
  platforms?: PlatformTypes[];
  homepage?: string;
  repository?: string;
  updateUrl?: string; // Usually the same as repository. Should be the direct download URL of the release asset
  tags: TagTypes[];
  requiredVersions: {
    server: string;
    client: string;
  };
  template?: string; // Utility - only for the template to know what template was used
  
  /** Whether or not there is a postinstall script. If there is, the program will run the postinstall script in a new process and any console.log messages will be displayed to the user. Once completed, the application will be run. This step is after the initial download and the user confirmation */
  postinstall?: boolean;
  /** Any justification / reason for the postinstall process happening */
  postinstall_message?: string
  /** Defaults to just using postinstall.js - can be used to specify with or without file extension (default to js)*/
  postinstall_script?: string;

  /**@deprecated */
  version_code?: number;
  /**@deprecated */
  compatible_server?: number[];
  /**@deprecated */
  compatible_client?: number[];
  /**@deprecated */
  isAudioSource?: boolean;
  /**@deprecated */
  isScreenSaver?: boolean;
  /**@deprecated */
  isLocalApp?: boolean;
  /**@deprecated */
  isWebApp?: boolean;
};

/**
 * For the manifest. Different types of tags that can be used to categorize apps
 */
export enum TagTypes {
  AUDIO_SOURCE = "audiosource",
  SCREEN_SAVER = "screensaver",
  UTILITY_ONLY = "utilityOnly",
  WEB_APP_ONLY = "webappOnly",
}

/**
 * The app data type. Holds meta information about the apps including verification state
 * @module deskthing/app
 * @description
 * The App interface that determines how apps are held in the client
 */
export type App = {
  name: string;
  enabled: boolean;
  running: boolean;
  timeStarted: number;
  prefIndex: number;
  meta?: AppMeta;
  manifest?: AppManifest;
};

export type AppReference = {
  id: string;
  version?: string;

  /**
   * Optional reference meta info
   */
  requiredVersions?: {
    server?: string;
    client?: string;
  };
  icon?: string;
  updateUrl?: string;
  updateAvailable?: boolean;
  updateAvailableVersion?: string;
};

/**
 * Meta information about the app to be used by the server when parsing
 */
export interface AppMeta {
  version: string;
  verified: boolean;
  verifiedManifest: boolean;
  updateAvailable: boolean;
  updateChecked: boolean;
  updateAvailableVersion?: string;
}

/**
 * @since 0.11.0
 */
export interface DeskThingClass {
    start?: ({ toServer, SysEvents }: startData) => Promise<Response>;
    toClient?: (data: DeskThingToAppData) => Promise<void>;
    stop?: () => Promise<Response>;
    purge?: () => Promise<Response>;
    getManifest?: () => Promise<Response>;
  }