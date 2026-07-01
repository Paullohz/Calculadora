import type { Metadata } from 'next'
import { JetBrains_Mono, Inter } from 'next/font/google'
import './globals.css'
import { ProvedorTema } from '@/provedores/ProvedorTema'
import { Cabecalho } from '@/componentes/layout/Cabecalho'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'calc_',
  description: 'Calculadora básica, científica e financeira',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-fundo min-h-screen`}>
        <ProvedorTema>
          <div className="flex flex-col min-h-screen">
            <Cabecalho />
            <main className="flex-1 flex items-center justify-center px-4 py-6">
              <div className="calc-card w-full max-w-sm bg-superficie rounded-2xl overflow-hidden shadow-card">
                {children}
              </div>
            </main>
          </div>
        </ProvedorTema>
      </body>
    </html>
  )
}
