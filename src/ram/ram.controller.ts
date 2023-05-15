import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RamService} from "./ram.service";
import {RamCreateDto} from "./dto/ram-create.dto";

@Controller('ram')
export class RamController {
    constructor(private ramService: RamService) {}

    @Get('/all-characteristics')
    getAllCharacteristics() {
        return this.ramService.getAllCharacteristics()
    }

    @Post('/create-ram')
    create(@Body() ramCreateDto: RamCreateDto) {
        return this.ramService.create(ramCreateDto)
    }

}