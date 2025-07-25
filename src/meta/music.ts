export type SongData = SongData11 | SongData10

export enum SongAbilities {
  LIKE = "like",
  SHUFFLE = "shuffle",
  REPEAT = "repeat",
  PLAY = "play",
  PAUSE = "pause",
  STOP = "stop",
  NEXT = "next",
  PREVIOUS = "previous",
  REWIND = "rewind",
  FAST_FORWARD = "fast_forward",
  CHANGE_VOLUME = "change_volume",
  SET_OUTPUT = "set_output",
}

export type SongData11 = {
  /** The version artifact of the songData */
  version: 2
  track_name: string;
  album: string | null;
  artist: string | null;
  playlist: string | null;
  playlist_id: string | null;
  shuffle_state: boolean | null;
  /** @deprecated use 'track' | 'all' | 'off' instead */
  repeat_state: "off" | "all" | "track";
  is_playing: boolean;
  /** The app source of the data payload */
  source: string
  /** An array of possible abilities the source has */
  abilities: SongAbilities[];
  track_duration: number | null;
  track_progress: number | null;
  volume: number;
  thumbnail: string | null;
  device: string | null;
  device_id: string | null;
  id: string | null;
  liked?: boolean;
  color?: ThemeColor;

  /** @deprecated use the tag system instead */
  can_like?: boolean;
  /** @deprecated use the tag system instead */
  can_change_volume?: boolean;
  /** @deprecated use the tag system instead */
  can_set_output?: boolean;
  /** @deprecated use the tag system instead */
  can_fast_forward?: boolean;
  /** @deprecated use the tag system instead */
  can_skip?: boolean;
};

export type SongData10 = {
  /** The version artifact of the songData */
  version?: 1
  album: string | null;
  artist: string | null;
  playlist: string | null;
  playlist_id: string | null;
  track_name: string;
  shuffle_state: boolean | null;
  repeat_state: "context" | "track" | "off";
  is_playing: boolean;
  can_fast_forward: boolean;
  can_skip: boolean;
  can_like: boolean;
  can_change_volume: boolean;
  can_set_output: boolean;
  track_duration: number | null;
  track_progress: number | null;
  volume: number;
  thumbnail: string | null;
  device: string | null;
  id: string | null;
  device_id: string | null;
  liked?: boolean;
  color?: ThemeColor;
};

const abc = {} as SongData

export type ThemeColor = {
  value: number[];
  rgb: string;
  rgba: string;
  hex: string;
  hexa: string;
  isDark: boolean;
  isLight: boolean;
  error?: string;
}

/**
 * Various audio requests that will be sent to an audio source
 */
export enum AUDIO_REQUESTS {
  NEXT = "next",
  PREVIOUS = "previous",
  REWIND = "rewind",
  FAST_FORWARD = "fast_forward",
  PLAY = "play",
  PAUSE = "pause",
  /** @deprecated */
  STOP = "stop",
  SEEK = "seek",
  LIKE = "like",
  SONG = "song",
  VOLUME = "volume",
  REPEAT = "repeat",
  SHUFFLE = "shuffle",
  /** Only used by the server */
  REFRESH = "refresh",
}

/**
 * A specific SongEvent enum for filtering only song-related events
 */
export enum SongEvent {
  /**
   * request: 'song' | 'refresh'
   */
  GET = "get",
  /**
   * request: "next" | "previous" | "fast_forward" | "rewind" | "play" | "pause" | "stop" | "seek" | "like" | "volume" | "repeat"
   */
  SET = "set"
}

/**
 * Event Payloads from the client to the server
 * @since 0.11.0
 */
export type MusicEventPayloads = { app: 'music' } & (
  // payload = force refresh
  | { request: AUDIO_REQUESTS.SONG; type: SongEvent.GET; payload?: boolean }
  | { request: AUDIO_REQUESTS.REFRESH; type: SongEvent.GET; payload?: boolean }
  | { request: AUDIO_REQUESTS.NEXT; type: SongEvent.SET; payload?: string }
  | { request: AUDIO_REQUESTS.PREVIOUS; type: SongEvent.SET; payload?: string }
  | { request: AUDIO_REQUESTS.FAST_FORWARD; type: SongEvent.SET; payload?: number }
  | { request: AUDIO_REQUESTS.REWIND; type: SongEvent.SET; payload?: number }
  | { request: AUDIO_REQUESTS.PLAY; type: SongEvent.SET; payload?: { playlist?: string, id?: string, position?: number } }
  | { request: AUDIO_REQUESTS.PAUSE; type: SongEvent.SET; payload?: undefined }
  | { request: AUDIO_REQUESTS.STOP; type: SongEvent.SET; payload?: undefined }
  | { request: AUDIO_REQUESTS.SEEK; type: SongEvent.SET; payload: number }
  | { request: AUDIO_REQUESTS.LIKE; type: SongEvent.SET; payload: string | boolean }
  | { request: AUDIO_REQUESTS.VOLUME; type: SongEvent.SET; payload: number }
  | { request: AUDIO_REQUESTS.REPEAT; type: SongEvent.SET; payload: "all" | "track" | "off" }
  | { request: AUDIO_REQUESTS.SHUFFLE; type: SongEvent.SET; payload: boolean }
)