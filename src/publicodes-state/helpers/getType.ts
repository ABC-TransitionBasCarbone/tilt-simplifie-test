import type {
  DottedName,
  NGCRuleNode,
} from '@abc-transitionbascarbone/tilt-simple-test-model'
import type { EvaluatedNode } from 'publicodes'

type Props = {
  dottedName: DottedName
  rule: NGCRuleNode | undefined
  evaluation: EvaluatedNode | null
}

const booleanSecureTypes = ['présent', 'propriétaire']

export default function getType({
  dottedName,
  rule,
  evaluation,
}: Props):
  | 'notQuestion'
  | 'mosaic'
  | 'choices'
  | 'boolean'
  | 'number'
  | undefined {
  if (!rule || !evaluation) return undefined

  if (!rule.rawNode.question) {
    return 'notQuestion'
  }

  if (rule.rawNode.mosaique) {
    return 'mosaic'
  }

  if (
    (rule.rawNode['unité'] === undefined &&
      typeof evaluation.nodeValue !== 'number') ||
    booleanSecureTypes.some((key) => dottedName.includes(key))
  ) {
    const unePossibilite = rule.rawNode['une possibilité']

    if (unePossibilite) {
      return 'choices'
    } else {
      return 'boolean'
    }
  }

  return 'number'
}
