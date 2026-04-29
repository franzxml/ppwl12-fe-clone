export type NavTab = {
  to: string
  label: string
  isNew: boolean
  icon: string
}

export const NAV_TABS: NavTab[] = [
  { to: '/homes', label: 'Homes', isNew: false, icon: '/header/homes.png' },
  { to: '/experiences', label: 'Experiences', isNew: true, icon: '/header/experiences.png' },
  { to: '/services', label: 'Services', isNew: true, icon: '/header/services.png' },
]

export const ROUTE_ICON = NAV_TABS.reduce<Record<string, string>>((icons, tab) => {
  icons[tab.to] = tab.icon
  return icons
}, {})
