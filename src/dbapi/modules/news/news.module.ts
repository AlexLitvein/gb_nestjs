import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { CalcController } from '../calc/calc.controller';
// import { CalcModule } from '../calc/calc.module';
// import { CalcService } from '../calc/calc.service';
import { NewsController } from '../../controllers/news.controller';
import { NewsService } from './news.service';
import { DatabaseModule } from '../../database/database.module';
import { News } from '../../database/entities/news.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([News])], // ,
  controllers: [NewsController],
  providers: [NewsService], //
  exports: [NewsService],
})
export class NewsModule {}

/** 
  Module
  Decorator that marks a class as a [module](https://docs.nestjs.com/modules).
  Модули используются Nest для организации структуры приложения в области видимости. Контроллеры и провайдеры ограничены модулем, 
  в котором они объявлены. Модули и их классы (контроллеры и провайдеры) образуют граф, который определяет, 
  как Nest выполняет [внедрение зависимостей (DI)] (https://docs.nestjs.com/providers#). внедрение зависимости).
 */
