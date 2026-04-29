export default function Langganan() {
  return (
    <main className="max-w-5xl mx-auto px-6 lg:px-10 py-12">
      <section className="rounded-[2rem] bg-gray-50 border border-gray-200 px-6 py-8 md:px-10 md:py-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Page 2
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Langganan Airbnb untuk kebutuhan Anda
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
            Bagian ini fokus ke title area. Layout sengaja dibuat ringkas supaya branch ini
            tetap cuma pegang satu komponen utama, sesuai alur kerja per orang.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700">
              Cepat
            </span>
            <span className="rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700">
              Rapi
            </span>
            <span className="rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700">
              Fokus
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}
