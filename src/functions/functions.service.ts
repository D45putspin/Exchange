import { Injectable } from '@nestjs/common';
import { ConversionRateCurr } from '../models/conversion-rate.model';
import { Kafka } from 'kafkajs';
import { ENV_VARIABLES } from 'src/env';
import axios from 'axios';
const kafka = new Kafka({
  clientId: 'kafka',
  ssl: false,
  brokers: ['localhost:9092'],
});
const topic = 'convertion-rate';
const consumer = kafka.consumer({ groupId: 'kafkaConsumers' });

consumer.connect();
consumer.subscribe({ topic, fromBeginning: false }).catch((e) => {
  console.log(e);
});
consumer.run({
  eachMessage: async ({ message }) => {
    calculate(JSON.parse(message.value.toString()));
  },
});
consumer.on('consumer.crash', (event) => {
  const error = event?.payload?.error;
  console.log(error);
  crashHandler(error);
});
const producer = kafka.producer();

async function crashHandler(error: any) {
  if (
    error &&
    error.name !== 'KafkaJSNumberOfRetriesExceeded' &&
    error.retriable !== true
  ) {
    await this.restartConsumer();
  }
}
const url = `${ENV_VARIABLES.EXCHANGE_BASE_URL}${ENV_VARIABLES.EXCHANGE_API_KEY}`;
async function sendMail(res) {
  await producer.connect();
  await producer.send({
    topic: 'email-conversion-rate',
    messages: [{ value: JSON.stringify(res) }],
  });

  await producer.disconnect();
}
async function calculate(conversionRateCurr: ConversionRateCurr) {
  const options = {
    method: 'GET',
    url,
    headers: { Accept: 'application/json' },
  };

  axios
    .request(options)
    .then(async function (response) {
      let math;
      conversionRateCurr.currencyFrom =
        conversionRateCurr.currencyFrom.toUpperCase();
      conversionRateCurr.currencyTo =
        conversionRateCurr.currencyTo.toUpperCase();
      if (
        !response?.data?.rates[conversionRateCurr.currencyTo] ||
        !response?.data?.rates[conversionRateCurr.currencyFrom]
      ) {
        console.log('one of the given currencies doesnt exist');
        return false;
      }
      conversionRateCurr.currencyFrom === 'USD'
        ? (math =
            response?.data?.rates[conversionRateCurr.currencyTo] *
            conversionRateCurr.value)
        : (math =
            conversionRateCurr.value *
            response?.data?.rates[conversionRateCurr.currencyFrom] *
            response?.data?.rates[conversionRateCurr.currencyTo]);
      const res = {
        from: conversionRateCurr.currencyFrom,
        to: conversionRateCurr.currencyTo,
        initialValue: conversionRateCurr.value,
        val: Math.abs(math),
      };

      sendMail(res);
      return true;
    })
    .catch(function (error) {
      console.error(error);
    });
}
@Injectable()
export class FunctionsService {}
