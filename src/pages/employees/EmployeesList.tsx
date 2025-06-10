import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { UserDTO } from "@/types/user-entity";
import EditIcon from "@mui/icons-material/Edit";
import ClientForm, { dummyClient } from "@/components/clients-popup";
import BaseDataTable from "@/components/data-table/BaseDataTable";
import BaseDataTableForm from "@/components/data-table/BaseCustomDialog";
import { DataTableFormConfig } from "@/components/data-table/BaseCustomDialogTypes";

/**
 * Empty Clients page with header and a MUI DataGrid placeholder
 */
class EmployeesList extends BaseDataTable<UserDTO> {
  handleSubmit(item: UserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getConfig() {
    return {
      title: "Employees",
      initialRows: [dummyClient],
      addButtonLabel: "Add Employee",
      pageSizeOptions: [5, 10, 25],
      defaultPageSize: 10,
      FormComponent: ClientForm,
      formTitle: "Employee Details",
      submitButtonText: "Save Employee",
      columns: [
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
          getActions: (params: { row: UserDTO }) => [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              onClick={() => this.handleEdit(params.row)}
            />,
          ],
        },
      ],
    };
  }
}

export default EmployeesList;
