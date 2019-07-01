import React from 'react'
import { useDrop } from 'react-dnd'

const AnswerContainer = ({ accept, lastDroppedItem, onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = isOver && canDrop
  let backgroundColor = 'white'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  return (
    <div ref={drop} className="answer-container" style={{backgroundColor }}>
      {isActive
        ? 'Release to drop'
        : ""}

      {lastDroppedItem && (
        <img src={lastDroppedItem.src} alt="" className="cc-icon"/>
      )}
    </div>
  )
}
export default AnswerContainer
