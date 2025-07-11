import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

const banner = <Banner storageKey="some-key">Swipe-Button 1.0 is released 🎉</Banner>
const navbar = (
  <Navbar
    logo={<b>Swipe Button</b>}
    // ... Your additional navbar options
  />
)
const footer = <Footer>MIT {new Date().getFullYear()} © Swipe-Button.</Footer>
 
export default async function RootLayout({ children }:any) {
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/alishirani1384/swipe-button/tree/main/docs"
          footer={footer}
          // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}

