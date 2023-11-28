import { Typography } from '@mui/material';

const date = new Date();

function getUTCDatetime() {
    const utcTime = date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
      timeZone: 'UTC',
    });
  
    const isoDateString = new Date().toISOString();
    const utcDate = isoDateString.split('T')[0].concat(' ', utcTime);
    return utcDate;
  }

const UTCDatetime = () => {
  const utcFullDate = getUTCDatetime();
  const utcTimeValue = (
    <Typography 
      variant="h3"
      component="h3"
      sx={{
        fontWeight: '400',
        fontSize: { xs: '14px', sm: '18px' },
        lineHeight: 1,
        paddingRight: '2px',
        fontFamily: 'Poppins',
      }}
    >
      {utcFullDate} GMT
    </Typography>
  );
  return utcTimeValue;
};

export default UTCDatetime;