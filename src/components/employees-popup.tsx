import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { UserDTO } from "../types/user-entity";

interface ClientFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (client: UserDTO) => void;
  initialData?: UserDTO;
}

// Dummy client for testing
export const dummyEmployee: UserDTO = {
  id: 1,
  username: "john.smith",
  firstName: "John",
  lastName: "Smith",
  position: "Software Engineer",
  email: "john.smith@acme.com",
  available: true,
  createdAt: "2023-01-01",
  updatedAt: "2023-06-15",
  version: 1,
};
