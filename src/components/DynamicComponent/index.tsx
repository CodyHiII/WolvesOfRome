import React from 'react';
import { FC, lazy, Suspense } from 'react';

const TestComponent = lazy(() => import('../TestComponent'));
const ConfirmPackPurchase = lazy(
  () => import('../ModalComponents/ConfirmPackPurchase')
);
const ItemMoreDetails = lazy(
  () => import('../ModalComponents/ItemMoreDetails')
);
const showFullAddress = lazy(
  () => import('../ModalComponents/ShowFullAddress')
);
import FullScreenTrailer from '../ModalComponents/FullScreenTrailer';

import { ModalConfig, ModalPropsType } from '@/types';
import { ComponentMapping } from '@/types/ComponentMapping';
import Loading from '../Loading';

type PropsTypes = ModalPropsType;

const modalComponents: ComponentMapping = {
  testComponent: TestComponent,
  confirmPackPurchase: ConfirmPackPurchase,
  itemMoreDetails: ItemMoreDetails,
  showFullAddress: showFullAddress,
  fullScreenTrailer: FullScreenTrailer,
};

const componentMappings: ComponentMapping = {
  ...modalComponents,
};

type DynamicComponentConfig = ModalConfig;

const DynamicComponent: FC<DynamicComponentConfig> = React.memo(
  ({ type, props }: DynamicComponentConfig) => {
    if (!!type && componentMappings[type]) {
      const Component: FC<PropsTypes | any> = componentMappings[type];

      return (
        <Suspense fallback={<Loading />}>
          <Component {...props} />
        </Suspense>
      );
    }

    return <p className='text-center text-danger'>error</p>;
  }
);

export default DynamicComponent;
