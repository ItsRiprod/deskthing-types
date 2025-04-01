export type SongData = {
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
  /** @depreciated */
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
  | { request: AUDIO_REQUESTS.REPEAT; type: SongEvent.SET; payload: "context" | "track" | "off" }
  | { request: AUDIO_REQUESTS.SHUFFLE; type: SongEvent.SET; payload: boolean }
)