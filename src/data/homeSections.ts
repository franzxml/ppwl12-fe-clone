import type { Property } from '../components/PropertyCard'

const HOME_IMAGES = Array.from({ length: 8 }, (_, i) => `/main/home-${i + 1}.avif`)

function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function pickImages(): string[] {
  return shuffle(HOME_IMAGES).slice(0, 7)
}

type SectionSpec = {
  title: string
  cards: Omit<Property, 'image' | 'id'>[]
}

const HOME_SECTION_SPECS: SectionSpec[] = [
  {
    title: 'Penginapan populer di Kuching Division',
    cards: [
      { title: 'Rumah di Kuching', price: 'Rp7.344.618 untuk 2 malam', rating: '4,95', guestPick: true },
      { title: 'Apartemen di Kuching', price: 'Rp1.240.590 untuk 2 malam', rating: '4,96', guestPick: true },
      { title: 'Kondominium di Kuching', price: 'Rp2.183.250 untuk 2 malam', rating: '5,0', guestPick: true },
      { title: 'Apartemen di Kuching', price: 'Rp2.172.345 untuk 2 malam', rating: '4,94', guestPick: true },
      { title: 'Apartemen di Kuching', price: 'Rp1.909.707 untuk 2 malam', rating: '4,77' },
      { title: 'Apartemen di Kuching', price: 'Rp2.967.788 untuk 2 malam', rating: '4,96', guestPick: true },
      { title: 'Kondominium di Kuching', price: 'Rp1.770.342 untuk 2 malam', rating: '4,89', guestPick: true },
    ],
  },
  {
    title: 'Tersedia bulan depan di Kuala Lumpur',
    cards: [
      { title: 'Apartemen di Wilayah Persekutuan', price: 'Rp3.391.019 untuk 2 malam', rating: '4,86' },
      { title: 'Apartemen di Kuala Lumpur', price: 'Rp2.574.484 untuk 2 malam', rating: '4,77' },
      { title: 'Apartemen di Kuala Lumpur', price: 'Rp2.881.886 untuk 2 malam', rating: '4,83' },
      { title: 'Apartemen di Kuala Lumpur', price: 'Rp6.881.593 untuk 2 malam', rating: '4,96', guestPick: true },
      { title: 'Apartemen di Kuala Lumpur', price: 'Rp5.148.095 untuk 2 malam', rating: '4,81' },
      { title: 'Kondominium di Kuala Lumpur', price: 'Rp2.322.616 untuk 2 malam', rating: '4,9', guestPick: true },
      { title: 'Apartemen di Kuala Lumpur', price: 'Rp2.881.886 untuk 2 malam', rating: '4,84' },
    ],
  },
  {
    title: 'Penginapan di Jakarta',
    cards: [
      { title: 'Apartemen di Tanah Abang', price: 'Rp3.336.173 untuk 2 malam', rating: '4,96', guestPick: true },
      { title: 'Rumah di Kecamatan Ciputat Timur', price: 'Rp5.610.026 untuk 2 malam', rating: '4,8', guestPick: true },
      { title: 'Apartemen di Tanah Abang', price: 'Rp1.999.998 untuk 2 malam', rating: '4,8' },
      { title: 'Apartemen di Kecamatan Menteng', price: 'Rp1.198.347 untuk 2 malam', rating: '4,85', guestPick: true },
      { title: 'Apartemen di Grogol petamburan', price: 'Rp1.567.337 untuk 2 malam', rating: '4,9', guestPick: true },
      { title: 'Apartemen di Kebayoran Lama', price: 'Rp2.839.684 untuk 2 malam', rating: '4,87' },
      { title: 'Apartemen di Penjaringan', price: 'Rp1.835.554 untuk 2 malam', rating: '5,0' },
    ],
  },
  {
    title: 'Penginapan populer di Bali',
    cards: [
      { title: 'Vila di Canggu', price: 'Rp4.250.000 untuk 2 malam', rating: '4,93', guestPick: true },
      { title: 'Vila di Seminyak', price: 'Rp3.890.500 untuk 2 malam', rating: '4,88', guestPick: true },
      { title: 'Bungalo di Ubud', price: 'Rp1.450.700 untuk 2 malam', rating: '4,95', guestPick: true },
      { title: 'Vila di Uluwatu', price: 'Rp6.120.300 untuk 2 malam', rating: '4,81' },
      { title: 'Apartemen di Kuta', price: 'Rp980.450 untuk 2 malam', rating: '4,72' },
      { title: 'Vila di Nusa Dua', price: 'Rp5.340.890 untuk 2 malam', rating: '4,98', guestPick: true },
      { title: 'Rumah di Sanur', price: 'Rp2.180.600 untuk 2 malam', rating: '4,89' },
    ],
  },
]

export const HOME_SECTIONS: { title: string; properties: Property[] }[] = HOME_SECTION_SPECS.map(
  (section, sectionIdx) => {
    const images = pickImages()
    return {
      title: section.title,
      properties: section.cards.map((card, i) => ({
        ...card,
        id: `s${sectionIdx}-${i}`,
        image: images[i],
      })),
    }
  },
)
