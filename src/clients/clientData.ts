import { App } from "../apps/appData.js";
import {
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

export enum PlatformIDs {
  ADB = 'adb',
  WEBSOCKET = 'websocket',
  BLUETOOTH = 'bluetooth',
  MAIN = 'main'
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

export enum ProviderCapabilities {
  CONFIGURE = 0,
  PING = 1,
  COMMUNICATE = 2,
}

/**
 * The client object that keeps track of connected clients
 * For transit - should never be stored anywhere or sent anywhere but the client that owns it
 * @since 0.11.1
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
  identifiers: { [key in PlatformIDs]?: ClientIdentifier }
  uptime?: number;
  manifest?: ClientManifest;

  /** Meta information is not for internal use and should only be for user-displyed info and stats */
  meta: {
    [PlatformIDs.MAIN]?: MAINMetaInfo;
    [PlatformIDs.ADB]?: ADBMetaInfo;
    [PlatformIDs.WEBSOCKET]?: WebsocketMetaInfo
  }

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
      connected: false;
      // The provider with the most capabilities
      primaryProviderId?: string;
      timestamp?: number;
    }
    | {
      connected: true;
      // The provider with the most capabilities
      primaryProviderId: string;
      timestamp: number;
    }
  );

export type ADBMetaInfo = {
  adbId: string;
  offline?: boolean;
  device_version?: string;
  usid?: string;
  mac_bt?: string;
  brightness?: number
  services?: {
    [key: string]: boolean;
  }
}

export type WebsocketMetaInfo = {
  wsId?: string;
  ping?: {
    server?: number;
    socket?: number;
  };
}

export type MAINMetaInfo = {
  default?: string // nothing
}

export type ClientReference = {
  id: string;
  version?: string;
};

/**
 * @module deskthing/client
 * @description The Client Manifest file interface which holds details such as
 * the name, version, device, ip, etc regarding the current client
 * @since 0.11.1
 */
export type ClientManifest = {
  /** Meta Information */
  id: string;
  name: string;
  short_name: string;
  version: string;

  /** Decorative Info */
  description: string;
  reactive: boolean;
  repository: string;
  author: string;

  /** Dynamic Info */
  connectionId?: string;

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

  /** Information regarding the current connection session */
  context: ClientDeviceType;

  meta?: {
    updateAvailable: boolean
    updateVersion: string
  }

  /** @deprecated  */
  version_code?: number;
  /** @deprecated  */
  compatible_server?: number[];
};

/**
 * For use in transit. A tag to be added to a device that will track where it's connected to
 * @since 0.11.1
 */
export type ClientIdentifier = {
  id: string;
  /** What the provider is capable of doing */
  capabilities?: ProviderCapabilities[];
  method?: ClientConnectionMethod;
  providerId: string;
  /** Whether or not the provider is connected */
  connectionState: ConnectionState
  active?: boolean;
};

// Ensure that ADB connections have the adbId in there too
export type ClientDeviceType = {
  /**The id of the platform (for images) */
  id: ClientPlatformIDs;
  /**The name of the platform */
  name: string;
  /**The ip the client is connected to */
  ip: string;
  /**The port the client is connected to */
  port: number;
  method: ClientConnectionMethod
}

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
 * View mode enum used for configuring display states
 * @see {@link ClientPreferences.appTrayState}
 * @see {@link MiniplayerSettings.state}
 */
export enum ViewMode {
  HIDDEN = "hidden",
  PEEK = "peek",
  FULL = "full",
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
