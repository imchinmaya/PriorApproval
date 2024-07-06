'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export function MappingRules(): React.JSX.Element {
    // State for each form control
    //const [eligibilityLookupCriteria, setEligibilityLookupCriteria] = React.useState('');
    //const [rcprdpLookupCriteria, setRcprdpLookupCriteria] = React.useState('');
    //const [rcpidpLookupCriteria, setRcpidpLookupCriteria] = React.useState('');

    // Handlers for form controls
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        
    };

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
                <CardHeader subheader="The information can be edited" title="Mapping Rules" />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid md={6} xs={12}>
                        <Grid md={6} xs={12}>
                        <SettingsIcon />
                        <Link href="#" underline="always">
                            {'RL1 Transform'}
                        </Link>

                            
                        </Grid>
                        </Grid>
                        <Grid md={6} xs={12}>
                        <SettingsIcon />
                        <Link href="#" underline="always">
                            {'Drug Transform'}
                        </Link>
                        </Grid>
                        <Grid md={6} xs={12}>
                        <SettingsIcon />
                        <Link href="#" underline="always">
                            {'Eligibilitys Transform'}
                        </Link>
                        </Grid>
                        
                    </Grid>
                </CardContent>
                <Divider />
            </Card>
        </form>

    );

}