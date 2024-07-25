'use client';

import update from 'immutability-helper'
import {
  Accordion, AccordionDetails, AccordionSummary, List, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography
} from "@mui/material";
// import { makeStyles} from "@mui/styles"
import React, { useCallback, useRef, useState } from "react";
import './splitter.css';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PinIcon from '@mui/icons-material/Pin';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SourceField } from "../source-field";
import { TargetField } from "./target-field";
import ExpandMoreIcon  from "@mui/icons-material/ExpandMore";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { FieldTypes, SourceFieldType, TargetFieldType } from './interfaces/mapping-types';
import { AutofpsSelect } from '@mui/icons-material';

interface EditMappingProps {
  sourceFields: SourceFieldType[]; // { type: string, label: string }[],
  targetFields: TargetFieldType[];
}

export function EditMapping({sourceFields, targetFields}: EditMappingProps): React.JSX.Element {
  const [targetFieldList, setTargetFieldList] = useState<TargetFieldType[]>(targetFields);

  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])

  function isDropped(boxName: string) {
    return droppedBoxNames.indexOf(boxName) > -1
  }

  const [leftWidth, setLeftWidth] = useState<number>(250);
  const isDragging = useRef<boolean>(false);

  const startDragging = () => {
    isDragging.current = true;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const newLeftWidth = e.clientX;
    setLeftWidth(newLeftWidth);
  };


  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  function getAcceptedSourceTypes(targetType: string) {
    switch(targetType){
      case FieldTypes.AlphaNumeric:
        return [FieldTypes.Number, FieldTypes.Text];
      default:
        return [targetType];
    }
  }   

  const handleDrop = useCallback(
    (index: number, item: { name: string }) => {
      const { name } = item
      console.error('targetFields->', index)
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }),
      )
      console.log('targetFields->', targetFields)
      let tf = targetFieldList;
      tf[index].bindedFields.push(name);
      setTargetFieldList(tf);
      // setTargetFields(
      //   update(targetFields, {
      //     [index]: {
      //       bindedFields: {
      //         $push: [name],
      //       },
      //     },
      //   }),
      // )
    },
    [droppedBoxNames, targetFieldList],
  )
  // const classes = useStyles();
  // Render the form
  return (
    <form
    // onSubmit={(event: any) => {
    //   event.preventDefault();
    // }}
    >
          <div
            className="splitter"
            onMouseMove={handleMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
          >
            <DndProvider backend={HTML5Backend}>
              <div className="pane left-pane" style={{ width: leftWidth }}>
                {/* <div>Resources</div> */}
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                    <Typography>Inputs</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <List>
                        {sourceFields.map((fld, index) => (
                          <SourceField
                            name={fld.label}
                            type={fld.type}
                            isDropped={isDropped(fld.label)}
                            key={index}
                          />
                        ))}
                      </List>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className="divider" onMouseDown={startDragging} />
              <div className="pane right-pane" style={{ width: `calc(100% - ${leftWidth}px)` }} >
                <div>Untitled Ruleset</div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Output / Internal</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="left">Expression / Rule</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {targetFieldList.map((row, index) => (
                        <TableRow
                          key={row.name}
                          sx={{ 'height': '40px', 'td, th': { padding: '1px 10px', border: 1, borderColor: 'lightgray' } }}
                        >
                          <TableCell component="th" scope="row" sx={{'textAlign': 'center'}}>{index + 1}</TableCell>
                          <TableCell >
                            {row.name}
                          </TableCell>
                          <TableCell align="center">
                            {((row.bindedFields.length > 0 || row.expression.length > 0) && row.type == FieldTypes.Text) && <FontDownloadIcon />}
                            {((row.bindedFields.length > 0 || row.expression.length > 0) && row.type == FieldTypes.Date) && <DateRangeIcon />}
                            {((row.bindedFields.length > 0 || row.expression.length > 0) && row.type == FieldTypes.Number) && <PinIcon />}
                            {((row.bindedFields.length > 0 || row.expression.length > 0) && row.type == FieldTypes.AlphaNumeric) && <AutofpsSelect />}
                            {(row.bindedFields.length == 0 && row.expression.length == 0) && <ReportProblemIcon />}
                          </TableCell>
                          <TableCell align="left" >
                            <TargetField
                              acceptedSourceTypes={getAcceptedSourceTypes(row.type)}
                              bindedFields={row.bindedFields}
                              expression=""
                              allowedDropEffect="any"
                              onDrop={(item) => handleDrop(index, item)}
                              key={index}
                            ></TargetField>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </DndProvider>

          </div>
        {/* </CardContent>
      </Card> */}
    </form>
  );
}