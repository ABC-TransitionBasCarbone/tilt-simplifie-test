import type { Personas } from '@abc-transitionbascarbone/tilt-simple-test-model'
import personasEN from '@abc-transitionbascarbone/tilt-simple-test-model/public/personas-en.json'
import personasFR from '@abc-transitionbascarbone/tilt-simple-test-model/public/personas-fr.json'
import { importPreviewFile } from './importPreviewFile'

const personasByLocale: Record<string, Personas> = {
  fr: personasFR as Personas,
  en: personasEN as Personas,
}

type Props = {
  locale?: string
  PRNumber?: string
}

/*
 * This function is used to get the personas. It can be called directly from a server component.
 */
export async function getPersonas(
  { locale = 'fr', PRNumber }: Props = {
    locale: 'fr',
  }
): Promise<Personas> {
  if (PRNumber) {
    const fileName = `personas-${locale}.json`
    return importPreviewFile({ fileName, PRNumber })
  }

  return Promise.resolve(personasByLocale[locale])
}
