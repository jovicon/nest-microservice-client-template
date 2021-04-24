import { Controller, Get, Inject, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Message } from './message.event';

@Controller()
export class AppController {
  constructor(
    @Inject('HELLO_WORLD_SERVICE') private readonly client: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  // sin respues
  @Get('/event')
  getHello(@Res() res) {
    this.client.emit<any>('message_printed', new Message('Hello World'));
    res.status(200).send({ ...process.env });
    // return 'Hello World printed - ASYNC';
  }

  // con respuesta
  @Get('/response')
  getWorld(@Res() res) {
    this.client
      // .emit<any>('message_printed', new Message('Hello World'))
      .send<any>('message_printed', new Message('Hello World'))
      .subscribe((response) => {
        console.log(response);
        res.status(200).send(response);
      });

    // res.status(200).send({ ...process.env });
    // return 'Hello World printed - ASYNC';
  }
}
