import { Module } from '@nestjs/common';
import { PowerSupplyController } from './power-supply.controller';
import { PowerSupplyService } from './power-supply.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {PowerSupplyModel} from "./models/power-supply.model";

@Module({
  controllers: [PowerSupplyController],
  providers: [PowerSupplyService],
  imports: [
    SequelizeModule.forFeature([PowerSupplyModel]),
  ]
})
export class PowerSupplyModule {}
