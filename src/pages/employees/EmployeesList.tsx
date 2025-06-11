import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import BaseDataTable from "@/components/data-table/BaseDataTable";
import { DataTableConfig } from "@/components/data-table/DataTableTypes";
import { UserDTO } from "@/types/user-entity";
import {mockEmployee} from "@/MockData";

/**
 * Employee management table component that extends BaseDataTable for UserDTO entities.
 *
 * @remarks
 * This component provides a complete CRUD interface for employee records with:
 * - Sortable, paginated data table
 * - Integrated form dialog for add/edit operations
 * - Field validation and error handling
 * - Custom column rendering
 *
 * @example
 * ```tsx
 * // Usage in the route or parent component
 * <EmployeesList />
 * ```
 *
 * @extends BaseDataTable<UserDTO>
 *
 * @public
 */
export default class EmployeesList extends BaseDataTable<UserDTO> {
  handleSubmit(item: UserDTO): Promise<void> {
    // Your save logic here - this would typically call an API
    console.log("Saving employee:", item);

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (item.id) {
          // Update existing employee
          this.setState((prev) => ({
            rows: prev.rows.map((emp) => (emp.id === item.id ? item : emp)),
          }));
        } else {
          // Add new employee
          const newEmployee = {
            ...item,
            id: Math.max(...this.state.rows.map((emp) => emp.id || 0), 0) + 1,
          };
          this.setState((prev) => ({ rows: [...prev.rows, newEmployee] }));
        }
        resolve();
      }, 500);
    });
  }

  getConfig(): DataTableConfig<UserDTO> {
    return {
      title: "Employees",
      initialRows: [mockEmployee],
      columns: this.buildColumns(),
      addButtonLabel: "Add Employee",
      pageSizeOptions: [5, 10, 25],
      defaultPageSize: 10,
      dialogConfig: {
        fields: [
          {
            name: "firstName",
            label: "First Name",
            required: true,
            autoFocus: true,
          },
          {
            name: "lastName",
            label: "Last Name",
            required: true,
          },
          {
            name: "email",
            label: "Email",
            required: true,
            type: "email",
          },
          {
            name: "position",
            label: "Position",
            type: "text",
          },
          {
            name: "available",
            label: "Available",
            type: "checkbox",
          },
        ],
        validate: (item) => {
          const errors: Record<string, string> = {};
          if (!item.firstName) errors.firstName = "First name is required";
          if (!item.lastName) errors.lastName = "Last name is required";
          if (!item.email) errors.email = "Email is required";
          else if (!/^\S+@\S+\.\S+$/.test(item.email)) {
            errors.email = "Enter a valid email address";
          }
          return { isValid: Object.keys(errors).length === 0, errors };
        },
        title: (isEdit) => (isEdit ? "Edit Employee" : "Add Employee"),
        submitText: (isEdit) => (isEdit ? "Save Changes" : "Create Employee"),
      },
    };
  }

  private buildColumns(): GridColDef[] {
    return [
      {
        field: "id",
        headerName: "ID",
        width: 100,
      },
      {
        field: "firstName",
        headerName: "First Name",
        flex: 1,
      },
      {
        field: "lastName",
        headerName: "Last Name",
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "position",
        headerName: "Position",
        flex: 1,
      },
      {
        field: "available",
        headerName: "Available",
        flex: 1,
        type: "boolean",
        renderCell: (params) => <span>{params.value ? "Yes" : "No"}</span>,
      },
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
}
