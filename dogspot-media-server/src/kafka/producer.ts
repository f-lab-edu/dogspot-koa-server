import kafka from '../core/config/kafkaConfig';
import { ProducerRecord } from 'kafkajs';

const producer = kafka.producer();


// Kafka producer 연결 및 초기화
export const initializeProducer = async () => {
  await producer.connect();
};

// Kafka producer 연결 해제
export const disconnectProducer = async () => {
  await producer.disconnect();
};

// 메시지를 Kafka 토픽으로 publish
export const sendMessageToTopic = async (topic: string, message: any) => {
  const payload: ProducerRecord = {
    topic,
    messages: [
      { value: JSON.stringify(message) } // 메시지를 JSON 문자열로 변환하여 전송
    ],
  };

  try {
    await producer.send(payload);
  } catch (error) {
    throw new Error(`Failed to publish message to topic ${topic}: ${error}`);
  }
};