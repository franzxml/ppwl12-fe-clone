import { useEffect, useRef, useState } from 'react'
import CategoryIcon from '../components/rooms/CategoryIcon'
import {
  NEARBY_LISTINGS,
  NEAR_CITIES,
  ROOM_FACILITIES,
  ROOM_PHOTOS,
  ROOM_RATING_CATEGORIES,
  ROOM_REVIEWS,
  ROOM_TYPE_OPTIONS,
} from '../data/roomDetails'

export default function Rooms() {
  const [shareOpen, setShareOpen] = useState(false)
  const [embedOpen, setEmbedOpen] = useState(false)
  const [allPhotosOpen, setAllPhotosOpen] = useState(false)
  const [translateTip, setTranslateTip] = useState(true)
  const [pilihanTamuOpen, setPilihanTamuOpen] = useState(false)
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false)
  const [howReviewsOpen, setHowReviewsOpen] = useState(false)
  const [searchReviewsOpen, setSearchReviewsOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [sortValue, setSortValue] = useState('Paling relevan')
  const [expandedReviews, setExpandedReviews] = useState<Record<number, boolean>>({})
  const [mapExpanded, setMapExpanded] = useState(false)
  const [saved, setSaved] = useState(false)
  const [reviewsCarouselIdx, setReviewsCarouselIdx] = useState(0)

  const stickySpacerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <main className="max-w-[1280px] mx-auto px-6 lg:px-20 pb-12">
      {/* Title row */}
      <div className="flex items-start justify-between pt-4 pb-4">
        <div className="flex items-start gap-2 relative">
          <button
            onClick={() => setTranslateTip((p) => !p)}
            aria-label="Terjemahan otomatis"
            className="mt-1 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-7 h-7 text-gray-900">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M7 8h6M9 8v1a4 4 0 0 1-4 4M11 13a4 4 0 0 1-4-4M14 19l3-7 3 7M15 17h4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-[26px] font-semibold text-gray-900 leading-tight">
            Rumah Kolam Renang Pribadi untuk 15 orang
          </h1>
          {translateTip && (
            <div className="absolute top-10 -left-2 z-30 bg-gray-900 text-white text-sm rounded-xl px-4 py-3 w-72 shadow-xl flex items-start gap-3">
              <svg viewBox="0 0 12 12" className="absolute -top-2 left-3 w-3 h-3 fill-gray-900">
                <path d="M0 12 L6 0 L12 12 Z" />
              </svg>
              <span className="flex-1">Judul penginapan ini telah diterjemahkan secara otomatis.</span>
              <button onClick={() => setTranslateTip(false)} aria-label="Tutup" className="cursor-pointer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gray-900">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12M12 4l-4 4M12 4l4 4M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
            </svg>
            <span className="text-sm font-medium text-gray-900 underline">Bagikan</span>
          </button>
          <button
            onClick={() => setSaved((s) => !s)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <svg viewBox="0 0 32 32" fill={saved ? '#FF385C' : 'none'} stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gray-900">
              <path d="M16 28.5C-8 14.7 8 0 16 8c8-8 24 6.7 0 20.5z" />
            </svg>
            <span className="text-sm font-medium text-gray-900 underline">Simpan</span>
          </button>
        </div>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[460px] relative">
        <div className="col-span-2 row-span-2 relative bg-gray-100">
          <img src={ROOM_PHOTOS[0]} alt="" className="w-full h-full object-cover hover:brightness-95 transition cursor-pointer" />
        </div>
        <div className="relative bg-gray-100"><img src={ROOM_PHOTOS[1]} alt="" className="w-full h-full object-cover hover:brightness-95 transition cursor-pointer" /></div>
        <div className="relative bg-gray-100"><img src={ROOM_PHOTOS[2]} alt="" className="w-full h-full object-cover hover:brightness-95 transition cursor-pointer" /></div>
        <div className="relative bg-gray-100"><img src={ROOM_PHOTOS[3]} alt="" className="w-full h-full object-cover hover:brightness-95 transition cursor-pointer" /></div>
        <div className="relative bg-gray-100"><img src={ROOM_PHOTOS[4]} alt="" className="w-full h-full object-cover hover:brightness-95 transition cursor-pointer" /></div>
        <button
          onClick={() => setAllPhotosOpen(true)}
          className="absolute bottom-4 right-4 bg-white border border-gray-900 rounded-lg px-3 py-2 flex items-center gap-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 cursor-pointer shadow"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <rect x="3" y="3" width="6" height="6" rx="1" />
            <rect x="11" y="3" width="6" height="6" rx="1" />
            <rect x="3" y="11" width="6" height="6" rx="1" />
            <rect x="11" y="11" width="6" height="6" rx="1" />
          </svg>
          Tampilkan semua foto
        </button>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
        <div className="lg:col-span-2">
          {/* Header info */}
          <h2 className="text-2xl font-semibold text-gray-900">Seluruh rumah di Kuching, Malaysia</h2>
          <p className="text-gray-700 mt-1">15 tamu · 4 kamar tidur · 6 tempat tidur · 3 kamar mandi</p>

          {/* Pilihan tamu card */}
          <button
            onClick={() => setPilihanTamuOpen(true)}
            className="mt-6 w-full border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-5 hover:bg-gray-50 cursor-pointer text-left"
          >
            <div className="flex items-center gap-2">
              <LaurelLeft />
              <div>
                <p className="font-semibold text-gray-900 text-center">Pilihan</p>
                <p className="font-semibold text-gray-900 text-center">tamu</p>
              </div>
              <LaurelRight />
            </div>
            <div className="flex-1 text-sm text-gray-700">
              Salah satu rumah yang paling disukai di Airbnb, menurut tamu
            </div>
            <div className="text-center px-3 border-l border-gray-200">
              <p className="text-2xl font-semibold text-gray-900">4,95</p>
              <div className="flex justify-center text-gray-900 text-xs">★★★★★</div>
            </div>
            <div className="text-center px-3 border-l border-gray-200">
              <p className="text-2xl font-semibold text-gray-900">19</p>
              <p className="text-xs text-gray-700 underline">Ulasan</p>
            </div>
          </button>

          {/* Host */}
          <div className="flex items-center gap-4 mt-6 pb-6 border-b border-gray-200">
            <img
              src="/main/home-6.avif"
              alt="Sue"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900">Tuan rumah: Sue</p>
              <p className="text-sm text-gray-500">Tuan rumah selama 7 tahun</p>
            </div>
          </div>

          {/* Features */}
          <div className="py-6 space-y-6 border-b border-gray-200">
            <FeatureRow
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M3 14c2 0 2 1 4 1s2-1 4-1 2 1 4 1 2-1 4-1M3 18c2 0 2 1 4 1s2-1 4-1 2 1 4 1 2-1 4-1" strokeLinecap="round" /></svg>}
              title="Tunggu apa lagi?"
              desc="Ini salah satu dari sedikit tempat di area ini yang menyediakan kolam renang."
            />
            <FeatureRow
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><circle cx="12" cy="12" r="3" /><path d="M12 5v3M12 16v3M5 12h3M16 12h3M7 7l2 2M15 15l2 2M7 17l2-2M15 9l2-2" strokeLinecap="round" /></svg>}
              title="Dirancang agar tetap sejuk"
              desc="Atasi hawa panas dengan AC dan kipas angin gantung."
            />
            <FeatureRow
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><circle cx="8" cy="14" r="4" /><path d="M11 11l9-9M16 6l3 3" strokeLinecap="round" /></svg>}
              title="Pengalaman check-in luar biasa"
              desc="Tamu terakhir memberikan nilai 5 bintang untuk proses check-in."
            />
          </div>

          {/* Translation banner */}
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700">
            Beberapa info diterjemahkan secara otomatis. <button className="font-semibold underline cursor-pointer">Tampilkan bahasa asli</button>
          </div>

          {/* Description */}
          <div className="mt-6 text-gray-700 leading-relaxed text-[15px] pb-6 border-b border-gray-200">
            <p>
              Temukan tempat peristirahatan kami yang tenang di Bali, cocok untuk hingga 15 tamu. Rumah dua lantai bergaya ini memiliki empat kamar tidur luas, ruang tamu terbuka dengan dekorasi elegan, dan kolam renang luar ruangan yang menarik dengan dek matahari. Nikmati fasilitas terbaik seperti dapur lengkap, WiFi berkecepatan tinggi, smart TV, AC, dan parkir pribadi. Berlokasi strategis di dekat Farley Mall, Kuching Central, dan bandara. Sangat cocok untuk liburan yang damai atau liburan yang penuh petualangan - pesan sekarang!
            </p>
          </div>

          {/* Facilities */}
          <div className="py-8 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Fasilitas yang ditawarkan</h2>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              {ROOM_FACILITIES.map((f) => (
                <div key={f.label} className="flex items-center gap-3 text-[15px]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-gray-900 shrink-0">
                    <path d={f.icon} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className={f.strike ? 'line-through text-gray-500' : 'text-gray-900'}>{f.label}</span>
                </div>
              ))}
            </div>
            <button className="mt-6 border border-gray-900 rounded-lg px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 cursor-pointer">
              Tampilkan ke-30 fasilitas
            </button>
          </div>

          {/* Calendar */}
          <CalendarSection />
        </div>

        {/* Sticky booking column */}
        <div ref={stickySpacerRef} className="lg:col-span-1">
          <div className="sticky top-32 space-y-4">
            {/* Discount card */}
            <div className="border border-gray-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
              <svg viewBox="0 0 24 24" fill="#0ea05a" className="w-9 h-9 shrink-0">
                <path d="M3 12V3h9l9 9-9 9-9-9z" />
                <circle cx="7.5" cy="7.5" r="1.2" fill="white" />
              </svg>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Tambah satu malam dengan biaya Rp2.095.087</p>
                <p className="text-gray-600 mt-1">Perpanjang hingga 30 Apr dengan penawaran khusus ini.</p>
                <button className="mt-1 font-semibold text-gray-900 underline cursor-pointer">Tambah 1 malam</button>
              </div>
            </div>
            <BookingCard />
            <div className="text-center">
              <button className="inline-flex items-center gap-2 text-sm text-gray-700 hover:underline cursor-pointer">
                <svg viewBox="0 0 24 24" fill="#FF385C" className="w-4 h-4">
                  <path d="M3 3l8 18 2-8 8-2L3 3z" />
                </svg>
                <span className="underline">Laporkan iklan ini</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews preview */}
      <ReviewsPreview
        onOpen={() => setReviewsModalOpen(true)}
        onHowOpen={() => setHowReviewsOpen(true)}
        carouselIdx={reviewsCarouselIdx}
        setCarouselIdx={setReviewsCarouselIdx}
      />

      {/* Reviews showcase grid */}
      <ReviewsShowcase
        expanded={expandedReviews}
        setExpanded={setExpandedReviews}
        onShowAll={() => setReviewsModalOpen(true)}
        onHowOpen={() => setHowReviewsOpen(true)}
      />

      {/* Map */}
      <MapSection expanded={mapExpanded} onToggle={() => setMapExpanded((p) => !p)} />

      {/* Tuan rumah */}
      <HostDetailSection />

      {/* Hal yang perlu diketahui */}
      <ThingsToKnow />

      {/* Penginapan lainnya */}
      <NearbyListings />

      {/* Footer breadcrumb + telusuri */}
      <ExploreSection />

      {/* MODALS */}
      {shareOpen && (
        <ShareModal
          onClose={() => setShareOpen(false)}
          onEmbed={() => {
            setShareOpen(false)
            setEmbedOpen(true)
          }}
        />
      )}
      {embedOpen && <EmbedModal onClose={() => setEmbedOpen(false)} />}
      {allPhotosOpen && <AllPhotosModal onClose={() => setAllPhotosOpen(false)} />}
      {pilihanTamuOpen && (
        <PilihanTamuModal
          onClose={() => setPilihanTamuOpen(false)}
          onHowOpen={() => setHowReviewsOpen(true)}
        />
      )}
      {reviewsModalOpen && (
        <ReviewsModal
          onClose={() => setReviewsModalOpen(false)}
          onHowOpen={() => setHowReviewsOpen(true)}
          searchOpen={searchReviewsOpen}
          onSearchToggle={() => setSearchReviewsOpen((p) => !p)}
          sortOpen={sortOpen}
          setSortOpen={setSortOpen}
          sortValue={sortValue}
          setSortValue={setSortValue}
        />
      )}
      {howReviewsOpen && <HowReviewsModal onClose={() => setHowReviewsOpen(false)} />}
    </main>
  )
}

function LaurelLeft() {
  return (
    <svg viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-9 text-gray-900">
      <path d="M20 4C12 6 6 12 4 22M20 10C14 11 9 15 7 22M20 16C16 17 12 19 11 22M4 22c2 4 6 8 12 10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function LaurelRight() {
  return (
    <svg viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-9 text-gray-900 -scale-x-100">
      <path d="M20 4C12 6 6 12 4 22M20 10C14 11 9 15 7 22M20 16C16 17 12 19 11 22M4 22c2 4 6 8 12 10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FeatureRow({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-gray-900 mt-1 shrink-0">{icon}</div>
      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600 mt-0.5">{desc}</p>
      </div>
    </div>
  )
}

function BookingCard() {
  return (
    <div className="border border-gray-200 rounded-xl p-6 shadow-md bg-white">
      <p className="mb-4">
        <span className="text-2xl font-semibold underline text-gray-900">Rp9.472.179</span>
        <span className="text-gray-700"> untuk 3 malam</span>
      </p>
      <div className="border border-gray-300 rounded-xl overflow-hidden mb-3">
        <div className="grid grid-cols-2 divide-x divide-gray-300">
          <div className="px-3 py-2">
            <p className="text-[10px] font-bold text-gray-900">CHECK-IN</p>
            <p className="text-sm text-gray-700">30/4/2026</p>
          </div>
          <div className="px-3 py-2">
            <p className="text-[10px] font-bold text-gray-900">CHECK-OUT</p>
            <p className="text-sm text-gray-700">3/5/2026</p>
          </div>
        </div>
        <div className="border-t border-gray-300 px-3 py-2 flex justify-between items-center cursor-pointer">
          <div>
            <p className="text-[10px] font-bold text-gray-900">TAMU</p>
            <p className="text-sm text-gray-700">1 tamu</p>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
      <button className="w-full bg-gradient-to-r from-[#FF385C] to-[#E61E4D] hover:from-[#E61E4D] text-white font-semibold rounded-xl py-3 cursor-pointer">
        Pesan
      </button>
      <p className="text-center text-sm text-gray-600 mt-3">Anda belum dikenakan biaya</p>
    </div>
  )
}

function CalendarSection() {
  const today = new Date()
  const month1 = { year: today.getFullYear(), month: today.getMonth() }
  const month2 =
    month1.month === 11
      ? { year: month1.year + 1, month: 0 }
      : { year: month1.year, month: month1.month + 1 }
  return (
    <div className="py-8">
      <h2 className="text-xl font-semibold text-gray-900">3 malam di Kuching</h2>
      <p className="text-sm text-gray-500 mb-6">30 Apr 2026 - 3 Mei 2026</p>
      <div className="grid grid-cols-2 gap-8">
        <MiniCalendar year={month1.year} month={month1.month} highlight={[30]} />
        <MiniCalendar year={month2.year} month={month2.month} highlight={[3]} />
      </div>
      <div className="flex items-center justify-between mt-4 text-sm">
        <button className="text-gray-700 cursor-pointer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
            <rect x="3" y="11" width="18" height="6" rx="1" />
            <path d="M7 14h10" strokeLinecap="round" />
          </svg>
        </button>
        <button className="text-gray-900 underline font-medium cursor-pointer">Kosongkan tanggal</button>
      </div>
    </div>
  )
}

const MONTHS_ID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const DAY_HEADERS = ['Min', 'Sn', 'Sl', 'R', 'Km', 'J', 'Sb']

function MiniCalendar({ year, month, highlight }: { year: number; month: number; highlight: number[] }) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div>
      <p className="text-sm font-semibold text-center mb-3">{MONTHS_ID[month]} {year}</p>
      <div className="grid grid-cols-7 gap-y-1">
        {DAY_HEADERS.map((h) => (
          <div key={h} className="text-xs text-gray-500 text-center py-1 font-medium">{h}</div>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <div key={i} className="h-9" />
          const date = new Date(year, month, d)
          const isPast = date < today
          const isHighlight = highlight.includes(d)
          return (
            <div key={i} className="h-9 flex items-center justify-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm cursor-pointer ${
                isHighlight ? 'bg-gray-900 text-white' :
                isPast ? 'text-gray-300 line-through' :
                'text-gray-900 hover:border hover:border-gray-800'
              }`}>
                {d}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ReviewsPreview({
  onOpen,
  onHowOpen,
  carouselIdx,
  setCarouselIdx,
}: {
  onOpen: () => void
  onHowOpen: () => void
  carouselIdx: number
  setCarouselIdx: (i: number) => void
}) {
  return (
    <div className="py-12 border-t border-gray-200">
      <div className="text-center">
        <div className="flex justify-center items-center gap-3 mb-2">
          <LaurelLeft />
          <span className="text-5xl font-semibold text-gray-900">4,95</span>
          <LaurelRight />
        </div>
        <p className="text-xl font-semibold text-gray-900 mt-3">Pilihan tamu</p>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Rumah ini menjadi favorit tamu berdasarkan penilaian, ulasan, dan keandalannya
        </p>
        <button onClick={onHowOpen} className="mt-2 underline text-gray-900 cursor-pointer">Cara kerja ulasan</button>
      </div>

      {/* Categories carousel */}
      <div className="mt-8 relative">
        <div className="grid grid-cols-7 gap-0 items-stretch">
          {/* Nilai keseluruhan column */}
          <div className="px-4">
            <p className="text-sm text-gray-700 mb-2">Nilai keseluruhan</p>
            <div className="space-y-1 text-xs">
              {[5, 4, 3, 2, 1].map((n) => (
                <div key={n} className="flex items-center gap-2">
                  <span className="w-3 text-gray-700">{n}</span>
                  <div className="flex-1 h-0.5 bg-gray-200 rounded relative">
                    <div className="absolute left-0 top-0 bottom-0 bg-gray-900 rounded" style={{ width: n === 5 ? '90%' : n === 4 ? '15%' : '0%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {ROOM_RATING_CATEGORIES.map((c, i) => (
            <div key={c.label} className={`px-4 ${i < ROOM_RATING_CATEGORIES.length - 1 ? 'border-r border-gray-200' : ''} ${i === 0 ? 'border-l border-gray-200' : ''} flex flex-col justify-between`}>
              <div>
                <p className="text-sm text-gray-700">{c.label}</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">{c.value}</p>
              </div>
              <CategoryIcon kind={c.icon} />
            </div>
          ))}
        </div>

        {carouselIdx > 0 && (
          <button
            onClick={() => setCarouselIdx(0)}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow cursor-pointer"
          >
            ‹
          </button>
        )}
        {carouselIdx === 0 && (
          <button
            onClick={() => setCarouselIdx(1)}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow cursor-pointer"
          >
            ›
          </button>
        )}
      </div>

      <div className="text-center mt-8">
        <button onClick={onOpen} className="border border-gray-900 rounded-lg px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 cursor-pointer">
          Tampilkan ke-19 ulasan
        </button>
      </div>
    </div>
  )
}

function ReviewsShowcase({
  expanded,
  setExpanded,
  onShowAll,
  onHowOpen,
}: {
  expanded: Record<number, boolean>
  setExpanded: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
  onShowAll: () => void
  onHowOpen: () => void
}) {
  const visible = ROOM_REVIEWS.slice(0, 6)
  return (
    <div className="py-8 border-t border-gray-200">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-3 mb-2">
          <LaurelLeft />
          <span className="text-5xl font-semibold text-gray-900">4,95</span>
          <LaurelRight />
        </div>
        <p className="text-xl font-semibold text-gray-900 mt-3">Pilihan tamu</p>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Rumah ini menjadi favorit tamu berdasarkan penilaian, ulasan, dan keandalannya
        </p>
        <button onClick={onHowOpen} className="mt-2 underline text-gray-900 cursor-pointer">Cara kerja ulasan</button>
      </div>

      <div className="grid grid-cols-7 gap-0 items-stretch mb-10">
        <div className="px-4">
          <p className="text-sm text-gray-700 mb-2">Nilai keseluruhan</p>
          <div className="space-y-1 text-xs">
            {[5, 4, 3, 2, 1].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <span className="w-3 text-gray-700">{n}</span>
                <div className="flex-1 h-0.5 bg-gray-200 rounded relative">
                  <div className="absolute left-0 top-0 bottom-0 bg-gray-900 rounded" style={{ width: n === 5 ? '90%' : n === 4 ? '15%' : '0%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {ROOM_RATING_CATEGORIES.map((c, i) => (
          <div key={c.label} className={`px-4 ${i < ROOM_RATING_CATEGORIES.length - 1 ? 'border-r border-gray-200' : ''} ${i === 0 ? 'border-l border-gray-200' : ''} flex flex-col justify-between`}>
            <div>
              <p className="text-sm text-gray-700">{c.label}</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{c.value}</p>
            </div>
            <CategoryIcon kind={c.icon} />
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        {visible.map((r, i) => {
          const isExpanded = expanded[i]
          return (
            <div key={i}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold">
                  {r.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.years}</p>
                </div>
              </div>
              <p className="text-sm text-gray-900 mt-2">★★★★★ · {r.date}</p>
              <p className={`text-[15px] text-gray-800 mt-2 ${isExpanded ? '' : 'line-clamp-3'}`}>
                {r.text}
              </p>
              {r.text.length > 120 && (
                <button
                  onClick={() => setExpanded((p) => ({ ...p, [i]: !p[i] }))}
                  className="mt-2 underline font-medium text-gray-900 cursor-pointer"
                >
                  {isExpanded ? 'Tampilkan lebih sedikit' : 'Tampilkan lebih banyak'}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <button
        onClick={onShowAll}
        className="mt-10 border border-gray-900 rounded-lg px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 cursor-pointer"
      >
        Tampilkan ke-19 ulasan
      </button>
    </div>
  )
}

function MapSection({ expanded: _e, onToggle: _t }: { expanded: boolean; onToggle: () => void }) {
  return (
    <div className="py-8 border-t border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Lokasi Anda</h2>
      <p className="text-gray-700 mb-4">Kuching, Sarawak, Malaysia</p>
      <div className="rounded-2xl overflow-hidden h-[420px] bg-gray-100 border border-gray-200 relative">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=110.25,1.45,110.45,1.65&layer=mapnik&marker=1.55,110.35"
          className="w-full h-full"
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>
    </div>
  )
}

function HostDetailSection() {
  return (
    <div className="py-8 border-t border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Tuan rumah Anda</h2>
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <div className="border border-gray-200 rounded-3xl shadow-md p-6 max-w-md flex gap-6">
            <div className="text-center">
              <div className="relative inline-block">
                <img src="/main/home-6.avif" alt="" className="w-24 h-24 rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 w-7 h-7 bg-[#FF385C] rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-3 h-3">
                    <path d="M5 12l5 5 9-9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-gray-900">Sue</p>
              <p className="text-sm text-gray-700">Tuan Rumah</p>
            </div>
            <div className="flex-1 space-y-4 border-l border-gray-200 pl-6">
              <div>
                <p className="text-lg font-semibold text-gray-900">230</p>
                <p className="text-xs text-gray-700">Ulasan</p>
              </div>
              <hr className="border-gray-200" />
              <div>
                <p className="text-lg font-semibold text-gray-900">4,8★</p>
                <p className="text-xs text-gray-700">Nilai</p>
              </div>
              <hr className="border-gray-200" />
              <div>
                <p className="text-lg font-semibold text-gray-900">7</p>
                <p className="text-xs text-gray-700">Tahun menjadi tuan rumah</p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm text-gray-800 max-w-md">
            <p className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
              Saya menguasai bahasa Tionghoa, Inggris, dan Melayu
            </p>
            <p className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /></svg>
              Tinggal di Kuala Lumpur, Malaysia
            </p>
          </div>

          <div className="mt-6 max-w-md text-[15px] text-gray-800 leading-relaxed">
            <p>
              Dengan 10+ tahun di industri hotel dan sekarang 6+ tahun menerima tamu, keramahtamahan ada dalam DNA saya. Meskipun saya telah beralih ke pos pemasaran selama pandemi, menerima tamu tetap menjadi kegembiraan saya - saya mencurahkan inspirasi perjalanan global saya dan memperhatikan detail setiap masa inap, memastikan Anda merasakan kehangatan Malaysia dengan kenyamanan duniawi.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Detail Tuan Rumah</h3>
          <p className="text-gray-700">Tingkat respons: 100%</p>
          <p className="text-gray-700">Menanggapi dalam satu jam</p>
          <hr className="my-6 border-gray-200" />
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 flex items-start gap-3">
            <svg viewBox="0 0 24 24" fill="#FF385C" className="w-5 h-5 mt-0.5 shrink-0">
              <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" />
            </svg>
            <p>Untuk membantu melindungi pembayaran Anda, pastikan Anda selalu menggunakan Airbnb untuk mengirimkan uang dan berkomunikasi dengan tuan rumah.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ThingsToKnow() {
  return (
    <div className="py-8 border-t border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Hal yang perlu diketahui</h2>
      <div className="grid md:grid-cols-3 gap-8 text-[15px]">
        <div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 mb-3 text-gray-900">
            <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18" strokeLinecap="round" />
          </svg>
          <p className="font-semibold mb-2">Kebijakan pembatalan</p>
          <p className="text-gray-700 mb-2">Jika dibatalkan sebelum check-in pada tanggal 30 April, Anda akan mendapatkan pengembalian uang sebagian. Setelah itu, pengembalian uang bergantung pada kapan Anda membatalkan reservasi.</p>
          <p className="text-gray-700 mb-2">Baca kebijakan lengkap tuan rumah ini untuk detail selengkapnya.</p>
          <button className="underline font-medium text-gray-900 cursor-pointer">Pelajari selengkapnya</button>
        </div>
        <div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 mb-3 text-gray-900">
            <circle cx="8" cy="14" r="4" /><path d="M11 11l9-9M16 6l3 3" strokeLinecap="round" />
          </svg>
          <p className="font-semibold mb-2">Peraturan rumah</p>
          <p className="text-gray-700">Check-in: 15.00 - 23.00</p>
          <p className="text-gray-700">Check-out sebelum 11.00</p>
          <p className="text-gray-700 mb-2">Maksimum 15 tamu</p>
          <button className="underline font-medium text-gray-900 cursor-pointer">Pelajari selengkapnya</button>
        </div>
        <div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 mb-3 text-gray-900">
            <path d="M12 3l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-semibold mb-2">Keselamatan & properti</p>
          <p className="text-gray-700">Alarm karbon monoksida tidak dilaporkan</p>
          <p className="text-gray-700 mb-2">Alarm asap tidak dilaporkan</p>
          <button className="underline font-medium text-gray-900 cursor-pointer">Pelajari selengkapnya</button>
        </div>
      </div>
    </div>
  )
}

function NearbyListings() {
  const [page, setPage] = useState(0)
  const totalPages = 2
  return (
    <div className="py-8 border-t border-gray-200">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-gray-900">Penginapan lainnya di sekitar</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">{page + 1} / {totalPages}</span>
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className={`w-8 h-8 rounded-full border flex items-center justify-center ${page === 0 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-700 hover:bg-gray-50 cursor-pointer'}`}
          >
            ‹
          </button>
          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            className={`w-8 h-8 rounded-full border flex items-center justify-center ${page === totalPages - 1 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-700 hover:bg-gray-50 cursor-pointer'}`}
          >
            ›
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {NEARBY_LISTINGS.map((p) => (
          <div key={p.title} className="cursor-pointer">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-2">
              <img src={p.img} alt="" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm font-medium text-gray-900 line-clamp-2">{p.title}</p>
            <p className="text-sm text-gray-700 mt-0.5">{p.price} <span className="inline-flex items-center gap-0.5">★ {p.rating}</span></p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ExploreSection() {
  return (
    <div className="py-8 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-700">
        <button className="hover:underline cursor-pointer font-medium">Airbnb</button>
        <span>›</span>
        <button className="hover:underline cursor-pointer font-medium">Malaysia</button>
        <span>›</span>
        <button className="hover:underline cursor-pointer font-medium">Sarawak</button>
        <span>›</span>
        <button className="hover:underline cursor-pointer font-medium">Kuching</button>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-6">Telusuri pilihan lainnya di Kuching dan sekitarnya</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 mb-10">
        {NEAR_CITIES.map((c) => (
          <button key={c.name} className="text-left cursor-pointer">
            <p className="text-sm font-semibold text-gray-900">{c.name}</p>
            <p className="text-sm text-gray-500">{c.type}</p>
          </button>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-6">Tipe penginapan lainnya di Airbnb</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-8">
        {ROOM_TYPE_OPTIONS.map((t, i) => (
          <button key={i} className="text-left text-sm font-medium text-gray-900 hover:underline cursor-pointer">
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ============================== MODALS ============================== */

function ModalShell({
  children,
  onClose,
  size = 'md',
  closeButtonPos = 'tr',
}: {
  children: React.ReactNode
  onClose: () => void
  size?: 'md' | 'lg' | 'xl'
  closeButtonPos?: 'tr' | 'tl'
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const widthClass = size === 'xl' ? 'max-w-4xl' : size === 'lg' ? 'max-w-2xl' : 'max-w-lg'

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={`relative bg-white rounded-3xl shadow-2xl w-full ${widthClass} max-h-[90vh] overflow-y-auto`}>
        <button
          onClick={onClose}
          aria-label="Tutup"
          className={`absolute top-4 ${closeButtonPos === 'tl' ? 'left-4' : 'right-4'} z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gray-900">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  )
}

function ShareModal({ onClose, onEmbed }: { onClose: () => void; onEmbed: () => void }) {
  const [copied, setCopied] = useState(false)
  const onCopy = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const items: { label: string; icon: React.ReactNode; onClick?: () => void }[] = [
    { label: 'Salin Tautan', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><rect x="4" y="6" width="14" height="14" rx="2" /><path d="M8 4h12v12" strokeLinecap="round" /></svg>, onClick: onCopy },
    { label: 'Email', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg> },
    { label: 'Pesan', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path d="M4 5h16v12H8l-4 4V5z" strokeLinecap="round" strokeLinejoin="round" /></svg> },
    { label: 'WhatsApp', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><circle cx="12" cy="12" r="9" /><path d="M16 14c-1 1-3 0-4-1s-2-3-1-4" /></svg> },
    { label: 'Messenger', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6 2 2 6 2 11c0 3 1 5 4 7v4l3-2c1 0 2 1 3 1 6 0 10-4 10-10S18 2 12 2z" /></svg> },
    { label: 'Facebook', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M22 12a10 10 0 1 0-12 10v-7H7v-3h3V9c0-3 2-5 5-5h2v3h-2c-1 0-1 1-1 2v2h3l-1 3h-2v7a10 10 0 0 0 8-9z" /></svg> },
    { label: 'Twitter', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3 3h4l5 7 5-7h4l-7 9 8 9h-4l-6-8-6 8H2l8-9-7-9z" /></svg> },
    { label: 'Sematkan', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" strokeLinecap="round" strokeLinejoin="round" /></svg>, onClick: onEmbed },
  ]

  return (
    <ModalShell onClose={onClose}>
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Bagikan tempat ini</h2>
        <div className="flex items-start gap-4 mb-6">
          <img src={ROOM_PHOTOS[0]} alt="" className="w-16 h-16 rounded-xl object-cover" />
          <p className="text-sm text-gray-900">
            Rumah · Kuching · ★4,95 · 4 kamar tidur · 6 tempat tidur · 3 kamar mandi pribadi
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {items.slice(0, 7).map((it) => (
            <button
              key={it.label}
              onClick={it.onClick}
              className="border border-gray-300 rounded-xl px-4 py-4 flex items-center gap-3 text-sm font-medium text-gray-900 hover:border-gray-900 cursor-pointer"
            >
              {it.icon}
              {it.label}
            </button>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            onClick={onEmbed}
            className="border border-gray-300 rounded-xl px-4 py-4 flex items-center gap-3 text-sm font-medium text-gray-900 hover:border-gray-900 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
              <circle cx="6" cy="12" r="1.4" />
              <circle cx="12" cy="12" r="1.4" />
              <circle cx="18" cy="12" r="1.4" />
            </svg>
            Opsi lainnya
          </button>
        </div>

        {copied && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-lg flex items-center gap-2 z-[300]">
            <span className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5 9-9" /></svg>
            </span>
            <span className="text-sm font-medium text-gray-900">Tautan Disalin</span>
          </div>
        )}
      </div>
    </ModalShell>
  )
}

function EmbedModal({ onClose }: { onClose: () => void }) {
  const html = '<div class="airbnb-embed-frame" data-id="1380232605919031155" data-view="home" data-hide-price="true" style="width: 450px; height: 300px; margin: auto;"><a href="https://www.airbnb.co.id/rooms/1380232605919031155">Lihat di Airbnb</a><script async src="https://www.airbnb.co.id/embeddable/airbnb_jssdk"></script></div>'
  const [copied, setCopied] = useState(false)
  return (
    <ModalShell onClose={onClose} size="xl">
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Sematkan penginapan ini</h2>
          <p className="font-semibold text-gray-900 mb-3">Sesuaikan kode Anda:</p>
          <label className="flex items-center gap-3 mb-2">
            <input type="checkbox" className="w-5 h-5 rounded border-gray-400" />
            <span className="text-sm text-gray-800">Sembunyikan ulasan</span>
          </label>
          <label className="flex items-center gap-3 mb-6">
            <input type="checkbox" className="w-5 h-5 rounded border-gray-400" />
            <span className="text-sm text-gray-800">Buat tautan "tidak ikut"</span>
          </label>
          <p className="font-semibold text-gray-900 mb-3">Salin dan rekatkan HTML berikut ke kode situs web Anda:</p>
          <div className="border border-gray-300 rounded-xl p-3 mb-4 max-h-32 overflow-y-auto">
            <code className="text-xs text-gray-600 break-all">{html}</code>
          </div>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(html).catch(() => {})
              setCopied(true)
              setTimeout(() => setCopied(false), 1500)
            }}
            className="bg-gray-900 text-white rounded-lg px-5 py-2.5 text-sm font-semibold hover:bg-gray-800 cursor-pointer"
          >
            {copied ? 'Tersalin!' : 'Salin HTML'}
          </button>
          <button onClick={onClose} className="block mt-12 underline font-medium text-gray-900 cursor-pointer">Kembali</button>
        </div>
        <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-md">
          <div className="relative">
            <span className="absolute top-3 left-3 bg-white/90 text-gray-900 text-xs font-semibold px-2 py-1 rounded">PRATINJAU</span>
            <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M16 28.5C-8 14.7 8 0 16 8c8-8 24 6.7 0 20.5z" /></svg>
            </span>
            <img src={ROOM_PHOTOS[0]} alt="" className="w-full h-64 object-cover" />
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-900">Rumah · Kuching · ★4,95 · 4 kamar tidur · 6 tempat tidur · 3 kamar mandi pribadi</p>
            <p className="text-sm text-gray-900 mt-2">★ 4.95 (19 ulasan)</p>
            <div className="border-t border-gray-200 mt-3 pt-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 underline">Lihat di Airbnb</span>
              <svg viewBox="0 0 32 32" fill="#FF385C" className="w-5 h-5"><path d="M16 28.5C-8 14.7 8 0 16 8c8-8 24 6.7 0 20.5z" /></svg>
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  )
}

function AllPhotosModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] bg-white overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-100 z-10 px-6 py-4 flex items-center justify-between">
        <button
          onClick={onClose}
          aria-label="Kembali"
          className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 underline cursor-pointer text-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12M12 4l-4 4M12 4l4 4M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
            </svg>
            Bagikan
          </button>
          <button className="flex items-center gap-2 underline cursor-pointer text-sm">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path d="M16 28.5C-8 14.7 8 0 16 8c8-8 24 6.7 0 20.5z" />
            </svg>
            Simpan
          </button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <img src={ROOM_PHOTOS[0]} alt="" className="aspect-square object-cover rounded-xl" />
          <img src={ROOM_PHOTOS[1]} alt="" className="aspect-square object-cover rounded-xl" />
          <img src={ROOM_PHOTOS[2]} alt="" className="aspect-square object-cover rounded-xl" />
          <img src={ROOM_PHOTOS[3]} alt="" className="aspect-square object-cover rounded-xl" />
        </div>
        <img src={ROOM_PHOTOS[4]} alt="" className="w-full aspect-[16/9] object-cover rounded-xl" />
        {ROOM_PHOTOS.slice(5).map((p, i) => (
          <img key={i} src={p} alt="" className="w-full aspect-[16/9] object-cover rounded-xl" />
        ))}
      </div>
    </div>
  )
}

function PilihanTamuModal({ onClose, onHowOpen }: { onClose: () => void; onHowOpen: () => void }) {
  return (
    <ModalShell onClose={onClose} size="lg">
      <div className="p-10">
        <div className="text-center">
          <div className="flex justify-center items-center gap-3">
            <LaurelLeft />
            <span className="text-5xl font-semibold text-gray-900">4,95</span>
            <LaurelRight />
          </div>
          <p className="text-xl font-semibold text-gray-900 mt-3">Pilihan tamu</p>
          <p className="text-gray-600 mt-3 max-w-md mx-auto">
            Rumah ini menjadi favorit tamu berdasarkan penilaian, ulasan, dan keandalannya
          </p>
          <button onClick={onHowOpen} className="mt-3 underline text-gray-900 cursor-pointer">Cara kerja ulasan</button>
        </div>
        <div className="bg-gray-50 rounded-2xl mt-8 p-6 grid grid-cols-6 gap-0 items-stretch relative">
          <div className="px-3">
            <p className="text-sm text-gray-700 mb-2">Nilai keseluruhan</p>
            <div className="space-y-1 text-xs">
              {[5, 4, 3, 2, 1].map((n) => (
                <div key={n} className="flex items-center gap-2">
                  <span className="w-3 text-gray-700">{n}</span>
                  <div className="flex-1 h-0.5 bg-gray-200 relative">
                    <div className="absolute left-0 top-0 bottom-0 bg-gray-900" style={{ width: n === 5 ? '90%' : n === 4 ? '15%' : '0%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {ROOM_RATING_CATEGORIES.slice(0, 5).map((c, i) => (
            <div key={c.label} className={`px-3 ${i < 4 ? 'border-r border-gray-200' : ''} border-l border-gray-200 flex flex-col justify-between`}>
              <div>
                <p className="text-xs text-gray-700">{c.label}</p>
                <p className="text-base font-semibold text-gray-900">{c.value}</p>
              </div>
              <CategoryIcon kind={c.icon} />
            </div>
          ))}
          <button className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow cursor-pointer text-gray-600">›</button>
        </div>
      </div>
    </ModalShell>
  )
}

function HowReviewsModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cara kerja ulasan</h2>
        <div className="space-y-4 text-gray-800 text-[15px] leading-relaxed">
          <p>
            Ulasan dari tamu terdahulu akan membantu komunitas Airbnb mendapatkan informasi lebih lanjut tentang setiap penginapan. Secara default, ulasan diurutkan berdasarkan relevansinya. Relevansi ditentukan menurut ulasan terbaru, panjang ulasan, dan informasi yang Anda berikan kepada kami, seperti pencarian pemesanan, negara, dan preferensi bahasa Anda.
          </p>
          <p>
            Hanya tamu yang memesan reservasi yang bisa memberikan ulasan. Airbnb hanya akan memoderasi ulasan yang diberi tanda bendera karena tidak mematuhi kebijakan kami.
          </p>
          <p>
            Agar memenuhi syarat untuk mendapatkan peringkat persentase tertentu atau label pilihan tamu, iklan tempat membutuhkan setidaknya 5 ulasan dalam 4 tahun terakhir. Kriterianya dapat berubah.
          </p>
        </div>
        <button className="mt-6 underline font-semibold text-gray-900 cursor-pointer">Pelajari lebih lanjut di Pusat Bantuan</button>
      </div>
    </ModalShell>
  )
}

function ReviewsModal({
  onClose,
  onHowOpen,
  searchOpen,
  onSearchToggle,
  sortOpen,
  setSortOpen,
  sortValue,
  setSortValue,
}: {
  onClose: () => void
  onHowOpen: () => void
  searchOpen: boolean
  onSearchToggle: () => void
  sortOpen: boolean
  setSortOpen: (b: boolean) => void
  sortValue: string
  setSortValue: (v: string) => void
}) {
  const SORT_OPTIONS = ['Paling relevan', 'Paling baru', 'Penilaian tertinggi', 'Penilaian terendah']
  return (
    <ModalShell onClose={onClose} size="lg">
      <div className="p-8">
        {!searchOpen && (
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-3">
              <LaurelLeft />
              <span className="text-5xl font-semibold text-gray-900">4,95</span>
              <LaurelRight />
            </div>
            <p className="text-xl font-semibold text-gray-900 mt-3">Pilihan tamu</p>
            <p className="text-gray-600 mt-3 max-w-md mx-auto">
              Rumah ini menjadi favorit tamu berdasarkan penilaian, ulasan, dan keandalannya
            </p>
            <button onClick={onHowOpen} className="mt-3 underline text-gray-900 cursor-pointer">Cara kerja ulasan</button>
          </div>
        )}

        {!searchOpen && (
          <div className="bg-gray-50 rounded-2xl p-5 grid grid-cols-6 gap-0 items-stretch relative mb-6">
            <div className="px-3">
              <p className="text-sm text-gray-700 mb-2">Nilai keseluruhan</p>
              <div className="space-y-1 text-xs">
                {[5, 4, 3, 2, 1].map((n) => (
                  <div key={n} className="flex items-center gap-2">
                    <span className="w-3 text-gray-700">{n}</span>
                    <div className="flex-1 h-0.5 bg-gray-200 relative">
                      <div className="absolute left-0 top-0 bottom-0 bg-gray-900" style={{ width: n === 5 ? '90%' : n === 4 ? '15%' : '0%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {ROOM_RATING_CATEGORIES.slice(0, 5).map((c, i) => (
              <div key={c.label} className={`px-3 ${i < 4 ? 'border-r border-gray-200' : ''} border-l border-gray-200 flex flex-col justify-between`}>
                <div>
                  <p className="text-xs text-gray-700">{c.label}</p>
                  <p className="text-base font-semibold text-gray-900">{c.value}</p>
                </div>
                <CategoryIcon kind={c.icon} />
              </div>
            ))}
            <button className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow cursor-pointer text-gray-600">›</button>
          </div>
        )}

        {searchOpen ? (
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 flex items-center gap-3 border border-gray-900 rounded-full px-5 py-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.25 5.25a7.5 7.5 0 0 0 11.4 11.4Z" />
              </svg>
              <input autoFocus placeholder="Cari semua ulasan" className="flex-1 outline-none text-sm text-gray-700" />
            </div>
            <button onClick={onSearchToggle} className="font-semibold text-gray-900 underline cursor-pointer">Batalkan</button>
          </div>
        ) : null}

        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-gray-900">19 ulasan</p>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="border border-gray-300 rounded-full px-4 py-1.5 flex items-center gap-2 text-sm cursor-pointer"
              >
                {sortValue}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={`w-3 h-3 transition-transform ${sortOpen ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-10 w-56">
                  {SORT_OPTIONS.map((o) => (
                    <button
                      key={o}
                      onClick={() => { setSortValue(o); setSortOpen(false) }}
                      className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${o === sortValue ? 'font-semibold text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={onSearchToggle} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.25 5.25a7.5 7.5 0 0 0 11.4 11.4Z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {ROOM_REVIEWS.map((r, i) => (
            <div key={i} className="border-b border-gray-100 pb-6 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold">{r.avatar}</div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.years}</p>
                </div>
              </div>
              <p className="text-sm text-gray-900 mt-2">★★★★★ · {r.date}</p>
              <p className="text-[15px] text-gray-800 mt-2">{r.text}</p>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M7 8h6M9 8v1a4 4 0 0 1-4 4M11 13a4 4 0 0 1-4-4" strokeLinecap="round" />
                </svg>
                Diterjemahkan <button className="underline">Tampilkan bahasa asli</button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </ModalShell>
  )
}
