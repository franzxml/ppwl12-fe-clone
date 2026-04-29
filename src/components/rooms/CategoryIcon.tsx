export default function CategoryIcon({ kind }: { kind: string }) {
  const cls = 'w-7 h-7 text-gray-800'
  switch (kind) {
    case 'clean':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={cls}>
          <path d="M14 4l-2 4h6l-2-4zM14 8v4M16 12h-4l-1 9h6l-1-9z" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6" cy="6" r="0.6" fill="currentColor" />
          <circle cx="4" cy="9" r="0.6" fill="currentColor" />
          <circle cx="7" cy="11" r="0.6" fill="currentColor" />
        </svg>
      )
    case 'check':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={cls}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'key':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={cls}>
          <circle cx="8" cy="14" r="4" />
          <path d="M11 11l9-9M16 6l3 3" strokeLinecap="round" />
        </svg>
      )
    case 'chat':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={cls}>
          <path d="M4 5h16v12H8l-4 4V5z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'map':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={cls}>
          <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6zM9 4v16M15 6v16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'tag':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={cls}>
          <path d="M3 12V3h9l9 9-9 9-9-9z" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="7.5" cy="7.5" r="1.2" />
        </svg>
      )
  }
  return null
}
