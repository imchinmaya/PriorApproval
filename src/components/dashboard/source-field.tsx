import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import type { CSSProperties, FC } from 'react'
import { memo } from 'react'
import { useDrag } from 'react-dnd'
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PinIcon from '@mui/icons-material/Pin';
import { FieldTypes } from './prior-approval/field-types';

// const style: CSSProperties = {
//   border: '1px dashed gray',
//   backgroundColor: 'white',
//   padding: '0.5rem 1rem',
//   marginRight: '1.5rem',
//   marginBottom: '1.5rem',
//   cursor: 'move',
//   float: 'left',
// }

const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '1px',
  marginRight: '0.2rem',
  marginBottom: '0.2rem',
  cursor: 'move',
  float: 'left',
}

export interface SourceFieldProps {
  name: string
  type: string
  isDropped: boolean
}

export const SourceField: FC<SourceFieldProps> = memo(function Box({ name, type, isDropped }) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type],
  )

  return (
    
    <ListItem disablePadding style={{ ...style, opacity }}>
      <div style={{'width': '100%', 'display':'flex', 'alignItems': 'center', 'padding': '5px 10px'}} ref={drag}  data-testid="box">
          {(type == FieldTypes.Text) && <FontDownloadIcon />}
          {(type == FieldTypes.Date) && <DateRangeIcon />}
          {(type == FieldTypes.Number) && <PinIcon />}

          <span style={{'marginLeft': '10px'}}>{name}</span>
      {/* <ListItemButton sx={{'padding': '1px 5px'}}>
        <ListItemIcon sx={{'min-width': '36px'}}>
        
          
          
        </ListItemIcon>
        <ListItemText primary={name} /> 
      </ListItemButton>*/}
      </div>
    </ListItem>
    

    // <div ref={drag} style={{ ...style, opacity }} data-testid="box">
    //   {isDropped ? <s>{name}</s> : name}
    // </div>
  )
})
