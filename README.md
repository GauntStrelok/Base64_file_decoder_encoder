# Base64 File Converter

A desktop app for converting files to Base64 text and saving them back to files.
Generated text includes the original filename. Plain Base64 is also accepted.

## Windows installation

Run `Base64-File-Converter-Setup-1.0.0-x64.exe` and choose an installation folder.
Open **Base64 File Converter** using the desktop or Start menu shortcut.
Users do not need Node.js or npm installed. This installer is for x64 Windows.
Uninstall through Windows Settings > Apps.

This initial build is unsigned; Windows may display an unknown-publisher warning.

## Development

Use Node.js and npm:

```sh
npm ci
npm start
```

## Build the Windows installer

On Windows:

```sh
npm run dist:win
```

Share the `*-Setup-*-x64.exe` in `dist/`. The other build files do not need to
be distributed. The installer bundles the app and Electron and works offline.
The first build requires internet access to download packaging tools.

`npm run pack:win` creates an unpacked application in `dist/win-unpacked/`
for local checks. Keep the whole folder together when running this version.
Build configuration lives in `package.json` and uses electron-builder's
[NSIS installer](https://www.electron.build/nsis/).

For the next release, update the version in `package.json` and `package-lock.json`
(for example, with `npm version patch --no-git-tag-version`), then rebuild.
Keep the app ID and product name stable so future installers identify the same app.

## First-user checks and feedback

- Install, launch from the shortcut, and uninstall on a Windows machine.
- Convert an image, PDF, ZIP, and empty file to text and back; compare the restored files.
- Check Copy text, plain Base64 input, canceling Save, and switching themes.
- For feedback, record the app version, Windows version, steps, expected result,
  and actual result. Include file type and size when relevant, rather than private file contents.
