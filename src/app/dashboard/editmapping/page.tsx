import * as React from 'react';
import Stack from '@mui/material/Stack';
import { EditMapping } from '@/components/dashboard/prior-approval/edit-mapping';

export default function Page(): React.JSX.Element {
    return (
        <Stack spacing={3}>
            <EditMapping />
        </Stack>
    );
}