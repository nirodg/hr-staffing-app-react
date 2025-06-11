import { BaseDialogProps, DialogConfig } from './BaseCustomDialogTypes';
import BaseCustomDialog from './BaseCustomDialog';

interface DefaultDialogProps<T> extends BaseDialogProps<T> {
  config: DialogConfig<T>;
}

export class DefaultDialog<T extends { id?: string | number | undefined; }> extends BaseCustomDialog<T> {
  getConfig() {
    return (this.props as DefaultDialogProps<T>).config;
  }
}