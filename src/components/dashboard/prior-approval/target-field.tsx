import type { CSSProperties, FC } from 'react'
import { useDrop } from 'react-dnd'

import { FieldTypes } from './field-types'

const style: CSSProperties = {
  color: 'blue',
  padding: '1rem',
  textAlign: 'left',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  width: '100%'
}

export interface TargetFeildProps {
  type: string
  allowedDropEffect: string
}

function selectBackgroundColor(isActive: boolean, canDrop: boolean) {
  if (isActive) {
    return 'darkgreen'
  } else if (canDrop) {
    return 'darkkhaki'
  } else {
    return '#FFF'
  }
}

export const TargetField: FC<TargetFeildProps> = ({ type, allowedDropEffect }) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: type, // FieldTypes.BOX,
      drop: () => ({
        name: `${allowedDropEffect} Dustbin`,
        allowedDropEffect,
      }),
      collect: (monitor: any) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [allowedDropEffect],
  )

  const isActive = canDrop && isOver
  const backgroundColor = selectBackgroundColor(isActive, canDrop)
  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      null
      {/* {`Works with ${allowedDropEffect} drop effect`}
      <br />
      {isActive ? 'Release to drop' : 'Drag a box here'} */}
    </div>
  )
}
