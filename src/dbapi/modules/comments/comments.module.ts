import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '../../../dbapi/database/entities/comment.entity';
import { CommentsController } from '../../../dbapi/controllers/comments.controller';
import { CommentsService } from './comments.service';
import { SocketCommentsGateway } from '../../../ws/socket-comments.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  controllers: [CommentsController],
  providers: [CommentsService, SocketCommentsGateway],
  exports: [CommentsService],
})
export class CommentsModule {}
