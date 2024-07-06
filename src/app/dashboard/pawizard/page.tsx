import * as React from 'react';
import Stack from '@mui/material/Stack';
import { PAWizard } from '@/components/dashboard/prior-approval/pa-wizard';

export default function Page(): React.JSX.Element {
    return (
        <Stack spacing={3}>
            <PAWizard />
        </Stack>
    );
}