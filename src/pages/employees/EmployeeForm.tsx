import BaseDataTableForm from "@/components/data-table/BaseCustomDialog";
import { DataTableFormConfig } from "@/components/data-table/BaseCustomDialogTypes";
import { UserDTO } from "@/types/user-entity";

export class EmployeeForm extends BaseDataTableForm<UserDTO> {
  getFormConfig(): DataTableFormConfig<UserDTO> {
    return {
      formTitle: (isEdit: boolean) => isEdit ? "Edit Employee" : "Add Employee",
      fields: [
        { name: "firstName", label: "Name", required: true },
        { name: "lastName", label: "Name", required: true },
        { name: "email", label: "Email", required: true },
        // { name: "position", label: "Price", type: "number", required: true },
      ],
      validate: (data) => {
        const errors: Record<string, string> = {};
        if (!data.firstName) errors.name = "First name is required";
        if (!data.lastName) errors.name = "Last name is required";
        if (!data.email) errors.name = "The email is required";
        return { isValid: Object.keys(errors).length === 0, errors };
      },
      submitButtonText: () => "Save Employee",
    };
  }
}