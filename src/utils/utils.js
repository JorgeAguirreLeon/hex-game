export function oppositePlayer(player) {
  return player === 1 ? 2 : 1
}

export function getScore(player_1_hand, player_2_hand, board) {
  let player_1_score = player_1_hand.filter(tile=> tile !== null).length
  let player_2_score = player_2_hand.filter(tile=> tile !== null).length
  board.forEach(row=> row.forEach(tile=> {
    if (tile === null) return
    else if (tile.player === 1) player_1_score++
    else if (tile.player === 2) player_2_score++
  }))
  return [player_1_score, player_2_score]
}

export function isGameOver(player_1_hand, player_2_hand) {
  let player_1_tiles = player_1_hand.filter(tile=> tile !== null).length
  let player_2_tiles = player_2_hand.filter(tile=> tile !== null).length
  return (player_1_tiles === 0 && player_2_tiles === 0)
}
