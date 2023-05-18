import { Module } from '@nestjs/common';
import { MotherboardController } from './motherboard.controller';
import { MotherboardService } from './motherboard.service';

@Module({
  controllers: [MotherboardController],
  providers: [MotherboardService]
})
export class MotherboardModule {}
