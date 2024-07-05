import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['220.95.246.96:9092'],
  logLevel: logLevel.INFO, // Adjust as needed
});

export default kafka;