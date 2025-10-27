import type { DottedName, NGCRule } from '@abc-transitionbascarbone/tilt-simple-test-model';
import { utils } from 'publicodes';

export const getRuleTitle = (
  rule: NGCRule & { dottedName: DottedName; titre?: string }
) => {
  return rule?.titre ?? utils.nameLeaf(rule.dottedName)
}
