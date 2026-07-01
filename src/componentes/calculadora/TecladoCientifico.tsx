import { Botao } from './Botao'
import { TecladoBasico } from './TecladoBasico'

interface PropsTecladoCientifico {
  onPressionar: (tecla: string) => void
  labelLimpar: string
}

const LINHA_CIENTIFICA_1 = ['sin', 'cos', 'tan', 'π']
const LINHA_CIENTIFICA_2 = ['log', 'ln', '√', 'x²']

export function TecladoCientifico({ onPressionar, labelLimpar }: PropsTecladoCientifico) {
  return (
    <div>
      {/* Linha científica superior */}
      <div className="grid grid-cols-4 gap-1.5 px-3 pb-1.5">
        {LINHA_CIENTIFICA_1.map((fn) => (
          <Botao
            key={fn}
            variante="cientifico"
            onClick={() => onPressionar(fn)}
            className="!h-9"
          >
            {fn}
          </Botao>
        ))}
      </div>

      {/* Linha científica inferior */}
      <div className="grid grid-cols-4 gap-1.5 px-3 pb-1.5">
        {LINHA_CIENTIFICA_2.map((fn) => (
          <Botao
            key={fn}
            variante="cientifico"
            onClick={() => onPressionar(fn)}
            className="!h-9"
          >
            {fn}
          </Botao>
        ))}
      </div>

      {/* Teclado numérico base */}
      <TecladoBasico onPressionar={onPressionar} labelLimpar={labelLimpar} />
    </div>
  )
}
