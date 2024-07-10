import type { CSSProperties, FC } from 'react'
import { useDrop } from 'react-dnd'

import { FieldTypes } from './field-types'
import { Chip, TextField } from '@mui/material'
import './splitter.css';
// const useStyles = makeStyles(theme => ({
//   chip: {
//     margin: theme.spacing(0.5, 0.25)
//   }
// }));

const style: CSSProperties = {
  color: 'blue',
  padding: '5px',
  textAlign: 'left',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  width: '100%',
  border: '0px'
}

export interface TargetFieldProps {
  type: string
  allowedDropEffect: string,
  bindedFields: string[],
  expression: string,
  onDrop: (item: any) => void
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

export const TargetField: FC<TargetFieldProps> = (
    { type, allowedDropEffect, bindedFields, onDrop }
  ) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: type, // FieldTypes.BOX,
      drop: onDrop,
      // drop: () => ({
      //   name: `${allowedDropEffect} Dustbin`,
      //   allowedDropEffect,
      // }),
      collect: (monitor: any) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [allowedDropEffect],
  )


  const handleDelete = (item: string) => () => {
    //const newSelectedItem = [...bindedFields];
    //newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    //setSelectedItem(newSelectedItem);
  };


  const isActive = canDrop && isOver
  const backgroundColor = selectBackgroundColor(isActive, canDrop)
  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      <TextField
        variant="standard"
        InputProps={{
          disableUnderline: true,
          startAdornment: bindedFields.map(item => (
            <Chip
              key={item}
              tabIndex={-1}
              label={item}
              className='chip'
              onDelete={handleDelete(item)}
            />
          )),
          // onBlur,
          // onChange: event => {
          //   handleInputChange(event);
          //   onChange(event);
          // },
          // onFocus
        }}
        //{...other}
        //{...inputProps}
        sx={{'width': '100%'}}
      />
    </div>
  )
}
