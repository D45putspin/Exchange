import { Injectable } from '@nestjs/common';
import { ConversionRateCurr } from '../models/conversion-rate.model';
import { Kafka } from 'kafkajs';
import { ENV_VARIABLES } from 'src/env';
import axios from 'axios';

export const kafka = new Kafka({
  clientId: 'kafka',
  ssl: false,
  brokers: ['localhost:9092'],
});
const topic = 'email-conversion-rate';
const consumer = kafka.consumer({ groupId: 'kafkaConsumersEmail' });

consumer.connect();
consumer.subscribe({ topic, fromBeginning: false });
consumer.on('consumer.crash', (event) => {
  const error = event?.payload?.error;
});
consumer.run({
  partitionsConsumedConcurrently: 3,
  eachMessage: async ({ message }) => {
    sendMail(JSON.parse(message.value.toString()));
  },
});
function sendMail(msg: any) {
  console.log(
    'SENDMAIL : your conversion is done: ' +
      msg.initialValue +
      msg.from +
      ' to ' +
      msg.to +
      ' equals ' +
      msg.val,
  );
}
@Injectable()
export class EmailsService {}
