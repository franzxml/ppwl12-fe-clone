import { DAY_HEADERS, MONTHS_ID } from '../../data/searchOptions'
import { isSameDay } from '../../utils/date'

interface MonthGridProps {
  year: number
  month: number
  checkIn: Date | null
  checkOut: Date | null
  hoveredDate: Date | null
  onDayClick: (date: Date) => void
  onDayHover: (date: Date | null) => void
  today: Date
}

export default function MonthGrid({ year, month, checkIn, checkOut, hoveredDate, onDayClick, onDayHover, today }: MonthGridProps) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  const cells: (Date | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)

  const effectiveEnd = checkIn && !checkOut ? hoveredDate : checkOut

  return (
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-center mb-3">
        {MONTHS_ID[month]} {year}
      </p>
      <div className="grid grid-cols-7">
        {DAY_HEADERS.map((h) => (
          <div key={h} className="text-xs text-gray-500 text-center py-1.5 font-medium">
            {h}
          </div>
        ))}
        {cells.map((date, i) => {
          if (!date) return <div key={i} className="h-10" />

          const isPast = date < today && !isSameDay(date, today)
          const isStart = checkIn ? isSameDay(date, checkIn) : false
          const isEnd = checkOut ? isSameDay(date, checkOut) : false
          const isHoverEnd = !checkOut && hoveredDate ? isSameDay(date, hoveredDate) : false

          const inRange =
            checkIn && effectiveEnd
              ? date > (checkIn < effectiveEnd ? checkIn : effectiveEnd) &&
                date < (checkIn < effectiveEnd ? effectiveEnd : checkIn)
              : false

          const showRangeRight = isStart && effectiveEnd && checkIn && effectiveEnd > checkIn
          const showRangeLeft =
            (isEnd && checkIn) || (isHoverEnd && checkIn && hoveredDate && hoveredDate > checkIn)

          const isSelected = isStart || isEnd || (isHoverEnd && !checkOut)

          return (
            <div key={i} className="relative flex items-center justify-center h-10">
              {inRange && <div className="absolute inset-0 bg-gray-100" />}
              {showRangeRight && <div className="absolute inset-y-0 left-1/2 right-0 bg-gray-100" />}
              {showRangeLeft && !isStart && <div className="absolute inset-y-0 right-1/2 left-0 bg-gray-100" />}

              <button
                disabled={isPast}
                onClick={() => !isPast && onDayClick(date)}
                onMouseEnter={() => !isPast && onDayHover(date)}
                onMouseLeave={() => onDayHover(null)}
                className={[
                  'relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm transition-colors',
                  isPast ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer',
                  isSelected ? 'bg-gray-900 text-white' : '',
                  !isPast && !isSelected ? 'hover:border hover:border-gray-800' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {date.getDate()}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
