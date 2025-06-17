import { AppReference } from "../apps/appData.js"
import { ClientReference, ClientConfigurations } from "../clients/clientData.js"
import { MappingProfile } from "./mappings.js"

/**
 */
export interface DeskThingProfile {
    // Meta
    id: string
    version: string
    requiredApps?: AppReference[]
    requiredClient?: ClientReference[]
  
    // Server Metadata
    /** @deprecated Not implemented yet */
    trigger_url?: string
    created: Date
    enabled?: boolean
  
    // Client Information
    /** @deprecated */
    clientConfigID?: string
    clientConfig?: ClientConfigurations
    
    // Mapping Information
    /** @deprecated */
    mappingId?: string
    mapping?: MappingProfile
  
    // Vanity
    label?: string
    description?: string
    icon?: string
    colors?: {
      background: string
      text: string
      accent: string
      highlight: string
    }
  }