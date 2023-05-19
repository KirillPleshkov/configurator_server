import { Module } from '@nestjs/common';
import { ProcessorController } from './processor.controller';
import { ProcessorService } from './processor.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {ProcessorModel} from "./models/processor.model";
import {ProcessorCodeNameModel} from "./models/processor-code-name.model";
import {ProcessorSeriesModel} from "./models/processor-series.model";
import {SocketModel} from "../socket/models/socket.model";

@Module({
  controllers: [ProcessorController],
  providers: [ProcessorService],
  imports: [
      SequelizeModule.forFeature([ProcessorModel, ProcessorCodeNameModel, ProcessorSeriesModel, SocketModel])
  ]
})
export class ProcessorModule {}
