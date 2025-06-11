// src/components/data-table/BaseCustomDialog.tsx
import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { BaseDialogProps, DialogConfig, FormFieldConfig } from './BaseCustomDialogTypes';

export abstract class BaseCustomDialog<T extends { id?: string | number }> extends React.Component<BaseDialogProps<T>, {
  formData: T;
  errors: { [key: string]: string };
  isSubmitting: boolean;
}> {
  abstract getConfig(): DialogConfig<T>;

  state: {
    formData: T;
    errors: { [key: string]: string };
    isSubmitting: boolean;
  } = {
    formData: {} as T,
    errors: {},
    isSubmitting: false,
  };

  componentDidUpdate(prevProps: BaseDialogProps<T>) {
    if (this.props.initialData !== prevProps.initialData) {
      this.setState({
        formData: this.props.initialData || {} as T,
        errors: {},
      });
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    this.setState(prev => ({
      formData: {
        ...prev.formData,
        [name]: val
      },
      errors: {
        ...prev.errors,
        [name]: ''
      }
    }));
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { validate } = this.getConfig();
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

  renderField = (field: FormFieldConfig<T>) => {
    const { formData, errors } = this.state;
    const value = (formData as any)[field.name as string];
    const error = errors[field.name as string] || '';

    if (field.type === 'checkbox') {
      return (
        <FormControlLabel
          key={field.name as string}
          control={
            <Checkbox
              name={field.name as string}
              checked={!!value}
              onChange={this.handleChange}
              color="primary"
            />
          }
          label={field.label}
          sx={{ mt: 1, mb: 1 }}
        />
      );
    }

    return (
      <TextField
        key={field.name as string}
        margin="dense"
        name={field.name as string}
        label={field.label}
        type={field.type || 'text'}
        fullWidth={field.fullWidth ?? true}
        autoFocus={field.autoFocus || false}
        required={field.required || false}
        value={value || ''}
        onChange={this.handleChange}
        error={!!error}
        helperText={error}
        sx={{ mb: 2 }}
      />
    );
  };

  render() {
    const { open, onClose } = this.props;
    const { isSubmitting } = this.state;
    const config = this.getConfig();
    const isEdit = !!this.props.initialData?.['id'];

    console.log("Rendering BaseCustomDialog with config:");
    console.log(this.getConfig())

    return (
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          component: 'form',
          onSubmit: this.handleSubmit
        }}
      >
        <DialogTitle>{config.title(isEdit)}</DialogTitle>
        <DialogContent>
          {config.fields.map(this.renderField)}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            type="submit"
            color="primary"
            disabled={isSubmitting}
            variant="contained"
          >
            {config.submitText(isEdit)}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default BaseCustomDialog;