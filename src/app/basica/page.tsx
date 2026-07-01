'use client'

import { useEffect } from 'react'
import { Visor } from '@/componentes/calculadora/Visor'
import { TecladoBasico } from '@/componentes/calculadora/TecladoBasico'
import { useCalculadora } from '@/hooks/useCalculadora'

export default function PaginaBasica() {
  const { estado, pressionar, labelLimpar } = useCalculadora()

  // Suporte a teclado
  useEffect(() => {
    function aoTeclar(e: KeyboardEvent) {
      if (e.ctrlKey || e.altKey || e.metaKey) return
      const mapa: Record<string, string> = {
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
        '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
        '.': ',', ',': ',',
        '+': '+', '-': '-', '*': '×', '/': '÷',
        'Enter': '=', '=': '=',
        'Backspace': '⌫',
        'Escape': 'AC',
      }
      const tecla = mapa[e.key]
      if (tecla) {
        e.preventDefault()
        pressionar(tecla)
      }
    }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [pressionar])

  return (
    <section aria-label="Calculadora básica">
      <Visor
        expressao={estado.expressaoDisplay}
        valor={estado.entrada}
        erro={estado.erro}
      />
      <TecladoBasico onPressionar={pressionar} labelLimpar={labelLimpar} />
    </section>
  )
}
