import { captureException } from '@sentry/nextjs'

export async function importRulesFromModel({ fileName }: { fileName: string }) {
  try {
    return await import(
      `@abc-transitionbascarbone/tilt-simple-test-model/public/${fileName}`
    ).then((module) => module.default)
  } catch (e) {
    captureException(e)
    return {}
  }
}
