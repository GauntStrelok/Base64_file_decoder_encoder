const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('fileConverter', {
  saveDecodedFile: (text) => ipcRenderer.invoke('save-decoded-file', text)
})
