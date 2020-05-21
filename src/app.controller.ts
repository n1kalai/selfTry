import { Controller, Get, Param, Res, Post, Body } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('uploads/:imgId')
  getFile(@Param('imgId') imgId, @Res() res) {
    return res.sendFile(imgId, { root: 'public' });
  }
}
