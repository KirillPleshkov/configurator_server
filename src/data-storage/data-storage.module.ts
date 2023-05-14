import { Module } from '@nestjs/common';
import { DataStorageController } from './data-storage.controller';
import { DataStorageService } from './data-storage.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {DataStorageModel} from "./models/data-storage.model";
import {TypeDataStorageModel} from "./models/type-data-storage.model";

@Module({
  controllers: [DataStorageController],
  providers: [DataStorageService],
  imports: [
    SequelizeModule.forFeature([DataStorageModel, TypeDataStorageModel]),
  ]
})
export class DataStorageModule {}
