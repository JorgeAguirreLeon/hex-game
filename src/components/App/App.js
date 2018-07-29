import React, { Component }       from 'react'
import { connect }                from 'react-redux'
import { Switch, Route }          from 'react-router-dom'

import PlayerBoard                from '../PlayerBoard/PlayerBoard'
import HexBoard                   from '../HexBoard/HexBoard'

import { setSelectedHex }         from '../../actions'
import { playTurn }               from '../../actions'

import { createGhostTile }        from '../../utils/ghost_tile'
import { removeGhostTile }        from '../../utils/ghost_tile'
import { addHexToBoard }          from '../../utils/game'
import { getScore }               from '../../utils/utils'

import './App.css'

class App extends Component {

  onDragStart = (player_tile, event)=> {
    // For drag & drop
    const ghost_tile = createGhostTile(player_tile)
    event.dataTransfer.setDragImage(ghost_tile, 75, 75)
    // Mark hex as active in redux
    this.props.setActiveHex(player_tile)
  }

  onDragEnd = (player_tile, event)=> {
    // For drag & drop
    removeGhostTile()
    // Unmark hex as active
    this.props.setActiveHex(null)
  }

  onDragLeave = (game_tile, event)=> {
    // Nothing so far
  }

  onDragOver = (game_tile, event)=> {
    event.preventDefault()
  }

  onDrop = (game_tile, event)=> {
    const {board_tiles, activeHex} = this.props
    const updated_board = addHexToBoard(board_tiles, game_tile.row, game_tile.column, activeHex)
    const updated_player_hand = this.props[`player_${activeHex.player}_tiles`].map((tile, index)=> {
      if (index === activeHex.index) return null
      else return tile
    })
    const updated_score = activeHex.player === 1
      ? getScore(updated_player_hand, this.props.player_2_tiles, updated_board)
      : getScore(this.props.player_1_tiles, updated_player_hand, updated_board)
    this.props.playTurn(activeHex.player, updated_board, updated_player_hand, updated_score)
  }

  render() {
    return (
      <div className='App'>
        <PlayerBoard
          player={1}
          tiles={this.props.player_1_tiles}
          active={this.props.turn === 1}
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        />
        <HexBoard
          player_1_score={this.props.score[0]}
          player_2_score={this.props.score[1]}
          tiles={this.props.board_tiles}
          onDragLeave={this.onDragLeave}
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}
        />
        <PlayerBoard
          player={2}
          tiles={this.props.player_2_tiles}
          active={this.props.turn === 2}
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {player1, player2, board, score, turn, activeHex} = state

  return {
    player_1_tiles: player1,
    player_2_tiles: player2,
    board_tiles: board,
    score,
    turn,
    activeHex,
  }
}

function mapDispatchToProps(dispatch) {

  return {
    setActiveHex: hex=> dispatch(setSelectedHex(hex)),
    playTurn: (player, board, player_hand, score)=> dispatch(playTurn(player, board, player_hand, score))
  }

}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(App)
