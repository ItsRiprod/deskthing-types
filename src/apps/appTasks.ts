import { Action, ActionReference } from "../deskthing/mappings.js"
import { SettingsType, SettingReference } from "./appSettings.js"

export type TaskList = Record<string, Omit<Task, "source">>;

export type Task = {
  id: string;
  source: string;
  version: string;
  available?: boolean;
  completed: boolean;
  label: string;
  started: boolean;
  currentStep?: string;
  description?: string;
  steps: { [key: string]: Step };
};

export type TaskReference = {
  id: string;
  source: string;
};

export type Step = (
  | TaskStep
  | TaskAction
  | TaskShortcut
  | TaskSetting
  | TaskTask
  | TaskExternal
) & {
  parentId?: string;
  id: string;
  debug?: boolean;
  strict?: boolean;
  source?: string;
  label?: string;
  instructions?: string;
  completed?: boolean;
  debugging?: {
    [key: string]: DebugStep;
  };
};

/**
 * A step in a task that is required to be completed before the task can be resolved.
 */
export type TaskStep = {
  type: STEP_TYPES.STEP;
};

/**
 * A step in a task that requires the user to run an action to complete the task.
 * @params action - The action to run to complete the task
 */
export type TaskAction = {
  type: STEP_TYPES.ACTION;
  action: Action | (ActionReference & { source?: string });
};

/**
 * A task that the user can complete themselves
 */
export type TaskExternal = {
  type: STEP_TYPES.EXTERNAL;
  url?: string;
};

/**
 * A task for completing another task. Clicking this one will accept the other task if it exists and will not resolve until you complete the other task
 * @params taskId - The id of the task to complete
 */
export type TaskTask = {
  type: STEP_TYPES.TASK;
  taskReference?: Omit<TaskReference, 'source'> & { source?: string };
};

/**
 * A step in a task that requires the user to navigate to another part of the application.
 * @params destination - The destination to navigate to
 */
export type TaskShortcut = {
  type: STEP_TYPES.SHORTCUT;
  destination: string;
};

/**
 * A step in a task that requires the user to input data of some kind.
 * All settings here will be added to the app's settings automatically
 * @params setting - The setting to set
 */
export type TaskSetting = {
  type: STEP_TYPES.SETTING;
  setting: SettingsType | (Omit<SettingReference, 'source'> & { source?: string });
};

export type DebugStep = {
  label: string;
  id: string;
  instructions?: string;
  actionId?: string;
  shortcutLoc?: string;
};

export enum STEP_TYPES {
  ACTION = "action",
  SHORTCUT = "shortcut",
  SETTING = "setting",
  TASK = "task",
  EXTERNAL = "external",
  STEP = "step",
}
