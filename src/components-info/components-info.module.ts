import { Module } from '@nestjs/common';
import { ComponentsInfoController } from './components-info.controller';
import { ComponentsInfoService } from './components-info.service';

@Module({
  controllers: [ComponentsInfoController],
  providers: [ComponentsInfoService]
})
export class ComponentsInfoModule {}
