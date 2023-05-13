import {Body, Controller, Get, Post} from '@nestjs/common';
import {RamService} from "./ram.service";
import {RemGetCostDto} from "./dto/rem-get-cost.dto";
import {RamCreateDto} from "./dto/ram-create.dto";

@Controller('ram')
export class RamController {
    constructor(private ramService: RamService) {}

    @Get('/all-characteristics')
    getAllCharacteristics() {
        return this.ramService.getAllCharacteristics()
    }

    @Post('/get-cost')
    getCost(@Body() remGetCostDto: RemGetCostDto) {
        return this.ramService.getCost(remGetCostDto)
    }

    @Post('/create-ram')
    create(@Body() ramCreateDto: RamCreateDto) {
        return this.ramService.create(ramCreateDto)
    }

    @Post('/get-components')
    getComponents(@Body() remGetCostDto: RemGetCostDto) {
        return this.ramService.getComponents(remGetCostDto)
    }
}