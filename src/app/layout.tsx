import type {Metadata} from 'next'
import '../global.css';
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Meta Weather',
    description: 'Weather Test',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        {children}
        <div id="modal-root"/>
        </body>
        </html>
    )
}
