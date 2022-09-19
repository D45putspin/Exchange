import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { ConversionRateCurr } from '../models/conversion-rate.model';
import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'kafka',
  ssl: false,
  brokers: ['localhost:9092'],
});

@Injectable()
export class RequestsService {
  async sendConverionRates(convertionRatesCurr: ConversionRateCurr) {
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
      topic: 'convertion-rate',
      messages: [{ value: JSON.stringify(convertionRatesCurr) }],
    });

    await producer.disconnect();
    return true;
  }
}
