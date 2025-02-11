
export type SettingsNumber = {
  value: number;
  type: "number";
  min: number;
  max: number;
  label: string;
  description?: string;
}

export type SettingsBoolean = {
  value: boolean;
  type: "boolean";
  label: string;
  description?: string;
}

export type SettingsRange = {
  value: number;
  type: "range";
  label: string;
  min: number;
  max: number;
  step?: number;
  description?: string;
}

export type SettingsString = {
  value: string;
  type: "string";
  label: string;
  maxLength?: number;
  description?: string;
}

export type SettingsSelect = {
  value: string;
  type: "select";
  label: string;
  description?: string;
  placeholder?: string;
  options: SettingOption[];
}

export type SettingOption = {
  label: string;
  value: string;
};

export type SettingsRanked = {
  value: string[];
  type: "ranked";
  label: string;
  description?: string;
  options: SettingOption[];
}

/**
 * Not fully implemented yet!
 */
export type SettingsList = {
  value: string[];
  placeholder?: string;
  maxValues?: number;
  orderable?: boolean;
  unique?: boolean;
  type: "list";
  label: string;
  description?: string;
  options: SettingOption[];
}

export type SettingsMultiSelect = {
  value: string[];
  type: "multiselect";
  label: string;
  description?: string;
  placeholder?: string;
  options: SettingOption[];
}

export type SettingsColor = {
  type: "color";
  value: string;
  label: string;
  description?: string;
  placeholder?: string;
}

export type SettingsType =
  | SettingsNumber
  | SettingsBoolean
  | SettingsString
  | SettingsSelect
  | SettingsMultiSelect
  | SettingsRange
  | SettingsRanked
  | SettingsList
  | SettingsColor;

export type AppSettings = Record<string, SettingsType>;

export type InputResponse = {
    [key: string]: string | boolean;
  }