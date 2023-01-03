import React from 'react'
import { Grid, Typography } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
export const NothingSelected = () => {
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'gray', borderRadius: 3 }}
    >
      <Grid item xs={12}>
        <NoteAddIcon sx={{ fontSize: 100, color: 'white' }} />
      </Grid>
      <Grid item xs={12}>
        <Typography color="white" variant='h5'>Selecciona o crea una entrada</Typography>
      </Grid>
    </Grid>
  )
}
