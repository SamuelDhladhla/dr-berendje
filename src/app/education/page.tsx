import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import NestedList from '@/components/NestedList'
import { EDUCATION_ITEMS } from '@/content/education'

export default function EducationPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <SiteHeader active="/education" />
      <NestedList items={EDUCATION_ITEMS} />
      <SiteFooter />
    </main>
  )
}
