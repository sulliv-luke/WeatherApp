import { Box, Grid} from '@mui/material';
import UTCDatetime from './Reusable/UTCDateTime';

export default function Header() {
  return (
    <Grid container columnSpacing={2}>
        <Grid item xs={12}>
          <Box
             display="flex"
             justifyContent="center" // Changed to center
             alignItems="center"
             sx={{
               width: '100%',
               marginBottom: '1rem',
             }}
          >
            <UTCDatetime />
          </Box>
        </Grid>
    </Grid>
  )
}
