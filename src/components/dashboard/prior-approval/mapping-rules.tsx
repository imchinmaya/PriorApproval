'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Link, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { EditMapping } from './edit-mapping';
import { FieldTypes, SourceFieldType, TargetFieldType } from './interfaces/mapping-types';

export function MappingRules(): React.JSX.Element {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [currentEditingRule, setCurrentEditingRule] = React.useState('');
    const [sourceFields, setSourceFields] = React.useState<SourceFieldType[]>([]);
    const [targetFields, setTargetFields] = React.useState<TargetFieldType[]>([]);

    // Handlers for form controls
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;

    };


    const rl1SourceFields: SourceFieldType[] = [
        { type: FieldTypes.Number, label: "RECORD_ID" },
        { type: FieldTypes.Text, label: "Record_Type" },
        { type: FieldTypes.Text, label: "Member_Number" },
        { type: FieldTypes.Text, label: "Group_Number" },
        { type: FieldTypes.Text, label: "Person_Number" },
        { type: FieldTypes.Text, label: "Relationship" },
        { type: FieldTypes.Date, label: "Date_of_Birth" },
        { type: FieldTypes.Text, label: "Patient_Sex" },
        { type: FieldTypes.Text, label: "Drug_Type" },
        { type: FieldTypes.Text, label: "Drug_Number" },
        { type: FieldTypes.Number, label: "Filter" },
        { type: FieldTypes.Text, label: "Cat_Code" },
        { type: FieldTypes.Number, label: "Rule_ID" },
      ];
      
      const rl1TargetFields: TargetFieldType[] = [
          {name: 'RECORD_ID', type: FieldTypes.Number, bindedFields: [], expression: '' },
          {name: 'RECORD_TYPE', type: FieldTypes.Text, bindedFields: ['8.6'], expression: ''  },
          {name: 'MEMBER_ID', type: FieldTypes.Text, bindedFields: [], expression: ''  },
          {name: 'CARRIER_ID', type: FieldTypes.Text, bindedFields: [], expression: ''  },
          {name: 'ACCOUNT_ID', type: FieldTypes.Text, bindedFields: [], expression: ''  },
          {name: 'GROUP_ID', type: FieldTypes.Text, bindedFields: [], expression: ''  },
          {name: 'PA_NUMBER', type: FieldTypes.AlphaNumeric, bindedFields: [], expression: ''  },
          {name: 'EFFECTIVE_DATE', type: FieldTypes.Date, bindedFields: [], expression: ''  },
      ];
      
      const drugSourceFields: SourceFieldType[] = [
          { type: FieldTypes.Number, label: "RECORD_ID" },
          { type: FieldTypes.Text, label: "Drug_Type" },
          { type: FieldTypes.Text, label: "Member_Number" },
          { type: FieldTypes.Text, label: "Group_Number" },
          { type: FieldTypes.Text, label: "Person_Number" },
          { type: FieldTypes.Text, label: "Relationship" },
          { type: FieldTypes.Date, label: "Date_of_Birth" },
          { type: FieldTypes.Text, label: "Patient_Sex" },
          { type: FieldTypes.Text, label: "Drug_Number" },
          { type: FieldTypes.Number, label: "Filter" },
          { type: FieldTypes.Text, label: "Cat_Code" },
          { type: FieldTypes.Number, label: "Rule_ID" },
        ];
        
        const drugTargetFields: TargetFieldType[] = [
            {name: 'RECORD_ID', type: FieldTypes.Number, bindedFields: [], expression: '' },
            {name: 'DRUG_TYPE', type: FieldTypes.Text, bindedFields: [], expression: ''  },
            {name: 'MEMBER_ID', type: FieldTypes.Text, bindedFields: [], expression: ''  },
            {name: 'CARRIER_ID', type: FieldTypes.Text, bindedFields: [], expression: ''  },
            {name: 'ACCOUNT_ID', type: FieldTypes.Text, bindedFields: [], expression: ''  },
            {name: 'GROUP_ID', type: FieldTypes.Text, bindedFields: [], expression: ''  },
            {name: 'PA_NUMBER', type: FieldTypes.Number, bindedFields: [], expression: ''  },
            {name: 'EFFECTIVE_DATE', type: FieldTypes.Date, bindedFields: [], expression: ''  },
        ];

        const eligibilitySourceFields: SourceFieldType[] = [
            { type: FieldTypes.Number, label: "RECORD_ID" },
            { type: FieldTypes.Text, label: "Eligibility_Type" },
            { type: FieldTypes.Text, label: "Member_Number" },
            { type: FieldTypes.Text, label: "Group_Number" },
            { type: FieldTypes.Text, label: "Person_Number" },
            { type: FieldTypes.Text, label: "Relationship" },
            { type: FieldTypes.Date, label: "Date_of_Birth" },
            { type: FieldTypes.Text, label: "Patient_Sex" },
            { type: FieldTypes.Text, label: "Drug_Type" },
            { type: FieldTypes.Text, label: "Drug_Number" },
            { type: FieldTypes.Number, label: "Filter" },
            { type: FieldTypes.Text, label: "Cat_Code" },
            { type: FieldTypes.Number, label: "Rule_ID" },
          ];
          
          const eligibilityTargetFields: TargetFieldType[] = [
              {name: 'RECORD_ID', type: FieldTypes.Number, bindedFields: [], expression: '' },
              {name: 'ELIGIBILITY_TYPE', type: FieldTypes.Text, bindedFields: [], expression: ''  },
              {name: 'MEMBER_ID', type: FieldTypes.Text, bindedFields: [], expression: ''  },
              {name: 'CARRIER_ID', type: FieldTypes.Text, bindedFields: [], expression: ''  },
              {name: 'ACCOUNT_ID', type: FieldTypes.Text, bindedFields: [], expression: ''  },
              {name: 'GROUP_ID', type: FieldTypes.Text, bindedFields: [], expression: ''  },
              {name: 'PA_NUMBER', type: FieldTypes.Number, bindedFields: [], expression: ''  },
              {name: 'EFFECTIVE_DATE', type: FieldTypes.Date, bindedFields: [], expression: ''  },
          ];
      

    const handleClickOpen = (editingRule: string) => () => {
        // scrollType: DialogProps['scroll']
        switch(editingRule){
            case 'RL1 Transform':
                setSourceFields(rl1SourceFields);
                setTargetFields(rl1TargetFields);
                break;
            case 'Drug Transform':
                setSourceFields(drugSourceFields);
                setTargetFields(drugTargetFields);
                break;
            case 'Eligibility Transform':
                setSourceFields(eligibilitySourceFields);
                setTargetFields(eligibilityTargetFields);
                break;
        }
        setCurrentEditingRule(editingRule);
        setOpen(true);
        setScroll('paper'); //scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Submit your form values somewhere or move to the next step
    };

    // Render the form
    return (
        <form
            onSubmit={(event: any) => {
                event.preventDefault();
            }}
        >
            <Card>
                <CardHeader subheader="The information can be edited" title={'Mapping Rules'} />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid md={6} xs={12}>
                            <Grid md={6} xs={12}>
                                <SettingsIcon />
                                <Link onClick={handleClickOpen('RL1 Transform')} style={{ cursor: 'pointer' }} underline="always">
                                    {'RL1 Transform'}
                                </Link>


                            </Grid>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <SettingsIcon />
                            <Link onClick={handleClickOpen('Drug Transform')} style={{ cursor: 'pointer' }} underline="always">
                                {'Drug Transform'}
                            </Link>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <SettingsIcon />
                            <Link onClick={handleClickOpen('Eligibility Transform')} style={{ cursor: 'pointer' }} underline="always">
                                {'Eligibility Transform'}
                            </Link>
                        </Grid>
                    </Grid>
                </CardContent>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth={true}
                    maxWidth='xl'
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">
                        {'Edit Mapping - ' + currentEditingRule} 
                        <Typography variant="subtitle1" component="div">
                            Update mapping between source and target fiels
                        </Typography>
                    </DialogTitle>
                    
                    <DialogContent dividers={scroll === 'paper'}>
                        <EditMapping sourceFields={sourceFields} targetFields={targetFields}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Save</Button>
                    </DialogActions>
                </Dialog>
                <Divider />
            </Card>
        </form>
    );
}