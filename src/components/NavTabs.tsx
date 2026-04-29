import { NavLink } from 'react-router-dom'
import { NAV_TABS } from '../data/navigation'

export default function NavTabs({ mobile = false }: { mobile?: boolean }) {
  if (mobile) {
    return (
      <div className="flex justify-around w-full px-4 pt-2 pb-4 border-t border-gray-100">
        {NAV_TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className="relative flex flex-col items-center gap-1 pb-2 cursor-pointer"
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <img src={tab.icon} alt={tab.label} className="w-12 h-12 object-contain" />
                  {tab.isNew && (
                    <span className="absolute -top-1 right-0.5 bg-[#64748b] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">BARU</span>
                  )}
                </div>
                <span className="text-xs font-medium text-gray-700">{tab.label}</span>
                <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${isActive ? 'bg-gray-800' : 'bg-transparent'}`} />
              </>
            )}
          </NavLink>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-end gap-8">
      {NAV_TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className="relative flex flex-col items-center pb-3 cursor-pointer transition-transform duration-200 hover:scale-105 no-underline"
        >
          {({ isActive }) => (
            <>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img src={tab.icon} alt={tab.label} className="w-14 h-14 object-contain" />
                  {tab.isNew && (
                    <span className="absolute -top-1 right-0.5 bg-[#64748b] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">BARU</span>
                  )}
                </div>
                <span className="text-base font-semibold text-gray-800">{tab.label}</span>
              </div>
              <span
                className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-gray-800 opacity-100' : 'bg-transparent opacity-0'
                }`}
              />
            </>
          )}
        </NavLink>
      ))}
    </div>
  )
}
