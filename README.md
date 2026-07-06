# Yandex Messenger Theme Patcher

Custom theme engine for Yandex Messenger (Electron desktop app).

## Features

- **Color editor** — change any interface color in real-time via the built-in panel
- **Preset themes** — Dracula, Nord, Monokai, One Dark, GitHub Dark, Solarized Dark, Dark Green
- **Chat background** — set any image as the chat area background
- **Persistent** — all settings are saved automatically

## Installation

### Requirements

- [Node.js](https://nodejs.org/) (for `npx asar` — only needed during install)
- Yandex Messenger (desktop version)

### Linux / macOS

1. Download and extract the archive
2. **Close Yandex Messenger** completely
3. Make the script executable and run:

```bash
chmod +x install.sh
./install.sh
```

If the script can't find Messenger automatically, specify the path:

```bash
./install.sh /opt/yandex-messenger
```

4. Launch Yandex Messenger
5. Click the ⚙ gear icon at the bottom-left of the chat list to open the Theme Editor

### Windows

1. Download and extract the archive
2. **Close Yandex Messenger** completely (check system tray)
3. Run as Administrator:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\install.ps1
```

If the script can't find Messenger automatically, specify the path:

```powershell
.\install.ps1 -AppPath "C:\Users\%USERNAME%\AppData\Local\Programs\chats"
```

4. Launch Yandex Messenger
5. Click the ⚙ gear icon at the bottom-left of the chat list to open the Theme Editor

### Manual Installation

If the script doesn't work, follow these steps:

1. Close Yandex Messenger
2. Back up `resources/app.asar` (copy to `app.asar.backup`)
3. Extract asar: `npx asar extract resources/app.asar resources/app.asar.extracted`
4. Copy `patch/static/www/green-theme.css` and `patch/static/www/theme-editor.js` to `resources/app.asar.extracted/static/www/`
5. Edit `resources/app.asar.extracted/static/www/index.html`:

   **Before:** `href="app.css" rel="stylesheet"></head>`
   
   **After:** `href="app.css" rel="stylesheet"><link href="green-theme.css" rel="stylesheet"><script defer="defer" src="theme-editor.js"></script></head>`

6. Repack: `npx asar pack resources/app.asar.extracted resources/app.asar`
7. Start Yandex Messenger

### Uninstall

Restore the original `app.asar` from backup:

```powershell
Copy-Item "$env:LOCALAPPDATA\Programs\chats\resources\app.asar.backup" "$env:LOCALAPPDATA\Programs\chats\resources\app.asar" -Force
```

Or reinstall Yandex Messenger.

## Usage

1. Click the ⚙ gear icon (bottom-left corner of the chat list)
2. Choose a preset theme or tweak individual colors
3. Upload a background image for the chat area
4. Changes are saved automatically

## Files

| File | Purpose |
|------|---------|
| `patch/static/www/green-theme.css` | Base dark-green theme with !important overrides |
| `patch/static/www/theme-editor.js` | Inline theme editor panel with MutationObserver |
| `install.ps1` | Windows installation script |
| `install.sh` | Linux / macOS installation script |
| `README.md` | This file |

## License

MIT
