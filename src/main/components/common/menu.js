import { app, Menu, dialog } from 'electron'

const template = [
  {
    label: 'File',
    submenu: [
      { label: 'New' },
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'View Github',
        click() { require('electron').shell.openExternal('https://github.com') }
      }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'about',
        click() { dialog.showMessageBox({ properties: ['type', 'info', 'multiSelections'] }) }
      },
      {
        label: 'View Github',
        click() { require('electron').shell.openExternal('https://github.com') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })
  // File menu
  template[1].submenu.push(
    { type: 'separator' },
    {
      label: 'Speech',
      submenu: [
        { role: 'startspeaking' },
        { role: 'stopspeaking' }
      ]
    }
  )
  // Help menu
  template[3].submenu = [
    { role: 'close' }
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

var dockMenu = Menu.buildFromTemplate([
  { label: 'New Window', click: function () { console.log('New Window') } },
  {
    label: 'New Window with Settings',
    submenu: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])

app.dock.setMenu(dockMenu)
