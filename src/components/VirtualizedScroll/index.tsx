import { useRef, ReactElement } from 'react';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';

import styles from './styles.module.css';

type DataProps = {
  children: ReactElement[];
};

const VirtualizedScroll = ({ children }: DataProps) => {
  const defaultHeight = 700;

  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

  return (
    <div className={styles.autoSizerWrapper}>
      <AutoSizer className={styles.dataContainer}>
        {({ width, height }) => (
          <List
            width={width}
            height={height ?? defaultHeight}
            rowHeight={cache.current.rowHeight}
            deferredMeasurementCache={cache.current}
            rowCount={children.length}
            rowRenderer={({ key, index, style, parent }) => {
              const data = children[index];

              return (
                <CellMeasurer
                  key={key}
                  cache={cache.current}
                  parent={parent}
                  columnIndex={0}
                  rowIndex={index}
                >
                  <div style={style}>{data}</div>
                </CellMeasurer>
              ) as React.ReactNode;
            }}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default VirtualizedScroll;
