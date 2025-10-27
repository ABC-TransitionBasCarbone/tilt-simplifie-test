import { useEngine } from '@/publicodes-state'
import type { DottedName } from '@abc-transitionbascarbone/tilt-simple-test-model'
import RavijenChart from './RavijenChart'

export default function ServicesChart() {
  const { getSubcategories } = useEngine()

  const serviceCategories = getSubcategories('services sociétaux')

  const serviceSubcategories = serviceCategories?.reduce(
    (acc: DottedName[], category) => {
      acc.push(...(getSubcategories(category) ?? []))
      return acc
    },
    []
  )

  return (
    <RavijenChart
      categories={serviceCategories ?? []}
      subcategories={serviceSubcategories}
      squashLimitPercentage={1.4}
      isInverted={true}
      shouldAlwaysDisplayValue={true}
    />
  )
}
