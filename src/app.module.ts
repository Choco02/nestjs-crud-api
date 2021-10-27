import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoasModule } from './pessoas/pessoas.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [PessoasModule, ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
