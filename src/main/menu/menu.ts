import { isMacOS, isProd } from '../utils'

export function createAppMenu(appName: string): Array<Electron.MenuItemConstructorOptions> {
  const menu: Array<Electron.MenuItemConstructorOptions> = [
    {
      role: 'fileMenu',
    },
  ]

  if (isMacOS) {
    menu.unshift({
      label: appName,
      submenu: [
        {
          label: 'About',
        },
      ],
    })
  } else {
    menu.push({
      label: 'Help',
      submenu: [
        {
          label: 'About',
        },
      ],
    })
  }

  if (!isProd) {
    menu.push({
      label: 'Developer',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'toggleDevTools' },
      ],
    })
  }

  return menu
}
