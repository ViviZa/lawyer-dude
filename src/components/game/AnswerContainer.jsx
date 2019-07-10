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
    backgroundColor = '#0D3E59'
  } else if (canDrop) {
    backgroundColor = '#dbeffa'
  }
  return (
    <div ref={drop} className="answer-container" style={{backgroundColor }}>
      {isActive
        ? ""
        : ""}

      {lastDroppedItem && (
        <img src={lastDroppedItem.src} alt="" className="cc-icon"/>
      )}
    </div>
  )
}
export default AnswerContainer
