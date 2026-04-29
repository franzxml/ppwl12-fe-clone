import { SHORT_MONTHS_ID } from '../data/searchOptions'

export function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function formatDateShort(date: Date) {
  return `${date.getDate()} ${SHORT_MONTHS_ID[date.getMonth()]}`
}
