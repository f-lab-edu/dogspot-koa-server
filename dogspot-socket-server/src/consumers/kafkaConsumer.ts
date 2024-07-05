import kafka from '../core/config/kafkaConfig';

const topic = 'walks-push';
const groupId = 'test-group';

const consumer = kafka.consumer({ groupId });

export const runConsumer = async () => {
  console.log('Consumer is starting...');
  await consumer.connect();
  await consumer.subscribe({ topic });
  console.log('Consumer is connected and subscribed.');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value === null) {
        console.warn('Received null message. Skipping...');
        return;
      }
      const value = message.value.toString(); // Kafka 메시지의 값 (JSON 문자열)
      const data = JSON.parse(value); // JSON 문자열을 객체로 파싱
      // 여기에 메시지 처리 로직을 추가합니다.

      // 메시지 처리가 완료되면 오프셋을 커밋합니다.
      console.log('data:', data);
    },
  });
};

runConsumer().catch(console.error);
