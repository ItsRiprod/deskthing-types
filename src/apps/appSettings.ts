/**
 * The different types of available settings
 * @since 0.11.0
 */
export enum SETTING_TYPES {
  BOOLEAN = "boolean",
  NUMBER = "number",
  STRING = "string",
  RANGE = "range",
  SELECT = "select",
  MULTISELECT = "multiselect",
  LIST = "list",
  RANKED = "ranked",
  COLOR = "color",
  FILE = "file",
}

export type CommonSetting = {
  disabled?: boolean;
  id?: string
  label: string;
  value: unknown
  source?: string
  description?: string;
}

/**
 * A reference to a specific setting.
 * @since 0.11.0
 */
export type SettingReference = {
  id: string;
  source: string
}

export type SettingsNumber = CommonSetting & {
  type: SETTING_TYPES.NUMBER;
  value: number;
  min: number;
  max: number;
};

export type SettingsBoolean = CommonSetting & {
  type: SETTING_TYPES.BOOLEAN;
  value: boolean;
};

export type SettingsRange = CommonSetting & {
  type: SETTING_TYPES.RANGE;
  value: number;
  min: number;
  max: number;
  step?: number;
};

export type SettingsString = CommonSetting & {
  type: SETTING_TYPES.STRING;
  value: string;
  maxLength?: number;
};

export type SettingsSelect = CommonSetting & {
  type: SETTING_TYPES.SELECT;
  value: string;
  placeholder?: string;
  options: SettingOption[];
};

export type FileType = {
  name: string;
  extensions: string[];
};

export type SettingsFile = CommonSetting & {
  type: SETTING_TYPES.FILE;
  value: string;
  placeholder?: string;
  fileTypes?: FileType[];
};


export type SettingOption = {
  label: string;
  value: string;
};

export type SettingsRanked = CommonSetting & {
  type: SETTING_TYPES.RANKED;
  value: string[];
  options: SettingOption[];
};

export type SettingsList = CommonSetting & {
  type: SETTING_TYPES.LIST;
  value: string[];
  placeholder?: string;
  maxValues?: number;
  orderable?: boolean;
  unique?: boolean;
  options: SettingOption[];
};

export type SettingsMultiSelect = CommonSetting & {
  type: SETTING_TYPES.MULTISELECT;
  value: string[];
  placeholder?: string;
  options: SettingOption[];
};

export type SettingsColor = CommonSetting & {
  type: SETTING_TYPES.COLOR;
  value: string;
};

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
  | ({ type: SETTING_TYPES.FILE } & SettingsFile);
    

export type AppSettingKey = string

export type AppSettings = {
  [K in AppSettingKey]: SettingsType & { id: K }
}
export type InputResponse = {
  [key: string]: string | boolean;
};
