interface PropsVisor {
  expressao: string
  valor: string
  erro?: boolean
}

function tamanhoFonte(s: string): string {
  if (s.length > 16) return 'text-xl'
  if (s.length > 9) return 'text-2xl'
  return 'text-[28px]'
}

export function Visor({ expressao, valor, erro = false }: PropsVisor) {
  return (
    <div
      className="
        mx-3 mt-3 mb-3 rounded-2xl bg-visor shadow-visor
        px-4 pt-3 pb-4 min-h-[88px]
        flex flex-col justify-end gap-1.5
      "
    >
      <p
        className="
          font-mono text-xs text-mudo text-right truncate min-h-[16px]
          transition-opacity duration-150
        "
        aria-label="Expressão"
      >
        {expressao}
      </p>
      <p
        className={`
          font-mono font-bold text-right leading-none truncate
          ${tamanhoFonte(valor)}
          ${erro ? 'text-red-400' : 'text-texto'}
          transition-all duration-100
        `}
        aria-label="Resultado"
        aria-live="polite"
      >
        {valor}
      </p>
    </div>
  )
}
