import type { VarianteBotao } from '@/tipos/calculadora'

interface PropsBotao {
  children: React.ReactNode
  onClick: () => void
  variante?: VarianteBotao
  span?: 2 | 3 | 4
  alto?: boolean
  className?: string
}

const VARIANTES: Record<VarianteBotao, string> = {
  numero:
    'bg-btn text-texto hover:brightness-110 active:scale-[0.94]',
  operador:
    'bg-btn-ci text-mudo-forte hover:brightness-110 active:scale-[0.94]',
  acento:
    'bg-acento text-[#0F1117] font-bold hover:bg-acento-hover active:scale-[0.94]',
  limpar:
    'bg-btn-limpar text-btn-limpar-texto hover:brightness-110 active:scale-[0.94]',
  igual:
    'bg-acento text-[#0F1117] font-bold hover:bg-acento-hover active:scale-[0.94]',
  cientifico:
    'bg-btn-ci text-mudo-forte text-[11px] hover:brightness-110 active:scale-[0.94]',
}

export function Botao({
  children,
  onClick,
  variante = 'numero',
  span,
  alto = false,
  className = '',
}: PropsBotao) {
  return (
    <button
      onClick={onClick}
      style={{
        gridColumn: span ? `span ${span}` : undefined,
      }}
      className={`
        ${alto ? 'h-14' : 'h-12'}
        rounded-[10px] font-mono text-[15px] font-medium
        transition-all duration-100 select-none
        ${VARIANTES[variante]}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
