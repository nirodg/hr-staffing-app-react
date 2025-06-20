import { KafkaAction } from '../constants/kafka-action';
import { KafkaTopic } from '../constants/kafka-topic'; 

export interface KafkaPayload {
  action?: KafkaAction;
  topic?: KafkaTopic;
  userId?: string;
  entityId?: number;
  parentId?: number;
  entity?: string;
  username?: string;
}
