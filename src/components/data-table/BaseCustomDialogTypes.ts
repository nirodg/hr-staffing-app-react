export interface DataTableFormProps<T> {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: T) => Promise<void>;
  initialData?: T | null;
}

export interface FormFieldConfig<T> {
  name: keyof T;
  label: string;
  type?: string;
  required?: boolean;
  fullWidth?: boolean;
  autoFocus?: boolean;
}

export interface DataTableFormConfig<T> {
  fields: FormFieldConfig<T>[];
  validate: (item: T) => { isValid: boolean; errors: Record<string, string> };
  formTitle: (isEdit: boolean) => string;
  submitButtonText: (isEdit: boolean) => string;
}

export interface DataTableFormState<T> {
  formData: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
}