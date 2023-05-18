import {Body, Controller, Post} from '@nestjs/common';
import {PowerSupplyCreationDto} from "./dto/power-supply-creation.dto";
import {PowerSupplyService} from "./power-supply.service";
import {PowerSupplyGetDto} from "./dto/power-supply-get.dto";

@Controller('power-supply')
export class PowerSupplyController {

    constructor(private powerSupplyService: PowerSupplyService) {}

    @Post('/create')
    create(@Body() powerSupplyCreationDto: PowerSupplyCreationDto) {
        return this.powerSupplyService.create(powerSupplyCreationDto)
    }

    @Post('/all-characteristics')
    getAllCharacteristics(@Body() powerSupplyGetDto: PowerSupplyGetDto) {
        return this.powerSupplyService.getAllCharacteristics(powerSupplyGetDto)
    }

}
