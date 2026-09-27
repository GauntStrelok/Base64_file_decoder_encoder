const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('node:path')
const { writeFile } = require('node:fs/promises')
const { decodeFileText } = require('./base64')

ipcMain.handle('save-decoded-file', async (event, text) => {
  let decoded
  try {
    decoded = decodeFileText(text)
  } catch {
    return { status: 'error', message: 'Please paste valid file text or Base64 text.' }
  }

  try {
    const selection = await dialog.showSaveDialog(BrowserWindow.fromWebContents(event.sender), {
      title: 'Save decoded file',
      defaultPath: decoded.filename,
      buttonLabel: 'Save'
    })
    if (selection.canceled || !selection.filePath) return { status: 'canceled' }
    await writeFile(selection.filePath, decoded.bytes)
    return { status: 'saved' }
  } catch {
    return { status: 'error', message: 'Could not save the file. Please try again.' }
  }
})

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})  
