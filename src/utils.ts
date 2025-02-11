import { SEND_TYPES, ServerEvent } from "./app";

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
  updateUrl?: string; // Usually the same as repository
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
}

export type SocketData = {
  app?: string;
  type: string;
  request?: string;
  payload?: any
}

export type DataInterface = {
  [key: string]: any;
}

export type OutgoingData = {
  type: SEND_TYPES;
  request: string;
  payload: any;
};
export type IncomingData = {
  type: ServerEvent;
  request: string;
  payload: any;
};

type valueTypes = string | number | boolean;

export type ActionCallback = {
  id: string;
  value: valueTypes;
};

export type Response = {
  data: any;
  status: number;
  statusText: string;
  request: string[];
};

export type AuthScopes = {
  [key: string]: {
    instructions: string;
    label: string;
    value?: string;
  };
}