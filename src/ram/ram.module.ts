import { Module } from '@nestjs/common';
import { RamService } from './ram.service';
import { RamController } from './ram.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {RamModel} from "./models/ram.model";

@Module({
  providers: [RamService],
  controllers: [RamController],
  imports: [
    SequelizeModule.forFeature([RamModel]),
  ]
})
export class RamModule {}
