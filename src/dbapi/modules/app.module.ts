import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from '../controllers/comments/comments.controller';
import { NewsController } from '../controllers/news/news.controller';
// import { CalcController } from '../calc/calc.controller';
// import { CalcModule } from '../calc/calc.module';
// import { CalcService } from '../calc/calc.service';
import { AppController } from './../controllers/app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { CommentsService } from './comments/comments.service';
import { NewsModule } from './news/news.module';
import { NewsService } from './news/news.service';
// import { DatabaseModule } from './database/database.module';
// import { News } from './database/entities/news.entity';

@Module({
  imports: [NewsModule, CommentsModule],
  // imports: [DatabaseModule, TypeOrmModule.forFeature([News])],
  controllers: [AppController, NewsController, CommentsController],
  providers: [AppService, NewsService, CommentsService],
})
export class AppModule {}
