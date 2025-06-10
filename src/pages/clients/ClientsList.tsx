// src/pages/clients/ClientsList.tsx
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { ClientDTO } from "@/types/client-entity";
import EditIcon from "@mui/icons-material/Edit";
import ClientForm, { dummyClient } from "@/components/clients-popup";

/**
 * Empty Clients page with header and a MUI DataGrid placeholder
 */
const ClientsList: React.FC = () => {
  const [formOpen, setFormOpen] = React.useState(false);
  const [currentClient, setCurrentClient] = React.useState<ClientDTO | null>(
    null
  );

  // Define columns (adjust as needed)
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "clientName", headerName: "Client Name", flex: 1 },
    { field: "clientEmail", headerName: "Client Email", flex: 1 },
    { field: "contactPersonName", headerName: "Contact Person", flex: 1 },
    { field: "contactPersonEmail", headerName: "Contact Email", flex: 1 },
    { field: "contactPersonPhone", headerName: "Contact Phone", flex: 1 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEditClient(params.row)}
        />,
      ],
    },
  ];

  // Empty rows for now
  const rows = [dummyClient];

  console.log("ClientsList rendered");

  const handleAddClient = () => {
    setCurrentClient(null);
    setFormOpen(true);
  };

  const handleEditClient = (client: ClientDTO) => {
    setCurrentClient(client);
    setFormOpen(true);
  };

  const handleSubmit = (client: ClientDTO) => {
    if (client.id) {
      // Update existing client
      console.log("Updating client:", client);
    } else {
      // Add new client
      console.log("Adding new client:", client);
    }
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Clients
      </Typography>
      <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddClient}>
          Add Client
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleEditClient(dummyClient)}
          startIcon={<EditIcon />}
        >
          Edit Dummy Client
        </Button>
      </Box>


      <Box sx={{ height: 600, width: "100%", mt: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "rgba(0, 91, 150, 0.1)"
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
            },
          }}
        />
      </Box>


      <ClientForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={currentClient ?? undefined}
      />
    </Box>
  );
};

export default ClientsList;
