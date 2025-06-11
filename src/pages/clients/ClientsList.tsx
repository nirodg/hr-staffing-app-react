import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { ClientDTO } from "@/types/client-entity";
import EditIcon from "@mui/icons-material/Edit";
import {mockClient} from "@/MockData";
import BaseDataTable from "@/components/data-table/BaseDataTable";
import { DataTableConfig } from "@/components/data-table/DataTableTypes";
import { AbstractEntity } from "@/types/abstract-entity";

export default class ClientsList extends BaseDataTable<ClientDTO> {
  getConfig(): DataTableConfig<ClientDTO> {
    return {
      title: "Clients",
      initialRows: [mockClient],
      columns: this.buildColumns(),
      addButtonLabel: "Add Client",
      pageSizeOptions: [5, 10, 25],
      defaultPageSize: 10,
      dialogConfig: {
        fields: [
          {
            name: "clientEmail",
            label: "Client name",
            required: true,
            autoFocus: true,
          },
          {
            name: "clientName",
            label: "Client email",
            required: true,
          },
          {
            name: "contactPersonName",
            label: "Contact Person Name",
            required: true,
          },
          {
            name: "contactPersonEmail",
            label: "Contact Pperson Email",
            required: true,
          },
          {
            name: "contactPersonPhone",
            label: "Contact Person Phone",
            required: true,
          },
        ],
        validate: (item) => {
          const errors: Record<string, string> = {};
          if (!item.clientName) errors.firstName = "This field is required";
          if (!item.contactPersonName)
            errors.contactPersonName = "This field is required";
          if (!item.contactPersonEmail)
            errors.contactPersonEmail = "This field is required";
          if (!item.contactPersonPhone)
            errors.contactPersonPhone = "This field is required";
          if (!/^\S+@\S+\.\S+$/.test(item.clientEmail ?? ""))
            errors.email = "Enter a valid email address";
          if (!/^\S+@\S+\.\S+$/.test(item.contactPersonEmail ?? ""))
            errors.email = "Enter a valid email address";
          return { isValid: Object.keys(errors).length === 0, errors };
        },
        title: (isEdit) => (isEdit ? "Edit Client" : "Add Client"),
        submitText: (isEdit) => (isEdit ? "Save Changes" : "Create Client"),
      },
    };
  }
  buildColumns(): GridColDef[] {
    return [
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
            onClick={() => this.handleEdit(params.row)}
          />,
        ],
      },
    ];
  }
  handleSubmit(item: AbstractEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
