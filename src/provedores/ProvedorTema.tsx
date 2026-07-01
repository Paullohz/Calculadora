'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type Tema = 'claro' | 'escuro'

interface TemaContexto {
  tema: Tema
  alternar: () => void
}

const Contexto = createContext<TemaContexto>({
  tema: 'escuro',
  alternar: () => {},
})

export function ProvedorTema({ children }: { children: React.ReactNode }) {
  const [tema, setTema] = useState<Tema>('escuro')
  const [montado, setMontado] = useState(false)

  useEffect(() => {
    const salvo = localStorage.getItem('calc-tema') as Tema | null
    if (salvo === 'claro' || salvo === 'escuro') {
      setTema(salvo)
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTema('claro')
    }
    setMontado(true)
  }, [])

  useEffect(() => {
    if (!montado) return
    const html = document.documentElement
    if (tema === 'escuro') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    localStorage.setItem('calc-tema', tema)
  }, [tema, montado])

  const alternar = useCallback(() => {
    setTema((t) => (t === 'escuro' ? 'claro' : 'escuro'))
  }, [])

  return (
    <Contexto.Provider value={{ tema, alternar }}>
      {children}
    </Contexto.Provider>
  )
}

export function useTema() {
  return useContext(Contexto)
}
