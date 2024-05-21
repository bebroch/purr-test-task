import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserGuardModule } from 'src/auth/guards/user/user.guard.module'
import { CommentEntity } from 'src/database/entities/comment.entity'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'

@Module({
    imports: [TypeOrmModule.forFeature([CommentEntity]), UserGuardModule],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule {}
