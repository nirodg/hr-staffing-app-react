
import {AbstractEntity} from './abstract-entity';
import {StaffingProcessDTO} from './staffing-entity';

export interface ClientDTO extends AbstractEntity {
  clientName?: string;
  clientEmail?: string;
  staffingProcesses?: StaffingProcessDTO[];
  contactPersonName?: string;
  contactPersonEmail?: string;
  contactPersonPhone?: string;
}

