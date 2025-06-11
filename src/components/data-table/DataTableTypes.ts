import { GridColDef } from "@mui/x-data-grid";
import { DialogConfig } from "./BaseCustomDialogTypes";

export interface DataTableConfig<T> {
  title: string;
  columns: GridColDef[];
  initialRows: T[];
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  addButtonLabel?: string;
  dialogConfig: DialogConfig<T>;
}