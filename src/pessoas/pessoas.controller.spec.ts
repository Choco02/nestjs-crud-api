import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { PessoasController } from './pessoas.controller';
import { PessoasService } from './pessoas.service';

describe('PessoasController', () => {
  let controller: PessoasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoasController],
      providers: [PessoasService, PrismaService],
    }).compile();

    controller = module.get<PessoasController>(PessoasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
