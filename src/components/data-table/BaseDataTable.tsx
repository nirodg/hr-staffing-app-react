import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DataTableConfig } from "./DataTableTypes";
import { DefaultDialog } from "./DefaultDialog";
import { AbstractEntity } from "@/types/abstract-entity";

export abstract class BaseDataTable<
  T extends { id: any }
> extends React.Component<
  {},
  {
    rows: T[];
    formOpen: boolean;
    currentItem: T | null;
    loading: boolean;
    error: string | null;
  }
> {
  // Abstract methods to be implemented by child classes
  abstract getConfig(): DataTableConfig<T>;
  abstract handleSubmit(item: AbstractEntity): Promise<void>;

  // Initial state
  state = {
    rows: [] as T[],
    formOpen: false,
    currentItem: null as T | null,
    loading: false,
    error: null as string | null,
  };

  componentDidMount() {
    // Initialize with config data
    const { initialRows } = this.getConfig();
    this.setState({ rows: initialRows });
  }

  // Common handlers
  handleAdd = () => this.setState({ formOpen: true, currentItem: null });
  handleEdit = (item: T) =>
    this.setState({ formOpen: true, currentItem: item });
  handleClose = () => this.setState({ formOpen: false });

  // Render the form dialog
  renderForm() {
    const config = this.getConfig();
    return (
      <DefaultDialog<T>
        open={this.state.formOpen}
        onClose={this.handleClose}
        onSubmit={this.handleSubmit}
        initialData={this.state.currentItem}
        config={config.dialogConfig}
      />
    );
  }

  // Main render method
  render() {
    const config = this.getConfig();
    const { rows, loading } = this.state;

    return (
      <Box sx={{ height: "100%", width: "100%", p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {config.title}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            onClick={this.handleAdd}
            disabled={loading}
          >
            {config.addButtonLabel || "Add New"}
          </Button>
        </Box>

        <Box sx={{ height: 600, width: "100%", mt: 2 }}>
          <DataGrid
            rows={rows}
            columns={config.columns}
            loading={loading}
            pageSizeOptions={config.pageSizeOptions || [5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: config.defaultPageSize || 10,
                },
              },
            }}
            disableRowSelectionOnClick
            getRowId={(row) => row.id}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "primary.light",
                color: "primary.contrastText",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
              },
            }}
          />
        </Box>

        {this.renderForm()}
      </Box>
    );
  }
}

export default BaseDataTable;
