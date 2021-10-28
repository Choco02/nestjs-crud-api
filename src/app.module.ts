import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoasModule } from './pessoas/pessoas.module';
import { ImagesModule } from './images/images.module';
import { LoggerModule } from 'nestjs-pino';
import { createWriteStream } from 'fs';

@Module({
  imports: [
    PessoasModule,
    ImagesModule,
    LoggerModule.forRoot({
      pinoHttp: [createWriteStream('./access.log')],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
