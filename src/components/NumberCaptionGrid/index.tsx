import { Grid } from '@mui/material';

import useIsMobile from '@/helpers/hooks/useIsMobile';

import styles from './styles.module.css';

type NumberCaptionGridDataType = {
  id: number;
  numberValue: number;
  numberCaption: string;
};

type NumberCaptionGridType = {
  data: NumberCaptionGridDataType[];
  xs?: number;
  sm?: number;
  md?: number;
  xl?: number;
  margin?: string;
};

const NumberCaptionGrid = ({
  data,
  xs,
  sm,
  md,
  xl,
  margin,
}: NumberCaptionGridType) => {
  const isMobile = useIsMobile(599);

  const setAlignItems = (index: number): string => {
    if (isMobile) {
      return 'center';
    }

    switch (index) {
      case 0:
        return 'flex-start';
      case data.length - 1:
        return 'flex-end';
      default:
        return 'center';
    }
  };

  return (
    <Grid container gap={isMobile ? '20px' : ''} px={'40px'}>
      {data.map((item, index) => (
        <Grid
          key={item.id}
          item
          xs={xs}
          sm={sm}
          md={md}
          xl={xl}
          sx={{ margin }}
        >
          <div
            className={styles.cell}
            style={{ alignItems: setAlignItems(index) }}
          >
            <p className={styles.caption}>
              {' '}
              <span className={styles.number}>{item.numberValue}</span>
              {item.numberCaption}
            </p>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default NumberCaptionGrid;
