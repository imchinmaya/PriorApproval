'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Unstable_Grid2';
import { TextField, styled } from '@mui/material';

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

export function MandatoryLookup(): React.JSX.Element {
    // State for each form control
    const [eligibilityLookupCriteria, setEligibilityLookupCriteria] = React.useState('');
    const [rcprdpLookupCriteria, setRcprdpLookupCriteria] = React.useState('');
    const [rcpidpLookupCriteria, setRcpidpLookupCriteria] = React.useState('');

    // Handlers for form controls
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        console.log(name, value);
        switch (name) {
            case 'eligibilityLookupCriteria':
                setEligibilityLookupCriteria(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Submit your form values somewhere or move to the next step
    };

    // Render the form
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
            }}
        >
            <Card>
                <CardHeader subheader="The information can be edited" title="Mandatory Lookup" />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <TextField value={eligibilityLookupCriteria} 
                                    name="eligibilityLookupCriteria" 
                                    onChange={handleInputChange} 
                                    label="Eligibility Lookup Criteria"
                                    multiline
                                    maxRows={4} 
                                    rows={4}
                                    variant="outlined"/>
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <TextField value={rcprdpLookupCriteria} 
                                    name="rcprdpLookupCriteria" 
                                    onChange={handleInputChange} 
                                    label="RCPRDP Lookup Criteria"
                                    multiline
                                    maxRows={4} 
                                    rows={4}
                                    variant="outlined"/>
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <TextField value={rcpidpLookupCriteria} 
                                    name="rcpidpLookupCriteria" 
                                    onChange={handleInputChange} 
                                    label="RCPIDP Lookup Criteria"
                                    multiline
                                    maxRows={4} 
                                    rows={4}
                                    variant="outlined"/>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
            </Card>
        </form>
    );
}