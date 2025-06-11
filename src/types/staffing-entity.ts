import { AbstractEntity } from "./abstract-entity";
import { ClientDTO } from "./client-entity";
import { CommentDTO } from "./comment-entity";
import { UserDTO } from "./user-entity";

export interface StaffingProcessDTO extends AbstractEntity {
  processName: any;
  clientId: any;
  status: any;
  title?: string;
  client?: ClientDTO;
  employee?: UserDTO;
  comments?: CommentDTO[];
  active?: boolean;
}