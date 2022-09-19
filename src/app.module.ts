import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestsModule } from './requests/requests.module';
import { FunctionsModule } from './functions/functions.module';
import { EmailsModule } from './emails/emails.module';

@Module({
  imports: [RequestsModule, FunctionsModule, EmailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
