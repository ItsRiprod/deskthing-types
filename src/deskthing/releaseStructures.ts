import { PlatformTypes, TagTypes } from "../apps/appData.js"

export type AppReleaseTypes = "single" | "multi" | "external";

export type AppReleaseMeta = {
  id: string;
  version: string; // version of the releases
  type: AppReleaseTypes;
} & (
  | ({
      type: "single";
    } & AppReleaseSingleMeta)
  | {
      type: "multi";
      repository: string;
      releases: AppReleaseSingleMeta[];
    }
  | {
      // Will be ignored if not from the main repository
      type: "external";
      releases: AppReleaseCommunity[];
    }
);

/**
 * This will only exist in the main repository and will be ignored otherwise
 */
export type AppReleaseCommunity = {
  version: string;
  homepage: string;
  id: string;
  label: string;
  /**
   * Whether or not the app has been 'added' by the user
   */
  added: boolean;
  author: string;
  description: string;
  repository: string;
  icon?: string;
};

export type AppReleaseSingleMeta = {
  id: string;
  label: string;
  version: string;
  description: string;
  author: string;
  type: 'single';
  platforms: PlatformTypes[];
  homepage: string;
  repository: string;
  updateUrl: string;
  tags: TagTypes[];
  requiredVersions: {
    server: string;
    client: string;
  };
  icon: string;
  size: number;
  hash: string;
  hashAlgorithm: string;
  // These are to be populated and used by the server
  downloads?: number;
  updatedAt?: number;
  createdAt?: number;
};
export type ClientReleaseMeta = {
  id: string;
  version: string;
  label?: string;
  description?: string;
  author?: string;
  updateUrl: string;
  repository: string;
  icon?: string;
  requiredServer: string;
  size?: number;
  hash: string;
  hashAlgorithm: string;
  /**
   * @see {@link ClientManifest.short_name}
   */
  short_name?: string;
  /**
   * @see {@link ClientManifest.builtFor}
   */
  builtFor?: string;
  // These are to be populated and used by the server
  downloads?: number;
  updatedAt?: number;
  createdAt?: number;
};
