import { EventMode } from "./actions";
import { AppManifest } from "./utils";

/**
 * @module deskthing/client
 * @description The Client Manifest which holds details such as
 * the name, version, device, ip, etc regarding the current client
 */
export interface ClientManifest {
  name: string;
  id: string;
  short_name: string;
  description: string;
  builtFor: string;
  reactive: boolean;
  author: string;
  version: string;
  version_code: number;
  compatible_server: number[];
  port: number;
  ip: string;
  device_type: { id: number; name: string };
}

/**
 * @module deskthing/client
 * @description
 * The ClientPreferences object that holds the preferences for the current client
 * @deprecated This will be removed in a future version in favor of Profiles
 * 
 */
export interface ClientPreferences {
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
}

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

/**
 * @module deskthing/client
 * @description
 * The App interface that determines how apps are held in the client
 */
export type App = {
  name: string;
  enabled: boolean;
  running: boolean;
  prefIndex: number;
  manifest?: AppManifest;
};

/**
 * @module deskthing/client
 * @description
 * The interface used for running functions like
 * ```ts
 * DeskThing.triggerKey(key: KeyTrigger)
 * ```
 */
export interface KeyTrigger {
  key: string;
  mode: EventMode;
  source?: string;
}
