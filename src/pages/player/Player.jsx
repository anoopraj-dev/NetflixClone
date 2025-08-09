import React from 'react'
import './Player.css'
import backArrow from '../../assets/back_arrow_icon.png'

const Player = () => {
  return (
    <div className='player'>

      <img src={backArrow} alt="" />
      <iframe width='90%' height ='90%' src="" frameborder="0"></iframe>
      
    </div>
  )
}

export default Player
