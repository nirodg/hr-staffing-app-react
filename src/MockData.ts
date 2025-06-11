import { ClientDTO } from "./types/client-entity";
import { UserDTO } from "./types/user-entity";

export const mockClient: ClientDTO = {
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

export const mockEmployee: UserDTO = {
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
