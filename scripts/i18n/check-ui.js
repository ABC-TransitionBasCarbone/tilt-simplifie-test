import cli from '@abc-transitionbascarbone/tilt-simple-test-model-scripts/cli'
import utils from '@abc-transitionbascarbone/tilt-simple-test-model-scripts/utils'
import * as paths from './paths.js'

const { srcLang, destLangs, markdown } = cli.getArgs(
  'Check missing translations for UI texts.',
  { source: true, target: true, markdown: true }
)

cli.printChecksResultTableHeader(markdown)

destLangs.forEach((destLang) => {
  const missingTranslations = utils.getUiMissingTranslations(
    paths.UI[srcLang].withLock,
    paths.UI[destLang].withLock
  )
  const nbMissingTranslations = missingTranslations.length

  cli.printChecksResult(
    nbMissingTranslations,
    missingTranslations,
    'UI texts',
    destLang,
    markdown
  )
})
