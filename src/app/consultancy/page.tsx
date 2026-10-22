import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import NestedList from '@/components/NestedList'
import Placeholder from '@/components/Placeholder'
import { CONSULTANCY_ITEMS } from '@/content/consultancy'

export default function ConsultancyPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <SiteHeader active="/consultancy" />

      {/* The client gave no layout reference for this section — the structure
          here is extrapolated from Education and needs her confirmation. */}
      <div style={{ padding: '40px 40px 0' }}>
        <Placeholder note="layout extrapolated — client gave no reference for this section" />
      </div>

      <NestedList items={CONSULTANCY_ITEMS} />
      <SiteFooter />
    </main>
  )
}
