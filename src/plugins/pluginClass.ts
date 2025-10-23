/** Server plugins are not yet implemented */
export interface ServerPluginInterface {
    install(): Promise<void>;
}

export type ADBPluginDetails = {
    /** The directory at the root of this plugin */
    pluginDir: string;
    /* The ADB device ID this plugin is being installed for */
    adbId: string;
    /* The client ID this plugin is being installed for */
    clientId: string;
    /* The client version this plugin is being installed for */
    clientVersion: string;
}

/** The interface for ADB plugins. Documentation is pending for this service/app */
export interface ADBPluginInterface {
    install(details: ADBPluginDetails): Promise<void>;
    uninstall(details: ADBPluginDetails): Promise<void>;
}

export type ClientPluginMountOptions = {
    /** The directory at the root of this plugin (if available in the web build) */
    pluginDir?: string;
    /** Optional client identifiers/metadata */
    clientId?: string;
    clientVersion?: string;
    adbId?: string;
}

/**
 * Interface for a client-side plugin that will be imported via ESM and mounted
 * into a web context. Implementations should render into the provided root element.
 */
export interface ClientPluginInterface {
    /**
     * Called when the host mounts the plugin into the DOM. The plugin should
     * render itself inside `root`. Return a Promise if asynchronous work is required.
     */
    mount(root: HTMLElement, options?: ClientPluginMountOptions): void | Promise<void>;

    /**
     * Optional cleanup called when the host unmounts the plugin.
     */
    unmount?(root?: HTMLElement): void | Promise<void>;

    /** Optional metadata the host can read without instantiating the plugin */
    name?: string;
    version?: string;
}

/** Typical ESM module shape the host will import */
export type ClientPluginModule = {
    default: ClientPluginInterface;
}