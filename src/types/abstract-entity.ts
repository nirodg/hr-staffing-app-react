export interface AbstractEntity {
  id?: number;
  createdAt?: string; // ISO‑8601
  updatedAt?: string; // ISO‑8601
  version?: number;
}
