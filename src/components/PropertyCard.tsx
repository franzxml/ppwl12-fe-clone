import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export type Property = {
  id: string
  title: string
  price: string
  rating: string
  image: string
  guestPick?: boolean
}

export default function PropertyCard({ property }: { property: Property }) {
  const [favorited, setFavorited] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate('/rooms')}
      className="flex-shrink-0 w-[260px] cursor-pointer"
    >
      <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gray-100">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {property.guestPick && (
          <span className="absolute top-3 left-3 bg-white/95 text-[13px] font-semibold text-gray-900 px-3 py-1.5 rounded-full shadow-sm">
            Pilihan tamu
          </span>
        )}

        <button
          aria-label={favorited ? 'Hapus dari favorit' : 'Tambahkan ke favorit'}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setFavorited((v) => !v)
          }}
          className="absolute top-3 right-3 cursor-pointer transition-transform active:scale-90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-7 h-7 drop-shadow-md"
            fill={favorited ? '#FF385C' : 'rgba(0,0,0,0.5)'}
            stroke="white"
            strokeWidth={2}
          >
            <path d="M16 28.5C-8 14.7 8 0 16 8c8-8 24 6.7 0 20.5z" />
          </svg>
        </button>
      </div>

      <div className="px-0.5">
        <p className="text-[15px] font-medium text-gray-900 leading-snug line-clamp-2">
          {property.title}
        </p>
        <p className="text-[14px] text-gray-700 mt-0.5">
          {property.price} <span className="text-gray-500">·</span>
        </p>
        <p className="text-[14px] text-gray-900 mt-0.5 flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-gray-900">
            <path d="M12 2l2.9 6.9L22 10l-5 4.8L18.4 22 12 18.3 5.6 22 7 14.8 2 10l7.1-1.1L12 2z" />
          </svg>
          {property.rating}
        </p>
      </div>
    </div>
  )
}
