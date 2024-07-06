'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Unstable_Grid2';
import { FormControlLabel, Switch } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

export function ExecuteMapProcess(): React.JSX.Element {
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
                <CardHeader subheader="The information can be edited" title="Execute Map Process" />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid md={6} xs={12}>
                            <Grid md={6} xs={12}>
                                <FormControl fullWidth required>
                                    <FormControlLabel control={<Switch defaultChecked />} label="Generate New PA numbers" />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <FormControlLabel control={<Switch defaultChecked />} label="Generate New QLC PA numbers" />
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <FormControlLabel control={<Switch defaultChecked />} label="Generate New QLC UMR PA numbers" />
                            </FormControl>
                        </Grid>
                        <Grid md={12} xs={12}>
                            <Button variant="contained" endIcon={<PlayCircleIcon />}>
                                Execute
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
            </Card>
        </form>

    );

}