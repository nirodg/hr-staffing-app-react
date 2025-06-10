import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { DataTableFormProps, DataTableFormConfig, DataTableFormState } from './BaseCustomDialogTypes';

abstract class BaseCustomDialog<T  extends { id: any }> extends React.Component<
  DataTableFormProps<T> & {
    formTitle: (isEdit: boolean) => string;
    submitButtonText: (isEdit: boolean) => string;
  }, 
  DataTableFormState<T>
> {
  abstract getFormConfig(): DataTableFormConfig<T>;
  
  state: DataTableFormState<T> = {
    formData: {} as T,
    errors: {},
    isSubmitting: false
  };

  componentDidUpdate(prevProps: DataTableFormProps<T>) {
    if (this.props.initialData !== prevProps.initialData) {
      this.setState({ 
        formData: this.props.initialData || {} as T,
        errors: {} 
      });
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState(prev => ({
      formData: {
        ...prev.formData,
        [name]: value
      }
    }));
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { validate } = this.getFormConfig();
    const validation = validate(this.state.formData);
    
    if (!validation.isValid) {
      this.setState({ errors: validation.errors });
      return;
    }

    this.setState({ isSubmitting: true });
    try {
      await this.props.onSubmit(this.state.formData);
      this.props.onClose();
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { open, onClose, initialData, formTitle, submitButtonText } = this.props;
    const { formData, errors, isSubmitting } = this.state;
    const { fields } = this.getFormConfig();
    const isEdit = !!initialData?.id;

    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{formTitle(isEdit)}</DialogTitle>
        <form onSubmit={this.handleSubmit}>
          <DialogContent>
            {fields.map(field => (
              <TextField
                key={field.name as string}
                margin="dense"
                name={field.name as string}
                label={field.label}
                type={field.type || 'text'}
                fullWidth={field.fullWidth ?? true}
                autoFocus={field.autoFocus || false}
                required={field.required || false}
                value={(formData[field.name] as any) || ''}
                onChange={this.handleChange}
                error={!!errors[field.name as string]}
                helperText={errors[field.name as string]}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button 
              type="submit" 
              color="primary"
              disabled={isSubmitting}
            >
              {submitButtonText(isEdit)}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default BaseCustomDialog;