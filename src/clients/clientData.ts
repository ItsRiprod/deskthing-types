import { App } from "../apps/appData.js";
import {
  ButtonMappingStructure,
  MappingProfile,
} from "../deskthing/mappings.js";

export enum ClientConnectionMethod {
  Unknown,
  LAN,
  Localhost,
  ADB,
  NDIS,
  Bluetooth,
  Internet,
}

export enum ClientPlatformIDs {
  Unknown,
  Desktop,
  Tablet,
  Iphone,
  CarThing,
}

/**
 * @module deskthing/client
 * @description
 * Volume mode enum used for configuring volume control behavior
 * @see {@link ClientPreferences.volume}
 */
export enum VolMode {
  WHEEL = "wheel",
  SLIDER = "slider",
  BAR = "bar",
}

/**
 * @module deskthing/client
 * @description
 * View mode enum used for configuring display states
 * @see {@link ClientPreferences.appTrayState}
 * @see {@link MiniplayerSettings.state}
 */
export enum ViewMode {
  HIDDEN = "hidden",
  PEEK = "peek",
  FULL = "full",
}

export type ClientReference = {
  id: string;
  version?: string;
};

/**
 * @module deskthing/client
 * @description The Client Manifest file interface which holds details such as
 * the name, version, device, ip, etc regarding the current client
 */
export type ClientManifest = {
  /** Meta Information */
  id: string;
  name: string;
  short_name: string;
  description: string;
  reactive: boolean;
  repository: string;
  author: string;
  version: string;
  /**
   * With what versions the client is compatible with
   * @example
   * {
   *  server: '>=0.10.0',
   *  app: '>=0.10.0',
   * }
   */
  compatibility: {
    server: string;
    app: string;
  };
  context: ClientDeviceType;

  /** @depreciated  */
  version_code?: number;
  /** @depreciated  */
  compatible_server?: number[];
};

/**
 * The client object that keeps track of connected clients
 */
export type Client = {
  // static info
  id: string;
  hostname?: string;
  headers?: Record<string, string>;
  userAgent?: string;
  currentProfileID?: string;
  currentConfiguration?: ClientConfigurations;

  currentMappingID?: string;
  currentMapping?: MappingProfile;

  // dynamic info
  currentApp?: string;
  default_view?: string;

  // connection info
  connectionId: string;
  connected: boolean;
  timestamp: number;
  manifest?: ClientManifest;
};

type BaseClientDeviceType = {
  /**The id of the platform (for images) */
  id: ClientPlatformIDs;
  /**The name of the platform */
  name: string;
  /**The ip the client is connected to */
  ip: string;
  /**The port the client is connected to */
  port: number;
};

type ADBClientDeviceType = BaseClientDeviceType & {
  /**The method the device is connected via */
  method: ClientConnectionMethod.ADB;
  /** The ID of the device as seen by ADB  */
  adbId: string;
};

type DefaultClientDeviceType = BaseClientDeviceType & {
  method: Exclude<ClientConnectionMethod, ClientConnectionMethod.ADB>;
};

// Ensure that ADB connections have the adbId in there too
export type ClientDeviceType = ADBClientDeviceType | DefaultClientDeviceType;

/**
 * @module deskthing/client
 * @description
 * The ClientConfigurations object that holds the configurations for the current client
 */
export type ClientConfigurations = {
  profileId: string;
  version: string;
  miniplayer?: MiniplayerSettings;
  appTrayState: ViewMode;
  volume: VolMode;
  theme?: Theme;
  currentView?: App;
  ShowNotifications: boolean;
  Screensaver: App;
  ScreensaverType: ScreensaverSettings;
  onboarding: boolean;
  showPullTabs: boolean;
  saveLocation: boolean;
  use24hour: boolean;
};

/**
 * @module deskthing/client
 * @description
 * Settings for configuring the screensaver behavior and appearance
 */
export interface ScreensaverSettings {
  version: number;
  type: "black" | "logo" | "clock";
}

/**
 * @module deskthing/client
 * @description
 * Settings for configuring the miniplayer appearance and behavior
 */
export interface MiniplayerSettings {
  state: ViewMode;
  visible: boolean;
  position: "bottom" | "left" | "right";
}

/**
 * @module deskthing/client
 * @description
 * Theme configuration settings for customizing the application appearance
 */
export interface Theme {
  primary: string;
  textLight: string;
  textDark: string;
  icons: string;
  background: string;
  scale: "small" | "medium" | "large";
}
