import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DataTableConfig, DataTableState, DataTableActions } from './DataTableTypes';
import BaseDataTableForm from './BaseCustomDialog';
import DefaultDataTableForm from './DefaultBaseDataTableForm';

abstract class BaseDataTable<T extends { id: any }> 
  extends React.Component<{}, DataTableState<T>> 
  implements DataTableActions<T> 
{
  // Abstract methods
  abstract getConfig(): DataTableConfig<T>;
  abstract handleSubmit(item: T): Promise<void>;
  
  // Default state
  state: DataTableState<T> = {
    rows: this.getConfig().initialRows,
    formOpen: false,
    currentItem: null,
    loading: false,
    error: null
  };

  // Common handlers
  handleAdd = () => this.setState({ formOpen: true, currentItem: null });
  handleEdit = (item: T) => this.setState({ formOpen: true, currentItem: item });
  handleClose = () => this.setState({ formOpen: false });

  // Form renderer
  renderForm() {
    const config = this.getConfig();
    return (
      <DefaultDataTableForm<T>
        open={this.state.formOpen}
        onClose={this.handleClose}
        onSubmit={this.handleSubmit}
        initialData={this.state.currentItem}
        formTitle={config.formTitle}
        submitButtonText={config.submitButtonText}
      />
    );
  }

  // Main render
  render() {
    const config = this.getConfig();
    const { rows, loading } = this.state;

    return (
      <Box sx={{ height: "100%", width: "100%", p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {config.title}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={this.handleAdd}>
            {config.addButtonLabel || 'Add New'}
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
                  pageSize: config.defaultPageSize || 10 
                },
              },
            }}
            disableRowSelectionOnClick
          />
        </Box>

        {this.renderForm()}
      </Box>
    );
  }
}

export default BaseDataTable;