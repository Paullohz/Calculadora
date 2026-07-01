import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        fundo: 'var(--cor-fundo)',
        superficie: 'var(--cor-superficie)',
        btn: 'var(--cor-btn)',
        'btn-ci': 'var(--cor-btn-ci)',
        'btn-limpar': 'var(--cor-btn-limpar)',
        'btn-limpar-texto': 'var(--cor-btn-limpar-texto)',
        visor: 'var(--cor-visor)',
        texto: 'var(--cor-texto)',
        mudo: 'var(--cor-mudo)',
        'mudo-forte': 'var(--cor-mudo-forte)',
        acento: '#F5A623',
        'acento-hover': '#D97706',
        borda: 'var(--cor-borda)',
      },
      borderColor: {
        DEFAULT: 'var(--cor-borda)',
      },
      boxShadow: {
        visor: 'inset 0 1px 4px var(--sombra-visor)',
        card: '0 8px 32px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}

export default config
