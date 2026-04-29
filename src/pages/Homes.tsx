import PropertyCarousel from '../components/PropertyCarousel'
import { HOME_SECTIONS } from '../data/homeSections'

export default function Homes() {
  return (
    <main className="pb-12">
      {HOME_SECTIONS.map((section) => (
        <PropertyCarousel
          key={section.title}
          title={section.title}
          properties={section.properties}
        />
      ))}
    </main>
  )
}
