import React from 'react'
import { useDrag } from 'react-dnd'

const Box = ({ src, type, isDropped }) => {
  const [{ opacity }, drag] = useDrag({
    item: { src, type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })
  return (
    <div ref={drag} className="box" style={{ opacity }}>
      <img src={src} alt=""/>
    </div>
  )
}
export default Box
