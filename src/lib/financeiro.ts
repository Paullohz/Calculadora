import type { ResultadoJuros, ResultadoFinanciamento } from '@/tipos/calculadora'

export function calcularJurosSimples(
  capital: number,
  taxaMensal: number,
  meses: number,
): ResultadoJuros {
  const juros = capital * (taxaMensal / 100) * meses
  return { montante: capital + juros, juros }
}

export function calcularJurosCompostos(
  capital: number,
  taxaMensal: number,
  meses: number,
): ResultadoJuros {
  const montante = capital * Math.pow(1 + taxaMensal / 100, meses)
  return { montante, juros: montante - capital }
}

export function calcularPMT(
  valorFinanciado: number,
  taxaMensal: number,
  parcelas: number,
): ResultadoFinanciamento {
  if (taxaMensal === 0) {
    const pmt = valorFinanciado / parcelas
    return { pmt, totalPago: valorFinanciado, totalJuros: 0 }
  }
  const i = taxaMensal / 100
  const pmt = (valorFinanciado * i) / (1 - Math.pow(1 + i, -parcelas))
  const totalPago = pmt * parcelas
  return { pmt, totalPago, totalJuros: totalPago - valorFinanciado }
}

export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(valor)
}

export function parsearDecimal(s: string): number {
  return parseFloat(s.replace(/\./g, '').replace(',', '.'))
}
