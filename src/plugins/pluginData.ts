export enum PluginApplications {
    /** Plugins that can be run on the server */
    SERVER = 'server',
    /** Plugins that can be run on ADB-connected devices */
    ADB = 'adb',
    /** Plugins that can be run on any bluetooth device */
    BLUETOOTH = 'bluetooth',
    /** Plugins that can be run on any client */
    CLIENT = 'client',
}

export type PluginEntrypoints = {
    [PluginApplications.SERVER]?: {
        /** fileName/binary to execute (server-side) */
        fileName: string
        /** Whether or not the plugin is able to be run multiple times in a row */
        isRepeatable?: boolean
        /** Whether or not the plugin has to be re-run every time or if just once is enough */
        persistent?: boolean
    }
    [PluginApplications.CLIENT]?: {
        /** path inside the plugin package or absolute path to a Node/Electron bundle */
        fileName: string
        /** Whether the module should be loaded lazily */
        lazy?: boolean
        /** Whether or not the plugin is able to be run multiple times in a row */
        isRepeatable?: boolean
        /** Whether or not the plugin has to be re-run every time or if just once is enough */
        persistent?: boolean
    }
    [PluginApplications.ADB]?: {
        /** The fileName location / where to run the fileName */
        fileName: string
        /** Whether or not the plugin is able to be run multiple times in a row */
        isRepeatable?: boolean
        /** Whether or not the plugin has to be re-run every time or if just once is enough */
        persistent?: boolean
    }
    [PluginApplications.BLUETOOTH]?: {
        /** Bluetooth implementation pending... */
        fileName: string
        /** Whether or not the plugin is able to be run multiple times in a row */
        isRepeatable?: boolean
        /** Whether or not the plugin has to be re-run every time or if just once is enough */
        persistent?: boolean
    }
}

export type PluginManifest = {
    // meta information
    /** Semver of the plugin  */
    version: string
    /** Metadata version of the plugin (for compatibility)  */
    plugin_version: string
    /** Required semver versions for compatibility - missing means DNA */
    required: {
        server?: string
        client?: string
        app?: string
    }
    /** Unique identifier for the plugin */
    id: string

    // Plugin-specific information
    entrypoints?: PluginEntrypoints

    // any additional info

    pkg?: {
        /** path to plugin root on disk (filled by server when installed) */
        root?: string
        integrity?: Record<string, string>
    }

    // Display information
    label: string
    description: string
    purpose: string
}