/**
 * This only exists on the server / client during transit. Apps do not interact with this
 * @package DeskThingServer + DeskThingClient
 */
export type MappingProfile = {
  mapping: ButtonMappingStructure
  actions: Action[] | null;
  keys: Key[] | null;
  profileId: string
};

/**
 * @deprecated - use {@link EventMode} instead
 */
export enum EventFlavor {
  KeyUp,
  KeyDown,
  ScrollUp,
  ScrollDown,
  ScrollLeft,
  ScrollRight,
  SwipeUp,
  SwipeDown,
  SwipeLeft,
  SwipeRight,
  PressShort,
  PressLong,
}

export type Action = {
  /**
   * User Readable name
   */
  name?: string;
  /**
   * User Readable description
   */
  description?: string;
  /**
   * System-level ID
   */
  id: string;
  /**
   * The value to be passed to the action. This is included when the action is triggered
   */
  value?: string;
  /**
   * The options for the value
   */
  value_options?: string[];
  /**
   * Instructions for the user to set the value
   */
  value_instructions?: string;
  /**
   * The name of the icon the action uses - if left blank, the action will use the icon's id
   */
  icon?: string;
  /**
   * The origin of the action
   */
  source?: string;
  /**
   * The version of the action
   */
  version: string;
  /**
   * (depreciated) The version of the server the action is compatible with
   */
  version_code?: number;
  /**
   * Whether or not the app associated with the action is enabled
   */
  enabled: boolean;
  /**
   * Tags associated with the action
   */
  tag?: "nav" | "media" | "basic";
};

/**
 * A reference to an action
 */
export type ActionReference = {
  id: string;
  value?: string;
  enabled?: boolean;
  source: string;
};

export enum EventMode {
  KeyUp,
  KeyDown,
  ScrollUp,
  ScrollDown,
  ScrollLeft,
  ScrollRight,
  SwipeUp,
  SwipeDown,
  SwipeLeft,
  SwipeRight,
  PressShort,
  PressLong,
}

export type Key = {
  id: string; // System-level ID
  source: string; // The origin of the key
  description?: string; // User Readable description
  version: string; //  The version of the key
  enabled: boolean; // Whether or not the app associated with the key is enabled
  version_code?: number; // (depreciated) The version of the server the action is compatible with
  modes: EventMode[]; // The Modes of the key
};

export type KeyReference = {
  id: string;
  /** Whether or not the key is currently enabled */
  enabled?: boolean;
  mode?: EventMode;
  source: string;
};

/**
 * Combination of both a key and an action
 * Is used for storing mapping information
 */
export type Button = {
  /**
   *  The mode of the button
   *  @see {@link EventMode}
   */
  mode: EventMode;
  /** The action ID to be triggered */
  action: ActionReference;
  /** The key ID to be triggered */
  key: KeyReference;
  /** The profile the button is associated with */
  profile?: string;
};

/**
 * Custom button mappings
 * @since 0.11.0
 */
export type ButtonMappingStructure = {
  [actionId: string]: {
    [Mode in EventMode]?: ActionReference;
  };
};

type valueTypes = string | number | boolean;
/** The data from an action being triggered */
export type ActionCallback = {
  id: string;
  value: valueTypes;
};