import type { Operador } from '@/tipos/calculadora'

export function calcular(a: number, op: Operador, b: number): number {
  switch (op) {
    case '+': return a + b
    case '-': return a - b
    case '×': return a * b
    case '÷':
      if (b === 0) throw new Error('Divisão por zero')
      return a / b
  }
}

export const FUNCOES_CIENTIFICAS: Record<string, (x: number) => number> = {
  sin: (x) => Math.sin((x * Math.PI) / 180),
  cos: (x) => Math.cos((x * Math.PI) / 180),
  tan: (x) => {
    const r = Math.tan((x * Math.PI) / 180)
    if (!isFinite(r)) throw new Error('Indefinido')
    return r
  },
  log: (x) => {
    if (x <= 0) throw new Error('Domínio inválido')
    return Math.log10(x)
  },
  ln: (x) => {
    if (x <= 0) throw new Error('Domínio inválido')
    return Math.log(x)
  },
  '√': (x) => {
    if (x < 0) throw new Error('Domínio inválido')
    return Math.sqrt(x)
  },
  'x²': (x) => x * x,
}

export function formatarEntrada(n: number): string {
  if (isNaN(n) || !isFinite(n)) return 'Erro'

  // Remove floating point noise
  const rounded = parseFloat(n.toPrecision(10))

  if (Number.isInteger(rounded)) {
    if (Math.abs(rounded) >= 1e13) {
      return rounded.toExponential(4).replace('.', ',')
    }
    return String(rounded)
  }

  const str = rounded.toString()
  if (str.includes('e')) {
    return str.replace('.', ',')
  }

  return str.replace('.', ',')
}

export function parsearEntrada(s: string): number {
  return parseFloat(s.replace(',', '.'))
}
