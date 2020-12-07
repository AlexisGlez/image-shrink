import { isMacOS, isProd } from '../utils'

export function createAppMenu(
  appName: string,
  onAboutClick: () => void,
): Array<Electron.MenuItemConstructorOptions> {
  const menu: Array<Electron.MenuItemConstructorOptions> = [
    ...((isMacOS ? [{ role: 'appMenu' }] : []) as Array<Electron.MenuItemConstructorOptions>),
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
          click: onAboutClick,
        },
      ],
    })
  } else {
    menu.push({
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: onAboutClick,
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
