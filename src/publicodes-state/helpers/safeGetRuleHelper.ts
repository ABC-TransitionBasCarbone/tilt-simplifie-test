import type { DottedName, NGCRuleNode } from '@abc-transitionbascarbone/tilt-simple-test-model'
import { captureException } from '@sentry/nextjs'
import type { Engine } from '../types'

export const safeGetRuleHelper = (
  ruleName: DottedName,
  engineUsed: Engine
): NGCRuleNode | null => {
  let rule = null
  try {
    rule = engineUsed.getRule(ruleName)
  } catch (error) {
    console.warn(error)
    captureException(error)
  }
  return rule
}
