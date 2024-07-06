'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Unstable_Grid2';
import { FormControlLabel, Switch } from '@mui/material';

export function MultpleHDRHDHP(): React.JSX.Element {
    // Handlers for form controls
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
                <CardHeader subheader="The information can be edited" title="Multiple HDR/HDHP" />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid md={6} xs={12}>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <FormControlLabel control={<Switch defaultChecked />} label="CAG Form Input" />
                            </FormControl>
                        </Grid>
                        </Grid>
                        <Grid md={6} xs={12}>
                        <FormControl fullWidth required>
                                <FormControlLabel control={<Switch defaultChecked />} label="IFMS Input" />
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                        <FormControl fullWidth required>
                                <FormControlLabel control={<Switch defaultChecked />} label="Custom HDR" />
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                        <FormControl fullWidth required>
                                <FormControlLabel control={<Switch defaultChecked />} label="Custom HDHP" />
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
            </Card>
        </form>

    );

}