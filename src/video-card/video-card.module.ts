import { Module } from '@nestjs/common';
import { VideoCardController } from './video-card.controller';
import { VideoCardService } from './video-card.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {VideoCardModel} from "./models/video-card.model";

@Module({
  controllers: [VideoCardController],
  providers: [VideoCardService],
  imports: [
      SequelizeModule.forFeature([VideoCardModel])
  ]
})
export class VideoCardModule {}
