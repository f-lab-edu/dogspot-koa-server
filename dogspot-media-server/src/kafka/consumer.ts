import kafka from '../core/config/kafkaConfig';
import { EachMessagePayload } from 'kafkajs';

import { walksControllerInstance } from '../domains/walks/walks.controller';
import { Topic } from './helpers/constants';


const groupId = process.env.KAFKA_GROUP_ID || 'default-group-id';
const consumer = kafka.consumer({ groupId });

export const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: Topic.WALKS_BOARD_CREATE });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {

      if (message.value === null) {
        return;
      }
      
      try {
        const value = message.value.toString(); 
        const data = JSON.parse(value); 
        // 메시지 처리 로직을 호출
        switch (topic) {
          case Topic.WALKS_BOARD_CREATE:
            await walksControllerInstance.walksBoartConvert(data);
            break;
          default:
            break;
        }

        // 메시지 처리가 성공했으면 오프셋을 커밋
        await consumer.commitOffsets([{ topic, partition, offset: message.offset }]);
        
      } catch (error) {
        throw new Error(`Error in runConsumer eachMessage: ${error}`);
      }
    },
  });
};

runConsumer().catch(console.error);
