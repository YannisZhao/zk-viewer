'use strict'

import { app, BrowserWindow, Menu, dialog, globalShortcut } from 'electron'
const menu = require('./components/common/menu')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let dialogNewConection
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 700,
    useContentSize: false,
    width: 1024
  })

  dialogNewConection = new BrowserWindow({parent: mainWindow, modal: true, show: false})
  dialogNewConection.loadURL('https://github.com')

  createMenu();

  mainWindow.loadURL(winURL)

  // console.log(require.resolve('electron'))
  // console.log(dialog.showOpenDialog({
  //   properties: ['openFile', 'openDirectory', 'multiSelections']
  // }))

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createMenu() {
  let template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Connection',
          click() {
            dialogNewConection.show()
          }
        }
        // { role: 'undo' },
        // { role: 'redo' },
        // { type: 'separator' },
        // { role: 'cut' },
        // { role: 'copy' },
        // { role: 'paste' },
        // { role: 'pasteandmatchstyle' },
        // { role: 'delete' },
        // { role: 'selectall' }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    },
    // {
    //   role: 'help',
    //   submenu: [
    //   ]
    // },
    {
      label: 'Help',
      submenu: [
        {
          label: 'about',
          click() {
            dialog.showMessageBox( {
              title: "About zk-viewer",
              type: "info",
              buttons: ["OK"],
              message: "zk-viewer is a open source project under Apache License 2.",
              detail: "zhaoyjun0222@gmail.com"
            }, resp => {

            })
          }
        },
        {
          label: 'View Github',
          click() { require('electron').shell.openExternal('https://github.com') }
        }
      ]
    }
  ]

  // if (process.platform === 'darwin') {
  //   template.unshift({
  //     label: app.getName(),
  //     submenu: [
  //       { role: 'about' },
  //       { type: 'separator' },
  //       { role: 'services', submenu: [] },
  //       { type: 'separator' },
  //       { role: 'hide' },
  //       { role: 'hideothers' },
  //       { role: 'unhide' },
  //       { type: 'separator' },
  //       { role: 'quit' }
  //     ]
  //   })
  //   // File menu
  //   template[1].submenu.push(
  //     { type: 'separator' },
  //     {
  //       label: 'Speech',
  //       submenu: [
  //         { role: 'startspeaking' },
  //         { role: 'stopspeaking' }
  //       ]
  //     }
  //   )
  //   // Help menu
  //   template[3].submenu = [
  //     { role: 'close' }
  //   ]
  // }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  // var dockMenu = Menu.buildFromTemplate([
  //   { label: 'New Window', click: function () { console.log('New Window') } },
  //   {
  //     label: 'New Window with Settings',
  //     submenu: [
  //       { label: 'Basic' },
  //       { label: 'Pro' }
  //     ]
  //   },
  //   { label: 'New Command...' }
  // ])

  // app.dock.setMenu(dockMenu)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
    // dialog.showOpenDialog({ properties: [ 'openFile', 'openDirectory', 'multiSelections' ]});
    globalShortcut.register('CommandOrControl+Y', () => {
      console.log('short cut')
    })
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
