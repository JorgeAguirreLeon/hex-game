import React      from 'react'
import PropTypes  from 'prop-types'

import HexScore   from '../HexScore/HexScore'
import HexTile    from '../HexTile/HexTile'

import './HexBoard.css'

const HexBoard = ({className, tiles, player_1_score, player_2_score, onDragLeave, onDragOver, onDrop})=> {

  const hex_tile_data = tiles.map((tile_row, row_index)=> {
    return tile_row.map((tile, column_index)=> {
      if (tile === null) return (
        <HexTile
          index={`${row_index}-${column_index}`}
          row={row_index}
          column={column_index}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      )
      else return (
        <HexTile
          index={`${row_index}-${column_index}`}
          row={row_index}
          column={column_index}
          image={tile.image}
          attack_sides={tile.attack_sides}
          attack={tile.attack}
          health={tile.health}
          current_health={tile.current_health}
          player={tile.player}
        />
      )
    })
  })

  return (
    <div className={`hex-board ${className}`}>
      <HexScore
        player_1={player_1_score}
        player_2={player_2_score}
      />
      <div className='hex-row'>
        {hex_tile_data[0][0]}
        {hex_tile_data[0][1]}
      </div>
      <div className='hex-row'>
        {hex_tile_data[1][0]}
        {hex_tile_data[1][1]}
        {hex_tile_data[1][2]}
      </div>
      <div className='hex-row'>
        {hex_tile_data[2][0]}
        {hex_tile_data[2][1]}
        {hex_tile_data[2][2]}
        {hex_tile_data[2][3]}
      </div>
      <div className='hex-row'>
        {hex_tile_data[3][1]}
        {hex_tile_data[3][2]}
        {hex_tile_data[3][3]}
      </div>
      <div className='hex-row'>
        {hex_tile_data[4][2]}
        {hex_tile_data[4][3]}
      </div>
    </div>
  )

}

HexBoard.propTypes = {
  className: PropTypes.string,
  tiles: PropTypes.array,
  player_1_score: PropTypes.number,
  player_2_score: PropTypes.number,
  onDragLeave: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
}

HexBoard.defaultProps = {
  className: '',
  tiles: [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
  ],
  player_1_score: 0,
  player_2_score: 0,
  onDragLeave: ()=> {},
  onDragOver: ()=> {},
  onDrop: ()=> {},
}

export default HexBoard
