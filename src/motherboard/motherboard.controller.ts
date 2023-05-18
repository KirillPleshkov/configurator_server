import {Body, Controller, Post} from '@nestjs/common';
import {MotherboardCreateSocketDto} from "./dto/motherboard-create-socket.dto";
import {MotherboardService} from "./motherboard.service";
import {MotherboardCreateDto} from "./dto/motherboard-create.dto";
import {PowerSupplyGetDto} from "../power-supply/dto/power-supply-get.dto";
import {MotherboardGetDto} from "./dto/motherboard-get.dto";

@Controller('motherboard')
export class MotherboardController {

    constructor(private motherboardService: MotherboardService) {}

    @Post('/create-socket')
    createSocket(@Body() motherboardCreateSocketDto: MotherboardCreateSocketDto) {
        return this.motherboardService.createSocket(motherboardCreateSocketDto)
    }

    @Post('/create')
    create(@Body() motherboardCreateDto: MotherboardCreateDto) {
        return this.motherboardService.create(motherboardCreateDto)
    }

    @Post('/all-characteristics')
    getAllCharacteristics(@Body() motherboardGetDto: MotherboardGetDto) {
        return this.motherboardService.getAllCharacteristics(motherboardGetDto)
    }

}
