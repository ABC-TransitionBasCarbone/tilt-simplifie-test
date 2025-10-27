import type { DottedName } from '@abc-transitionbascarbone/tilt-simple-test-model'

export function decodeRuleNameFromPath(path: string): DottedName {
  return decodeURI(path)
    ?.replaceAll('/', ' . ')
    .replaceAll('-', ' ')
    .replaceAll('\u2011', '-') as DottedName
}
