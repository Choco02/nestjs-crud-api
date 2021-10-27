/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

const regexAllowedChars = /[^\w ãáâéêíôóúç'-@]+/gi;

const simpleSanitize = (str: string) => str.replace(regexAllowedChars, '');

interface IData {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  image?: Express.Multer.File | string;
}

@Controller('pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() data: IData,
    @UploadedFile() image: Express.Multer.File,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (Object.values(data).length < 3) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Parâmetros insuficientes' });
      return;
    }

    let { name, email, phone } = data;

    if (!image) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Imagem não enviada' });
      return;
    }

    [name, email, phone] = [name, email, phone].map((item) =>
      simpleSanitize(item),
    );

    return this.pessoasService.create({ name, email, phone, image });
  }

  @Get()
  findAll() {
    return this.pessoasService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoasService.findOne({ id });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() data: IData,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (
      Object.values(data).some((item: string) => regexAllowedChars.test(item))
    ) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Caracteres inválidos enviado' });
      return;
    }

    data.image = image;
    data.id = id;

    return this.pessoasService.update({ where: { id }, data });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoasService.remove({ id });
  }
}
