export const SET_PLAYER_HAND    = 'SET_PLAYER_HAND'
export const SET_GAME_BOARD     = 'SET_GAME_BOARD'
export const UPDATE_SCORE       = 'UPDATE_SCORE'
export const SET_TURN           = 'SET_TURN'
export const SET_SELECTED_HEX   = 'SET_SELECTED_HEX'
export const PLAY_TURN          = 'PLAY_TURN'

export function setPlayerHand(player_hand) {
  return {
    type: SET_PLAYER_HAND,
    player_hand
  }
}

export function setGameBoard(board) {
  return {
    type: SET_GAME_BOARD,
    board
  }
}

export function updateScore(player_1_score, player_2_score) {
  return {
    type: UPDATE_SCORE,
    score: [player_1_score, player_2_score]
  }
}

export function setTurn(turn) {
  return {
    type: SET_TURN,
    turn
  }
}

export function setSelectedHex(hex) {
  return {
    type: SET_SELECTED_HEX,
    hex
  }
}

export function playTurn(player, board, player_hand, score) {
  return {
    type: PLAY_TURN,
    player,
    board,
    player_hand,
    score
  }
}
