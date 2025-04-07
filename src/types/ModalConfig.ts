import {
  TestComponentProps,
  ConfirmPackPurchaseType,
  ItemMoreDetailsType,
  ShowFullAddressType,
  VideoTypes,
} from '@/types';

export type ModalPropsType = TestComponentProps &
  ConfirmPackPurchaseType &
  ItemMoreDetailsType &
  VideoTypes &
  ShowFullAddressType;

export type ModalConfig = {
  type:
    | 'testComponent'
    | 'confirmPackPurchaseType'
    | 'itemMoreDetailsType'
    | 'fullScreenTrailer'
    | null;
  props?: ModalPropsType;
};
