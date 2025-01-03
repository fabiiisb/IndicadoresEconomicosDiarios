import "./globals.css"
import { Barlow_Condensed as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/footer"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700"]
})

export const metadata = {
  title: 'Indicadores económicos diarios Chile',
  description: 'Accede a los últimos datos económicos de Chile a través del servicio de indicadores económicos diarios.',
  themeColor: '#100c0c',
  openGraph: {
    title: 'Indicadores económicos diarios Chile',
    description: 'Consulta los últimos datos económicos actualizados de Chile, incluyendo tasas de interés, inflación y más.',
    url: 'https://indicadores-economicos-diarios.vercel.app',
    siteName: 'Indicadores económicos Chile',
    locale: 'es_ES',
    type: 'website',
  },
  verification: {
    google: 'R08irkmpBwoKuNN56L_whx-PBT9EqGu3suuRwwm3lgg',
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-[1100px] mx-auto pt-1 pb-2 px-3",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
