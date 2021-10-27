import { Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PessoasController],
  providers: [PessoasService, PrismaService],
})
export class PessoasModule {}
