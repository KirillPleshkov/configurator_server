import {forwardRef, Module} from '@nestjs/common';
import { AssemblyController } from './assembly.controller';
import { AssemblyService } from './assembly.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {AssemblyModel} from "./models/assembly.model";
import {JwtAuthGuard} from "../users/guards/jwt-auth.guard";
import {ProcessorModel} from "../processor/models/processor.model";
import {DataStorageModel} from "../data-storage/models/data-storage.model";
import {MotherboardModel} from "../motherboard/models/motherboard.model";
import {ProcessorCoolingModel} from "../processor-cooling/models/processor-cooling.model";
import {UsersModule} from "../users/users.module";

@Module({
  controllers: [AssemblyController],
  providers: [AssemblyService],
  imports: [
      SequelizeModule.forFeature([AssemblyModel, ProcessorModel, DataStorageModel, MotherboardModel, ProcessorCoolingModel]),
      UsersModule
  ]
})
export class AssemblyModule {}
