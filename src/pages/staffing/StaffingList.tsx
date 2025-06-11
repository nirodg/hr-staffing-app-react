import BaseDataTable from "@/components/data-table/BaseDataTable";
import {
  DataTableConfig,
  TypedGridColDef,
} from "@/components/data-table/DataTableTypes";
import { mockStaffingProcess } from "@/MockData";
import { AbstractEntity } from "@/types/abstract-entity";
import { StaffingProcessDTO } from "@/types/staffing-entity";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default class StaffingList extends BaseDataTable<StaffingProcessDTO> {
  handleSubmit(item: AbstractEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getConfig(): DataTableConfig<StaffingProcessDTO> {
    return {
      title: "Staffing Processes",
      initialRows: [mockStaffingProcess],
      columns: this.buildColumns(),
      addButtonLabel: "Add Staffing Process",
      pageSizeOptions: [5, 10, 25],
      defaultPageSize: 10,
      dialogConfig: {
        fields: [
          {
            name: "processName",
            label: "Process Name",
            required: true,
            autoFocus: true,
          },
          {
            name: "status",
            label: "Is Active",
            type: "checkbox", // Fixme: this should be a dropdown or select field
          },
          // {
          //   name: "client", // Fixme: this should be a dropdown or select field
          //   label: "Client",
          //   required: true,
          // },
          // {
          //   name: "employee", // Fixme: this should be a dropdown or select field
          //   label: "Employee",
          //   required: true,
          // },
        ],
        validate: (item) => {
          const errors: Record<string, string> = {};
          if (!item.processName) errors.processName = "This field is required";
          if (!item.clientId) errors.clientId = "This field is required";
          if (!item.status) errors.status = "This field is required";
          return { isValid: Object.keys(errors).length === 0, errors };
        },
        title: (isEdit) =>
          isEdit ? "Edit Staffing Process" : "Add Staffing Process",
        submitText: (isEdit) =>
          isEdit ? "Save Changes" : "Create Staffing Process",
      },
    };
  }
  buildColumns(): TypedGridColDef<StaffingProcessDTO>[] {
    return [
      {
        field: "id",
        headerName: "ID",
        width: 100,
      },
      {
        field: "processName",
        headerName: "Process Name",
        flex: 1,
      },
      {
        field: "client",
        headerName: "Client",
        flex: 1,
        valueGetter: (params) => {
          return `${params["clientName"]}`;
        },
      },
      {
        field: "employee",
        headerName: "Employee",
        flex: 1,
        valueGetter: (params) => {
          return `${params["firstName"]} ${params["lastName"]}`;
        },
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: (params) => <span>{params.value ? "In Progress" : "Completed"}</span>,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<OpenInNewIcon />}
            label="View"
            onClick={() => this.handleEdit(params.row)}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => this.handleEdit(params.row)}
          />,
        ],
      },
    ];
  }
}
