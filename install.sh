#!/usr/bin/env bash
set -euo pipefail

# Colors
GREEN='\033[0;32m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

step()  { echo -e "${CYAN}>>>${NC} $1"; }
ok()    { echo -e "  ${GREEN}OK:${NC} $1"; }
err()   { echo -e "  ${RED}ERROR:${NC} $1"; }

# --- Detect Messenger path ---
APP_PATH=""
CANDIDATES=(
  "$HOME/AppData/Local/Programs/chats"
  "/opt/Yandex Messenger"
  "/opt/yandex-messenger"
  "/usr/local/share/yandex-messenger"
  "$HOME/.local/share/yandex-messenger"
)

for p in "${CANDIDATES[@]}"; do
  if [ -f "$p/resources/app.asar" ]; then
    APP_PATH="$p"
    break
  fi
done

if [ -z "$APP_PATH" ]; then
  echo "Usage: $0 /path/to/Yandex/Messenger"
  echo "Common paths:"
  echo "  Windows: %LOCALAPPDATA%\\Programs\\chats"
  echo "  Linux:   /opt/yandex-messenger"
  echo "  macOS:   /Applications/Yandex Messenger.app/Contents/Resources"
  exit 1
fi

ASAR="$APP_PATH/resources/app.asar"
BACKUP="$APP_PATH/resources/app.asar.backup"
EXTRACT="$APP_PATH/resources/app.asar.extracted"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PATCH_SRC="$SCRIPT_DIR/patch/static/www"

ok "Found Messenger at: $APP_PATH"

# --- Check for asar tool ---
if ! command -v npx &>/dev/null; then
  err "Node.js/npx not found. Install Node.js: https://nodejs.org/"
  exit 1
fi
ok "Using npx"

# --- Backup ---
step "Backing up app.asar..."
if [ ! -f "$BACKUP" ]; then
  cp "$ASAR" "$BACKUP"
  ok "Backup saved: app.asar.backup"
else
  ok "Backup exists, skipping"
fi

# --- Extract ---
step "Extracting app.asar..."
rm -rf "$EXTRACT"
npx asar extract "$ASAR" "$EXTRACT"
ok "Extracted to: $EXTRACT"

# --- Copy patch files ---
step "Copying patch files..."
cp "$PATCH_SRC/green-theme.css" "$EXTRACT/static/www/"
cp "$PATCH_SRC/theme-editor.js" "$EXTRACT/static/www/"
ok "Copied: green-theme.css, theme-editor.js"

# --- Patch index.html ---
step "Patching index.html..."
HTML="$EXTRACT/static/www/index.html"

if grep -q 'green-theme.css' "$HTML"; then
  ok "index.html already patched, skipping"
else
  sed -i.bak 's|href="app.css" rel="stylesheet"|href="app.css" rel="stylesheet"><link href="green-theme.css" rel="stylesheet">|' "$HTML"
  sed -i.bak 's|</head>|<script defer="defer" src="theme-editor.js"></script></head>|' "$HTML"
  rm -f "$HTML.bak"
  ok "index.html patched"
fi

# --- Repack ---
step "Repacking app.asar..."
rm -f "$ASAR"
npx asar pack "$EXTRACT" "$ASAR"
ok "app.asar repacked!"

echo ""
echo -e "${GREEN}Theme patch installed!${NC}"
echo -e "${CYAN}Restart Yandex Messenger and click the gear icon (bottom-left) to open Theme Editor.${NC}"
