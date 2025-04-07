import { Box, CircularProgress } from '@mui/material/index';

type LoadingType = {
  height?: string;
};

const Loading = ({ height = 'auto' }: LoadingType) => {
  return (
    <Box
      sx={{
        height,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--primary)',
      }}
    >
      <CircularProgress color='inherit' />
    </Box>
  );
};

export default Loading;
