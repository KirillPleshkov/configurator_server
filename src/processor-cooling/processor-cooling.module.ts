import { Module } from '@nestjs/common';
import { ProcessorCoolingController } from './processor-cooling.controller';
import { ProcessorCoolingService } from './processor-cooling.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {TypeProcessorCoolingModel} from "./models/type-processor-cooling.model";
import {ProcessorCoolingModel} from "./models/processor-cooling.model";

@Module({
  controllers: [ProcessorCoolingController],
  providers: [ProcessorCoolingService],
  imports: [
    SequelizeModule.forFeature([TypeProcessorCoolingModel, ProcessorCoolingModel]),
  ]
})
export class ProcessorCoolingModule {}
