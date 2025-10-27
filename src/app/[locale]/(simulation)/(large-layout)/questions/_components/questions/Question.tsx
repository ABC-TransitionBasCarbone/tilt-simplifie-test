'use client'

import { useRule } from '@/publicodes-state'
import type { DottedName } from '@abc-transitionbascarbone/tilt-simple-test-model'

type Props = { question: DottedName }

export default function Question({ question }: Props) {
  const { label } = useRule(question)
  return <li>{label}</li>
}
