import { AppToDeskThingData } from "../apps/appTransit.js"
import { GenericTransitData } from "../meta/transit.js"
import { DESKTHING_EVENTS } from "./deskthingTransit.js"
import { EventMode, ActionReference, MappingProfile } from "./mappings.js"

/**
 * This only exists on the server / client. Apps do not interact with this
 * @package DeskThingServer + DeskThingClient
 * @deprecated use {@link DeskThingProfile} or {@link MappingProfile} instead
 */
export interface ButtonMapping extends Profile {
  mapping: {
    [key: string]: {
      [Mode in EventMode]?: ActionReference;
    };
  };
}

/**
 * This only exists on the server / client. Apps do not interact with this
 * @package DeskThingServer + DeskThingClient
 * @deprecated use {@link MappingProfile} instead
 */
export type CombinedButtonMapping = MappingProfile

/**
 * This only exists on the server / client. Apps do not interact with this
 * @package DeskThingServer + DeskThingClient
 * @deprecated use {@link DeskThingProfile} instead
 */
export type Profile = {
  version: string;
  version_code: number;
  id: string;
  name: string;
  description?: string;
  trigger_app?: string;
  extends?: string;
};

/** @deprecated - use a more specific type */
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
  type: DESKTHING_EVENTS;
  request?: string;
  payload: any;
};

/**
 * @deprecated - use {@link TransitData} instead
 */
export type BaseEventPayload = GenericTransitData

/**
 * @deprecated - use {@link AppToDeskThingData} instead
 */
export type EventPayload = AppToDeskThingData