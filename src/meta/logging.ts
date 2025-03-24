export type Log = {
    level: LOGGING_LEVELS
    message: string
    /** Only logs when debugging is enabled */
    data?: any[]
    source?: string
    function?: string
    domain?: 'app' | 'server' | 'connector' | 'client'
    date?: string
  }
  
  export enum LOGGING_LEVELS { // updated to v0.10.4
    MESSAGE = "message",
    LOG = "log",
    WARN = "warning",
    ERROR = "error",
    DEBUG = "debugging",
    FATAL = "fatal",
  }
  