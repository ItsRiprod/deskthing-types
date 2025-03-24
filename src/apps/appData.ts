import { DeskThingToAppData } from "../deskthing/deskthingTransit.js"
import { Key, Action } from "../deskthing/mappings.js"
import { startData } from "./appDepreciated.js"
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
  
  /**@depreciated */
  version_code?: number;
  /**@depreciated */
  compatible_server?: number[];
  /**@depreciated */
  compatible_client?: number[];
  /**@depreciated */
  isAudioSource?: boolean;
  /**@depreciated */
  isScreenSaver?: boolean;
  /**@depreciated */
  isLocalApp?: boolean;
  /**@depreciated */
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