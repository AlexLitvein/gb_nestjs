import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { News } from './database/entities/news.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([News])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
