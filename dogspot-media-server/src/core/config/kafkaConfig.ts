import { Kafka, logLevel } from 'kafkajs';

require('dotenv').config();

const kafkaUrl: string = process.env.KAFKA_URL || '';

const kafka = new Kafka({
  clientId: process.env.KAFKA_ID,
  brokers: [kafkaUrl],
  logLevel: logLevel.INFO, // Adjust as needed
});

export default kafka;