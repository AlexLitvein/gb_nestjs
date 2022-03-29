import {
  Res,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { Response } from 'express';
import { newsTemplate } from '../../views/news';
import { DecrementId } from '../../utils/decrement-id.decorator';
import { News } from '../dto/news.dto';
import { NewsService } from '../modules/news/news.service';
import { newsDetail } from '../../views/news-detail';
import { drawDocument } from '../../views/dcument';
import { NewsIdDto } from '../dto/news-id.dto';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from '../../utils/HelperFileLoader';

const PATH_NEWS = '/news-static/';
const helperFileLoader = new HelperFileLoader();
helperFileLoader.path = PATH_NEWS;

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {
    MulterModule.register({
      storage: diskStorage({
        destination: helperFileLoader.destinationPath,
        filename: helperFileLoader.customFileName,
      }),
    });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

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
    const news = await this.newsService.getNewsAll();
    return drawDocument(newsTemplate(news));
  }

  @Get('get-one')
  async getNewsOne(
    @Query() @DecrementId(['id']) query: NewsIdDto,
  ): Promise<string> {
    const news = await this.newsService.getNews(query.id);
    return drawDocument(newsDetail(news));
  }

  @Delete('delete')
  async deleteNewsOne(@Body() body: NewsIdDto): Promise<News[]> {
    return this.newsService.deleteNews(body.id);
  }
}
