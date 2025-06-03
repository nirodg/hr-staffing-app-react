import { AbstractEntity } from "./abstract-entity";
import { UserDTO } from "./user-entity";

export interface CommentDTO extends AbstractEntity {
  title?: string;
  comment: string;
  commentParent?: number | null;
  author: UserDTO;
}
