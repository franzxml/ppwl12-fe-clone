import type { ReactNode } from 'react'

interface CounterRowProps {
  label: string
  sublabel?: ReactNode
  count: number
  min?: number
  onDecrement: () => void
  onIncrement: () => void
}

export default function CounterRow({ label, sublabel, count, min = 0, onDecrement, onIncrement }: CounterRowProps) {
  const atMin = count <= min
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <p className="font-semibold text-gray-900">{label}</p>
        {sublabel && <div className="text-sm text-gray-400 mt-0.5">{sublabel}</div>}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onDecrement}
          disabled={atMin}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${atMin ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
        <span className="w-5 text-center text-base font-medium text-gray-800 select-none">{count}</span>
        <button
          onClick={onIncrement}
          className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 hover:border-gray-700 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  )
}
