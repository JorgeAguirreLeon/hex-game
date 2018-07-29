import React      from 'react'
import PropTypes  from 'prop-types'

import './HexScore.css'

const HexScore = ({className, player_1, player_2})=> {

  return (
    <div className={`hex-score ${className}`}>
      <span className='player-score' data-player='1'>{player_1}</span>
      <span className='player-score' data-player='2'>{player_2}</span>
    </div>
  )

}

HexScore.propTypes = {
  className: PropTypes.string,
  player_1: PropTypes.number,
  player_2: PropTypes.number,
}

HexScore.defaultProps = {
  className: '',
  player_1: 0,
  player_2: 0,
}

export default HexScore
