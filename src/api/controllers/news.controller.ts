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
import { newsTemplate } from '../../views/news.view';
import { DecrementId } from '../../utils/decrement-id.decorator';
import { News } from '../dto/news.dto';
import { NewsService } from '../modules/news/news.service';
import { newsDetail } from '../../views/news-detail.view';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Put('create')
  async createNews(@Body() data: News, @Res() res: Response): Promise<void> {
    let msg = '';
    let status = 200;
    try {
      await this.newsService.createNews(data);
      msg = 'Successfully created';
    } catch (e) {
      msg = (<any>e).detail;
      status = 500;
    }
    res.status(status).send(msg);
  }

  @Post('update')
  async updateNews(@Body() data: News, @Res() res: Response): Promise<void> {
    let msg = '';
    let status = 200;
    try {
      msg = await this.newsService.updateNews(data);
    } catch (e) {
      msg = (<any>e).message;
      status = 500;
    }
    res.status(status).send(msg);
  }

  @Get('/')
  async getNewsAll(): Promise<string> {
    // Promise<News[]
    const news = await this.newsService.getNewsAll();
    // return this.newsService.getNewsAll();
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
        .card {
            border: 1px solid palevioletred;
            margin: 2px;
        }
    </style>
        <title>Document</title>
    </head>
    <body>
    ${newsTemplate(news)}
    </body>
    </html>
    `;
  }

  @Get('get-one')
  async getNewsOne(
    @Query() @DecrementId(['id']) query: { id: number },
  ): Promise<string> {
    const news = await this.newsService.getNews(query.id);
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
        .card {
            border: 1px solid palevioletred;
            margin: 2px;
        }
    </style>
        <title>Document</title>
    </head>
    <body>
    ${newsDetail(news)}
    </body>
    </html>
    `;
  }

  @Delete('delete')
  async deleteNewsOne(
    @Body() @DecrementId(['id']) body: { id: number },
  ): Promise<News[]> {
    return this.newsService.deleteNews(body.id);
  }
}
