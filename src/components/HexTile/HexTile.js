import React      from 'react'
import PropTypes  from 'prop-types'

import './HexTile.css'

const HexTile = ({image, className, attack_sides, attack, health, current_health, player, row, column, onDragOver, onDragLeave, onDrop})=> {

  const tile_type = image ? 'hex-card hex-card-played' : 'hex-tile'
  const attacks = attack_sides.join(' ')
  const tile_info = {row, column}

  return (
    <div
      className={`hex-container ${className}`}
      onDragLeave={onDragLeave.bind(null, tile_info)}
      onDragOver={onDragOver.bind(null, tile_info)}
      onDrop={onDrop.bind(null, tile_info)}
    >
      <div
        data-image={image}
        className={tile_type}
        data-attack-sides={attacks}
        data-player={player}
        data-row={row}
        data-column={column}
      >
        <div className='hex-card-top' />
        <div className='hex-card-bottom' />
        <span className='card-attack'>{image ? attack : ''}</span>
        <span className='card-health'>{image ? health : ''}</span>
        <span className='card-current-health'>{image ? current_health : ''}</span>
      </div>
    </div>
  )

}

HexTile.propTypes = {
  image: PropTypes.string,
  className: PropTypes.string,
  attack_sides: PropTypes.array,
  attack: PropTypes.number,
  health: PropTypes.number,
  current_health: PropTypes.number,
  player: PropTypes.number,
  row: PropTypes.number,
  column: PropTypes.number,
  onDragLeave: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
}

HexTile.defaultProps = {
  image: '',
  className: '',
  attack_sides: [],
  attack: 0,
  health: 0,
  current_health: 0,
  player: 0,
  row: 0,
  column: 0,
  onDragLeave: ()=> {},
  onDragOver: ()=> {},
  onDrop: ()=> {}
}

export default HexTile
