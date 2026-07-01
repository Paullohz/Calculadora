'use client'

import { useCallback, useState } from 'react'
import type { EstadoCalculadora, Operador } from '@/tipos/calculadora'
import {
  calcular,
  formatarEntrada,
  parsearEntrada,
  FUNCOES_CIENTIFICAS,
} from '@/lib/calculadora'

const ESTADO_INICIAL: EstadoCalculadora = {
  pendente: null,
  operador: null,
  entrada: '0',
  expressaoDisplay: '',
  sobreescrever: false,
  erro: false,
}

const OPERADORES: Operador[] = ['+', '-', '×', '÷']

export function useCalculadora() {
  const [estado, setEstado] = useState<EstadoCalculadora>(ESTADO_INICIAL)

  const pressionar = useCallback((tecla: string) => {
    setEstado((prev) => {
      if (prev.erro && tecla !== 'AC') {
        return ESTADO_INICIAL
      }

      // ── Dígitos ──────────────────────────────────────────────
      if ('0123456789'.includes(tecla)) {
        if (prev.sobreescrever) {
          // Após = sem operador pendente → recomeça do zero
          if (prev.operador === null) {
            return { ...ESTADO_INICIAL, entrada: tecla === '0' ? '0' : tecla }
          }
          return { ...prev, entrada: tecla, sobreescrever: false }
        }
        if (prev.entrada === '0') return { ...prev, entrada: tecla }
        if (prev.entrada.replace('-', '').replace(',', '').length >= 12) return prev
        return { ...prev, entrada: prev.entrada + tecla }
      }

      // ── Vírgula decimal ───────────────────────────────────────
      if (tecla === ',') {
        if (prev.sobreescrever) {
          return { ...prev, entrada: '0,', sobreescrever: false }
        }
        if (prev.entrada.includes(',')) return prev
        return { ...prev, entrada: prev.entrada + ',' }
      }

      // ── AC (limpar tudo) ──────────────────────────────────────
      if (tecla === 'AC') return ESTADO_INICIAL

      // ── CE (limpar entrada) ───────────────────────────────────
      if (tecla === 'CE') {
        return { ...prev, entrada: '0', sobreescrever: false }
      }

      // ── ⌫ (apagar último dígito) ─────────────────────────────
      if (tecla === '⌫') {
        if (prev.sobreescrever || prev.entrada === '0') return prev
        const nova = prev.entrada.slice(0, -1)
        return { ...prev, entrada: nova === '' || nova === '-' ? '0' : nova }
      }

      // ── +/- (negar) ───────────────────────────────────────────
      if (tecla === '+/-') {
        const n = parsearEntrada(prev.entrada)
        return { ...prev, entrada: formatarEntrada(-n) }
      }

      // ── % (porcentagem) ───────────────────────────────────────
      if (tecla === '%') {
        const n = parsearEntrada(prev.entrada)
        const base = prev.pendente ?? 1
        const pct = prev.operador === '+' || prev.operador === '-'
          ? (base * n) / 100
          : n / 100
        return { ...prev, entrada: formatarEntrada(pct), sobreescrever: true }
      }

      // ── π ────────────────────────────────────────────────────
      if (tecla === 'π') {
        return { ...prev, entrada: formatarEntrada(Math.PI), sobreescrever: true }
      }

      // ── Funções científicas (unárias) ────────────────────────
      if (Object.prototype.hasOwnProperty.call(FUNCOES_CIENTIFICAS, tecla)) {
        const n = parsearEntrada(prev.entrada)
        try {
          const resultado = FUNCOES_CIENTIFICAS[tecla](n)
          const resultadoStr = formatarEntrada(resultado)
          const prefixo = prev.operador
            ? `${prev.expressaoDisplay.trimEnd()} `
            : ''
          return {
            ...prev,
            entrada: resultadoStr,
            expressaoDisplay: `${prefixo}${tecla}(${prev.entrada})`,
            sobreescrever: true,
            erro: false,
          }
        } catch {
          return { ...ESTADO_INICIAL, entrada: 'Erro', erro: true, sobreescrever: true }
        }
      }

      // ── Operadores (+, -, ×, ÷) ───────────────────────────────
      if (OPERADORES.includes(tecla as Operador)) {
        const op = tecla as Operador
        const entradaNum = parsearEntrada(prev.entrada)

        // Apenas troca o operador se ainda não digitou segundo número
        if (prev.sobreescrever && prev.operador !== null) {
          return {
            ...prev,
            operador: op,
            expressaoDisplay: `${formatarEntrada(prev.pendente!)} ${op}`,
          }
        }

        // Após = (sobreescrever=true, operador=null) → usa resultado como primeiro operando
        if (prev.sobreescrever && prev.operador === null) {
          return {
            pendente: entradaNum,
            operador: op,
            entrada: prev.entrada,
            expressaoDisplay: `${prev.entrada} ${op}`,
            sobreescrever: true,
            erro: false,
          }
        }

        // Encadeia operações: avalia o que está pendente
        if (prev.operador !== null) {
          try {
            const resultado = calcular(prev.pendente!, prev.operador, entradaNum)
            const resultadoStr = formatarEntrada(resultado)
            return {
              pendente: resultado,
              operador: op,
              entrada: resultadoStr,
              expressaoDisplay: `${resultadoStr} ${op}`,
              sobreescrever: true,
              erro: false,
            }
          } catch {
            return { ...ESTADO_INICIAL, entrada: 'Erro', erro: true, sobreescrever: true }
          }
        }

        return {
          pendente: entradaNum,
          operador: op,
          entrada: prev.entrada,
          expressaoDisplay: `${prev.entrada} ${op}`,
          sobreescrever: true,
          erro: false,
        }
      }

      // ── Igual (=) ────────────────────────────────────────────
      if (tecla === '=') {
        if (prev.operador === null) {
          return { ...prev, expressaoDisplay: `${prev.entrada} =` }
        }
        const entradaNum = parsearEntrada(prev.entrada)
        try {
          const resultado = calcular(prev.pendente!, prev.operador, entradaNum)
          const resultadoStr = formatarEntrada(resultado)
          return {
            pendente: null,
            operador: null,
            entrada: resultadoStr,
            expressaoDisplay: `${prev.expressaoDisplay} ${prev.entrada} =`,
            sobreescrever: true,
            erro: false,
          }
        } catch {
          return { ...ESTADO_INICIAL, entrada: 'Erro', erro: true, sobreescrever: true }
        }
      }

      return prev
    })
  }, [])

  const labelLimpar =
    estado.entrada === '0' && estado.expressaoDisplay === '' ? 'AC' : 'CE'

  return { estado, pressionar, labelLimpar }
}
