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
        /** script/binary to execute (server-side) */
        script?: string
    }
    [PluginApplications.CLIENT]?: {
        /** path inside the plugin package or absolute path to a Node/Electron bundle */
        module: string
        /** Whether the module should be loaded lazily */
        lazy?: boolean
    }
    [PluginApplications.ADB]?: {
        /** The script location / where to run the script */
        script: string
    }
    [PluginApplications.BLUETOOTH]?: {
        /** Bluetooth implementation pending... */
        tbd?: undefined
    }
}

export type PluginManifest = {
    // meta information
    /** Semver of the plugin */
    version: string
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
    /** Whether or not the plugin is able to be run multiple times in a row */
    isRepeatable?: boolean
    /** Whether or not the plugin has to be re-run every time or if just once is enough */
    persistent?: boolean

    // any additional info

    pkg?: {
        /** path to plugin root on disk (filled by server when installed) */
        root?: string
        integrity?: string
    }

    // Display information
    label: string
    description: string
    purpose: string
}