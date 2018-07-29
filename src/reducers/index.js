import { combineReducers } from 'redux'

import { oppositePlayer }   from '../utils/utils'

import {
  SET_PLAYER_HAND,
  SET_GAME_BOARD,
  UPDATE_SCORE,
  SET_TURN,
  SET_SELECTED_HEX,
  PLAY_TURN
} from '../actions'

const default_player_hand = [
  {image: 'slowpoke', health: 5, attack: 4, attack_sides: ['(E)', '(W)']},
  {image: 'slowpoke', health: 5, attack: 4, attack_sides: ['(NE)', '(NW)']},
  {image: 'slowpoke', health: 5, attack: 4, attack_sides: ['(SE)', '(SW)']},
  {image: 'slowpoke', health: 5, attack: 4, attack_sides: ['(NE)', '(SW)']},
  {image: 'slowpoke', health: 5, attack: 4, attack_sides: ['(SE)', '(NW)']},
  {image: 'slowpoke', health: 5, attack: 4, attack_sides: ['(E)', '(NW)']},
  {image: 'slowpoke', health: 5, attack: 4, attack_sides: ['(NE)', '(W)']}
]

const default_board = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null]
]

function player1(state=default_player_hand, action) {
  switch (action.type) {
    case SET_PLAYER_HAND:
      const {player_hand} = action
      return player_hand
    case PLAY_TURN:
      const {player} = action
      if (player === 1) return action.player_hand
      else return state
    default: return state
  }
}

function player2(state=default_player_hand, action) {
  switch (action.type) {
    case SET_PLAYER_HAND:
      const {player_hand} = action
      return player_hand
    case PLAY_TURN:
      const {player} = action
      if (player === 2) return action.player_hand
      else return state
    default: return state
  }
}

function board(state=default_board, action) {
  switch (action.type) {
    case SET_GAME_BOARD:
    case PLAY_TURN:
      const {board} = action
      return board
    default: return state
  }
}

function score(state=[7,7], action) {
  switch (action.type) {
    case PLAY_TURN:
    case UPDATE_SCORE:
      const {score} = action
      return score
    default: return state
  }
}

function turn(state=1, action) {
  switch (action.type) {
    case SET_TURN:
      const {turn} = action
      return turn
    case PLAY_TURN:
      const {player} = action
      return oppositePlayer(player)
    default: return state
  }
}

function activeHex(state=null, action) {
  switch (action.type) {
    case SET_SELECTED_HEX:
      const {hex} = action
      return hex
    default: return state
  }
}

export default combineReducers({
  player1,
  player2,
  board,
  score,
  turn,
  activeHex
})
