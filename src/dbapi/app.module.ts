import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './controllers/comments.controller';
import { NewsController } from './controllers/news.controller';
import { AppController } from './controllers/app.controller';
import { AppService } from './modules/app.service';
import { CommentsModule } from './modules/comments/comments.module';
import { CommentsService } from './modules/comments/comments.service';
import { NewsModule } from './modules/news/news.module';
import { NewsService } from './modules/news/news.service';
import { DatabaseModule } from './database/database.module';
import { News } from './database/entities/news.entity';

@Module({
  // imports: [NewsModule, CommentsModule],
  imports: [
    // DatabaseModule,
    // TypeOrmModule.forFeature([News]),

    NewsModule,
    CommentsModule,
  ],
  controllers: [NewsController, CommentsController],
  // providers: [NewsService], //AppService, , CommentsService
})
export class AppModule {}
