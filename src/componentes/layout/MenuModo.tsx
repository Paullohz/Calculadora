'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const MODOS = [
  { id: 'basica', label: 'Básica' },
  { id: 'cientifica', label: 'Científica' },
  { id: 'financeira', label: 'Financeira' },
]

export function MenuModo() {
  const [aberto, setAberto] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  const modoAtual = MODOS.find((m) => pathname.startsWith(`/${m.id}`)) ?? MODOS[0]

  useEffect(() => {
    function fechar(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setAberto(false)
      }
    }
    document.addEventListener('mousedown', fechar)
    return () => document.removeEventListener('mousedown', fechar)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setAberto((a) => !a)}
        className="
          flex items-center gap-1.5 px-3 py-1.5 rounded-lg
          bg-superficie border border-borda
          text-mudo-forte text-[11px] font-medium font-sans
          transition-all duration-150 hover:brightness-105 active:scale-95
        "
        aria-haspopup="listbox"
        aria-expanded={aberto}
      >
        {modoAtual.label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ transform: aberto ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {aberto && (
        <div
          role="listbox"
          className="
            absolute right-0 top-full mt-1.5 w-36 z-50
            bg-superficie border border-borda rounded-xl
            overflow-hidden shadow-card
          "
        >
          {MODOS.map((modo) => {
            const ativo = modo.id === modoAtual.id
            return (
              <button
                key={modo.id}
                role="option"
                aria-selected={ativo}
                onClick={() => {
                  router.push(`/${modo.id}`)
                  setAberto(false)
                }}
                className={`
                  w-full text-left px-3 py-2.5 text-xs font-sans font-medium
                  transition-colors duration-100
                  ${ativo
                    ? 'text-acento bg-btn'
                    : 'text-texto hover:bg-btn'
                  }
                `}
              >
                {modo.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
