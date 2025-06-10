// src/pages/clients/ClientsList.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

/**
 * Empty Clients page with header and a MUI DataGrid placeholder
 */
const ClientsList: React.FC = () => {
  // Define columns (adjust as needed)
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "clientName", headerName: "Client Name", flex: 1 },
    { field: "clientEmail", headerName: "Client Email", flex: 1 },
    { field: "contactPersonName", headerName: "Contact Person", flex: 1 },
    { field: "contactPersonEmail", headerName: "Contact Email", flex: 1 },
    { field: "contactPersonPhone", headerName: "Contact Phone", flex: 1 },
  ];

  // Empty rows for now
  const rows: any[] = [];

  console.log("ClientsList rendered");

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Clients
      </Typography>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          autoHeight
          sx={{
            backgroundColor: "background.paper",
            ".MuiDataGrid-columnHeaders": {
              backgroundColor: "rgba(0, 91, 150, 0.1)",
            },
            ".MuiDataGrid-footerContainer": {
              borderTop: "1px solid rgba(224, 224, 224, 1)",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ClientsList;
