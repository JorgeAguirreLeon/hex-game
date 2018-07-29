import React      from 'react'
import PropTypes  from 'prop-types'

import PlayerTile from '../PlayerTile/PlayerTile'

import './PlayerBoard.css'

const PlayerBoard = ({className, player, tiles, active, onDragStart, onDragEnd})=> {

  const player_tile_data = tiles.map((tile, index)=> {
    if (tile === null) return (
      <div className='hex-container-empty' />
    )
    else return (
      <PlayerTile
        index={index}
        image={tile.image}
        player={player}
        attack_sides={tile.attack_sides}
        attack={tile.attack}
        health={tile.health}
        draggable={active}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      />
    )
  })

  return (
    <div className={`player-hex ${className}`} data-player={player}>
      <h1 className='player-name'>Player {`${player}`}</h1>
      <div className='player-hand'>
        <div className='hex-row'>
          {player_tile_data[0]}
          {player_tile_data[1]}
        </div>
        <div className='hex-row'>
          {player_tile_data[2]}
          {player_tile_data[3]}
          {player_tile_data[4]}
        </div>
        <div className='hex-row'>
          {player_tile_data[5]}
          {player_tile_data[6]}
        </div>
      </div>
    </div>
  )
}

PlayerBoard.propTypes = {
  className: PropTypes.string,
  player: PropTypes.number,
  tiles: PropTypes.array,
  active: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func
}

PlayerBoard.defaultProps = {
  className: '',
  player: 0,
  tiles: [null, null, null, null, null, null, null],
  active: false,
  onDragStart: ()=> {},
  onDragEnd: ()=> {}
}

export default PlayerBoard
