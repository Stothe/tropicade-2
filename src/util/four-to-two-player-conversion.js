export default function substitueTwoPlayerVersion (e, boxesState, gamesTargets) {
  if (
    boxesState.nplayersClicked.indexOf('2P sim') >= 0 && boxesState.nplayersClicked.indexOf('4P sim') < 0
  ) {
    // push parent
    const parentRom = find(gamesTargets, { _name: e._cloneof })

    return {
      rom: parentRom._name,
      gamelistIgonre: true
    }
  }
}
