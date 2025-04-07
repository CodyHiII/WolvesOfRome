import Typography from '@/components/Typography';

const Glorium = () => {
  return (
    <div>
      <Typography
        variant='body-1'
        font='quaternary'
        fontWeight='medium'
        align='center'
        margin='0 0 20px 0'
      >
        Introducing the Wolves of Rome In-game currency.
      </Typography>
      <Typography
        variant='h6'
        font='quaternary'
        fontWeight='bold'
        align='center'
        margin='0 0 20px 0'
      >
        WHAT IT IS & HOW TO GET IT.
      </Typography>
      <img
        className='img-fluid w-100'
        src='/gloriumWP.png'
        alt='WHAT IT IS & HOW TO GET IT. IMAGE'
        style={{ marginBottom: '40px' }}
      />
    </div>
  );
};

export default Glorium;
