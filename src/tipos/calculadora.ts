export type VarianteBotao =
  | 'numero'
  | 'operador'
  | 'acento'
  | 'limpar'
  | 'igual'
  | 'cientifico'

export type Operador = '+' | '-' | '×' | '÷'

export type FuncaoCientifica =
  | 'sin'
  | 'cos'
  | 'tan'
  | 'log'
  | 'ln'
  | '√'
  | 'x²'

export interface EstadoCalculadora {
  pendente: number | null
  operador: Operador | null
  entrada: string
  expressaoDisplay: string
  sobreescrever: boolean
  erro: boolean
}

export type AbaFinanceira = 'juros' | 'financiamento'
export type TipoJuros = 'simples' | 'composto'

export interface ResultadoJuros {
  montante: number
  juros: number
}

export interface ResultadoFinanciamento {
  pmt: number
  totalPago: number
  totalJuros: number
}

export interface EstadoFinanceiro {
  aba: AbaFinanceira
  // Juros
  capital: string
  taxa: string
  periodo: string
  tipoJuros: TipoJuros
  resultadoJuros: ResultadoJuros | null
  erroJuros: string | null
  // Financiamento
  valorBem: string
  entrada: string
  taxaFinan: string
  parcelas: string
  resultadoFinan: ResultadoFinanciamento | null
  erroFinan: string | null
}
