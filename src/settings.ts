export enum SETTING_TYPES {
  BOOLEAN = 'boolean',
  NUMBER = 'number',
  STRING = 'string',
  RANGE = 'range',
  SELECT = 'select',
  MULTISELECT = 'multiselect',
  LIST = 'list',
  RANKED = 'ranked',
  COLOR = 'color'
}


export type SettingsNumber = {
  disabled?: boolean
  type: SETTING_TYPES.NUMBER
  value: number
  min: number
  max: number
  label: string
  description?: string
}

export type SettingsBoolean = {
  disabled?: boolean
  type: SETTING_TYPES.BOOLEAN
  value: boolean
  label: string
  description?: string
}

export type SettingsRange = {
  disabled?: boolean
  type: SETTING_TYPES.RANGE
  value: number
  label: string
  min: number
  max: number
  step?: number
  description?: string
}

export type SettingsString = {
  disabled?: boolean
  type: SETTING_TYPES.STRING
  value: string
  label: string
  maxLength?: number
  description?: string
}

export type SettingsSelect = {
  disabled?: boolean
  type: SETTING_TYPES.SELECT
  value: string
  label: string
  description?: string
  placeholder?: string
  options: SettingOption[]
}

export type SettingOption = {
  label: string
  value: string
}

export type SettingsRanked = {
  disabled?: boolean
  type: SETTING_TYPES.RANKED
  value: string[]
  label: string
  description?: string
  options: SettingOption[]
}

/**
 * Not fully implemented yet!
 */
export type SettingsList = {
  disabled?: boolean
  type: SETTING_TYPES.LIST
  value: string[]
  placeholder?: string
  maxValues?: number
  orderable?: boolean
  unique?: boolean
  label: string
  description?: string
  options: SettingOption[]
}

export type SettingsMultiSelect = {
  disabled?: boolean
  type: SETTING_TYPES.MULTISELECT
  value: string[]
  label: string
  description?: string
  placeholder?: string
  options: SettingOption[]
}

export type SettingsColor = {
  disabled?: boolean
  type: SETTING_TYPES.COLOR
  value: string
  label: string
  description?: string
}

export type SettingsType =
  | ({ type: SETTING_TYPES.NUMBER } & SettingsNumber)
  | ({ type: SETTING_TYPES.BOOLEAN } & SettingsBoolean)
  | ({ type: SETTING_TYPES.STRING } & SettingsString)
  | ({ type: SETTING_TYPES.SELECT } & SettingsSelect)
  | ({ type: SETTING_TYPES.MULTISELECT } & SettingsMultiSelect)
  | ({ type: SETTING_TYPES.RANGE } & SettingsRange)
  | ({ type: SETTING_TYPES.RANKED } & SettingsRanked)
  | ({ type: SETTING_TYPES.LIST } & SettingsList)
  | ({ type: SETTING_TYPES.COLOR } & SettingsColor)

export type AppSettings = Record<string, SettingsType>;

export type InputResponse = {
    [key: string]: string | boolean;
  }