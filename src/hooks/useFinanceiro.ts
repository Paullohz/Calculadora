'use client'

import { useCallback, useState } from 'react'
import type { EstadoFinanceiro, AbaFinanceira, TipoJuros } from '@/tipos/calculadora'
import {
  calcularJurosSimples,
  calcularJurosCompostos,
  calcularPMT,
  parsearDecimal,
} from '@/lib/financeiro'

const ESTADO_INICIAL: EstadoFinanceiro = {
  aba: 'juros',
  capital: '',
  taxa: '',
  periodo: '',
  tipoJuros: 'composto',
  resultadoJuros: null,
  erroJuros: null,
  valorBem: '',
  entrada: '',
  taxaFinan: '',
  parcelas: '',
  resultadoFinan: null,
  erroFinan: null,
}

export function useFinanceiro() {
  const [estado, setEstado] = useState<EstadoFinanceiro>(ESTADO_INICIAL)

  const definirAba = useCallback((aba: AbaFinanceira) => {
    setEstado((p) => ({ ...p, aba }))
  }, [])

  const definirTipoJuros = useCallback((tipo: TipoJuros) => {
    setEstado((p) => ({ ...p, tipoJuros: tipo, resultadoJuros: null }))
  }, [])

  const atualizar = useCallback(
    (campo: keyof EstadoFinanceiro, valor: string) => {
      setEstado((p) => ({ ...p, [campo]: valor, resultadoJuros: null, resultadoFinan: null, erroJuros: null, erroFinan: null }))
    },
    [],
  )

  const calcularJuros = useCallback(() => {
    setEstado((p) => {
      const capital = parsearDecimal(p.capital)
      const taxa = parsearDecimal(p.taxa)
      const periodo = parseInt(p.periodo, 10)

      if (isNaN(capital) || capital <= 0) return { ...p, erroJuros: 'Capital inválido', resultadoJuros: null }
      if (isNaN(taxa) || taxa < 0) return { ...p, erroJuros: 'Taxa inválida', resultadoJuros: null }
      if (isNaN(periodo) || periodo <= 0) return { ...p, erroJuros: 'Período inválido', resultadoJuros: null }

      const resultado =
        p.tipoJuros === 'simples'
          ? calcularJurosSimples(capital, taxa, periodo)
          : calcularJurosCompostos(capital, taxa, periodo)

      return { ...p, resultadoJuros: resultado, erroJuros: null }
    })
  }, [])

  const calcularFinanciamento = useCallback(() => {
    setEstado((p) => {
      const bem = parsearDecimal(p.valorBem)
      const entrada = parsearDecimal(p.entrada) || 0
      const taxa = parsearDecimal(p.taxaFinan)
      const parcelas = parseInt(p.parcelas, 10)

      if (isNaN(bem) || bem <= 0) return { ...p, erroFinan: 'Valor do bem inválido', resultadoFinan: null }
      if (entrada >= bem) return { ...p, erroFinan: 'Entrada maior que o bem', resultadoFinan: null }
      if (isNaN(taxa) || taxa < 0) return { ...p, erroFinan: 'Taxa inválida', resultadoFinan: null }
      if (isNaN(parcelas) || parcelas <= 0) return { ...p, erroFinan: 'Parcelas inválidas', resultadoFinan: null }

      const valorFinanciado = bem - entrada
      const resultado = calcularPMT(valorFinanciado, taxa, parcelas)

      return { ...p, resultadoFinan: resultado, erroFinan: null }
    })
  }, [])

  const limpar = useCallback(() => setEstado(ESTADO_INICIAL), [])

  return { estado, definirAba, definirTipoJuros, atualizar, calcularJuros, calcularFinanciamento, limpar }
}
