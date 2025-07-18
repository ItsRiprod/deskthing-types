import { DESKTHING_EVENTS, DeskThingToAppData } from "../deskthing/deskthingTransit.js"
import { AppManifest } from "./appData.js"
import { APP_REQUESTS, AppProcessWrapper, AppToDeskThingData, DeskThingProcessData, SendToDeskThingFn } from "./appTransit.js"

/**
 * @deprecated - use {@link AppManifest} instead
 */
export type Manifest = AppManifest;

// Sub-types for the 'get' event
/**@deprecated - don't use this as it will be removed in the future */
export type GetTypes = "data" | "config" | "input" | "settings";

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

/** @deprecated */
export type Response = {
  data: any;
  status: number;
  statusText: string;
  request: string[];
};

/** @deprecated @since 0.11.0 */
export type SysEvents = (
  event: string,
  listener: (...args: any[]) => void
) => void;

/**
 * @deprecated - use {@link DeskThingType} instead
 * @since 0.11.0
 */
export type startData = {
  toServer: ( data: AppToDeskThingData ) => void;
  SysEvents: SysEvents;
};
  


/**
 * @deprecated - use {@link ServerEvent} instead and use it as an Enum
 */
export type IncomingEvent = DESKTHING_EVENTS;

/**
 * Enum representing the different types of events that can be emitted by the DeskThing class.
 * @readonly
 * @since 0.10.4
 * @deprecated use {@link DESKTHING_EVENTS} instead
 * @enum {string}
 */
export type ServerEvent = DESKTHING_EVENTS

/**
 * Events sent from the App Server to the DeskThing Server
 * @deprecated use {@link APP_REQUESTS} instead
 * @since 0.11.0
 * @enum {string}
 */
export type SEND_TYPES = APP_REQUESTS

/**
 * Wrapper for the AppProcess data
 * @deprecated use {@link AppProcessWrapper} instead
 * @since 0.11.0
 */
export type WrappedAppProcessData = AppProcessWrapper

/**
 * Acceptable types of data that get sent to the AppProcess
 * @deprecated use {@link DeskThingProcessData} instead
 * @since 0.11.0
 */
export type ToAppProcess = DeskThingProcessData

/**
 * Acceptable types of data that get sent to the AppProcess
 * @deprecated use {@link AppToDeskThingData} instead
 * @since 0.11.0
 */
export type toServer = SendToDeskThingFn