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

export enum ConnectionState {
  Connected,
  Established,
  Connecting,
  Disconnecting,
  Disconnected,
  Failed,
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
  connectionId?: string;
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

export enum ProviderCapabilities {
  CONFIGURE = 0,
  PING = 1,
  COMMUNICATE = 2,
}

/** For use in transit. A tag to be added to a device that will track where it's connected to */
export type ClientIdentifier = {
  id: string;
  /** What the provider is capable of doing */
  capabilities?: ProviderCapabilities[];
  method?: ClientConnectionMethod;
  providerId: string;
  active?: boolean;
};

/**
 * The client object that keeps track of connected clients
 * For transit - should never be stored anywhere or sent anywhere but the client that owns it
 */
export type Client = {
  /** The primary way of identifying the client */
  clientId: string;

  currentConfiguration?: ClientConfigurations;
  currentMapping?: MappingProfile;

  // dynamic info
  currentApp?: string;
  connectionState: ConnectionState;

  // connection info
  /** A unique ID for the client. Only needed if connected */
  identifiers: Record<string, ClientIdentifier>;
  uptime?: number;
  manifest?: ClientManifest;

  /** @deprecated - use currentMapping.profileId directly */
  default_view?: string;
  /** @deprecated */
  hostname?: string;
  /** @deprecated */
  headers?: Record<string, string>;
  /** @deprecated */
  userAgent?: string;

  /** @deprecated - use currentConfiguration.profileId directly */
  currentProfileID?: string;

  /** @deprecated - use currentMapping.profileId directly */
  currentMappingID?: string;
} & (
  | {
      // The provider with the most capabilities
      primaryProviderId?: string;
      timestamp?: number;
      connected: false;
    }
  | {
      // The provider with the most capabilities
      primaryProviderId: string;
      connected: true;
      timestamp: number;
    }
);

type BaseClientType = {
  /**The id of the platform (for images) */
  id: ClientPlatformIDs;
  /**The name of the platform */
  name: string;
  /**The ip the client is connected to */
  ip: string;
  /**The port the client is connected to */
  port: number;
};

export type ADBClientType = BaseClientType & {
  /**The method the device is connected via */
  method: ClientConnectionMethod.ADB;
  /** The ID of the device as seen by ADB */
  adbId: string;

  offline?: boolean;

  app_version?: string;
  usid?: string;
  mac_bt?: string;
  services?: {
    [key: string]: boolean;
  };
};

export type DefaultClientType = BaseClientType & {
  method: Exclude<ClientConnectionMethod, ClientConnectionMethod.ADB>;
};

// Ensure that ADB connections have the adbId in there too
export type ClientDeviceType = ADBClientType | DefaultClientType;

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
  version: string;
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
