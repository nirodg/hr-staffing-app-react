import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ClientDTO } from "../types/client-entity";

interface ClientFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (client: ClientDTO) => void;
  initialData?: ClientDTO;
}

// Dummy client for testing
export const dummyClient: ClientDTO = {
  id: 1,
  clientName: "Acme Corp",
  clientEmail: "contact@acme.com",
  contactPersonName: "John Smith",
  contactPersonEmail: "john.smith@acme.com",
  contactPersonPhone: "+1 555-123-4567",
  createdAt: "2023-01-01",
  updatedAt: "2023-06-15",
  version: 1,
};

export default function ClientForm({
  open,
  onClose,
  onSubmit,
  initialData,
}: ClientFormProps) {
  const initialFormState: ClientDTO = initialData ?? {
    clientName: "",
    clientEmail: "",
    contactPersonName: "",
    contactPersonEmail: "",
    contactPersonPhone: "",
  };
  const [formData, setFormData] = React.useState<ClientDTO>(initialFormState);
  const [isDirty, setIsDirty] = React.useState(false);

  React.useEffect(() => {
    setFormData(initialData || initialFormState);
    setIsDirty(false);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check if any field has changed from initial value
    const currentValue = initialData?.[name as keyof ClientDTO] ?? "";
    if (value !== currentValue) {
      setIsDirty(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      (formData.clientName ?? "").trim() !== "" &&
      (formData.clientEmail ?? "").trim() !== "" &&
      (formData.contactPersonName ?? "").trim() !== "" &&
      (formData.contactPersonEmail ?? "").trim() !== "" &&
      (formData.contactPersonPhone ?? "").trim() !== ""
    );
  };

  // Save button should be enabled only when form is valid and dirty
  const isSaveDisabled = !isFormValid() || !isDirty;

  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData?.id ? 'Edit Client' : 'Add New Client'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="clientName"
            name="clientName"
            label="Client Name *"
            type="text"
            fullWidth
            variant="standard"
            value={formData.clientName || ''}
            onChange={handleChange}
            required
            error={(formData.clientName??'').trim() === ''}
            helperText={(formData.clientName??'').trim() === '' ? 'Client name is required' : ''}
          />
          <TextField
            margin="dense"
            id="clientEmail"
            name="clientEmail"
            label="Client Email *"
            type="email"
            fullWidth
            variant="standard"
            value={formData.clientEmail || ''}
            onChange={handleChange}
            required
            error={(formData.clientEmail??'').trim() === ''}
            helperText={(formData.clientEmail??'').trim() === '' ? 'Client email is required' : ''}
          />
          <TextField
            margin="dense"
            id="contactPersonName"
            name="contactPersonName"
            label="Contact Person Name *"
            type="text"
            fullWidth
            variant="standard"
            value={formData.contactPersonName || ''}
            onChange={handleChange}
            required
            error={(formData.contactPersonName??'').trim() === ''}
            helperText={(formData.contactPersonName??'').trim() === '' ? 'Contact person name is required' : ''}
          />
          <TextField
            margin="dense"
            id="contactPersonEmail"
            name="contactPersonEmail"
            label="Contact Person Email *"
            type="email"
            fullWidth
            variant="standard"
            value={formData.contactPersonEmail || ''}
            onChange={handleChange}
            required
            error={(formData.contactPersonEmail??'').trim() === ''}
            helperText={(formData.contactPersonEmail??'').trim() === '' ? 'Contact person email is required' : ''}
          />
          <TextField
            margin="dense"
            id="contactPersonPhone"
            name="contactPersonPhone"
            label="Contact Person Phone *"
            type="tel"
            fullWidth
            variant="standard"
            value={formData.contactPersonPhone || ''}
            onChange={handleChange}
            required
            error={(formData.contactPersonPhone??'').trim() === ''}
            helperText={(formData.contactPersonPhone??'').trim() === '' ? 'Contact person phone is required' : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            disabled={isSaveDisabled}
            variant="contained"
            color="primary"
          >
            {initialData?.id ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
