import { Botao } from './Botao'

interface PropsTecladoBasico {
  onPressionar: (tecla: string) => void
  labelLimpar: string
}

export function TecladoBasico({ onPressionar, labelLimpar }: PropsTecladoBasico) {
  return (
    <div className="grid grid-cols-4 gap-1.5 px-3 pb-3">
      <Botao variante="limpar" onClick={() => onPressionar(labelLimpar)}>
        {labelLimpar}
      </Botao>
      <Botao variante="operador" onClick={() => onPressionar('+/-')}>
        +/−
      </Botao>
      <Botao variante="operador" onClick={() => onPressionar('%')}>
        %
      </Botao>
      <Botao variante="acento" onClick={() => onPressionar('÷')}>
        ÷
      </Botao>

      <Botao onClick={() => onPressionar('7')}>7</Botao>
      <Botao onClick={() => onPressionar('8')}>8</Botao>
      <Botao onClick={() => onPressionar('9')}>9</Botao>
      <Botao variante="acento" onClick={() => onPressionar('×')}>
        ×
      </Botao>

      <Botao onClick={() => onPressionar('4')}>4</Botao>
      <Botao onClick={() => onPressionar('5')}>5</Botao>
      <Botao onClick={() => onPressionar('6')}>6</Botao>
      <Botao variante="acento" onClick={() => onPressionar('-')}>
        −
      </Botao>

      <Botao onClick={() => onPressionar('1')}>1</Botao>
      <Botao onClick={() => onPressionar('2')}>2</Botao>
      <Botao onClick={() => onPressionar('3')}>3</Botao>
      <Botao variante="acento" onClick={() => onPressionar('+')}>
        +
      </Botao>

      <Botao span={2} onClick={() => onPressionar('0')}>
        0
      </Botao>
      <Botao onClick={() => onPressionar(',')}>
        ,
      </Botao>
      <Botao variante="igual" onClick={() => onPressionar('=')}>
        =
      </Botao>
    </div>
  )
}
