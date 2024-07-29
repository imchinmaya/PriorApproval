import * as React from 'react';
import Stack from '@mui/material/Stack';
import FilmsComponent from './film-component';

export default function Page(): React.JSX.Element {
    return (
        <Stack spacing={3}>
            <FilmsComponent />
        </Stack>
    );
}