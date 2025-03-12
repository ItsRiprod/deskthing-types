import { SEND_TYPES, ServerEvent } from "./app.js";
import { EventPayload } from "./payloads/toClient.js";
import { ToServerData } from "./payloads/toServer.js"

export enum LOGGING_LEVELS { // updated to v0.10.4
  MESSAGE = "message",
  LOG = "log",
  WARN = "warning",
  ERROR = "error",
  DEBUG = "debugging",
  FATAL = "fatal",
}

/**
 * @deprecated - use {@link AppManifest} instead
 */
export type Manifest = AppManifest;

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
 * For the manifest. Different types of tags that can be used to categorize apps
 */
export enum TagTypes {
  AUDIO_SOURCE = "audiosource",
  SCREEN_SAVER = "screensaver",
  UTILITY_ONLY = "utilityOnly",
  WEB_APP_ONLY = "webappOnly",
}

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
  version_code?: number; // deprecated
  compatible_server?: number[]; // deprecated
  compatible_client?: number[]; // deprecated
  isAudioSource?: boolean; // deprecated
  isScreenSaver?: boolean; // deprecated
  isLocalApp?: boolean; // deprecated
  isWebApp?: boolean; // deprecated
};

export type SocketData = {
  app?: string;
  type: string;
  request?: string;
  payload?: any;
};

/**
 * @deprecated - use {@link EventPayload} instead for more specific payloads
 */
export type ToAppData = {
  type: ServerEvent;
  request?: string;
  payload: any;
};

type valueTypes = string | number | boolean;

export type ActionCallback = {
  id: string;
  value: valueTypes;
};

/**
 * @deprecated - use Tasks instead
 */
export type AuthScopes = {
  [key: string]: {
    instructions: string;
    label: string;
    value?: string;
  };
};

export type Response = {
  data: any;
  status: number;
  statusText: string;
  request: string[];
};

export type toServer = (appData: ToServerData) => void;
export type SysEvents = (
  event: string,
  listener: (...args: any[]) => void
) => void;

export type startData = {
  toServer: toServer;
  SysEvents: SysEvents;
};

export interface DeskThingType {
  start: ({ toServer, SysEvents }: startData) => Promise<Response>;
  toClient: (data: EventPayload) => Promise<void>;
  stop: () => Promise<Response>;
  purge: () => Promise<Response>;
  getManifest: () => Promise<Response>;
}

export type AppReleaseTypes = "single" | "multi" | "external";

export type AppReleaseMeta = {
  id: string;
  version: string; // version of the releases
  type: AppReleaseTypes;
} & (
  | ({
      type: "single";
    } & AppReleaseSingleMeta)
  | {
      type: "multi";
      repository: string;
      releases: AppReleaseSingleMeta[];
    }
  | {
      // Will be ignored if not from the main repository
      type: "external";
      releases: AppReleaseCommunity[];
    }
);

/**
 * This will only exist in the main repository and will be ignored otherwise
 */
export type AppReleaseCommunity = {
  version: string;
  homepage: string;
  id: string;
  label: string;
  /**
   * Whether or not the app has been 'added' by the user
   */
  added: boolean;
  author: string;
  description: string;
  repository: string;
  icon?: string;
};

export type AppReleaseSingleMeta = {
  id: string;
  label: string;
  version: string;
  description: string;
  author: string;
  type: 'single';
  platforms: PlatformTypes[];
  homepage: string;
  repository: string;
  updateUrl: string;
  tags: TagTypes[];
  requiredVersions: {
    server: string;
    client: string;
  };
  icon: string;
  size: number;
  hash: string;
  hashAlgorithm: string;
  // These are to be populated and used by the server
  downloads?: number;
  updatedAt?: number;
  createdAt?: number;
};
export type ClientReleaseMeta = {
  id: string;
  version: string;
  label?: string;
  description?: string;
  author?: string;
  updateUrl: string;
  repository: string;
  icon?: string;
  requiredServer: string;
  size?: number;
  hash: string;
  hashAlgorithm: string;
  /**
   * @see {@link ClientManifest.short_name}
   */
  short_name?: string;
  /**
   * @see {@link ClientManifest.builtFor}
   */
  builtFor?: string;
  // These are to be populated and used by the server
  downloads?: number;
  updatedAt?: number;
  createdAt?: number;
};


/**
 * Represents a reference to an image stored by the DeskThing server
 */
export interface ImageReference {
  /** The application ID that owns this image */
  appId: string;
  /** The file name of the saved image */
  fileName: string;
  /** Original source URL this image was fetched from (for caching) */
  sourceUrl?: string;
  /** Content type of the image */
  contentType?: string;
}
