import { app, BrowserWindow, Menu } from 'electron'
import * as path from 'path'
import * as url from 'url'

import { isMacOS, isProd } from './utils'
import { createAppMenu } from './menu'

let mainWindow: Electron.BrowserWindow | null

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: isProd ? 500 : 800,
    icon: `${__dirname}/public/icons/Icon_256x256.png`,
    webPreferences: {
      nodeIntegration: true,
      devTools: !isProd,
    },
  })

  if (!isProd) {
    mainWindow.webContents.openDevTools()
  }

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  )

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow()

  if (!mainWindow) {
    return
  }

  const mainMenu = Menu.buildFromTemplate(createAppMenu(app.getName()))

  Menu.setApplicationMenu(mainMenu)

  mainWindow.on('closed', () => (mainWindow = null))
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (!isMacOS) {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null || BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
