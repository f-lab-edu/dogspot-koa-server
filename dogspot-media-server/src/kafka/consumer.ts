import kafka from '../core/config/kafkaConfig';
import { Topic } from './helpers/constants';


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
      const value = message.value.toString(); // Kafka 메시지의 값 (JSON 문자열)
      const data = JSON.parse(value); // JSON 문자열을 객체로 파싱
      // 여기에 메시지 처리 로직을 추가합니다.
      // 메시지 처리가 완료되면 오프셋을 커밋합니다.
      try {
        // 메시지 처리 로직을 호출
        switch (topic) {
          case Topic.WALKS:
           
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
