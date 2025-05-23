export enum TransitSources {
  /** App Client */
  CLIENT = "client",
  /** App server */
  APP = "app",
  /** DeskThing Device */
  DEVICE = "device",
  /** DeskThing Server */
  DESKTHING = "deskthing",
  /** App Client Connector */
  CONCLIENT = "conclient",
  /** App Server Connector */
  CONSERVER = "conserver",
}

export type TransitData<T extends string, R extends string, P> = {
  type: T;
  request?: R;
  payload?: P;
};

export type TransitDataExtras = {

  // extras
  version?: string;
  app?: string
  clientId?: string
};

export type GenericTransitData = TransitDataExtras & TransitData<string, string, any>;

/**
 * Naming conventions should go 
 * 
 * Source2SourcePayload
 * Source2SourceType
 */
