import {Body, Controller, Get, Post} from '@nestjs/common';
import {RamService} from "./ram.service";
import {RamGetDto} from "./dto/ram-get.dto";
import {RamCreateDto} from "./dto/ram-create.dto";

@Controller('ram')
export class RamController {
    constructor(private ramService: RamService) {}

    @Get('/all-characteristics')
    getAllCharacteristics() {
        return this.ramService.getAllCharacteristics()
    }

    @Post('/get-cost')
    getCost(@Body() remGetDto: RamGetDto) {
        return this.ramService.getCost(remGetDto)
    }

    @Post('/create-ram')
    create(@Body() ramCreateDto: RamCreateDto) {
        return this.ramService.create(ramCreateDto)
    }

    @Post('/get-components')
    getComponents(@Body() remGetDto: RamGetDto) {
        return this.ramService.getComponents(remGetDto)
    }
}