import {
  Res,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { News } from './database/entities/news.entity';

@Controller('news')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-all')
  async getNewsAll(): Promise<News[]> {
    return this.appService.getNewsAll();
  }

  @Get('get-one')
  async getNewsOne(@Query() query: { id: number }): Promise<News | null> {
    return this.appService.getNewsOne(query.id);
  }

  // @Put('create')
  // async createNews(@Body() data: News, @Res() res: Response): Promise<News> {
  //   return this.appService.createNews(data);
  // }

  @Put('create')
  createNews(@Body() data: News, @Res() res: Response): void {
    // const msg = 'Successfully created';

    this.appService
      .createNews(data)
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });

    //   console.log(error);

    // return msg;
  }

  @Delete('delete')
  async deleteNewsOne(@Body() body: { id: number }): Promise<News> {
    return this.appService.deleteNewsOne(body.id);
  }

  @Post('update')
  async updateNews(@Body() data: News): Promise<News> {
    return this.appService.updateNews(data);
  }
}
