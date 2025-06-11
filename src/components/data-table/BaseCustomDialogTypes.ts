
export interface BaseDialogProps<T> {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: T) => Promise<void>;
  initialData?: T | null;
  config: DialogConfig<T>;
}

export interface FormFieldConfig<T> {
  name: keyof T;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'checkbox' | 'tel' | 'date';
  required?: boolean;
  fullWidth?: boolean;
  autoFocus?: boolean;
}

export interface DialogConfig<T> {
  fields: FormFieldConfig<T>[];
  validate: (item: T) => { isValid: boolean; errors: Record<string, string> };
  title: (isEdit: boolean) => string;
  submitText: (isEdit: boolean) => string;
}