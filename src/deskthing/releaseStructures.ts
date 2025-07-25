import { AppManifest, PlatformTypes, TagTypes } from "../apps/appData.js"
import { ClientManifest } from "../clients/clientData.js";

export type AppReleaseTypes = "single" | "multi" | "external";

/**
 * @deprecated
 */
export type AppReleaseMeta = {
  id: string;
  version: string; // version of the release
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
 * @deprecated
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

/**
 * @deprecated
 */
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

/**
 * @deprecated
 */
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

export type GitDownloadUrl = `https://github.com/${string}/${string}/releases/download/${string}/${string}` | `https://gitlab.com/${string}/${string}/-/releases/${string}/${string}`;

export type GitRepoUrl = `https://github.com/${string}/${string}` | `https://api.github.com/repos/${string}/${string}` | `git@github.com:${string}/${string}.git` | `https://gitlab.com/${string}/${string}`;


/** Helper type for the latest release structure enforcement for migration typechecking */
export type MultiReleaseJSONLatest = MultiReleaseJSON118

/** Helper type for the latest release structure enforcement for migration typechecking */
export type ClientLatestJSONLatest = ClientLatestJSON118

/** Helper type for the latest release structure enforcement for migration typechecking */
export type AppLatestJSONLatest = AppLatestJSON118


export type MultiReleaseJSON = MultiReleaseJSON118

export type ClientLatestJSON = ClientLatestJSON118

export type AppLatestJSON = AppLatestJSON118

export type ReleaseMETAJson = {
  /** enforces that it must be a github repo url */
  repository: GitRepoUrl
  updateUrl: string
  downloads: number
  size: number
  updatedAt: number
  createdAt: number

  // These are used from within DeskThing to keep track of the releases
  isInstalled?: boolean
}

/** Compatibility-driven types based on versioning descrimination */

type MultiReleaseJSON118 = {
  meta_version: '0.11.8'
  meta_type: 'multi'
  /** enforces that it must be a github repo url */
  repository: GitRepoUrl
  /** An array of .json files that can be pulled to get app-specific inforamtion (either ClientLatestJSON or AppLatestJSON) */
  fileIds?: string[]
  repositories?: GitRepoUrl[] // an optional array of repository URLs that point to "community apps" that can optionally be added
}

type ClientLatestJSON118 = ReleaseMETAJson & {
  meta_version: '0.11.8'
  meta_type: 'client'
  clientManifest: ClientManifest
  /** Expected: base64 encoded image of the icon */
  icon?: string
  /** Security fields */
  hash?: string;
  hashAlgorithm?: string;
}

type AppLatestJSON118 = ReleaseMETAJson & {
  meta_version: '0.11.8'
  meta_type: 'app'
  /** Expected: base64 encoded image of the icon */
  icon?: string
  appManifest: AppManifest
  /** Security fields */
  hash?: string;
  hashAlgorithm?: string;
}