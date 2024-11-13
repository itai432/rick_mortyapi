import React from 'react'
import '../style/ButtonGroup.scss';

const ButtonGrupe:React.FC = () => {
  return (
    <div className='button_group'>
      <button className='browse_button'>Browse</button>
      <button className='character_button'>Pick a Character</button>
    </div>
  )
}

export default ButtonGrupe
