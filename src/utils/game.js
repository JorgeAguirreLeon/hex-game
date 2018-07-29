import { getDirectionVector }     from './sides'
import { getOpposingDirection }   from './sides'
import { oppositePlayer }         from './utils'

import {
  EAST, NORTHEAST, NORTHWEST,
  WEST, SOUTHWEST, SOUTHEAST
} from './sides'

const validTileDrop = (board, row, column)=> board[row][column] === null

const applyDirectionVector = (row, column, side)=> {
  const vector = getDirectionVector(side)
  return {
    row: row + vector.row,
    column: column + vector.column
  }
}

const isValidTarget = vector=>  (vector.row >= 0 && vector.column >= 0) && (vector.row <= 3 && vector.column <= 3)

const shouldAttack = (board, source_player, target_row, target_column)=> {
  const target_hex = board[target_row][target_column]
  if (target_hex === null || target_hex.player === source_player) return false
  return true
}

const applyAttack = (board, target_row, target_column, attack)=> {
  const target_hex = board[target_row][target_column]
  if (target_hex.current_health > attack) {
    target_hex.current_health -= attack
    return false
  }
  else {
    target_hex.current_health = target_hex.health
    target_hex.player = oppositePlayer(target_hex.player)
    return true
  }
}

export function addHexToBoard(board, row, column, hex) {
  if (!validTileDrop(board, row, column)) return
  // Clone it to avoid issues
  const updated_board = board.map((tile_row, row_index)=> {
    return tile_row.map((tile, column_index)=> {
      if (row_index === row && column_index === column) {
        // We add the new hex to the board with full health
        return {
          ...hex,
          current_health: hex.health
        }
      }
      else return tile
    })
  })

  const sides = [EAST, NORTHEAST, NORTHWEST, WEST, SOUTHWEST, SOUTHEAST]

  // Attack thy neighbour
  sides.forEach(side=> {
    // The side must be attack-enabled
    if (!hex.attack_sides.includes(side)) return
    // There should be a tile to attack (edges)
    const target_tile = applyDirectionVector(row, column, side)
    if (!isValidTarget(target_tile)) return
    // Tile should be a target (not null and belonging to the enemy)
    if (!shouldAttack(updated_board, hex.player, target_tile.row, target_tile.column)) return
    // Otherwise this seems like a solid attack, so update the data
    applyAttack(updated_board, target_tile.row, target_tile.column, hex.attack)
  })
  // Thy neighbour respond
  let no_more = false
  sides.forEach(side=> {
    // Special indicator no more attacks are to be received
    if (no_more) return
    // There should be a tile to receive an attack from (edges)
    const target_tile = applyDirectionVector(row, column, side)
    if (!isValidTarget(target_tile)) return
    // Tile should be a target (not null and belonging to the enemy)
    if (!shouldAttack(updated_board, hex.player, target_tile.row, target_tile.column)) return
    // Get the neighbour tile
    const neighbour_hex = updated_board[target_tile.row][target_tile.column]
    // Check if the neighbour tile has the opposite side enabled
    const opposing_side = getOpposingDirection(side)
    if (!neighbour_hex.attack_sides.includes(opposing_side)) return
    // Now the other target attacks us!
    const conversion = applyAttack(updated_board, row, column, neighbour_hex.attack)
    // If conversion has taken place - stop this, thy neighbour does no more
    if (conversion) no_more = true
  })
  return updated_board
}
