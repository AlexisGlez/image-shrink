import { BrowserWindow, nativeImage } from 'electron'
import * as path from 'path'
import * as url from 'url'

import { isProd } from '@main/utils'

export class AboutWindow extends BrowserWindow {
  constructor() {
    super({
      title: 'About ImageShrink',
      width: 300,
      height: 300,
      icon: nativeImage.createFromPath(`${__dirname}/public/icons/Icon_256x256.png`),
      resizable: false,
      backgroundColor: 'white',
    })

    // load the about.html of the app.
    this.loadURL(
      url.format({
        pathname: path.join(__dirname, './about.html'),
        protocol: 'file:',
        slashes: true,
      }),
    )

    if (!isProd) {
      this.webContents.openDevTools()
    }
  }
}
