import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';

@Controller('images')
export class ImagesController {
  @Get(':id/:image')
  findOne(@Param() params, @Res() res: Response) {
    createReadStream(`./src/images/${params.id}/${params.image}`).pipe(res);
  }
}
