import { Action } from "./actions";
import { ServerEvent } from "./app";
import { AppSettings } from "./settings";
import { Step, Task } from "./tasks";

type TasksEventPayload = {
  type: ServerEvent.TASKS;
request: string} 
& (
  | {
      request: 'update';
      payload: Task[];
    }
  | {
      request: 'step';
      payload: Step;
    }
  | {
      request: 'task';
      payload: Task;
    }
);
  
type SettingsEventPayload = {
  type: ServerEvent.SETTINGS;
  request: string
  payload: AppSettings;
}

type ActionEventPayload = {
  type: ServerEvent.ACTION;
  request: string
  payload: Action;
}

type MessageEventPayload = {
  type: ServerEvent.MESSAGE;
  request: string
  payload: string;
}

type DataEventPayload = {
  type: ServerEvent.DATA;
  request: string
  payload: Record<string, string>;
}

type GetEventPayload = {
  type: ServerEvent.GET;
  request: string
  payload: any;
}

type SetEventPayload = {
  type: ServerEvent.SET;
  request: string
  payload: any;
}

type CallbackDataEventPayload = {
  type: ServerEvent.CALLBACK_DATA;
  request: string
  payload: Record<string, string>;
}

type StartEventPayload = {
  type: ServerEvent.START;
  request: undefined
  payload?: undefined;
}

type StopEventPayload = {
  type: ServerEvent.STOP;
  request: undefined
  payload?: undefined;
}

type PurgeEventPayload = {
  type: ServerEvent.PURGE;
  request: undefined
  payload?: undefined;
}

type InputEventPayload = {
  type: ServerEvent.INPUT;
  request: string
  payload: Record<string, string>;
}

type ConfigEventPayload = {
  type: ServerEvent.CONFIG;
  request: string
  payload: any;
}

// Union all event payloads
export type EventPayload<T extends ServerEvent = ServerEvent> = 
  T extends ServerEvent.TASKS ? TasksEventPayload :
  T extends ServerEvent.SETTINGS ? SettingsEventPayload :
  T extends ServerEvent.ACTION ? ActionEventPayload :
  T extends ServerEvent.MESSAGE ? MessageEventPayload :
  T extends ServerEvent.DATA ? DataEventPayload :
  T extends ServerEvent.GET ? GetEventPayload :
  T extends ServerEvent.SET ? SetEventPayload :
  T extends ServerEvent.CALLBACK_DATA ? CallbackDataEventPayload :
  T extends ServerEvent.START ? StartEventPayload :
  T extends ServerEvent.STOP ? StopEventPayload :
  T extends ServerEvent.PURGE ? PurgeEventPayload :
  T extends ServerEvent.INPUT ? InputEventPayload :
  T extends ServerEvent.CONFIG ? ConfigEventPayload :
  any;