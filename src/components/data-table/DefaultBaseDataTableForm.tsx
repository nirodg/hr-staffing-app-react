import React from 'react';
import BaseDataTableForm from './BaseCustomDialog';
import { DataTableFormConfig, DataTableFormProps } from './BaseCustomDialogTypes';

// Replace T with your actual type or keep generic if needed
class DefaultDataTableForm<T extends { id: any }> extends BaseDataTableForm<T> {
  getFormConfig(): DataTableFormConfig<T> {
    // Provide a default config or throw if not implemented
    throw new Error('getFormConfig() not implemented. Please provide a concrete implementation.');
  }
}

export default DefaultDataTableForm;