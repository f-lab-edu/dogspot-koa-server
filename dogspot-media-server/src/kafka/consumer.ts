import kafka from '../core/config/kafkaConfig';
import { walksControllerInstance } from '../domains/walks/walks.controller';
import { Topic } from './helpers/constants';
import { EachMessagePayload } from 'kafkajs';

class Semaphore {
  private max: number;
  private current: number;
  private queue: Array<() => void> = [];

  constructor(max: number) {
    this.max = max;
    this.current = 0;
  }

  async acquire() {
    if (this.current >= this.max) {
      await new Promise<void>((resolve) => this.queue.push(resolve));
    }
    this.current++;
  }

  release() {
    this.current--;
    if (this.queue.length > 0) {
      const resolve = this.queue.shift();
      if (resolve) resolve();
    }
  }
}

const semaphore = new Semaphore(5); // 동시에 최대 5개의 메시지를 처리하도록 설정

const groupId = process.env.KAFKA_GROUP_ID || 'default-group-id';
const consumer = kafka.consumer({ groupId });

export const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: Topic.WALKS_BOARD_CREATE });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      try {
        await semaphore.acquire();  // Semaphore를 사용하여 동시 실행 수를 제한합니다.
        try {
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
        } finally {
          semaphore.release(); // Semaphore 해제
        }
      } catch (error) {
        console.error(`Error in runConsumer eachMessage: ${error}`);
      }
    },
  });
};

runConsumer().catch(console.error);
