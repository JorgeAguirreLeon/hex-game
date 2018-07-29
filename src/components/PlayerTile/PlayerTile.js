import React      from 'react'
import PropTypes  from 'prop-types'

import './PlayerTile.css'

const PlayerTile = ({image, className, attack_sides, attack, health, player, index, draggable, onDragStart, onDragEnd})=> {

  const attacks = attack_sides.join(' ')
  const tile_info = { image, attack_sides, attack, health, player, index }

  return (
    <div
      className={`hex-container ${className}`}
      draggable={draggable}
      onDragStart={onDragStart.bind(null, tile_info)}
      onDragEnd={onDragEnd.bind(null, tile_info)}
    >
      <div
        className='hex-card'
        data-image={image}
        data-attack-sides={attacks}
        data-player={player}
      >
        <div className='hex-card-top' />
        <div className='hex-card-bottom' />
        <span className='card-attack'>{attack}</span>
        <span className='card-health'>{health}</span>
      </div>
    </div>
  )

}

PlayerTile.propTypes = {
  image: PropTypes.string,
  className: PropTypes.string,
  attack_sides: PropTypes.array,
  attack: PropTypes.number,
  health: PropTypes.number,
  player: PropTypes.number,
  index: PropTypes.number,
  draggable: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func
}

PlayerTile.defaultProps = {
  image: '',
  className: '',
  attack_sides: [],
  attack: 0,
  health: 0,
  player: 0,
  index: 0,
  draggable: false,
  onDragStart: ()=> {},
  onDragEnd: ()=> {}
}

export default PlayerTile
