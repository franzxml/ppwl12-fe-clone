import { useState, useRef, useEffect } from "react"
import {
  CHECKIN_OPTIONS,
  DESTINATIONS,
  FLEX_DURATIONS,
  FLEX_MONTHS_VISIBLE,
  MONTHS_ID,
  SHORT_MONTHS_ID,
} from "../data/searchOptions"
import { formatDateShort, isSameDay } from "../utils/date"
import CounterRow from "./search/CounterRow"
import MonthGrid from "./search/MonthGrid"
import NearbyIcon from "./search/NearbyIcon"

export type SearchFocusField = "lokasi" | "kapan" | "peserta" | null

interface SearchBarProps {
  focused: SearchFocusField
  onFocusedChange: (field: SearchFocusField) => void
}

export default function SearchBar({ focused, onFocusedChange }: SearchBarProps) {
  const lokasiFocused = focused === "lokasi"
  const kapanFocused = focused === "kapan"
  const pesertaFocused = focused === "peserta"
  const anyFocused = focused !== null

  const [hovered, setHovered] = useState<string | null>(null)
  const [lokasiValue, setLokasiValue] = useState("")
  const [calendarTab, setCalendarTab] = useState<"tanggal" | "fleksibel">("tanggal")
  const [checkInOption, setCheckInOption] = useState("Tanggal pasti")
  const [checkInDropdownOpen, setCheckInDropdownOpen] = useState(false)
  const [checkOutOption, setCheckOutOption] = useState("Tanggal pasti")
  const [checkOutDropdownOpen, setCheckOutDropdownOpen] = useState(false)
  const [hewanPanduModal, setHewanPanduModal] = useState(false)
  const [countDewasa, setCountDewasa] = useState(0)
  const [countAnak, setCountAnak] = useState(0)
  const [countBalita, setCountBalita] = useState(0)
  const [countHewan, setCountHewan] = useState(0)
  const [flexDuration, setFlexDuration] = useState<string | null>(null)
  const [flexMonthsSelected, setFlexMonthsSelected] = useState<string[]>([])
  const [flexMonthOffset, setFlexMonthOffset] = useState(0)
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [leftMonth, setLeftMonth] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const rightMonth =
    leftMonth.month === 11
      ? { year: leftMonth.year + 1, month: 0 }
      : { year: leftMonth.year, month: leftMonth.month + 1 }

  const isPrevDisabled =
    leftMonth.year === today.getFullYear() && leftMonth.month === today.getMonth()

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const calendarLocked = useRef(false)
  const monthScrollRef = useRef<HTMLDivElement>(null)
  const barInnerRef = useRef<HTMLDivElement>(null)
  const lokasiRef = useRef<HTMLButtonElement>(null)
  const kapanRef = useRef<HTMLButtonElement>(null)
  const pesertaRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)

  useEffect(() => {
    const bar = barInnerRef.current
    if (!bar) return
    let el: HTMLElement | null = null
    if (lokasiFocused) el = lokasiRef.current
    else if (kapanFocused) el = kapanRef.current
    else if (pesertaFocused) el = pesertaRef.current
    if (!el) { setIndicator(null); return }
    const barRect = bar.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    setIndicator({ left: elRect.left - barRect.left, width: elRect.width })
  }, [lokasiFocused, kapanFocused, pesertaFocused])

  useEffect(() => {
    if (lokasiFocused) {
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [lokasiFocused])

  const divider1Visible = hovered !== "lokasi" && hovered !== "kapan" && !lokasiFocused && !kapanFocused
  const divider2Visible = hovered !== "kapan" && hovered !== "peserta" && !kapanFocused && !pesertaFocused

  useEffect(() => {
    if (!anyFocused) return
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onFocusedChange(null)
        setCheckInDropdownOpen(false)
        setCheckOutDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onFocusedChange, anyFocused])

  function handleLokasiClick() {
    onFocusedChange("lokasi")
  }

  function handleKapanClick() {
    onFocusedChange(kapanFocused ? null : "kapan")
  }

  function handlePesertaClick() {
    onFocusedChange(pesertaFocused ? null : "peserta")
  }

  function handleDestinationSelect(name: string) {
    setLokasiValue(name)
    onFocusedChange("kapan")
  }

  function advanceToPeserta() {
    onFocusedChange("peserta")
  }

  function handleDayClick(date: Date) {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date)
      setCheckOut(null)
    } else {
      if (isSameDay(date, checkIn)) {
        setCheckIn(null)
      } else if (date < checkIn) {
        setCheckIn(date)
        setCheckOut(checkIn)
        advanceToPeserta()
      } else {
        setCheckOut(date)
        advanceToPeserta()
      }
    }
  }

  function animateCalendar(direction: "next" | "prev", updateFn: () => void) {
    if (calendarLocked.current) return
    calendarLocked.current = true
    const el = calendarRef.current
    if (!el) { updateFn(); calendarLocked.current = false; return }
    const inX = direction === "next" ? "40px" : "-40px"
    updateFn()
    el.style.transition = "none"
    el.style.transform  = `translateX(${inX})`
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = "transform 0.2s ease"
      el.style.transform  = "translateX(0)"
      setTimeout(() => { calendarLocked.current = false }, 200)
    }))
  }

  function prevMonth() {
    if (isPrevDisabled) return
    animateCalendar("prev", () =>
      setLeftMonth(lm => lm.month === 0
        ? { year: lm.year - 1, month: 11 }
        : { year: lm.year, month: lm.month - 1 })
    )
  }

  function nextMonth() {
    animateCalendar("next", () =>
      setLeftMonth(lm => lm.month === 11
        ? { year: lm.year + 1, month: 0 }
        : { year: lm.year, month: lm.month + 1 })
    )
  }

  function handleMonthScroll(newOffset: number) {
    setFlexMonthOffset(newOffset)
    const el = monthScrollRef.current
    if (!el) return
    const firstCard = el.children[0] as HTMLElement
    if (!firstCard) return
    el.scrollTo({ left: newOffset * (firstCard.offsetWidth + 8), behavior: "smooth" })
  }

  function getFlexMonths() {
    const result: { year: number; month: number }[] = []
    for (let i = 1; i <= 12; i++) {
      const d = new Date(today.getFullYear(), today.getMonth() + i, 1)
      result.push({ year: d.getFullYear(), month: d.getMonth() })
    }
    return result
  }

  function toggleFlexMonth(key: string) {
    setFlexMonthsSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  function flexSuffix(option: string) {
    if (option === "Tanggal pasti") return ""
    const match = option.match(/\d+/)
    return match ? ` (±${match[0]})` : ""
  }

  function getKapanDisplay() {
    if (calendarTab === "fleksibel") {
      const monthLabels = flexMonthsSelected
        .map((key) => {
          const [, m] = key.split("-").map(Number)
          return SHORT_MONTHS_ID[m]
        })
        .join(", ")
      if (flexDuration && flexMonthsSelected.length > 0) return `${flexDuration} di ${monthLabels}`
      if (flexDuration) return flexDuration
      if (flexMonthsSelected.length > 0) return `di ${monthLabels}`
      return "Tambahkan tanggal"
    }
    const inFlex = flexSuffix(checkInOption)
    const outFlex = flexSuffix(checkOutOption)
    if (checkIn && checkOut) return `${formatDateShort(checkIn)}${inFlex} – ${formatDateShort(checkOut)}${outFlex}`
    if (checkIn) return `${formatDateShort(checkIn)}${inFlex}`
    return "Tambahkan tanggal"
  }

  const kapanLabel = calendarTab === "fleksibel" ? "Tanggal perjalanan" : "Kapan"

  function getPesertaDisplay() {
    const totalGuests = countDewasa + countAnak
    const parts: string[] = []
    if (totalGuests > 0) parts.push(`${totalGuests} tamu`)
    if (countBalita > 0) parts.push(`${countBalita} bayi`)
    if (countHewan > 0) parts.push(`${countHewan} hewan peliharaan`)
    return parts.length > 0 ? parts.join(", ") : "Tambahkan tamu"
  }

  return (
    <>
      {/* Mobile: compact search pill */}
      <div className="flex md:hidden px-4 pb-3 pt-1">
        <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-full shadow-sm px-5 py-3.5 bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-gray-500 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.25 5.25a7.5 7.5 0 0 0 11.4 11.4Z" />
          </svg>
          <span className="text-sm font-medium text-gray-500">Mulai pencarian</span>
        </button>
      </div>

      {/* Desktop: full search bar */}
      <div className="hidden md:flex justify-center px-6 py-4">
        <div ref={containerRef} className="relative w-full max-w-3xl">
          <div
            ref={barInnerRef}
            className={`relative flex items-stretch rounded-full transition-all duration-200 ${anyFocused ? "bg-gray-100 border border-transparent shadow-none" : "bg-white border border-gray-200 shadow-md"}`}
          >
            {/* Sliding white indicator */}
            {anyFocused && indicator && (
              <div
                className="absolute inset-y-0 bg-white rounded-full shadow-md pointer-events-none"
                style={{ left: indicator.left, width: indicator.width, transition: "left 0.4s ease, width 0.4s ease" }}
              />
            )}

            {/* Lokasi */}
            <button
              ref={lokasiRef}
              className={`relative z-10 flex-1 flex flex-col items-start justify-center px-6 py-3 rounded-full cursor-pointer ${!anyFocused ? "hover:bg-gray-100" : ""}`}
              onMouseEnter={() => !lokasiFocused && setHovered("lokasi")}
              onMouseLeave={() => setHovered(null)}
              onClick={handleLokasiClick}
            >
              <span className="text-xs font-semibold text-gray-800">Lokasi</span>
              {lokasiFocused ? (
                <input
                  ref={inputRef}
                  value={lokasiValue}
                  onChange={(e) => setLokasiValue(e.target.value)}
                  placeholder="Cari destinasi"
                  className="text-sm text-gray-700 bg-transparent outline-none w-full placeholder-gray-400"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <span className="text-sm text-gray-400">{lokasiValue || "Cari destinasi"}</span>
              )}
            </button>

            <div className={`self-center w-px h-8 bg-gray-200 transition-opacity ${!anyFocused && divider1Visible ? "opacity-100" : "opacity-0"}`} />

            {/* Kapan */}
            <button
              ref={kapanRef}
              className={`relative z-10 flex-1 flex flex-col items-start justify-center px-6 py-3 rounded-full cursor-pointer ${!anyFocused ? "hover:bg-gray-100" : ""}`}
              onMouseEnter={() => !kapanFocused && setHovered("kapan")}
              onMouseLeave={() => setHovered(null)}
              onClick={handleKapanClick}
            >
              <span className="text-xs font-semibold text-gray-800">{kapanLabel}</span>
              <span className={`text-sm ${checkIn ? "text-gray-700" : "text-gray-400"}`}>
                {getKapanDisplay()}
              </span>
            </button>

            <div className={`self-center w-px h-8 bg-gray-200 transition-opacity ${!anyFocused && divider2Visible ? "opacity-100" : "opacity-0"}`} />

            {/* Peserta + Search Button */}
            <div
              ref={pesertaRef}
              className={`relative z-10 flex items-center pr-2 pl-6 py-2 gap-4 rounded-full cursor-pointer ${!anyFocused && hovered === "peserta" ? "hover:bg-gray-100" : ""}`}
              onMouseEnter={() => !pesertaFocused && setHovered("peserta")}
              onMouseLeave={() => setHovered(null)}
              onClick={handlePesertaClick}
            >
              <div className="flex flex-col items-start px-2 py-1">
                <span className="text-xs font-semibold text-gray-800">Peserta</span>
                <span className={`text-sm ${getPesertaDisplay() !== "Tambahkan tamu" ? "text-gray-700" : "text-gray-400"}`}>
                  {getPesertaDisplay()}
                </span>
              </div>
              <button
                onClick={(e) => e.stopPropagation()}
                className={`bg-[#FF385C] hover:bg-[#e0314f] text-white rounded-full flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer ${anyFocused ? "px-4 py-3 gap-2" : "w-12 h-12"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.25 5.25a7.5 7.5 0 0 0 11.4 11.4Z" />
                </svg>
                {anyFocused && <span className="text-sm font-semibold">Cari</span>}
              </button>
            </div>
          </div>

          {/* Location Dropdown */}
          {lokasiFocused && (
            <div className="absolute top-full left-0 mt-3 w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 py-4 z-50">
              <style dangerouslySetInnerHTML={{ __html: `
                #dest-list { overflow-y: scroll !important; max-height: 288px !important; margin-right: 6px !important; }
                #dest-list::-webkit-scrollbar { width: 8px !important; display: block !important; }
                #dest-list::-webkit-scrollbar-track { background: #e5e7eb !important; border-radius: 4px !important; }
                #dest-list::-webkit-scrollbar-thumb { background: #9ca3af !important; border-radius: 4px !important; }
              `}} />
              <p className="text-xs font-semibold text-gray-500 px-6 pb-3">Destinasi yang disarankan</p>
              <ul id="dest-list">
                {DESTINATIONS.map((dest) => (
                  <li key={dest.id}>
                    <button
                      className="w-full flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors text-left"
                      onClick={() => handleDestinationSelect(dest.name)}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                        {dest.type === "nearby" ? (
                          <NearbyIcon />
                        ) : (
                          <img src={dest.image} alt={dest.name} className="w-full h-full object-cover rounded-xl" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{dest.name}</p>
                        {dest.description && (
                          <p className="text-xs text-gray-400 truncate">{dest.description}</p>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Calendar Dropdown */}
          {kapanFocused && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-50 w-[700px]">
              {/* Tabs */}
              <div className="flex justify-center mb-6">
                <div className="flex bg-gray-100 rounded-full p-1">
                  <button
                    onClick={() => setCalendarTab("tanggal")}
                    className={`px-6 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${calendarTab === "tanggal" ? "bg-white shadow-sm text-gray-900" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    Tanggal
                  </button>
                  <button
                    onClick={() => setCalendarTab("fleksibel")}
                    className={`px-6 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${calendarTab === "fleksibel" ? "bg-white shadow-sm text-gray-900" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    Fleksibel
                  </button>
                </div>
              </div>

              {calendarTab === "tanggal" && (
                <>
                  {/* Two months + nav arrows */}
                  <div className="relative px-8">
                    <button
                      onClick={prevMonth}
                      disabled={isPrevDisabled}
                      className={`absolute left-0 top-0 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-colors text-lg leading-none ${isPrevDisabled ? "text-gray-200 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100 cursor-pointer"}`}
                    >
                      ‹
                    </button>

                    <div ref={calendarRef} className="flex gap-8">
                      <MonthGrid
                        year={leftMonth.year}
                        month={leftMonth.month}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        hoveredDate={hoveredDate}
                        onDayClick={handleDayClick}
                        onDayHover={setHoveredDate}
                        today={today}
                      />
                      <MonthGrid
                        year={rightMonth.year}
                        month={rightMonth.month}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        hoveredDate={hoveredDate}
                        onDayClick={handleDayClick}
                        onDayHover={setHoveredDate}
                        today={today}
                      />
                    </div>

                    <button
                      onClick={nextMonth}
                      className="absolute right-0 top-0 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600 cursor-pointer text-lg leading-none"
                    >
                      ›
                    </button>
                  </div>

                  {/* Check-in / Check-out */}
                  <div className="flex gap-3 mt-6">
                    <div className="relative flex-1">
                      {checkInDropdownOpen && (
                        <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-10">
                          {CHECKIN_OPTIONS.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => { setCheckInOption(opt); setCheckInDropdownOpen(false) }}
                              className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer ${opt === checkInOption ? "bg-gray-100 rounded-xl mx-1 w-[calc(100%-8px)]" : "hover:bg-gray-50 text-gray-700"}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                      <button
                        onClick={() => setCheckInDropdownOpen((prev) => !prev)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-left cursor-pointer hover:border-gray-400 transition-colors"
                      >
                        <p className="text-xs text-gray-400 font-medium">Check-in</p>
                        <div className="flex items-center justify-between mt-0.5">
                          <p className="text-sm font-medium text-gray-700">{checkInOption}</p>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 text-gray-400 transition-transform ${checkInDropdownOpen ? "rotate-180" : ""}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>
                      </button>
                    </div>
                    <div className="relative flex-1">
                      {checkOutDropdownOpen && (
                        <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-10">
                          {CHECKIN_OPTIONS.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => { setCheckOutOption(opt); setCheckOutDropdownOpen(false) }}
                              className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer ${opt === checkOutOption ? "bg-gray-100 rounded-xl mx-1 w-[calc(100%-8px)]" : "hover:bg-gray-50 text-gray-700"}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                      <button
                        onClick={() => setCheckOutDropdownOpen((prev) => !prev)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-left cursor-pointer hover:border-gray-400 transition-colors"
                      >
                        <p className="text-xs text-gray-400 font-medium">Check-out</p>
                        <div className="flex items-center justify-between mt-0.5">
                          <p className="text-sm font-medium text-gray-700">{checkOutOption}</p>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 text-gray-400 transition-transform ${checkOutDropdownOpen ? "rotate-180" : ""}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {calendarTab === "fleksibel" && (
                <div>
                  {/* Durasi */}
                  <h3 className="text-center font-semibold text-base mb-4">Berapa lama Anda ingin menginap?</h3>
                  <div className="flex justify-center gap-3 mb-8">
                    {FLEX_DURATIONS.map((d) => (
                      <button
                        key={d}
                        onClick={() => setFlexDuration(d)}
                        className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors cursor-pointer ${flexDuration === d ? "border-gray-900 border-2 text-gray-900" : "border-gray-300 text-gray-700 hover:border-gray-500"}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  {/* Bulan */}
                  <h3 className="text-center font-semibold text-base mb-4">Kapan Anda ingin pergi?</h3>
                  <div className="relative">
                    <style dangerouslySetInnerHTML={{ __html: '#month-scroll::-webkit-scrollbar { display: none; }' }} />
                    <div
                      id="month-scroll"
                      ref={monthScrollRef}
                      className="flex gap-2"
                      style={{ overflowX: "scroll", scrollbarWidth: "none" }}
                    >
                      {getFlexMonths().map(({ year, month }) => {
                        const key = `${year}-${month}`
                        const isSelected = flexMonthsSelected.includes(key)
                        return (
                          <button
                            key={key}
                            onClick={() => toggleFlexMonth(key)}
                            style={{ width: "calc((100% - 40px) / 6)", flexShrink: 0 }}
                            className={`flex flex-col items-center border-2 rounded-2xl py-4 cursor-pointer transition-colors ${isSelected ? "border-gray-900 bg-gray-50" : "border-gray-200 bg-white hover:border-gray-400"}`}
                          >
                            {isSelected ? (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-gray-700 mb-2">
                                <path d="M9 2v3M15 2v3" />
                                <path d="M4 4h16a1 1 0 0 1 1 1v12l-4 4H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
                                <path d="M17 17h4M17 17v4" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700 mb-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                              </svg>
                            )}
                            <span className="text-sm font-medium text-gray-800">{MONTHS_ID[month]}</span>
                            <span className="text-xs text-gray-400">{year}</span>
                          </button>
                        )
                      })}
                    </div>

                    {flexMonthOffset > 0 && (
                      <button
                        onClick={() => handleMonthScroll(flexMonthOffset - 1)}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow cursor-pointer hover:shadow-md transition-shadow text-gray-600"
                      >
                        ‹
                      </button>
                    )}

                    {flexMonthOffset + FLEX_MONTHS_VISIBLE < 12 && (
                      <button
                        onClick={() => handleMonthScroll(flexMonthOffset + 1)}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow cursor-pointer hover:shadow-md transition-shadow text-gray-600"
                      >
                        ›
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Peserta Dropdown */}
          {pesertaFocused && (
            <div className="absolute top-full right-0 mt-3 bg-white rounded-3xl shadow-2xl border border-gray-100 px-6 py-2 z-50 w-96">
              <CounterRow
                label="Dewasa"
                sublabel="Usia 13 tahun ke atas"
                count={countDewasa}
                onDecrement={() => setCountDewasa((n) => Math.max(0, n - 1))}
                onIncrement={() => setCountDewasa((n) => n + 1)}
              />
              <hr className="border-gray-100" />
              <CounterRow
                label="Anak-anak"
                sublabel="Usia 2–12"
                count={countAnak}
                onDecrement={() => setCountAnak((n) => Math.max(0, n - 1))}
                onIncrement={() => setCountAnak((n) => n + 1)}
              />
              <hr className="border-gray-100" />
              <CounterRow
                label="Balita"
                sublabel="Di bawah 2 tahun"
                count={countBalita}
                onDecrement={() => setCountBalita((n) => Math.max(0, n - 1))}
                onIncrement={() => setCountBalita((n) => n + 1)}
              />
              <hr className="border-gray-100" />
              <CounterRow
                label="Hewan peliharaan"
                sublabel={<button className="underline text-gray-400 cursor-pointer" onClick={(e) => { e.stopPropagation(); setHewanPanduModal(true) }}>Membawa hewan pemandu?</button>}
                count={countHewan}
                onDecrement={() => setCountHewan((n) => Math.max(0, n - 1))}
                onIncrement={() => {
                  if (countHewan === 0 && countDewasa === 0) setCountDewasa(1)
                  setCountHewan((n) => n + 1)
                }}
              />
            </div>
          )}
        </div>
      </div>
      {/* Hewan Pemandu Modal */}
      {hewanPanduModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setHewanPanduModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            <button
              onClick={() => setHewanPanduModal(false)}
              className="absolute top-4 left-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img
              src="/search-bar/animal.jpg"
              alt="Hewan pemandu"
              className="w-full"
            />

            <div className="px-6 py-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Hewan pemandu</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Hewan pemandu bukanlah hewan peliharaan, jadi Anda tidak perlu menambahkannya di sini.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bepergian dengan hewan pendukung emosional?{" "}
                <button className="underline font-medium text-gray-900 cursor-pointer">Baca kebijakan aksesibilitas</button>
                {" "}Airbnb.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
