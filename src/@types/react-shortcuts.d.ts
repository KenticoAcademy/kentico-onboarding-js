// Type definitions for react-shortcuts v1.6.0
// Project: https://github.com/avocode/react-shortcuts
// Definitions by: Chris Grigg <https://github.com/subvertallchris>

declare namespace ReactShortcuts {
  type PlatformType = 'osx' | 'windows' | 'linux' | 'other';

  interface Keymap {
    [namespace: string]: KeyboardShortcut;
  }

  interface KeyboardShortcut {
    [action: string]: string | string[] | PlatformKeymap;
  }

  interface PlatformKeymap {
    osx?: string | string[];
    windows?: string | string[];
    linux?: string | string[];
    other?: string | string[];
  }

  class ShortcutManager {
    addUpdateListener: (callback: () => any) => void;
    removeUpdateListener: (callback: () => any) => void;
    _parseShortcutDescriptor: (shortcut: any) => any | string;
    setKeymap: (keymap: Keymap) => void;
    extendKeymap: (keymap: Keymap) => void;
    getAllShortcuts: () => any;
    getAllShortcutsForPlatform: (platformName: PlatformType) => any;
    getAllShortcutsForCurrentPlatform: () => any;
    getShortcuts: (componentName: string) => any | undefined;
    _parseShortcutKeyName: (obj: any, keyName: string) => any | undefined;
    findShortcutName: (keyName: string, componentName: string) => any | undefined;

    constructor(keymap: Keymap);
  }

  class Shortcuts extends React.Component<ShortcutsProps, object> {}

  interface ShortcutsProps {
    handler: (action: keyof Keymap, e: KeyboardEvent) => void;
    name: string;
    tabIndex?: number;
    eventType?: string;
    stopPropagation?: boolean;
    preventDefault?: boolean;
    targetNodeSelector?: string;
    global?: boolean;
    isolate?: boolean;
    alwaysFireHandler?: boolean;
  }
}

declare module 'react-shortcuts' {
  import ReactSc = ReactShortcuts;
  export = ReactSc;
}
