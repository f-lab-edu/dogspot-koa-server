import kafka from '../core/config/kafkaConfig';
import { walksControllerInstance } from '../domains/walks/walks.controller';
import { Topic } from './helpers/constants';
import { EachMessagePayload } from 'kafkajs';

// 동적 import를 위한 비동기 함수
const loadPLimit = async () => {
  const module = await import('p-limit');
  return module.default;
};

const groupId = process.env.KAFKA_GROUP_ID || 'default-group-id';
const consumer = kafka.consumer({ groupId });

export const runConsumer = async () => {
  // p-limit 모듈을 동적으로 불러옵니다.
  const pLimit = await loadPLimit();
  
  // 동시에 최대 5개의 메시지를 처리하도록 제한
  const limit = pLimit(5);

  await consumer.connect();
  await consumer.subscribe({ topic: Topic.WALKS_BOARD_CREATE });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      try {
        // p-limit을 사용하여 동시 실행 수를 제한합니다.
        await limit(async () => {
          if (message.value === null) {
            console.warn('Received a message with null value');
            return;
          }
          const value = message.value.toString(); // 여기서 message.value는 null이 아님을 보장합니다.
          const data = JSON.parse(value); // JSON 파싱

          let result;

          // 메시지 처리 로직 호출
          switch (topic) {
            case Topic.WALKS_BOARD_CREATE:
              result = await walksControllerInstance.walksBoartConvert(data);
              break;
            default:
              break;
          }

          // 메시지 처리가 성공했으면 오프셋을 커밋합니다.
          if (result) {
            await consumer.commitOffsets([{ topic, partition, offset: (BigInt(message.offset) + BigInt(1)).toString() }]);
          }
        });

      } catch (error) {
        console.error(`Error in runConsumer eachMessage: ${error}`);
      }
    },
  });
};

runConsumer().catch(console.error);
