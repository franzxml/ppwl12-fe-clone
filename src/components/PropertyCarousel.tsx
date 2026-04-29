import { useEffect, useRef, useState } from 'react'
import PropertyCard, { type Property } from './PropertyCard'

function SeeAllCard({ images }: { images: string[] }) {
  const [a, b, c] = images
  return (
    <div className="flex-shrink-0 w-[260px] cursor-pointer">
      <div className="relative aspect-square rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-gray-200 flex flex-col items-center justify-center gap-3">
        <div className="relative w-[140px] h-[100px]">
          {c && (
            <img
              src={c}
              alt=""
              className="absolute left-0 top-2 w-[80px] h-[80px] object-cover rounded-lg shadow-md -rotate-12 border-2 border-white"
            />
          )}
          {b && (
            <img
              src={b}
              alt=""
              className="absolute left-1/2 -translate-x-1/2 top-0 w-[80px] h-[80px] object-cover rounded-lg shadow-md border-2 border-white z-10"
            />
          )}
          {a && (
            <img
              src={a}
              alt=""
              className="absolute right-0 top-2 w-[80px] h-[80px] object-cover rounded-lg shadow-md rotate-12 border-2 border-white"
            />
          )}
        </div>
        <p className="text-[15px] font-semibold text-gray-900">Lihat semua</p>
      </div>
    </div>
  )
}

export default function PropertyCarousel({
  title,
  properties,
}: {
  title: string
  properties: Property[]
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const updateArrows = () => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    updateArrows()
    const el = scrollRef.current
    if (!el) return
    const onResize = () => updateArrows()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.85
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const previewImages = properties.slice(0, 3).map((p) => p.image)

  return (
    <section className="px-6 md:px-10 lg:px-16 py-6">
      <div className="flex items-center justify-between mb-5">
        <button className="flex items-center gap-3 group cursor-pointer">
          <h2 className="text-[22px] md:text-2xl font-semibold text-gray-900">{title}</h2>
          <span className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-3.5 h-3.5 text-gray-900">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </button>

        <div className="hidden md:flex gap-2">
          <button
            disabled={!canLeft}
            onClick={() => scroll('left')}
            aria-label="Sebelumnya"
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
              canLeft
                ? 'border-gray-700 text-gray-900 hover:bg-gray-50 cursor-pointer'
                : 'border-gray-200 text-gray-300 cursor-not-allowed'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            disabled={!canRight}
            onClick={() => scroll('right')}
            aria-label="Berikutnya"
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
              canRight
                ? 'border-gray-700 text-gray-900 hover:bg-gray-50 cursor-pointer'
                : 'border-gray-200 text-gray-300 cursor-not-allowed'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={updateArrows}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
        <SeeAllCard images={previewImages} />
      </div>
    </section>
  )
}
