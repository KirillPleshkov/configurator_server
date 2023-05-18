import { Module } from '@nestjs/common';
import { MotherboardController } from './motherboard.controller';
import { MotherboardService } from './motherboard.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {SocketModel} from "../socket/models/socket.model";
import {MotherboardModel} from "./models/motherboard.model";

@Module({
  controllers: [MotherboardController],
  providers: [MotherboardService],
  imports: [
    SequelizeModule.forFeature([SocketModel, MotherboardModel]),
  ]
})
export class MotherboardModule {}
