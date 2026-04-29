import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import NavTabs from './NavTabs'
import SearchBar, { type SearchFocusField } from './SearchBar'
import LanguageModal from './LanguageModal'
import { ROUTE_ICON } from '../data/navigation'

interface CompactPillProps {
  icon: string
  onLokasiClick: () => void
  onKapanClick: () => void
  onPesertaClick: () => void
}

function CompactPill({ icon, onLokasiClick, onKapanClick, onPesertaClick }: CompactPillProps) {
  return (
    <div className="flex items-center bg-white rounded-full shadow-md hover:shadow-lg border border-gray-200 pl-2 pr-2 py-2 gap-1 transition-shadow">
      <button
        onClick={onLokasiClick}
        className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full hover:bg-gray-100 cursor-pointer"
      >
        <img src={icon} alt="" className="w-7 h-7 object-contain" />
        <span className="text-sm font-semibold text-gray-900">Ke mana saja</span>
      </button>
      <span className="w-px h-5 bg-gray-200" />
      <button
        onClick={onKapanClick}
        className="px-4 py-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
      >
        <span className="text-sm font-medium text-gray-700">Kapan saja</span>
      </button>
      <span className="w-px h-5 bg-gray-200" />
      <button
        onClick={onPesertaClick}
        className="px-4 py-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
      >
        <span className="text-sm font-medium text-gray-700">Tambahkan tamu</span>
      </button>
      <button
        onClick={onLokasiClick}
        aria-label="Cari"
        className="bg-[#FF385C] hover:bg-[#e0314f] text-white w-8 h-8 rounded-full flex items-center justify-center ml-1 transition-colors cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.8} stroke="currentColor" className="w-3.5 h-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.25 5.25a7.5 7.5 0 0 0 11.4 11.4Z" />
        </svg>
      </button>
    </div>
  )
}

function HamburgerMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [onClose])

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden"
    >
      <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer text-left">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-800">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
        <span className="text-sm text-gray-800">Pusat Bantuan</span>
      </button>

      <hr className="border-gray-100 my-1" />

      <button className="w-full px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer text-left">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 mb-1">Menjadi Tuan Rumah</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Anda bisa mulai menerima tamu dengan mudah dan mendapatkan penghasilan tambahan.
            </p>
          </div>
          <img
            src="/hamburger/home-master.webp"
            alt=""
            className="w-12 h-12 object-contain shrink-0"
          />
        </div>
      </button>

      <hr className="border-gray-100 my-1" />

      <button className="w-full text-left px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
        <span className="text-sm text-gray-800">Rekomendasikan Tuan Rumah</span>
      </button>
      <button className="w-full text-left px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
        <span className="text-sm text-gray-800">Temukan rekan tuan rumah</span>
      </button>

      <hr className="border-gray-100 my-1" />

      <button className="w-full text-left px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
        <span className="text-sm text-gray-800">Masuk atau mendaftar</span>
      </button>
    </div>
  )
}

function PageSwitcher() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'px-px py-0 text-[8px] font-semibold leading-none transition-colors',
      isActive ? 'bg-slate-800 text-white' : 'text-gray-900 hover:bg-gray-100',
    ].join(' ')

  return (
    <nav aria-label="Page navigation" className="flex items-center justify-center gap-2">
      <NavLink to="/homes" className={linkClass}>
        Page1
      </NavLink>
      <NavLink to="/rooms" className={linkClass}>
        Page2
      </NavLink>
    </nav>
  )
}

export default function Header() {
  const [langModalOpen, setLangModalOpen] = useState(false)
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [focused, setFocused] = useState<SearchFocusField>(null)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogoClick = () => {
    if (location.pathname !== '/homes') {
      navigate('/homes')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const compactIcon = ROUTE_ICON[location.pathname] || '/header/homes.png'
  const isCompact = scrolled && !focused

  return (
    <header style={{ backgroundColor: '#fdfdfd' }} className="w-full shadow-sm sticky top-0 z-40">
      <div className="hidden md:block absolute top-2 left-1/2 -translate-x-1/2 z-10">
        <PageSwitcher />
      </div>

      <div className="md:hidden pt-3 pb-1">
        <PageSwitcher />
      </div>

      {/* Top row: logo, nav tabs OR compact pill, right actions - desktop only */}
      <div className="relative hidden md:flex items-center px-6 h-24">
        <button
          onClick={handleLogoClick}
          aria-label="Beranda Airbnb"
          className="cursor-pointer ml-4"
        >
          <picture>
            <source media="(max-width: 1024px)" srcSet="/header/air-bnb-respon.webp" />
            <img src="/header/airbnb-header.png" alt="Airbnb" className="h-8" />
          </picture>
        </button>

        <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
          {!scrolled && (
            <div className="translate-y-3">
              <NavTabs />
            </div>
          )}
          {isCompact && (
            <CompactPill
              icon={compactIcon}
              onLokasiClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setFocused('lokasi')
              }}
              onKapanClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setFocused('kapan')
              }}
              onPesertaClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setFocused('peserta')
              }}
            />
          )}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button className="hidden lg:block text-sm font-medium text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap">
            Menjadi Tuan Rumah
          </button>
          <button
            onClick={() => setLangModalOpen(true)}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </button>
          <div className="relative">
            <button
              onClick={() => setHamburgerOpen((p) => !p)}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            {hamburgerOpen && <HamburgerMenu onClose={() => setHamburgerOpen(false)} />}
          </div>
        </div>
      </div>

      {/* Search bar row - hidden when compact, kept mounted to preserve state */}
      <div
        className={`transition-all duration-300 ${
          isCompact ? 'max-h-0 opacity-0 pointer-events-none overflow-hidden' : 'max-h-[800px] opacity-100 overflow-visible'
        }`}
        aria-hidden={isCompact}
      >
        <SearchBar focused={focused} onFocusedChange={setFocused} />
      </div>

      {/* Mobile nav tabs - below search bar */}
      <div className="md:hidden">
        <NavTabs mobile />
      </div>

      {langModalOpen && <LanguageModal onClose={() => setLangModalOpen(false)} />}
    </header>
  )
}
