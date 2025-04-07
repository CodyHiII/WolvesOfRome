import { ModalPropsType } from './ModalConfig';

export interface ComponentMapping {
  [componentName: string]: React.FC<ModalPropsType>;
}
