import { Action, ActionReference } from "./actions"
import { SettingsType } from "./settings"

export type TaskList = Record<string, Omit<Task, "source">>

export type Task = {
  id: string
  source: string
  version: string
  available?: boolean
  completed: boolean
  label: string
  started: boolean
  currentStep?: string
  description?: string
  steps: { [key: string]: Step }
}

export type Step = TaskStep | TaskAction | TaskShortcut | TaskSetting | TaskTask | TaskExternal

/**
 * A step in a task that is required to be completed before the task can be resolved.
 */
export interface TaskStep {
  parentId?: string
  id: string
  debug?: boolean
  strict?: boolean
  type: STEP_TYPES.STEP
  label?: string
  instructions?: string
  completed: boolean
  // Debugging steps if it does not work. These will all be resolved immediately once step is resolved
  debugging?: { [key: string]: Omit<Step, 'completed'> }
}

/**
 * A step in a task that requires the user to run an action to complete the task.
 * @params action - The action to run to complete the task
 */
export interface TaskAction extends Omit<TaskStep, 'type'> {
  type: STEP_TYPES.ACTION
  action: Action | string
}

/**
 * A task that the user can complete themselves
 */
export interface TaskExternal extends Omit<TaskStep, 'type'> {
  type: STEP_TYPES.EXTERNAL
  url?: string
}

/**
 * A task for completing another task. Clicking this one will accept the other task if it exists and will not resolve until you complete the other task
 * @params taskId - The id of the task to complete
 */
export interface TaskTask extends Omit<TaskStep, 'type'> {
  type: STEP_TYPES.TASK
  taskId: string
}

/**
 * A step in a task that requires the user to navigate to another part of the application.
 * @params destination - The destination to navigate to
 */
export interface TaskShortcut extends Omit<TaskStep, 'type'> {
  type: STEP_TYPES.SHORTCUT
  destination: string
}

/**
 * A step in a task that requires the user to input data of some kind.
 * All settings here will be added to the app's settings automatically
 * @params setting - The setting to set
 */
export interface TaskSetting extends Omit<TaskStep, 'type'> {
  type: STEP_TYPES.SETTING
  setting: SettingsType | string
}

export enum STEP_TYPES {
  ACTION = 'action',
  SHORTCUT = 'shortcut',
  SETTING = 'setting',
  TASK = 'task',
  EXTERNAL = 'external',
  STEP = 'step'
}