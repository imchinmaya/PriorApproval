'use client';

import {
  Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardHeader, Divider, List,
  ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography
} from "@mui/material";
// import { makeStyles} from "@mui/styles"
import React, { useRef, useState } from "react";
import './splitter.css';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PinIcon from '@mui/icons-material/Pin';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SourceField } from "../source-field";
import { TargetField } from "./target-field";
import { FieldTypes } from "./field-types";

function createData(
  name: string,
  type: string
) {
  return { name, type };
}

const rows = [
  createData('RECORD_ID', FieldTypes.Number),
  createData('RECORD_TYPE', FieldTypes.Text),
  createData('MEMBER_ID', FieldTypes.Text),
  createData('CARRIER_ID', FieldTypes.Text),
  createData('ACCOUNT_ID', FieldTypes.Text),
  createData('GROUP_ID', FieldTypes.Text),
  createData('PA_NUMBER', FieldTypes.Text),
  createData('EFFECTIVE_DATE', FieldTypes.Date),
];

const sourceFields = [
  { type: FieldTypes.Number, label: "RECORD_ID" },
  { type: FieldTypes.Text, label: "Record_Type" },
  { type: FieldTypes.Text, label: "Member_Number" },
  { type: FieldTypes.Text, label: "Group_Number" },
  { type: FieldTypes.Text, label: "Person_Number" },
  { type: FieldTypes.Text, label: "Relationship" },
  { type: FieldTypes.Date, label: "Dae_of_Birth" },
  { type: FieldTypes.Text, label: "Patient_Sex" },
  { type: FieldTypes.Text, label: "Drug_Type" },
  { type: FieldTypes.Text, label: "Drug_Number" },
  { type: FieldTypes.Number, label: "Filter" },
  { type: FieldTypes.Text, label: "Cat_Code" },
  { type: FieldTypes.Number, label: "Rule_ID" },
]

//configParameters: DefineConfigParametersProps, updateWizardData: (step: string, key: string, value: string) => void 
//export const DefineConfigParameters = React.forwardRef((props: { }, ref: React.Ref<StepValidation>) => {
export function EditMapping(): React.JSX.Element {
  // const useStyles = makeStyles({
  //   table: {
  //     minWidth: 650,
  //     "& .MuiTableCell-root": {
  //       borderLeft: "1px solid rgba(224, 224, 224, 1)"
  //     }
  //   }
  // });

  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])

  function isDropped(boxName: string) {
    return droppedBoxNames.indexOf(boxName) > -1
  }

  const [leftWidth, setLeftWidth] = useState<number>(200);
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
            <div>Resources</div>
            <div></div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
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
                      // <ListItem disablePadding>
                      //   <ListItemButton>
                      //     <ListItemIcon>
                      //       {(fld.type == FieldTypes.Text) && <FontDownloadIcon />}
                      //       {(fld.type == 'date') && <DateRangeIcon />}
                      //       {(fld.type == 'pin') && <PinIcon />}
                      //     </ListItemIcon>
                      //     <ListItemText primary={fld.label} />
                      //   </ListItemButton>
                      // </ListItem>
                    ))}
                  </List>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="divider" onMouseDown={startDragging} />
          <div className="pane right-pane" style={{ width: `calc(100% - ${leftWidth}px)` }} >
            <Card>
              <CardHeader subheader="The information can be edited" title="Mapping Rules" />
              <Divider />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Output / Internal</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="left">Expression / Rule</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ 'th, td': { border: 1 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}

                          </TableCell>
                          <TableCell align="center">
                            {(row.type == FieldTypes.Text) && <FontDownloadIcon />}
                            {(row.type == FieldTypes.Date) && <DateRangeIcon />}
                            {(row.type == FieldTypes.Number) && <PinIcon />}
                          </TableCell>
                          <TableCell align="left">
                            <TargetField type={row.type} allowedDropEffect="any"></TargetField>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </div>
        </DndProvider>
      </div>
    </form>
  );
}