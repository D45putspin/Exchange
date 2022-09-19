## Important note

the rest api and micro-services should be in diffrent projects and communicate with kafka (they're communicating with it) only, its just like this so we can have all in one repo

## Made With NestJS And APACHE KAFKA
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Installation

```bash
$ git clone https://github.com/D45putspin/Exchange
$ npm install
```

## Setup APACHE KAFKA  w Docker
```bash
$ docker-compose up
```
## Running the app

```bash

# development
$ npm run start

# watch mode
$ npm run start:dev

```
take in mind that the project onyl starts when the 2 consumers get connected (it shows a log like this one) 

![imagem](https://user-images.githubusercontent.com/36547913/191052315-4e541dae-f453-484e-abcc-04df7edfd111.png)


## Flow

This Application Works with 1 rest api endpoint that is called by the users 

```js
METHOD [POST]
uri: localhost:3000/conversionRate
body:{
{
  "currencyFrom": string,
  "currencyTo": string,
  "value":float
}
}
```

then this module sends a message throught apache kafka to a micro-service that does the api call and calculations .
this micro-service then calls another micro-service where email is sent (STUB).




- Author - [Tiago Moreira](https://github.com/D45putspin)



