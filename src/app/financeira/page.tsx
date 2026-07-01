import { FormularioFinanceiro } from '@/componentes/calculadora/FormularioFinanceiro'

export default function PaginaFinanceira() {
  return (
    <section aria-label="Calculadora financeira">
      <div className="px-3 pt-3 pb-1">
        <p className="text-[10px] font-sans font-medium text-mudo uppercase tracking-wide">
          Calculadora financeira
        </p>
      </div>
      <FormularioFinanceiro />
    </section>
  )
}
