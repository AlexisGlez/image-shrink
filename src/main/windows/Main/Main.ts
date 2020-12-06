import { BrowserWindow, nativeImage } from 'electron'
import * as path from 'path'
import * as url from 'url'

import { isProd } from '@main/utils'

export class MainWindow extends BrowserWindow {
  constructor() {
    super({
      height: 600,
      width: isProd ? 500 : 800,
      icon: nativeImage.createFromPath(`${__dirname}/public/icons/Icon_256x256.png`),
      webPreferences: {
        nodeIntegration: true,
        devTools: !isProd,
      },
    })

    // load the index.html of the app.
    this.loadURL(
      url.format({
        pathname: path.join(__dirname, './index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    )

    if (!isProd) {
      this.webContents.openDevTools()
    }
  }
}
