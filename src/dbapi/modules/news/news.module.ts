import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { CalcController } from '../calc/calc.controller';
// import { CalcModule } from '../calc/calc.module';
// import { CalcService } from '../calc/calc.service';
import { NewsController } from '../../controllers/news/news.controller';
import { NewsService } from './news.service';
import { DatabaseModule } from '../../database/database.module';
import { News } from '../../database/entities/news.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([News])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
