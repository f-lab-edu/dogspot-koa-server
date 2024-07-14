import kafka from '../core/config/kafkaConfig';
import { walksJoinDto } from '../domains/walks/dtos/walks-join';
import { Topic } from './helpers/constants';
import { walksControllerInstance } from '../domains/walks/walks.controller';


const groupId = process.env.KAFKA_GROUP_ID || 'default-group-id';
const consumer = kafka.consumer({ groupId });

export const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: Topic.WALKS });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value === null) {
        return;
      }
      try {
        const value = message.value.toString(); // Kafka 메시지의 값 (JSON 문자열)
        const data = JSON.parse(value); // JSON 문자열을 객체로 파싱
        switch (topic) {
          case Topic.WALKS:
            await walksControllerInstance.walksJoin(data);
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
