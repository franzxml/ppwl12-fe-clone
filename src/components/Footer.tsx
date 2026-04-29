import { useState } from 'react'
import LanguageModal from './LanguageModal'
import { FOOTER_DESTINATIONS, FOOTER_LINK_GROUPS, FOOTER_TABS } from '../data/footerContent'

export default function Footer() {
  const [activeTab, setActiveTab] = useState('Populer')
  const [modalTab, setModalTab] = useState<null | 'bahasa' | 'mata-uang'>(null)

  const destinations = FOOTER_DESTINATIONS[activeTab] ?? []
  const visible = destinations.slice(0, 17)

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-12 py-12">
        {/* Inspirasi section with tabs */}
        <h2 className="text-2xl font-medium text-gray-900 mb-6">Inspirasi untuk liburan mendatang</h2>

        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8 overflow-x-auto">
            {FOOTER_TABS.map((tab) => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-3 text-sm whitespace-nowrap transition-colors cursor-pointer ${
                    isActive ? 'font-semibold text-gray-900' : 'font-normal text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                  {isActive && (
                    <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-gray-900" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Destinations grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-6 mb-12">
          {visible.map((dest, i) => (
            <button key={`${activeTab}-${i}`} className="text-left cursor-pointer">
              <p className="text-sm font-semibold text-gray-900">{dest.name}</p>
              <p className="text-sm text-gray-500 mt-0.5">{dest.type}</p>
            </button>
          ))}
          {destinations.length > 17 && (
            <button className="text-left cursor-pointer flex items-center gap-1">
              <span className="text-sm font-semibold text-gray-900">Tampilkan lebih banyak</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-gray-900">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          )}
        </div>

        {/* Static columns - these never change */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-200">
          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((item) => (
                  <li key={item}>
                    <button className="text-sm text-gray-700 hover:underline cursor-pointer text-left">{item}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span>© 2026 Airbnb, Inc.</span>
            <span className="text-gray-400">·</span>
            <button className="hover:underline cursor-pointer">Privasi</button>
            <span className="text-gray-400">·</span>
            <button className="hover:underline cursor-pointer">Ketentuan</button>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setModalTab('bahasa')}
              className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:underline cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              Bahasa Indonesia (ID)
            </button>

            <button
              onClick={() => setModalTab('mata-uang')}
              className="text-sm font-medium text-gray-900 hover:underline cursor-pointer"
            >
              Rp&nbsp;&nbsp;IDR
            </button>

            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="cursor-pointer">
                <img src="/social/facebook.svg" alt="Facebook" className="w-4 h-4" />
              </a>
              <a href="#" aria-label="X" className="cursor-pointer">
                <img src="/social/x.svg" alt="X" className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="cursor-pointer">
                <img src="/social/instagram.svg" alt="Instagram" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {modalTab && <LanguageModal onClose={() => setModalTab(null)} initialTab={modalTab} />}
    </footer>
  )
}
