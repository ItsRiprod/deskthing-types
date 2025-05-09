import { App } from "../apps/appData.js"
import { DESKTHING_DEVICE, DeskThingToDeviceCore } from "../deskthing/deskthingTransit.js"
import { TimePayload } from "../meta/time.js"
import { GenericTransitData } from "../meta/transit.js"
import { MiniplayerSettings, ViewMode, VolMode, Theme, ScreensaverSettings } from "./clientData.js"
import { DeviceToClientCore, ClientToDeviceGeneric, DEVICE_CLIENT, ClientToDeviceData } from "./clientTransit.js"

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
 * All data that is being sent from the Client/Server to an App's Client
 * @deprecated - use {@link DeviceToClientData} instead
 */
export type ClientData = DeviceToClientCore | ClientToDeviceGeneric;


/**
 * You generally do not have to worry about this
 * @deprecated use {@link ClientToDeviceData} instead
 */
export type ToDeviceDataEvents = ClientTypes
  
  /**
   * You generally do not have to worry about this
   * @since 0.11.0
   * @deprecated use {@link ClientToDeviceData} instead
   */
  export type FromDeviceDataEvents = DEVICE_CLIENT
  
  /**
   * All data that is sent from the DeskThing Server to the Client
   * @since 0.11.0
   * @deprecated use {@link ClientToDeviceData} instead
   * @package DeskThingServer + DeskThingClient
   */
  export type FromDeskthingToDeviceEvents = DESKTHING_DEVICE
    
  /**
   * Data sent from the Device to the Client. Can be used to recreate accurate time data
   * @since 0.11.0
   * @deprecated use {@link TimePayload} instead
   */
  export type FromDeviceTimeData = TimePayload
  
  
  /**
   * A generic data type for app-defined unspecified data being sent from the Device (from the app server) to the App Client
   * @deprecated
   * @param app cannot equal 'client'
   */
  export type FromDeviceDataGeneric = ClientToDeviceGeneric
  
  /**@deprecated use {@link ClientToDeviceData} instead */
  export type ToDeviceData = ClientToDeviceData
  
    /**
   * All data that is sent from the Device to the Client
   * @deprecated use {@link DeviceToClientCore} instead
   * @package DeskThingClient + App Client
   */
  export type FromDeviceDataClient = DeviceToClientCore
    
    /**
     * All data that is being sent from the DeskThing Server to the Client
     * @deprecated use {@link DeskThingToDeviceCore} instead
     */
    export type FromDeskthingToDevice = DeskThingToDeviceCore
    
    /**
     * Intended for being sent from the DeskThing Server to the Client
     * @deprecated use {@link SendToDeviceFromServerPayload} instead
     */
    export type SendToDeviceFromServerPayload<T extends string> = T extends 'client' ? DeviceToClientCore | DeskThingToDeviceCore : GenericTransitData
    
    /**
     * All data that is being sent from the Device to the Client
     * @deprecated use {@link DeviceToClientCore} instead
     */
    export type FromDeviceData = DeviceToClientCore | GenericTransitData