import { orderedCategories } from '@/constants/model/orderedCategories'
import { getComputedResults } from '@/publicodes-state/helpers/getComputedResults'
import { getSubcategories } from '@/publicodes-state/helpers/getSubcategories'
import { safeGetRuleHelper } from '@/publicodes-state/helpers/safeGetRuleHelper'
import type { DottedName, NGCRules } from '@abc-transitionbascarbone/tilt-simple-test-model'
import rules from '@abc-transitionbascarbone/tilt-simple-test-model/public/co2-model.FR-lang.fr.json'
import personas from '@abc-transitionbascarbone/tilt-simple-test-model/public/personas-fr.json'
import { faker } from '@faker-js/faker'
import Engine from 'publicodes'

const engine = new Engine<DottedName>(rules as Partial<NGCRules>, {
  logger: { warn: () => {}, error: () => {}, log: () => {} },
  strict: {
    situation: false,
    noOrphanRule: false,
  },
})

function createSimulation({ persona }: { persona?: string }) {
  // Get computed results from the engine
  engine.setSituation(
    personas[`personas . ${persona}` as keyof typeof personas].situation
  )

  return {
    id: faker.string.uuid(),
    date: faker.date.recent().toISOString(),
    foldedSteps: [],
    actionChoices: {},
    situation: {},
    computedResults: getComputedResults({
      metrics: ['carbone', 'eau'],
      categories: orderedCategories,
      subcategories: getSubcategories({
        categories: orderedCategories,
        everyRules: Object.keys(rules).map(
          (dottedName) => dottedName as DottedName
        ),
        parsedRules: engine.getParsedRules(),
        safeGetRule: (dottedName) =>
          safeGetRuleHelper(dottedName, engine) as any,
      }),
      getNumericValue: (dottedName) =>
        engine.evaluate(dottedName).nodeValue as number,
    }),
    progression: 1,
  }
}

export function createGroup({
  participants,
  currentUserId,
}: {
  participants: string[]
  currentUserId: string
}) {
  return {
    participants: participants.map((p, index) => ({
      // We set the first participant as the current user
      userId: !index ? currentUserId : faker.string.uuid(),
      simulation: createSimulation({ persona: p }),
      name: p || faker.person.firstName(),
      _id: faker.database.mongodbObjectId(),
    })),
  }
}
