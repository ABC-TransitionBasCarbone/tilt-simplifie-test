import type { DottedName } from '@abc-transitionbascarbone/tilt-simple-test-model'

type Props = {
  everyMosaicChildrenWithParent: Record<DottedName, DottedName[]>
  dottedName: DottedName
}
export default function useQuestionsOfMosaic({
  everyMosaicChildrenWithParent,
  dottedName,
}: Props) {
  const questionsOfMosaicFromParent =
    everyMosaicChildrenWithParent[dottedName] || []

  const questionsOfMosaicFromSibling =
    Object.values(everyMosaicChildrenWithParent).find((mosaicChildren) => {
      return mosaicChildren.includes(dottedName)
    }) || []

  return { questionsOfMosaicFromParent, questionsOfMosaicFromSibling }
}
