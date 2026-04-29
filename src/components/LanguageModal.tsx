import { useState } from 'react'

const languages: { lang: string; region: string }[] = [
  { lang: 'Bahasa Indonesia', region: 'Indonesia' },
  { lang: 'Azerbaycan dili', region: 'Azerbaycan' },
  { lang: 'Bosanski', region: 'Bosna i Hercegovina' },
  { lang: 'Català', region: 'Espanya' },
  { lang: 'Čeština', region: 'Česká republika' },
  { lang: 'Crnogorski', region: 'Crna Gora' },
  { lang: 'Dansk', region: 'Danmark' },
  { lang: 'Deutsch', region: 'Deutschland' },
  { lang: 'Deutsch', region: 'Österreich' },
  { lang: 'Deutsch', region: 'Schweiz' },
  { lang: 'Deutsch', region: 'Luxemburg' },
  { lang: 'Eesti', region: 'Eesti' },
  { lang: 'English', region: 'Australia' },
  { lang: 'English', region: 'Canada' },
  { lang: 'English', region: 'Guyana' },
  { lang: 'English', region: 'India' },
  { lang: 'English', region: 'Ireland' },
  { lang: 'English', region: 'New Zealand' },
  { lang: 'English', region: 'Singapore' },
  { lang: 'English', region: 'United Arab Emirates' },
  { lang: 'Español', region: 'Argentina' },
  { lang: 'Español', region: 'Belice' },
  { lang: 'Español', region: 'Bolivia' },
  { lang: 'Español', region: 'Chile' },
  { lang: 'Español', region: 'Colombia' },
  { lang: 'Español', region: 'Costa Rica' },
  { lang: 'Español', region: 'Ecuador' },
  { lang: 'Español', region: 'El Salvador' },
  { lang: 'Español', region: 'España' },
  { lang: 'Español', region: 'Estados Unidos' },
  { lang: 'Français', region: 'France' },
  { lang: 'Français', region: 'Belgique' },
  { lang: 'Français', region: 'Canada' },
  { lang: 'Français', region: 'Suisse' },
  { lang: 'Hrvatski', region: 'Hrvatska' },
  { lang: 'Italiano', region: 'Italia' },
  { lang: 'Italiano', region: 'Svizzera' },
  { lang: 'Latviešu', region: 'Latvija' },
  { lang: 'Lietuvių', region: 'Lietuva' },
  { lang: 'Magyar', region: 'Magyarország' },
  { lang: 'Nederlands', region: 'Nederland' },
  { lang: 'Nederlands', region: 'België' },
  { lang: 'Norsk', region: 'Norge' },
  { lang: 'Polski', region: 'Polska' },
  { lang: 'Português', region: 'Brasil' },
  { lang: 'Português', region: 'Portugal' },
  { lang: 'Română', region: 'România' },
  { lang: 'Slovenčina', region: 'Slovensko' },
  { lang: 'Slovenščina', region: 'Slovenija' },
  { lang: 'Suomi', region: 'Suomi' },
  { lang: 'Svenska', region: 'Sverige' },
  { lang: 'Tiếng Việt', region: 'Việt Nam' },
  { lang: 'Türkçe', region: 'Türkiye' },
  { lang: 'Ελληνικά', region: 'Ελλάδα' },
  { lang: 'Български', region: 'България' },
  { lang: 'Македонски', region: 'Северна Македонија' },
  { lang: 'Русский', region: 'Россия' },
  { lang: 'Српски', region: 'Србија' },
  { lang: 'Українська', region: 'Україна' },
  { lang: 'עברית', region: 'ישראל' },
  { lang: 'العربية', region: 'المملكة العربية السعودية' },
  { lang: 'हिन्दी', region: 'भारत' },
  { lang: 'বাংলা', region: 'বাংলাদেশ' },
  { lang: 'ภาษาไทย', region: 'ประเทศไทย' },
  { lang: '中文 (简体)', region: '中国' },
  { lang: '中文 (繁體)', region: '台灣' },
  { lang: '中文 (繁體)', region: '香港' },
  { lang: '日本語', region: '日本' },
  { lang: '한국어', region: '한국' },
  { lang: 'Bahasa Melayu', region: 'Malaysia' },
  { lang: 'Filipino', region: 'Pilipinas' },
]

const currencies = [
  { code: 'USD', name: 'Dolar Amerika Serikat', symbol: '$' },
  { code: 'IDR', name: 'Rupiah Indonesia', symbol: 'Rp' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'Pound Inggris', symbol: '£' },
  { code: 'JPY', name: 'Yen Jepang', symbol: '¥' },
  { code: 'CNY', name: 'Yuan Tiongkok', symbol: '¥' },
  { code: 'KRW', name: 'Won Korea', symbol: '₩' },
  { code: 'SGD', name: 'Dolar Singapura', symbol: 'S$' },
  { code: 'AUD', name: 'Dolar Australia', symbol: 'A$' },
  { code: 'CAD', name: 'Dolar Kanada', symbol: 'C$' },
  { code: 'CHF', name: 'Franc Swiss', symbol: 'Fr' },
  { code: 'HKD', name: 'Dolar Hong Kong', symbol: 'HK$' },
  { code: 'MYR', name: 'Ringgit Malaysia', symbol: 'RM' },
  { code: 'THB', name: 'Baht Thailand', symbol: '฿' },
  { code: 'INR', name: 'Rupee India', symbol: '₹' },
  { code: 'BRL', name: 'Real Brasil', symbol: 'R$' },
]

export default function LanguageModal({
  onClose,
  initialTab = 'bahasa',
}: {
  onClose: () => void
  initialTab?: 'bahasa' | 'mata-uang'
}) {
  const [activeTab, setActiveTab] = useState<'bahasa' | 'mata-uang'>(initialTab)
  const [autoTranslate, setAutoTranslate] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState('Bahasa Indonesia|Indonesia')
  const [selectedCurrency, setSelectedCurrency] = useState('IDR')

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button only */}
        <div className="flex items-center px-8 pt-6 pb-2 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-8 flex-shrink-0">
          <button
            onClick={() => setActiveTab('bahasa')}
            className={`relative py-3 mr-8 text-base font-medium transition-colors cursor-pointer ${
              activeTab === 'bahasa' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Bahasa dan wilayah
            {activeTab === 'bahasa' && (
              <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('mata-uang')}
            className={`relative py-3 text-base font-medium transition-colors cursor-pointer ${
              activeTab === 'mata-uang' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Mata uang
            {activeTab === 'mata-uang' && (
              <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 overflow-y-auto flex-1">
          {activeTab === 'bahasa' ? (
            <div>
              {/* Auto-translate toggle */}
              <div className="mb-8 bg-gray-100 rounded-2xl px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-base font-semibold text-gray-900">Terjemahan</p>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Otomatis menerjemahkan deskripsi dan ulasan ke bahasa Bahasa Indonesia.
                    </p>
                  </div>
                  <button
                    onClick={() => setAutoTranslate(!autoTranslate)}
                    className={`relative flex-shrink-0 w-12 h-7 rounded-full transition-colors duration-200 cursor-pointer ${
                      autoTranslate ? 'bg-gray-900' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 flex items-center justify-center ${
                        autoTranslate ? 'translate-x-[1.375rem]' : 'translate-x-0.5'
                      }`}
                    >
                      {autoTranslate && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-gray-900">
                          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                  </button>
                </div>
              </div>

              {/* Suggested */}
              <div className="mb-8">
                <p className="text-xl font-semibold text-gray-900 mb-4">Bahasa dan wilayah yang disarankan</p>
                <div className="grid grid-cols-5 gap-x-4 gap-y-3">
                  {[
                    { lang: 'English', region: 'United States' },
                    { lang: 'English', region: 'United Kingdom' },
                  ].map((item) => {
                    const key = `${item.lang}|${item.region}`
                    const isSelected = selectedLanguage === key
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedLanguage(key)}
                        className={`text-left py-2 transition-colors cursor-pointer border-b ${
                          isSelected
                            ? 'border-gray-900'
                            : 'border-transparent hover:opacity-70'
                        }`}
                      >
                        <p className="text-sm font-medium text-gray-900">{item.lang}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.region}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* All languages */}
              <div>
                <p className="text-xl font-semibold text-gray-900 mb-4">Pilih bahasa dan wilayah</p>
                <div className="grid grid-cols-5 gap-x-4 gap-y-3">
                  {languages.map((item) => {
                    const key = `${item.lang}|${item.region}`
                    const isSelected = selectedLanguage === key
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedLanguage(key)}
                        className={`text-left py-2 transition-colors cursor-pointer border-b ${
                          isSelected
                            ? 'border-gray-900'
                            : 'border-transparent hover:opacity-70'
                        }`}
                      >
                        <p className="text-sm font-medium text-gray-900">{item.lang}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.region}</p>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xl font-semibold text-gray-900 mb-4">Pilih mata uang</p>
              <div className="grid grid-cols-5 gap-x-4 gap-y-3">
                {currencies.map((cur) => {
                  const isSelected = selectedCurrency === cur.code
                  return (
                    <button
                      key={cur.code}
                      onClick={() => setSelectedCurrency(cur.code)}
                      className={`text-left py-2 transition-colors cursor-pointer border-b ${
                        isSelected
                          ? 'border-gray-900'
                          : 'border-transparent hover:opacity-70'
                      }`}
                    >
                      <p className="text-sm font-medium text-gray-900">{cur.symbol} {cur.code}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{cur.name}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
