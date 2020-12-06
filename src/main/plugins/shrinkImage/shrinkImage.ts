import * as path from 'path'
import * as os from 'os'
import { BrowserWindow, ipcMain, shell } from 'electron'
import log from 'electron-log'
import imagemin = require('imagemin')
import imageminMozjpeg = require('imagemin-mozjpeg')
import imageminPngquant from 'imagemin-pngquant'
import slash = require('slash')

let window: Electron.BrowserWindow | null = null

type ShrinkImageOptions = {
  imgPath: string
  quality: number
}

const destination = path.join(os.homedir(), 'imageshrink')

ipcMain.on('image:minimize', (_: any, options: ShrinkImageOptions) => {
  shrinkImage(options)
})

async function shrinkImage({ imgPath, quality }: ShrinkImageOptions) {
  try {
    const pngQuality = quality / 100

    const files = await imagemin([slash(imgPath)], {
      destination,
      plugins: [
        imageminMozjpeg({ quality }),
        imageminPngquant({
          quality: [pngQuality, pngQuality],
        }),
      ],
    })

    log.info(files && files.length)

    shell.openPath(destination)

    if (window) {
      window.webContents.send('image:done')
    }
  } catch (err) {
    log.error(err)
  }
}

export function registerShrinkImagePluginFor(newWindow: BrowserWindow) {
  window = newWindow
}
