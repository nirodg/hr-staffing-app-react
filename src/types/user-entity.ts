import { AbstractEntity } from "./abstract-entity";
import { RoleDTO } from "./role-entity";

export interface UserDTO extends AbstractEntity {
  username?: string;
  firstName?: string;
  lastName?: string;
  position?: string;
  email?: string;
  available?: boolean;
  roles?: RoleDTO[];
}
