export const EAST           = '(E)'
export const NORTHEAST      = '(NE)'
export const NORTHWEST      = '(NW)'
export const WEST           = '(W)'
export const SOUTHWEST      = '(SW)'
export const SOUTHEAST      = '(SE)'

export function getDirectionVector(side) {
  switch(side) {
    case NORTHWEST:  return {row: -1, column: -1}
		case NORTHEAST:  return {row: -1, column: 0}
		case EAST:       return {row: 0, column: 1}
		case SOUTHEAST:  return {row: 1, column: 1}
		case SOUTHWEST:  return {row: 1, column: 0}
		case WEST:       return {row: 0, column: -1}
    default:         return {}
  }
}

export function getOpposingDirection(side) {
  switch(side) {
    case NORTHWEST:  return SOUTHEAST
		case NORTHEAST:  return SOUTHWEST
		case EAST:       return WEST
		case SOUTHEAST:  return NORTHWEST
		case SOUTHWEST:  return NORTHEAST
		case WEST:       return EAST
    default:         return ''
  }
}
