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

export function MappingRules(): React.JSX.Element {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [currentEditingRule, setCurrentEditingRule] = React.useState('');

    // Handlers for form controls
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;

    };

    const handleClickOpen = (editingRule: string) => () => {
        // scrollType: DialogProps['scroll']
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
                        <EditMapping />
                        {/* <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                        >
                            {[...new Array(50)]
                                .map(
                                    () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                                )
                                .join('\n')}
                        </DialogContentText> */}
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