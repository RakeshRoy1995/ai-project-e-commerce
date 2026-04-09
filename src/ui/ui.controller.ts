import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';

@Controller()
export class UiController {
  
  @Get('/')
  getShop(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'public', 'shop', 'index.html'));
  }

  @Get('/admin')
  getAdmin(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'public', 'admin', 'index.html'));
  }

  @Get('/cart')
  getCart(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'public', 'cart', 'index.html'));
  }
}