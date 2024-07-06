import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';


export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid xs={12}>
        <h1>Dashboard</h1>
        <p>
          Welcome to the dashboard. This is where you can manage your account and view your data.
        </p>
        <p>
          The current date and time is: {dayjs().format('MMMM D, YYYY h:mm A')}
        </p>
      </Grid>
    </Grid>
  );
}
