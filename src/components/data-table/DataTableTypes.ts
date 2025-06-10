import { GridColDef } from "@mui/x-data-grid";

export interface DataTableConfig<T> {
  // Table configuration
  title: string;
  columns: GridColDef[];
  initialRows: T[];
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  addButtonLabel?: string;
  
  // Form configuration
  formTitle: (isEdit: boolean) => string;
  submitButtonText: (isEdit: boolean) => string;
}

export interface DataTableState<T> {
  rows: T[];
  formOpen: boolean;
  currentItem: T | null;
  loading: boolean;
  error: string | null;
}

export interface DataTableActions<T> {
  handleSubmit: (item: T) => Promise<void>;
  handleAdd: () => void;
  handleEdit: (item: T) => void;
  handleClose: () => void;
}