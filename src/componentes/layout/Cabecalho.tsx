import { AlternarTema } from '@/componentes/ui/AlternarTema'
import { MenuModo } from '@/componentes/layout/MenuModo'

export function Cabecalho() {
  return (
    <header className="h-14 flex items-center justify-between px-5 shrink-0">
      <span className="font-mono text-[13px] font-bold tracking-tight text-texto select-none">
        calc_
      </span>
      <div className="flex items-center gap-2">
        <MenuModo />
        <AlternarTema />
      </div>
    </header>
  )
}
