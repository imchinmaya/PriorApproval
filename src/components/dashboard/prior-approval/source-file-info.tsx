'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FormControlLabel, Switch, styled } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export function SourceFileInfo(): React.JSX.Element {
    // State for each form control
    const [sourceFileType, setSourceFileType] = React.useState('');
    const [carrierName, setCarrierName] = React.useState('');
    const [recordNeedsPadding, setRecordNeedsPadding] = React.useState(false);
    const [sheetIndex, setSheetIndex] = React.useState('');
    const [headerRowCount, setHeaderRowCount] = React.useState('');

    // Handlers for form controls
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        switch (name) {
            case 'sourceFileType':
                setSourceFileType(value);
                break;
            case 'carrierName':
                setCarrierName(value);
                break;
            case 'recordNeedsPadding':
                setRecordNeedsPadding(value);
                break;
            case 'sheetIndex':
                setSheetIndex(value);
                break;
            case 'headerRowCount':
                setHeaderRowCount(value);
                break;
            default:
                break;
        }
    };

    // Render the form
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
            }}
        >
            <Card>
                <CardHeader subheader="The information can be edited" title="Source File Info" />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Source File Type</InputLabel>
                                <Select value={sourceFileType} label="Source File Type" name="sourceFileType" onChange={handleInputChange} variant="outlined">
                                    <MenuItem value="Text">Text</MenuItem>
                                    <MenuItem value="Excel">Excel</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Provide Source File</InputLabel>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload file
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Carrier Name</InputLabel>
                                <OutlinedInput value={carrierName} onChange={handleInputChange} label="Carrier Name" name="carrierName" />
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                            <FormControlLabel control={<Switch defaultChecked value={recordNeedsPadding} onChange={handleInputChange}/>} label="Record needs padding" />
                            </FormControl>
                        </Grid>
                        {sourceFileType === 'Excel' ? <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Sheet Index</InputLabel>
                                <OutlinedInput value={sheetIndex} onChange={handleInputChange} label="Sheet Index" name="sheetIndex" />
                            </FormControl>
                        </Grid> : null}
                        {sourceFileType === 'Excel' ? <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Header Row Count</InputLabel>
                                <OutlinedInput value={headerRowCount} onChange={handleInputChange} label="Header Row Count" name="headerRowCount" />
                            </FormControl>
                        </Grid> : null}
                        
                    </Grid>
                </CardContent>
                <Divider />
            </Card>
        </form>

    );

}