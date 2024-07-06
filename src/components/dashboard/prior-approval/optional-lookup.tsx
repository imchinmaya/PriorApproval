'use client';

import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, FormControlLabel, Switch } from '@mui/material';

export function OptionalLookup(): React.JSX.Element {

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
                <CardHeader subheader="The information can be edited" title="Optional Lookup" />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid md={6} xs={12}>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <FormControlLabel control={<Switch defaultChecked />} label="HCR Lookup Required" />
                            </FormControl>
                        </Grid>
                        </Grid>
                        <Grid md={6} xs={12}>
                        <FormControl fullWidth required>
                                <FormControlLabel control={<Switch defaultChecked />} label="HDHP Lookup Required" />
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                        <FormControl fullWidth required>
                                <FormControlLabel control={<Switch defaultChecked />} label="Brand or Generic Lookup Required" />
                            </FormControl>
                        </Grid>
                        
                    </Grid>
                </CardContent>
                <Divider />
            </Card>
        </form>

    );

}