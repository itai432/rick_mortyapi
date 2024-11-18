import React from 'react'
import innerRectangleImage from '../assets/innerRectangleImage.png';
import '../style/Banner.scss'



const Banner: React.FC = () => (
    <div className="inner-rectangle">
        <img src={innerRectangleImage} alt="Inner Rectangle" />
    </div>
  )

export default Banner
