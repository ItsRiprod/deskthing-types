# DeskThing Types

TypeScript type definitions for the DeskThing application framework.

## Installation

# Install types

npm install @deskthing/types

# Create new DeskThing app

npm create deskthing@latest

# or

npx @deskthing/cli template

# Install core packages

npm install @deskthing/client @deskthing/server

## Core Types

### Actions

- `Action` - Defines an executable action with properties like id, name, value, etc.
- `ActionReference` - Reference to an action with minimal properties
- `EventMode` - Enum for different input event types (KeyUp, KeyDown, Swipes, etc.)
- `Key` - Defines a key mapping with modes and metadata

### App Events

- `ServerEvent` - Enum for server-side events (MESSAGE, DATA, GET, etc.)
- `SEND_TYPES` - Enum for client-to-server communication types
- `GetTypes` - Types for 'get' event requests

### Client

- `ClientManifest` - Client details like name, version, device info
- `ClientPreferences` - User preferences for client appearance/behavior
- `App` - Interface for app state in client
- `KeyTrigger` - Interface for key trigger events

### Tasks

- `Task` - Defines a task with steps and metadata
- `Step` - Base interface for task steps
- `TaskStep` - Standard step in a task
- `TaskAction` - Step requiring action execution
- `TaskSetting` - Step requiring settings input
- `STEP_TYPES` - Enum for different step types

### Settings

- `SettingsType` - Union type of all setting types
- `SettingsNumber` - Number input setting
- `SettingsBoolean` - Boolean toggle setting
- `SettingsString` - Text input setting
- `SettingsSelect` - Dropdown select setting
- `SettingsMultiSelect` - Multiple selection setting
- `SettingsColor` - Color picker setting
- `AppSettings` - Record of app settings

### Music

- `SongData` - Current playing song information
- `ThemeColor` - Color theme information
- `AUDIO_REQUESTS` - Enum for audio control requests

### Utils

- `AppManifest` - Application manifest type
- `PlatformTypes` - Supported platform types
- `TagTypes` - App categorization tags
- `LOGGING_LEVELS` - Log level types
- `SocketData` - Socket communication data type

## Usage

```ts
import { Action, ServerEvent, ClientManifest } from "@deskthing/types";
import { DeskThing } from "@deskthing/server";

// Define an action
const myAction: Action = {
  id: "my-action",
  name: "My Action",
  version: "1.0.0",
  enabled: true,
};

DeskThing.registerAction(myAction);

DeskThing.on(ServerEvent.ACTION, (event) => {
  // Handle action event
});
// Handle server events
function handleEvent(event: ServerEvent) {
  switch (event) {
    case ServerEvent.DATA:
      // Handle data event
      break;
    case ServerEvent.ACTION:
      // Handle action event
      break;
  }
}
```

## License

MIT
