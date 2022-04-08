import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from '../../../dbapi/database/entities/news.entity';
import { NewsController } from '../../controllers/news.controller';
import { NewsService } from './news.service';
import { SessionsModule } from '../sessions/sessions.module';
import { UsersEntity } from '../../database/entities/user.entity';
import { UsersRoles } from '../../database/entities/users-roles.entity';
import { Role } from '../../database/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity, UsersEntity, UsersRoles, Role]),
    SessionsModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}

/* 
  Module
  Decorator that marks a class as a [module](https://docs.nestjs.com/modules).
  Модули используются Nest для организации структуры приложения в области видимости. Контроллеры и провайдеры ограничены модулем, в котором они объявлены. Модули и их классы (контроллеры и провайдеры) образуют граф, который определяет, как Nest выполняет [внедрение зависимостей (DI)] (https://docs.nestjs.com/providers#). внедрение зависимости).
 */
