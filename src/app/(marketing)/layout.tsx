import { Footer } from '@/app/(marketing)/components/Footer'
import { Header } from '@/app/(marketing)/components/Header'

export default function MarketingLayout({ children }: WithChildren) {
  return (
    <div className="flex flex-col">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
