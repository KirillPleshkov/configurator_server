import { Module } from '@nestjs/common';
import { VideoCardController } from './video-card.controller';
import { VideoCardService } from './video-card.service';

@Module({
  controllers: [VideoCardController],
  providers: [VideoCardService]
})
export class VideoCardModule {}
