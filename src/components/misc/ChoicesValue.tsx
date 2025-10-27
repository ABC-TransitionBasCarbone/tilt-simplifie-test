import { useRule } from '@/publicodes-state'
import type {
  DottedName,
  NodeValue,
} from '@abc-transitionbascarbone/tilt-simple-test-model'

type Props = {
  value: NodeValue
  question: DottedName
}
export default function ChoicesValue({ value, question }: Props) {
  const { title, icons } = useRule((question + ' . ' + value) as DottedName)

  return (
    <>
      {icons} {title}
    </>
  )
}
