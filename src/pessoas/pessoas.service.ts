import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Pessoa, Prisma } from '@prisma/client';
import { mkdirSync, readdirSync, unlinkSync, writeFileSync, rmSync } from 'fs';
import { v4 as uuid } from 'uuid';

interface IData {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  image?: Express.Multer.File | string;
  birth_date?: number;
}

const createName = (data) =>
  (data.image = `${uuid()}.${
    (data.image as Express.Multer.File).originalname.split('.')[1]
  }`);

@Injectable()
export class PessoasService {
  constructor(private prisma: PrismaService) {}

  async create(data: IData): Promise<Pessoa> {
    const imageBuffer = data.image as Express.Multer.File;
    data.image = createName(data);

    console.log('data: ', data);

    const createFile = (pessoa: Pessoa) => {
      const folder = readdirSync('./').includes('dist') ? './src' : './dist';
      const path = `${folder}/images/${pessoa.id}`;

      mkdirSync(path);

      writeFileSync(`${path}/${pessoa.image}`, imageBuffer.buffer);
      return pessoa;
    };

    return this.prisma.pessoa
      .create({
        data: data as Prisma.PessoaCreateInput,
      })
      .then(createFile);
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PessoaWhereUniqueInput;
    where?: Prisma.PessoaWhereInput;
    orderBy?: Prisma.PessoaOrderByWithRelationInput;
  }): Promise<Pessoa[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.pessoa.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    pessoaWhereUniqueInput: Prisma.PessoaWhereUniqueInput,
  ): Promise<Pessoa | null> {
    return this.prisma.pessoa.findUnique({
      where: pessoaWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.PessoaWhereUniqueInput;
    data: IData;
  }): Promise<Pessoa> {
    const { where, data } = params;

    if (data.image) {
      const imageBuffer = data.image as Express.Multer.File;
      data.image = createName(data);
      const folder = readdirSync('./').includes('dist') ? './src' : './dist';
      const path = `${folder}/images/${data.id}`;

      const [oldFile] = readdirSync(path);
      unlinkSync(`${path}/${oldFile}`);

      writeFileSync(`${path}/${data.image}`, imageBuffer.buffer);
      data.image;
    }

    return this.prisma.pessoa.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.PessoaWhereUniqueInput): Promise<Pessoa> {
    const folder = readdirSync('./').includes('dist') ? './src' : './dist';
    const path = `${folder}/images/${where.id}`;

    rmSync(path, { recursive: true, force: true });
    return this.prisma.pessoa.delete({
      where,
    });
  }
}
