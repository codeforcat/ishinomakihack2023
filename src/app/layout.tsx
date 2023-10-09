import type { Metadata } from 'next'
import { flex, grid } from '../../styled-system/patterns'
import './globals.css'

const title = 'CatGPT'
const description = 'AIでネコのペイン状態を理解し、ネコとヒトのより良いコミュニケーションを。'
const imgUrl = 'https://ishinomakihack2023.vercel.app/images/og.png'

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: 'https://ishinomakihack2023.vercel.app/',
    siteName: title,
    images: [
      {
        url: imgUrl,
        width: 1920,
        height: 1080,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: [imgUrl],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body suppressHydrationWarning={true}>
        <div
          className={grid({
            columns: 1,
            gridTemplateRows: 'auto min-content',
            gap: '18px',
            minHeight: '100dvh',
            backgroundColor: 'catVivid',
          })}
        >
          <main
            className={flex({
              direction: 'column',
              flex: '1 0 100%',
            })}
          >
            {children}
          </main>
          <footer
            className={flex({
              justify: 'center',
              align: 'center',
              backgroundColor: 'catDark',
              color: 'white',
              padding: '4px 18px',
            })}
          >
            <small>Code for CAT at Ishinomakihack2023</small>
          </footer>
        </div>
      </body>
    </html>
  )
}
