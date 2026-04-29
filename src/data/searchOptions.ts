export type Destination =
  | {
      id: string
      name: string
      description: string
      type: 'nearby'
    }
  | {
      id: string
      name: string
      description: string
      type: 'location'
      image: string
    }

export const DESTINATIONS: Destination[] = [
  {
    id: 'nearby',
    name: 'Di dekat lokasi Anda',
    description: 'Cari tahu apa yang ada di sekitar Anda',
    type: 'nearby',
  },
  {
    id: 'kuching',
    name: 'Kuching, Malaysia',
    description: 'Karena ini favorit Anda: destinasi terpopuler penggemar di Kuching',
    type: 'location',
    image: '/search-bar/loc-1.png',
  },
  {
    id: 'yogyakarta',
    name: 'Yogyakarta, Yogyakarta',
    description: 'Untuk pemandangan alam seperti Candi Borobudur',
    type: 'location',
    image: '/search-bar/loc-2.webp',
  },
  {
    id: 'georgetown',
    name: 'Georgetown, Malaysia',
    description: 'Karena ada kuliner yang menarik bagi para tamu',
    type: 'location',
    image: '/search-bar/loc-3.avif',
  },
  {
    id: 'bandung',
    name: 'Bandung, Jawa Barat',
    description: 'Untuk para pencinta alam',
    type: 'location',
    image: '/search-bar/loc-4.webp',
  },
  {
    id: 'kota-kinabalu',
    name: 'Kota Kinabalu, Malaysia',
    description: 'Karena popularitas yang terus berkembang',
    type: 'location',
    image: '/search-bar/loc-5.png',
  },
  {
    id: 'bali',
    name: 'Bali, Bali',
    description: 'Destinasi wisata paling populer di Indonesia',
    type: 'location',
    image: '/search-bar/loc-6.avif',
  },
]

export const CHECKIN_OPTIONS = ['± 14 hari', '± 7 hari', '± 3 hari', '± 2 hari', '± 1 hari', 'Tanggal pasti']
export const FLEX_DURATIONS = ['Akhir pekan', 'Minggu', 'Bulan']
export const FLEX_MONTHS_VISIBLE = 6
export const MONTHS_ID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
export const SHORT_MONTHS_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
export const DAY_HEADERS = ['Min', 'Sn', 'Sl', 'R', 'Km', 'J', 'Sb']
