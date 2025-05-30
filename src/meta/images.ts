
/**
 * Represents a reference to an image stored by the DeskThing server
 */
export interface ImageReference {
    /** The application ID that owns this image */
    appId: string;
    /** The file name of the saved image */
    fileName: string;
    /** Original source URL this image was fetched from (for caching) */
    sourceUrl?: string;
    /** Content type of the image */
    contentType?: string;
  }