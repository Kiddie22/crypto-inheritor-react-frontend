import { Grid, Typography } from '@mui/material';

const Help = () => {
  const videoSrc = 'https://www.youtube.com/embed/w22i1G28-Lk';

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >
      <Typography variant="h4">How it Works</Typography>
      <div className="video-responsive">
        <iframe
          width={960}
          height={540}
          src={videoSrc}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="CryptoInheritor Demo"
        />
      </div>
    </Grid>
  );
};

export default Help;
