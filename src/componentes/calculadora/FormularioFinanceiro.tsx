'use client'

import { useFinanceiro } from '@/hooks/useFinanceiro'
import { formatarMoeda } from '@/lib/financeiro'

function Campo({
  label,
  valor,
  placeholder,
  onChange,
  sufixo,
}: {
  label: string
  valor: string
  placeholder: string
  onChange: (v: string) => void
  sufixo?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-medium font-sans text-mudo-forte uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          value={valor}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full h-9 rounded-[8px] px-3 font-mono text-[13px]
            bg-btn border border-borda text-texto
            placeholder:text-mudo
            focus:outline-none focus:ring-1 focus:ring-acento/50
            transition-colors duration-150
          "
          style={{ paddingRight: sufixo ? '2.5rem' : undefined }}
        />
        {sufixo && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-mudo font-mono">
            {sufixo}
          </span>
        )}
      </div>
    </div>
  )
}

function BotaoAba({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 py-1.5 text-[10px] font-medium font-sans rounded-md
        transition-all duration-150
        ${ativo
          ? 'bg-superficie text-acento'
          : 'text-mudo hover:text-mudo-forte'
        }
      `}
    >
      {children}
    </button>
  )
}

function BotaoTipo({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 h-9 rounded-[8px] text-[12px] font-medium font-sans border
        transition-all duration-150 active:scale-[0.97]
        ${ativo
          ? 'bg-acento border-acento text-[#0F1117]'
          : 'bg-btn border-borda text-mudo-forte hover:brightness-110'
        }
      `}
    >
      {children}
    </button>
  )
}

export function FormularioFinanceiro() {
  const {
    estado,
    definirAba,
    definirTipoJuros,
    atualizar,
    calcularJuros,
    calcularFinanciamento,
    limpar,
  } = useFinanceiro()

  return (
    <div className="px-3 pb-3">
      {/* Abas */}
      <div className="flex gap-1 bg-btn rounded-lg p-1 mb-4">
        <BotaoAba ativo={estado.aba === 'juros'} onClick={() => definirAba('juros')}>
          Juros
        </BotaoAba>
        <BotaoAba ativo={estado.aba === 'financiamento'} onClick={() => definirAba('financiamento')}>
          Financiamento
        </BotaoAba>
      </div>

      {/* ─── Aba: Juros ─────────────────────────────────── */}
      {estado.aba === 'juros' && (
        <div className="flex flex-col gap-3">
          <Campo
            label="Capital inicial"
            valor={estado.capital}
            placeholder="Ex: 10000"
            sufixo="R$"
            onChange={(v) => atualizar('capital', v)}
          />
          <Campo
            label="Taxa de juros (% a.m.)"
            valor={estado.taxa}
            placeholder="Ex: 1,5"
            sufixo="%"
            onChange={(v) => atualizar('taxa', v)}
          />
          <Campo
            label="Período (meses)"
            valor={estado.periodo}
            placeholder="Ex: 12"
            onChange={(v) => atualizar('periodo', v)}
          />

          <div className="flex gap-2">
            <BotaoTipo
              ativo={estado.tipoJuros === 'simples'}
              onClick={() => definirTipoJuros('simples')}
            >
              Simples
            </BotaoTipo>
            <BotaoTipo
              ativo={estado.tipoJuros === 'composto'}
              onClick={() => definirTipoJuros('composto')}
            >
              Composto
            </BotaoTipo>
          </div>

          <button
            onClick={calcularJuros}
            className="
              w-full h-11 rounded-[10px] font-sans text-sm font-medium
              bg-acento text-[#0F1117] hover:bg-acento-hover
              transition-colors duration-150 active:scale-[0.98]
            "
          >
            Calcular
          </button>

          {estado.erroJuros && (
            <p className="text-red-400 text-xs font-sans text-center">{estado.erroJuros}</p>
          )}

          {estado.resultadoJuros && (
            <div className="rounded-xl bg-btn p-3 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-mudo font-sans uppercase tracking-wide">Montante final</span>
                <span className="font-mono text-[18px] font-bold text-acento">
                  {formatarMoeda(estado.resultadoJuros.montante)}
                </span>
              </div>
              <div className="h-px bg-borda" />
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-mudo font-sans uppercase tracking-wide">Juros gerados</span>
                <span className="font-mono text-sm font-medium text-texto">
                  {formatarMoeda(estado.resultadoJuros.juros)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── Aba: Financiamento ──────────────────────────── */}
      {estado.aba === 'financiamento' && (
        <div className="flex flex-col gap-3">
          <Campo
            label="Valor do bem"
            valor={estado.valorBem}
            placeholder="Ex: 50000"
            sufixo="R$"
            onChange={(v) => atualizar('valorBem', v)}
          />
          <Campo
            label="Entrada (opcional)"
            valor={estado.entrada}
            placeholder="Ex: 10000"
            sufixo="R$"
            onChange={(v) => atualizar('entrada', v)}
          />
          <div className="grid grid-cols-2 gap-2">
            <Campo
              label="Taxa (% a.m.)"
              valor={estado.taxaFinan}
              placeholder="Ex: 1,2"
              sufixo="%"
              onChange={(v) => atualizar('taxaFinan', v)}
            />
            <Campo
              label="Parcelas"
              valor={estado.parcelas}
              placeholder="Ex: 48"
              onChange={(v) => atualizar('parcelas', v)}
            />
          </div>

          <button
            onClick={calcularFinanciamento}
            className="
              w-full h-11 rounded-[10px] font-sans text-sm font-medium
              bg-acento text-[#0F1117] hover:bg-acento-hover
              transition-colors duration-150 active:scale-[0.98]
            "
          >
            Calcular parcela
          </button>

          {estado.erroFinan && (
            <p className="text-red-400 text-xs font-sans text-center">{estado.erroFinan}</p>
          )}

          {estado.resultadoFinan && (
            <div className="rounded-xl bg-btn p-3 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-mudo font-sans uppercase tracking-wide">Parcela mensal</span>
                <span className="font-mono text-[18px] font-bold text-acento">
                  {formatarMoeda(estado.resultadoFinan.pmt)}
                </span>
              </div>
              <div className="h-px bg-borda" />
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-mudo font-sans uppercase tracking-wide">Total pago</span>
                <span className="font-mono text-sm font-medium text-texto">
                  {formatarMoeda(estado.resultadoFinan.totalPago)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-mudo font-sans uppercase tracking-wide">Total em juros</span>
                <span className="font-mono text-sm font-medium text-mudo-forte">
                  {formatarMoeda(estado.resultadoFinan.totalJuros)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={limpar}
        className="mt-3 w-full text-center text-[10px] text-mudo font-sans hover:text-mudo-forte transition-colors"
      >
        Limpar campos
      </button>
    </div>
  )
}
