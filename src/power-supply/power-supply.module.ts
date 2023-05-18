import { Module } from '@nestjs/common';
import { PowerSupplyController } from './power-supply.controller';
import { PowerSupplyService } from './power-supply.service';

@Module({
  controllers: [PowerSupplyController],
  providers: [PowerSupplyService]
})
export class PowerSupplyModule {}
